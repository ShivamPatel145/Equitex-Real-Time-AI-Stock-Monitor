import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems";
import UserDropdown from "@/components/UserDropdown";

type HeaderProps = {
  user: User;
};

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full h-[70px] border-b border-gray-700/50 bg-[#050505]/80 backdrop-blur-md shadow-sm">
      <div className="container h-full flex justify-between items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/icons/equitex-logo.svg"
            alt="Equitex Logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
            priority
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems />
        </nav>
        <div className="ml-auto sm:ml-0 flex items-center justify-end">
          <UserDropdown user={user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
