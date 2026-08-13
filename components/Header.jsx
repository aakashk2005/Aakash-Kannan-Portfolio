import Link from "next/link";

import Socials from "./Socials";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="absolute z-30 w-full flex items-center px-4 md:px-10 xl:px-0 xl:h-[90px]">
      <div className="container mx-auto">
        <div className="flex flex-row justify-between items-center py-4 xl:py-0">
          {/* logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* socials – hidden on very small screens, visible from sm up */}
          <div className="hidden sm:flex">
            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
