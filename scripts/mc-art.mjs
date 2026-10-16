// Draws every pixel texture and sprite for the /mc preview into public/mc/*.png.
// All art is original and generated here from palettes and pixel maps; no game
// assets are used. Run: node scripts/mc-art.mjs [--preview <out.png>]
import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { deflateSync } from "node:zlib";

/* --------------------------------------------------------------- PNG writer */
const CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
function crc32(buf) {
  let c = 0xffffffff;
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
/** grid: rows of "#rrggbb" or null (transparent). */
export function encode(grid) {
  const h = grid.length;
  const w = grid[0].length;
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // RGBA
  const raw = Buffer.alloc(h * (w * 4 + 1));
  grid.forEach((row, y) => {
    assert.equal(row.length, w, `row ${y} width`);
    row.forEach((c, x) => {
      if (!c) return;
      const o = y * (w * 4 + 1) + 1 + x * 4;
      raw[o] = parseInt(c.slice(1, 3), 16);
      raw[o + 1] = parseInt(c.slice(3, 5), 16);
      raw[o + 2] = parseInt(c.slice(5, 7), 16);
      raw[o + 3] = 255;
    });
  });
  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ------------------------------------------------------------------ helpers */
// mulberry32: small seeded PRNG, deterministic so the art is stable across runs.
export function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
  };
}
/** Weighted random pick; weights default to a falling ramp so colour 0 dominates. */
function picker(colors, rand, weights = colors.map((_, i) => colors.length - i)) {
  const total = weights.reduce((a, b) => a + b, 0);
  return () => {
    let r = rand() * total;
    for (let i = 0; i < colors.length; i++) if ((r -= weights[i]) < 0) return colors[i];
    return colors[0];
  };
}
function noise(colors, seed, w = 16, h = 16, weights) {
  const pick = picker(colors, rng(seed), weights);
  return Array.from({ length: h }, () => Array.from({ length: w }, pick));
}
/** Pixel map: one char per pixel, "." is transparent, other chars index the palette. */
function sprite(rows, palette) {
  const w = rows[0].length;
  return rows.map((r, y) => {
    assert.equal(r.length, w, `sprite row ${y} is ${r.length} wide, expected ${w}: "${r}"`);
    return [...r].map((ch) => {
      if (ch === ".") return null;
      assert.ok(palette[ch], `palette is missing "${ch}"`);
      return palette[ch];
    });
  });
}
/** Lit top-left edge and shaded bottom-right edge, like a polished block. */
function bevel(grid, light, dark) {
  const n = grid.length - 1;
  return grid.map((row, y) =>
    row.map((c, x) => (x === 0 || y === 0 ? light : x === n || y === n ? dark : c)),
  );
}
function scale(grid, s) {
  return grid.flatMap((row) => {
    const wide = row.flatMap((c) => Array(s).fill(c));
    return Array.from({ length: s }, () => wide);
  });
}

/* ----------------------------------------------------------------- textures */
export const art = {};

art.dirt = noise(["#866043", "#79553a", "#966c4a", "#5d4130", "#b9855c"], 3);
art.stone = noise(["#7f7f7f", "#8b8b8b", "#747474", "#6a6a6a", "#9a9a9a"], 5);
art.deepslate = noise(["#4d4d55", "#43434a", "#58585f", "#3a3a40", "#2e2e33"], 7);
art.bedrock = noise(["#575757", "#353535", "#7a7a7a", "#232323", "#111111"], 11, 16, 16, [3, 3, 2, 2, 1]);
art.sandstone = noise(["#e0d6a8", "#d8cd98", "#e8dfb6", "#cdbf86"], 13);
art.grass = noise(["#5d9b3a", "#6aaa40", "#4c8a2e", "#7cbd4b"], 17);
art.moss = noise(["#4a6b3a", "#3f5e32", "#56783f", "#2f4a3a"], 19);
art.leaves = noise(["#3f7a2a", "#4a8a33", "#2f5f1f", "#1f4214", "#5c9c3c"], 23);
art.wool = noise(["#f3eee3", "#ece5d6", "#e7dfcf", "#f8f5ee", "#d9cfba"], 29);
art.terracotta = noise(["#b5583a", "#a9502f", "#bd6142", "#9a4a2f"], 31);
art.amethyst = noise(["#6a3cff", "#5f25ff", "#7d55ff", "#4a16d9", "#9a7bff"], 37);
art.sky_glass = noise(["#cfe6f0", "#dff0f6"], 41);

