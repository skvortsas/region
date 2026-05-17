import { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "default" | "sm";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  href?: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const baseClasses =
  "inline-flex items-center justify-center gap-[8px] rounded-[20px] font-bold uppercase leading-none transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white [box-shadow:0_0_40px_rgba(255,40,48,0.4)] hover:[box-shadow:0_0_60px_rgba(255,40,48,0.55)]",
  secondary:
    "bg-surface-elevated text-white [box-shadow:0_0_24px_rgba(255,40,48,0.2)] hover:[box-shadow:0_0_40px_rgba(255,40,48,0.35)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "p-[36px] text-[18px] md:text-[28px]",
  sm: "px-[24px] py-[14px] text-[18px]",
};

export function Button({
  variant = "primary",
  size = "default",
  icon,
  href,
  className = "",
  children,
  onClick,
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
