import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col border md:flex-row border-primary-800">
      <div className="relative w-full h-32 md:w-48">
        <Image
          layout="fill"
          src={image}
          alt={`Cabin ${name}`}
          className="object-cover border-b md:border-b-0 md:border-r border-primary-800"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold md:text-xl">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex items-center px-3 text-xs font-bold text-yellow-200 uppercase bg-yellow-800 rounded-sm h-7">
              past
            </span>
          ) : (
            <span className="flex items-center px-3 text-xs font-bold text-green-200 uppercase bg-green-800 rounded-sm h-7">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm md:text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-col items-baseline gap-2 mt-auto md:flex-row md:gap-5">
          <p className="text-lg font-semibold md:text-xl text-accent-400">
            ${totalPrice}
          </p>
          <p className="hidden md:block text-primary-300">&bull;</p>
          <p className="text-sm md:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="mt-2 text-xs md:mt-0 md:ml-auto md:text-sm text-primary-400">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-t md:border-t-0 md:border-l border-primary-800 w-full md:w-[100px]">
        {isPast(new Date(startDate)) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="flex items-center justify-center flex-grow gap-2 px-3 py-2 text-xs font-bold uppercase transition-colors border-b group text-primary-300 border-primary-800 md:py-0 hover:bg-accent-600 hover:text-primary-900">
              <PencilSquareIcon className="w-5 h-5 transition-colors text-primary-600 group-hover:text-primary-800" />
              <span>Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