art.grass_side = (() => {
  const g = noise(["#866043", "#79553a", "#966c4a", "#5d4130", "#b9855c"], 43);
  const green = picker(["#5d9b3a", "#6aaa40", "#4c8a2e", "#7cbd4b"], rng(47));
  const drip = rng(53);
  for (let x = 0; x < 16; x++) {
    const depth = 3 + Math.floor(drip() * 3) - (x % 5 === 0 ? 1 : 0);
    for (let y = 0; y < depth; y++) g[y][x] = green();
  }
  return g;
})();

function planks(colors, seam, seed) {
  const g = noise(colors, seed);
  const seams = [3, 11, 6, 13];
  return g.map((row, y) =>
    row.map((c, x) => (y % 4 === 3 || x === seams[Math.floor(y / 4)] ? seam : c)),
  );
}
art.planks = planks(["#b8945f", "#a2834f", "#af8f55", "#c29d66"], "#7a5d33", 59);
art.dark_planks = planks(["#4a3421", "#553c26", "#3e2b1a", "#5e4430"], "#2a1c10", 61);

art.log = (() => {
  const rand = rng(67);
  const bark = ["#6b5232", "#5a4428", "#7a5f3a", "#493620"];
  return Array.from({ length: 16 }, () =>
    Array.from({ length: 16 }, (_, x) => bark[(x % 4 === 0 ? 3 : x % 4 === 2 ? 1 : 0) ^ (rand() < 0.25 ? 2 : 0)]),
  );
})();

art.bookshelf = (() => {
  const g = planks(["#b8945f", "#a2834f", "#af8f55"], "#7a5d33", 71);
  const spines = ["#8e2f2f", "#2f4f8e", "#3f7a3a", "#6b4a2b", "#5f25ff", "#b5583a", "#d8c27a"];
  const rand = rng(73);
  for (const [top, bottom] of [[2, 6], [9, 13]]) {
    let x = 1;
    while (x < 15) {
      const c = spines[Math.floor(rand() * spines.length)];
      const width = 1 + Math.floor(rand() * 2);
      const lean = rand() < 0.25 ? 1 : 0;
      for (let dx = 0; dx < width && x < 15; dx++, x++)
        for (let y = top + lean; y <= bottom; y++) g[y][x] = c;
      if (x < 15) {
        for (let y = top; y <= bottom; y++) g[y][x] = "#2a1c10";
        x++;
      }
    }
  }
  return g;
})();

art.gold_block = bevel(noise(["#f8d43c", "#fbe36d", "#e9b92d", "#fff2a8"], 79), "#fff7c4", "#b57d14");
art.iron_block = bevel(noise(["#dcdcdc", "#e8e8e8", "#cfcfcf", "#f2f2f2"], 83), "#ffffff", "#9a9a9a");
art.copper_block = bevel(noise(["#c26b45", "#d57d55", "#b2603c", "#e1906a"], 89), "#f0b08c", "#7f3c22");

/* ------------------------------------------------------------------- chains */
const chainPal = { a: "#9aa0b0", b: "#3c4150" };
art.chain = sprite(
  ["..aa..", ".a..b.", ".a..b.", ".a..b.", "..bb..", "..ab..", "..ab..", "..ab..",
   "..aa..", ".a..b.", ".a..b.", ".a..b.", "..bb..", "..ab..", "..ab..", "..ab.."],
  chainPal,
);

/* ------------------------------------------------------------------ sprites */
const sheepRows = [
  "...wwwwwwwww....",
  "..wwwwwwwwwwwww.",
  ".wwwwwwwwwwwffff",
  ".wwwwwwwwwwwfeff",
  ".wwwwwwwwwwwffff",
  ".wwwwwwwwwwwfnf.",
  ".vvwwwwwwwwvv...",
  "..vvvvvvvvvvv...",
  "..ll.ll...ll.ll.",
  "..ll.ll...ll.ll.",
  "..ss.ss...ss.ss.",
];
const sheepBase = { f: "#d9b39a", e: "#1b1b1b", n: "#c48a7a", l: "#d9b39a", s: "#6b5040" };
for (const [name, w, v] of [
  ["sheep_white", "#f3eee3", "#d9cfba"],
  ["sheep_violet", "#7d55ff", "#5f25ff"],
  ["sheep_terracotta", "#c96a4a", "#a9502f"],
  ["sheep_sage", "#a8b89a", "#8a9c7c"],
]) {
  art[name] = sprite(sheepRows, { ...sheepBase, w, v });
}

