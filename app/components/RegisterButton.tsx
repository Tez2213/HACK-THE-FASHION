import type { ReactNode } from "react";
import { REGISTER_URL, registrationOpen } from "../lib/event";

/** Primary CTA. Opens Unstop in a new tab once the URL is configured. */
export function RegisterButton({
  className = "",
  variant = "primary",
  children = "Register now",
}: {
  className?: string;
  variant?: "primary" | "secondary";
  children?: ReactNode;
}) {
  return (
    <a
      href={REGISTER_URL}
      className={`btn btn-${variant} ${className}`}
      {...(registrationOpen ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {registrationOpen && <span className="sr-only"> on Unstop (opens in a new tab)</span>}
    </a>
  );
}
