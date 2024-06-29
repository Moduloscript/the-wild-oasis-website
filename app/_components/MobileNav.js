import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "./ui/sheet";
import LinksNavigatorMobile from "./LinksNavigatorMobile";
import Logo from "./Logo";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu />
      </SheetTrigger>

      <SheetContent className='space-y-3 bg-primary-950 border-l-primary-500'>
        <Logo />

        <SheetDescription>
          <LinksNavigatorMobile />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
