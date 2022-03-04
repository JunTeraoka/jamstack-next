import Image from "next/image";
import Link from "next/link";
import Search from "./search";

const Header: React.VFC = () => {
  return (
    <>
      <header className="flex justify-between px-10 py-5">
        <Link href="/" prefetch={false}>
          <a>
            <Image
              src="/img/header_logo.svg"
              width="160"
              height="28"
              alt="logo"
            />
          </a>
        </Link>
        <Search />
      </header>
    </>
  );
};

export default Header;
