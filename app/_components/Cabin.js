import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className='grid grid-cols-1 md:grid-cols-[3fr_4fr] gap-10 md:gap-20 border border-primary-800 py-3 px-5 md:px-10 mb-24'>
      <div className='relative scale-[1] md:scale-[1.15] md:-translate-x-3 h-64 md:h-auto'>
        <Image
          className='object-cover'
          quality={100}
          fill
          src={image}
          alt={`Cabin ${name}`}
          layout='fill'
        />
      </div>

      <div>
        <h3 className='text-accent-100 font-black text-4xl md:text-7xl mb-5 md:translate-x-[-254px] translate-x-0 bg-primary-950 p-3 md:p-6 pb-1 w-full md:w-[150%]'>
          Cabin {name}
        </h3>

        <p className='text-md md:text-lg text-primary-300 mb-10'>
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className='flex flex-col gap-2 md:gap-4 mb-7'>
          <li className='flex gap-2 md:gap-3 items-center'>
            <UsersIcon className='h-5 w-5 text-primary-600' />
            <span className='text-md md:text-lg'>
              For up to <span className='font-bold'>{maxCapacity}</span> guests
            </span>
          </li>
          <li className='flex gap-2 md:gap-3 items-center'>
            <MapPinIcon className='h-5 w-5 text-primary-600' />
            <span className='text-md md:text-lg'>
              Located in the heart of the{" "}
              <span className='font-bold'>Dolomites</span> (Italy)
            </span>
          </li>
          <li className='flex gap-2 md:gap-3 items-center'>
            <EyeSlashIcon className='h-5 w-5 text-primary-600' />
            <span className='text-md md:text-lg'>
              Privacy <span className='font-bold'>100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
