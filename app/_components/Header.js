import MainNavigation from "@/app/_components/MainNavigation";
import Logo from "@/app/_components/Logo";
import MobileNav from "./MobileNav";

function Header() {
  return (
    <header className='border-b z-10 border-primary-800 px-8 py-5'>
      <div className='flex justify-between items-center max-w-7xl mx-auto'>
        <Logo />

        <div className='md:hidden '>
          <MobileNav />
        </div>
        <div className='hidden md:block '>
          <MainNavigation />
        </div>
      </div>
    </header>
  );
}

export default Header;