art.banner = sprite(
  [
    "pppppppppppp",
    ".dvvvvvvvvv.",
    ".dvvvvvvvvv.",
    ".dvvvvvvvvv.",
    ".dvvvvvvvvv.",
    ".dvwwwwwvvv.",
    ".dvwwwwwwvv.",
    ".dvwwvvvvvv.",
    ".dvwwvvvvvv.",
    ".dvwwvvvvvv.",
    ".dvwwwwwwvv.",
    ".dvwwwwwwvv.",
    ".dvvvvvvvvv.",
    ".dvvvvvvvvv.",
    ".dvvvvvvvvv.",
    ".dvvvvvvvvv.",
    ".dkkkkkkkkk.",
    ".dvvvvvvvvv.",
    ".dvvvvvvvvv.",
    ".kkkkkkkkkk.",
  ],
  { p: "#6b4f2c", v: "#5f25ff", d: "#4a16d9", w: "#ffffff", k: "#3a10a8" },
);

/* -------------------------------------------------------------------- items */
const O = "#1c1424"; // item outline
const items = {
  shirt: [
    [
      "................",
      "....ooo..ooo....",
      "..oohaao.oaaoo..",
      ".ohhaaaaoaaaaao.",
      "ohaaaaaaaaaaaabo",
      "ohaoaaaaaaaaobbo",
      ".oo.ohaaaaabo.o.",
      "....ohaaaaabo...",
      "....ohaaaaabo...",
      "....ohaawaabo...",
      "....ohaaaaabo...",
      "....ohaaaaabo...",
      "....ohbbbbbbo...",
      "....oooooooo....",
      "................",
      "................",
    ],
    { o: O, a: "#7a4cff", h: "#a98bff", b: "#4a16d9", w: "#ffffff" },
  ],
  spyglass: [
    [
      "................",
      "...........ooo..",
      "..........oggo..",
      ".........ogwgo..",
      "........ogggo...",
      ".......occco....",
      "......occho.....",
      ".....occco......",
      "....occho.......",
      "...occco........",
      "..oddco.........",
      ".oddo...........",
      ".odo............",
      "..o.............",
      "................",
      "................",
    ],
    { o: O, g: "#8fd6ff", w: "#ffffff", c: "#c7743f", h: "#e9a070", d: "#7a3f1f" },
  ],
  shears: [
    [
      "................",
      ".oo.........oo..",
      "ossoo.....oossoo",
      "osssso...osssso.",
      ".ossso..ossso...",
      "..ossso.ossso...",
      "...osssossso....",
      "....osssso......",
      "....oosssso.....",
      "...orro.ossso...",
      "..orrro..oooo...",
      ".orrro..orrro...",
      ".orro..orrrro...",
      ".ooo...orrro....",
      "........ooo.....",
      "................",
    ],
    { o: O, s: "#d8d8d8", r: "#b5583a" },
  ],
  tape: [
    [
      "................",
      "................",
      "................",
      "...oooooo.......",
      "..oyyyyyyo......",
      ".oyykkkkyyo.....",
      ".oykooooyyoooooo",
      ".oykooooyyyyyyyo",
      ".oykooooyykykyko",
      ".oyykkkkyyyyyyyo",
      "..oyyyyyyooooooo",
      "...oooooo.......",
      "................",
      "................",
      "................",
      "................",
    ],
    { o: O, y: "#fcdc5f", k: "#a8822a" },
  ],
  sapling: [
    [
      "................",
      ".......oo.......",
      "......oggo......",
      "..oo.oglgo.oo...",
      ".ogglggggoogglo.",
      ".oglggggggggggo.",
      "..oggggoggggo...",
      "...oooobboooo...",
      "......obbo......",
      "..ooo.obbo.ooo..",
      ".ogggoobbooggo..",
      "..oogggbbggoo...",
      "....ooobbooo....",
      "......obbo......",
      "....oddddddo....",
      "....oooooooo....",
    ],
    { o: O, g: "#4a8a33", l: "#7cbd4b", b: "#7a5f3a", d: "#866043" },
  ],
  chest: [
    [
      "................",
      "................",
      ".oooooooooooooo.",
      ".ohhhhhhhhhhhho.",
      ".ohwwwwwwwwwwbo.",
      ".ohwwwwwwwwwwbo.",
      ".oooooollooooo..",
      ".ohwwwwlkwwwwbo.",
      ".ohwwwwllwwwwbo.",
      ".ohwwwwwwwwwwbo.",
      ".ohwwwwwwwwwwbo.",
      ".ohwwwwwwwwwwbo.",
      ".obbbbbbbbbbbbo.",
      ".oooooooooooooo.",
      "................",
      "................",
    ],
    { o: O, h: "#d9a45a", w: "#b07a35", b: "#7a5020", l: "#d8d8d8", k: "#3a3a3a" },
  ],
  clock: [
    [
      "................",
      ".....oooooo.....",
      "...oogggggoo....",
      "..oggyyyyyggo...",
      "..ogyyyyyyygo...",
      ".ogyyyykyyyygo..",
      ".ogyyyykyyyygo..",
      ".ogyyyykkkyygo..",
      ".ogyyyyyyyyygo..",
      ".ogyyyyyyyyygo..",
      "..ogyyyyyyygo...",
      "..oggyyyyyggo...",
      "...oogggggoo....",
      ".....oooooo.....",
      "................",
      "................",
    ],
    { o: O, g: "#d8a52e", y: "#fff2c8", k: "#3a2a17" },
  ],
  book: [
    [
      "................",
      "...ooooooooooo..",
      "..orrrrrrrrrrpo.",
      "..orhhhhhhhhrpo.",
      "..orhrrrrrrhrpo.",
      "..orhrggggrhrpo.",
      "..orhrrrrrrhrpo.",
      "..orhhhhhhhhrpo.",
      "..orrrrrrrrrrpo.",
      "..orrrrrrrrrrpo.",
      "..orrrrrrrrrrpo.",
      "..orrrrrrrrrrpo.",
      "..oddddddddddpo.",
      "...oooooooooooo.",
      "................",
      "................",
    ],
    { o: O, r: "#8e3b2a", h: "#b5583a", g: "#fcdc5f", d: "#5e2418", p: "#f3eee3" },
  ],
  emerald: [
    [
      "................",
      "......oooo......",
      ".....ollggo.....",
      "....olggggdo....",
      "...olgggggddo...",
      "..olggggggggdo..",
      "..oggggggggddo..",
      "..oggggggggddo..",
      "...oggggggddo...",
      "....oggggddo....",
      ".....oggddo.....",
      "......oddo......",
      ".......oo.......",
      "................",
      "................",
      "................",
    ],
    { o: O, l: "#c9ffd6", g: "#41c65b", d: "#1e7a34" },
  ],
  diamond: [
    [
      "................",
      "................",
      "...oooooooooo...",
      "..olllcccccddo..",
      ".olccccccccccdo.",
      "oooooooooooooooo",
      ".occcccccccccdo.",
      "..occcccccccdo..",
      "...occcccccdo...",
      "....occcccdo....",
      ".....occcdo.....",
      "......ocdo......",
      ".......oo.......",
      "................",
      "................",
      "................",
    ],
    { o: O, l: "#e6ffff", c: "#5ff2f2", d: "#2a9c9c" },
  ],
  heart: [
    [
      "................",
      "................",
      "..ooo....ooo....",
      ".orrro..orrro...",
      "orhhrrooorrrro..",
      "orhrrrrrrrrrro..",
      "orrrrrrrrrrrro..",
      ".orrrrrrrrrdo...",
      "..orrrrrrrdo....",
      "...orrrrrdo.....",
      "....orrrdo......",
      ".....orro.......",
      "......oo........",
      "................",
      "................",
      "................",
    ],
    { o: O, r: "#e0383e", h: "#ffb0b0", d: "#9a1f24" },
  ],
  bread: [
    [
      "................",
      "................",
      "................",
      "....oooooooo....",
      "..oohhhhhhhhoo..",
      ".ohhbhhbhhbhhho.",
      "ohhbbhbbhbbhhhbo",
      "ohbbbbbbbbbbbbbo",
      "obbbbbbbbbbbbbdo",
      "obbbbbbbbbbbbddo",
      ".odddddddddddo..",
      "..ooooooooooo...",
      "................",
      "................",
      "................",
      "................",
    ],
    { o: O, h: "#e9b96a", b: "#c58a3f", d: "#8a5a22" },
  ],
  nametag: [
    [
      "................",
      ".ss.............",
      "s..s............",
      "s...s...........",
      ".s...s..........",
      "..s...ooooooooo.",
      "...s.otttttttto.",
      "....ottkkkkktto.",
      "....otttttttto..",
      "....ottkkkktto..",
      "....otttttttto..",
      ".....oooooooo...",
      "................",
      "................",
      "................",
      "................",
    ],
    { o: O, s: "#cfcfcf", t: "#e7dfcf", k: "#5e6b5a" },
  ],
  star: [
    [
      ".......o........",
      "......owo.......",
      "......owo.......",
      ".....owwwo......",
      "oooooowwwoooooo.",
      ".owwwwwwwwwwwo..",
      "..owwwwwwwwwo...",
      "...owwwwwwwo....",
      "...owwwwwwwo....",
      "..owwwwowwwwo...",
      "..owwwo.owwwo...",
      ".owwo.....owwo..",
      ".ooo.......ooo..",
      "................",
      "................",
      "................",
    ],
    { o: O, w: "#fcdc5f" },
  ],
  paper: [
    [
      "................",
      "...ooooooooo....",
      "...owwwwwwwoo...",
      "...owkkkkkwwoo..",
      "...owwwwwwwwwo..",
      "...owkkkkkkkwo..",
      "...owwwwwwwwwo..",
      "...owkkkkkkwwo..",
      "...owwwwwwwwwo..",
      "...owkkkkkkkwo..",
      "...owwwwwwwwwo..",
      "...owkkkwwwwwo..",
      "...owwwwwwwwwo..",
      "...ooooooooooo..",
      "................",
      "................",
    ],
    { o: O, w: "#f3eee3", k: "#8a8a8a" },
  ],
  painting: [
    [
      "................",
      "................",
      ".oooooooooooooo.",
      ".offffffffffffo.",
      ".ofsssssssyssfo.",
      ".ofssssssyyysfo.",
      ".ofsssssssyssfo.",
      ".ofsssgssssssfo.",
      ".ofssgggssgssfo.",
      ".ofsgggggggggfo.",
      ".ofggggggggggfo.",
      ".offffffffffffo.",
      ".oooooooooooooo.",
      "................",
      "................",
      "................",
    ],
    { o: O, f: "#8a6a3d", s: "#8fd6ff", y: "#fcdc5f", g: "#4a8a33" },
  ],
  map: [
    [
      "................",
      ".oooooooooooooo.",
      ".ompppppppppppo.",
      ".opppgggppppppo.",
      ".oppgggggpwwwpo.",
      ".oppggggppwwwpo.",
      ".opppggppppwwpo.",
      ".opppppprpppppo.",
      ".oppppprrrppppo.",
      ".opwwppprppggpo.",
      ".opwwwpppppggpo.",
      ".oppwwppppppppo.",
      ".opppppppppppmo.",
      ".oooooooooooooo.",
      "................",
      "................",
    ],
    { o: O, p: "#e9dcb0", m: "#b49a5c", g: "#7cbd4b", w: "#8fd6ff", r: "#e0383e" },
  ],
};
for (const [name, [rows, pal]] of Object.entries(items)) art[`item_${name}`] = sprite(rows, pal);

