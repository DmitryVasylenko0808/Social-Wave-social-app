import { Logo } from ".";
import { Container } from "../ui";

const Header = () => {
  return (
    <header className="h-header border border-secondary-50 dark:border-dark-200">
      <Container className="h-full flex justify-between items-center min-[300px]:px-5">
        <Logo />
      </Container>
    </header>
  );
};

export default Header;
