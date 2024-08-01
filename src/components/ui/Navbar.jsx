/* eslint-disable tailwindcss/no-custom-classname */
import { ThemeToggle } from ".";
import { Container } from "./Container";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <header>
      <Container className="flex items-center justify-between">
        <Logo />
        <ThemeToggle />
      </Container>
    </header>
  );
};