/* ------------------------------------------------------ figure helpers */
/** Blank W×H char grid plus a filled-rectangle painter. */
function canvas(W, H) {
  const g = Array.from({ length: H }, () => Array(W).fill("."));
  const rect = (x0, y0, x1, y1, c) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) g[y][x] = c;
  };
  return { g, rect };
}
/** Pads the grid by 1px and draws an "o" outline around everything filled. */
function outlined(g) {
  const W = g[0].length;
  const P = [Array(W + 2).fill("."), ...g.map((row) => [".", ...row, "."]), Array(W + 2).fill(".")];
  const filled = (x, y) => P[y]?.[x] !== undefined && P[y][x] !== ".";
  return P.map((row, y) =>
    row.map((c, x) => (c === "." && (filled(x - 1, y) || filled(x + 1, y) || filled(x, y - 1) || filled(x, y + 1)) ? "o" : c)).join(""),
  );
}

/* --------------------------------------------------------------- mascot */
// Blocky tailor (violet beret, terracotta jacket, measuring tape) for the
// "Join now" walk-on. Poses: "a"/"b" walking frames, "hold" arms raised.
function tailor(pose) {
  const { g, rect } = canvas(16, 26);
  rect(4, 0, 11, 1, "v"); // beret
  rect(3, 2, 12, 2, "V");
  rect(4, 3, 11, 9, "s"); // head
  rect(4, 3, 11, 4, "h");
  g[5][4] = g[5][11] = "h";
  g[6][5] = "w"; g[6][6] = "k"; g[6][9] = "k"; g[6][10] = "w";
  rect(7, 8, 8, 8, "m");
  rect(4, 10, 11, 18, "j"); // jacket
  rect(6, 10, 9, 18, "t"); // shirt
  for (let y = 10; y <= 16; y++) g[y][5] = g[y][10] = y % 2 ? "y" : "Y"; // tape
  if (pose === "hold") {
    rect(1, 2, 3, 11, "j");
    rect(12, 2, 14, 11, "j");
    rect(1, 0, 3, 1, "s");
    rect(12, 0, 14, 1, "s");
  } else {
    const [l, r] = pose === "a" ? [17, 15] : [15, 17]; // swinging arms
    rect(1, 10, 3, l - 1, "j");
    rect(1, l, 3, l + 1, "s");
    rect(12, 10, 14, r - 1, "j");
    rect(12, r, 14, r + 1, "s");
  }
  rect(4, 19, 11, 19, "p"); // hips and legs
  const leg = (x0, raised) => {
    rect(x0, 20, x0 + 3, raised ? 22 : 24, "p");
    rect(x0, raised ? 23 : 25, x0 + 3, raised ? 23 : 25, "z");
  };
  leg(4, pose === "b");
  leg(8, pose === "a");
  return sprite(outlined(g), {
    o: O, v: "#7a4cff", V: "#4a16d9", s: "#e0ac7e", h: "#4a2f1c", w: "#ffffff", k: "#1b1b1b",
    m: "#a0522d", j: "#b5583a", t: "#f3eee3", y: "#fcdc5f", Y: "#2b2b2b", p: "#2f3a4f", z: "#1b1b1b",
  });
}
art.tailor_walk = tailor("a").map((row, y) => [...row, ...tailor("b")[y]]); // 2-frame sheet
art.tailor_hold = tailor("hold");


