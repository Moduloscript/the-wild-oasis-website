import Link from "next/link";
import { auth } from "../_lib/auth";
import { Separator } from "./ui/separator";

async function LinksNavigatorMobile() {
  const session = await auth();

  return (
    <nav className='z-10 text-xl bg-primary-950 '>
      <ul className='flex flex-col items-center gap-16 mt-24'>
        <li>
          <Link
            href='/cabins'
            className='transition-colors hover:text-accent-400'>
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href='/about'
            className='transition-colors hover:text-accent-400'>
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href='/account'
              className='transition-colors hover:text-accent-400 flex items-center gap-4'>
              <img
                className='h-8 rounded-full'
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy='no-referrer'
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href='/account'
              className='transition-colors hover:text-accent-400'>
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default LinksNavigatorMobile;