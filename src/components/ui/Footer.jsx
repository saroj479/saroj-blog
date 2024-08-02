import { Container, Logo, SocialButtons } from ".";

export const Footer = () => {
  return (
    <footer className="bg-accent1-5">
      <Container className="grid place-content-center py-8">
        <div className="mb-4 flex flex-col items-center">
          <Logo />
          <p className="mt-1 font-medium">The Man on a Mission</p>
        </div>
        <SocialButtons />
      </Container>
      <Container className="rounded-t-2xl py-1 text-center bg-accent1-40">
        <span className="text-sm">Copyright &copy; 2024. Saroj Bartaula.</span>
      </Container>
    </footer>
  );
};