/* ------------------------------------------------- tracks: unicorn rider */
// Rider on a unicorn, side view facing right, two gallop frames.
function unicorn(frame) {
  const { g, rect } = canvas(40, 29); // hooves end on the last row
  const Y = 6; // unicorn sits below the rider's head
  rect(8, Y + 8, 30, Y + 15, "w"); // body
  rect(9, Y + 15, 29, Y + 15, "W");
  rect(27, Y + 2, 32, Y + 9, "w"); // neck, head, muzzle
  rect(31, Y - 1, 37, Y + 4, "w");
  rect(35, Y + 2, 39, Y + 5, "w");
  g[Y + 4][38] = "k";
  g[Y + 1][34] = "k";
  g[Y - 2][33] = g[Y - 3][33] = "w"; // ear
  [[35, Y - 2], [36, Y - 3], [36, Y - 4], [37, Y - 5], [37, Y - 6]].forEach(([x, y]) => (g[y][x] = "y")); // horn
  for (let y = Y; y <= Y + 8; y++) rect(25, y, 27, y, y % 2 ? "v" : "q"); // mane
  rect(29, Y - 2, 32, Y - 1, "v");
  rect(3, Y + 8, 8, Y + 10, "v"); // tail
  rect(1, Y + 11, 5, Y + 14, "q");
  rect(2, Y + 15, 4, Y + 17, "v");
  const leg = (x, forward) => {
    rect(x, Y + 16, x + 2, Y + 20, "w");
    rect(forward ? x + 1 : x - 1, Y + 21, forward ? x + 3 : x + 1, Y + 22, "h");
  };
  const out = frame === "a";
  leg(out ? 28 : 25, out);
  leg(out ? 23 : 26, !out);
  leg(out ? 8 : 11, !out);
  leg(out ? 13 : 10, out);
  rect(14, Y + 7, 22, Y + 8, "r"); // saddle blanket with gold trim
  rect(14, Y + 9, 22, Y + 9, "y");
  rect(15, 0, 21, 5, "s"); // rider: head, beret, jacket, rein arm, leg
  rect(14, 0, 22, 0, "V");
  rect(15, 1, 21, 1, "V");
  g[3][20] = "k";
  rect(15, 6, 21, Y + 6, "j");
  rect(21, Y + 1, 26, Y + 2, "j");
  rect(26, Y + 1, 27, Y + 2, "s");
  rect(17, Y + 8, 19, Y + 13, "p");
  rect(17, Y + 14, 20, Y + 15, "z");
  return sprite(outlined(g), {
    o: O, w: "#ffffff", W: "#e3dcf5", k: "#1b1b1b", y: "#fcdc5f", v: "#7a4cff", q: "#ff8fd8", h: "#ff8fd8",
    r: "#5f25ff", s: "#e0ac7e", V: "#7a4cff", j: "#b5583a", p: "#2f3a4f", z: "#1b1b1b",
  });
}
art.unicorn = unicorn("a").map((row, y) => [...row, ...unicorn("b")[y]]); // 2-frame sheet

