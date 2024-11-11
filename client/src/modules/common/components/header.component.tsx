import { Logo } from ".";
import { Container } from "../ui";
import BurgerMenu from "./burger.menu";

const Header = () => {
  return (
    <header className="h-header border border-secondary-50 dark:border-dark-200">
      <Container className="h-full flex justify-between items-center min-[300px]:px-5">
        <Logo />
        <BurgerMenu />
      </Container>
    </header>
  );
};

export default Header;
