import type { ReactNode } from "react";
import styles from "./Header.module.css";

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <header className={styles.header}>{children}</header>
    </div>
  );
};

Header.Logo = ({
  href,
  src,
  alt,
}: {
  href?: string;
  src: string;
  alt?: string;
}) => (
  <a href={href || "/"}>
    <img src={src} alt={alt || "Logo"} style={{ height: 30 }} />
  </a>
);

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

Header.Link = ({ href, children, className }: LinkProps) => (
  <a href={href} className={className}>
    {children}
  </a>
);