/* -------------------------------------------- timeline, prizes, venue */
// Hanging lantern: iron cage, glowing core.
art.lantern = (() => {
  const { g, rect } = canvas(10, 14);
  rect(4, 0, 5, 1, "k"); // hook
  rect(2, 2, 7, 2, "k"); // cap
  rect(1, 3, 8, 3, "m");
  rect(1, 4, 8, 11, "k"); // cage
  rect(2, 4, 7, 11, "f"); // flame glass
  rect(3, 6, 6, 9, "y");
  rect(4, 7, 5, 8, "w");
  g[4][4] = g[4][5] = g[11][4] = g[11][5] = "k"; // bars
  rect(1, 12, 8, 13, "m"); // base
  rect(2, 13, 7, 13, "k");
  return sprite(outlined(g), { o: O, k: "#3a3a44", m: "#6b6b78", f: "#ff9f1c", y: "#ffd25a", w: "#fff6c8" });
})();

// Floating sky island: grass top, dirt, stone tapering to a point, vines.
art.island = (() => {
  const W = 50, H = 24;
  const { g } = canvas(W, H);
  const rand = rng(211);
  for (let y = 0; y < H; y++) {
    const inset = y < 6 ? 0 : Math.round((y - 5) * 1.35 + rand() * 1.5);
    for (let x = inset; x < W - inset; x++) {
      const r = rand();
      g[y][x] = y < 2 ? (r < 0.25 ? "G" : "g") : y < 3 ? (r < 0.5 ? "g" : "d") : y < 7 ? (r < 0.2 ? "D" : "d") : r < 0.22 ? "S" : r < 0.3 ? "d" : "s";
    }
  }
  for (const [x, len] of [[3, 5], [9, 8], [41, 6], [46, 4]]) for (let y = 3; y < 3 + len && y < H; y++) if (g[y][x] === "." || y > 5) g[y][x] = "v";
  return sprite(outlined(g), { o: O, g: "#5aa83a", G: "#7cc84e", d: "#8a5a32", D: "#6b4423", s: "#6e6e78", S: "#55555f", v: "#3f7a2a" });
})();

