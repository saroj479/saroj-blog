/* eslint-disable tailwindcss/no-custom-classname */
import { Container } from "./Container";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <header className="bg-accent2-60">
      <Container>
        <Logo />
      </Container>
    </header>
  );
};
