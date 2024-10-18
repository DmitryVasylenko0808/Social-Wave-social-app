import { Logo } from ".";
import { Container } from "../ui";

const Header = () => {
  return (
    <header className="h-header border border-secondary-50 dark:border-dark-200">
      <Container className="h-full flex items-center">
        <Logo />
      </Container>
    </header>
  );
};

export default Header;