// Waypoint pin over the venue map.
art.pin = (() => {
  const { g, rect } = canvas(10, 14);
  rect(2, 0, 7, 0, "r");
  rect(1, 1, 8, 6, "r");
  rect(2, 7, 7, 7, "r");
  rect(3, 8, 6, 9, "r");
  rect(4, 10, 5, 12, "r");
  rect(2, 1, 3, 2, "h");
  rect(4, 3, 5, 4, "w");
  rect(3, 4, 6, 4, "w");
  rect(4, 5, 5, 5, "w");
  return sprite(outlined(g), { o: O, r: "#e0383e", h: "#ff7a7f", w: "#ffffff" });
})();

// Hotbar items for "pack your inventory".
function item(draw, pal) {
  const { g, rect } = canvas(14, 14);
  draw(g, rect);
  return sprite(outlined(g), { o: O, ...pal });
}
art.item_laptop = item((g, rect) => {
  rect(1, 1, 12, 8, "k");
  rect(2, 2, 11, 7, "b");
  rect(3, 3, 6, 3, "l");
  rect(3, 5, 9, 5, "l");
  rect(0, 9, 13, 11, "m");
  for (const x of [2, 4, 6, 8, 10]) g[10][x] = "k";
  rect(5, 11, 8, 11, "h");
}, { k: "#2b2b33", b: "#5f25ff", l: "#b9a9ff", m: "#a3a3ad", h: "#d0d0d8" });
art.item_plug = item((g, rect) => {
  rect(4, 0, 4, 3, "m");
  rect(9, 0, 9, 3, "m");
  rect(2, 4, 11, 9, "w");
  rect(2, 4, 11, 4, "h");
  rect(10, 5, 11, 9, "s");
  rect(6, 10, 7, 13, "k");
}, { m: "#c9c9d1", w: "#f3f3f3", h: "#ffffff", s: "#c4c4cc", k: "#2b2b33" });
art.item_socket = item((g, rect) => {
  rect(0, 4, 13, 9, "w");
  rect(0, 9, 13, 9, "s");
  for (const x of [1, 5, 9]) {
    rect(x + 1, 5, x + 2, 7, "k");
  }
  g[6][12] = "r";
  rect(13, 10, 13, 13, "k");
}, { w: "#f3f3f3", s: "#c4c4cc", k: "#2b2b33", r: "#e0383e" });
art.item_soap = item((g, rect) => {
  rect(1, 6, 12, 12, "p");
  rect(1, 6, 12, 7, "h");
  rect(11, 8, 12, 12, "d");
  rect(3, 1, 4, 2, "w");
  rect(7, 0, 8, 1, "w");
  rect(10, 2, 11, 3, "w");
}, { p: "#ff8fd8", h: "#ffc2ec", d: "#d65fb0", w: "#d8f6ff" });

// Redstone lamp, off and on: noisy glass split by a dark frame cross.
function lamp(colors, frame, seed) {
  return noise(colors, seed).map((row, y) => row.map((c, x) => (x % 15 === 0 || y % 15 === 0 || x === 7 || y === 7 ? frame : c)));
}
art.lamp_off = lamp(["#5a3a20", "#4a2e18", "#6b4526", "#3b2414"], "#2a170b", 301);
art.lamp_on = lamp(["#f7c25a", "#ffe08a", "#e9a43a", "#fff2c2"], "#8a5a1f", 302);

// Mentor villager: bald head, unibrow, long nose, violet robe, arms folded.
art.villager = (() => {
  const { g, rect } = canvas(14, 22);
  rect(2, 0, 11, 9, "s"); // head
  rect(2, 0, 11, 1, "h");
  rect(3, 3, 10, 3, "b"); // unibrow
  rect(4, 4, 4, 4, "w");
  rect(5, 4, 5, 4, "e");
  rect(8, 4, 8, 4, "e");
  rect(9, 4, 9, 4, "w");
  rect(6, 4, 7, 8, "n"); // nose
  rect(6, 8, 7, 8, "N");
  rect(1, 10, 12, 21, "r"); // robe
  rect(1, 10, 12, 10, "R");
  rect(6, 11, 7, 21, "R");
  rect(1, 13, 12, 15, "a"); // folded arms
  rect(5, 13, 8, 15, "s");
  return sprite(outlined(g), {
    o: O, s: "#c49373", h: "#a87858", b: "#4a3424", w: "#ffffff", e: "#2f8a3a", n: "#b07a5c", N: "#8f5e44",
    r: "#5f25ff", R: "#4a16d9", a: "#7a4cff",
  });
})();

/* ------------------------------------------------------------------ cursors */
const curPal = { o: "#101010", w: "#ffffff" };
art.cursor = scale(
  sprite(
    [
      "o..........",
      "oo.........",
      "owo........",
      "owwo.......",
      "owwwo......",
      "owwwwo.....",
      "owwwwwo....",
      "owwwwwwo...",
      "owwwwwwwo..",
      "owwwwwwwwo.",
      "owwwwwooooo",
      "owwowwo....",
      "owo.owwo...",
      "oo..owwo...",
      "o....owwo..",
      ".....owwo..",
      "......oo...",
    ],
    curPal,
  ),
  2,
);
art.cursor_hand = scale(
  sprite(
    [
      "....oo.......",
      "...owwo......",
      "...owwo......",
      "...owwo......",
      "...owwoooo...",
      "...owwowwooo.",
      ".oooowwowwowo",
      "owwowwwwwwwwo",
      "owwwwwwwwwwwo",
      ".owwwwwwwwwwo",
      ".owwwwwwwwwwo",
      "..owwwwwwwwo.",
      "..owwwwwwwwo.",
      "...owwwwwwo..",
      "...oooooooo..",
    ],
    curPal,
  ),
  2,
);

/* -------------------------------------------------------------------- write */
// Only when run directly, so the art can be imported without writing files.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const out = new URL("../public/mc/", import.meta.url);
  mkdirSync(out, { recursive: true });
  for (const [name, grid] of Object.entries(art)) {
    const buf = encode(grid);
    assert.equal(buf.readUInt32BE(16), grid[0].length);
    writeFileSync(new URL(`${name}.png`, out), buf);
  }
  console.log(`wrote ${Object.keys(art).length} images to public/mc/`);

  // Optional contact sheet for eyeballing the art: every image at 6x on grey.
  const previewAt = process.argv.indexOf("--preview");
  if (previewAt !== -1) {
    const S = 6;
    const cell = 34 * S;
    const names = Object.keys(art);
    const cols = 8;
    const sheet = Array.from({ length: Math.ceil(names.length / cols) * cell }, (_, y) =>
      Array.from({ length: cols * cell }, (_, x) => ((x >> 4) + (y >> 4)) % 2 ? "#6a6a6a" : "#5a5a5a"),
    );
    names.forEach((name, i) => {
      const g = scale(art[name], art[name].length > 20 ? Math.max(1, Math.floor(S / 2)) : S);
      const ox = (i % cols) * cell + 4;
      const oy = Math.floor(i / cols) * cell + 4;
      g.forEach((row, y) => row.forEach((c, x) => {
        if (c && oy + y < sheet.length && ox + x < sheet[0].length) sheet[oy + y][ox + x] = c;
      }));
    });
    writeFileSync(process.argv[previewAt + 1], encode(sheet));
    console.log(names.map((n, i) => `${i}:${n}`).join(" "));
  }
}
