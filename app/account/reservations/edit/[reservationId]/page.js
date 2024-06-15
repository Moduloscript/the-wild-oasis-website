import { getBooking, getCabin } from "@/app/_lib/data-service";
import { updateBooking } from "../../../../_lib/actions";

export default async function Page({ params }) {
  const { reservationId } = params;

  const { numGuests, observations, cabinId } = await getBooking(reservationId);

  const { maxCapacity } = await getCabin(cabinId);

  // CHANGED
  // const reservationId = 23;
  // const maxCapacity = 23;

  return (
    <div>
      <h2 className='text-2xl font-semibold text-accent-400 mb-7'>
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateBooking}
        className='flex flex-col gap-6 px-12 py-8 text-lg bg-primary-900'>

        <input type='hidden' name='reservationId' value={reservationId} />
        
        <div className='space-y-2'>
          <label htmlFor='numGuests'>How many guests?</label>
          <select
            name='numGuests'
            id='numGuests'
            defaultValue={numGuests}
            className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
            required>
            <option value='' key=''>
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className='space-y-2'>
          <label htmlFor='observations'>
            Anything we should know about your stay?
          </label>
          <textarea
            name='observations'
            defaultValue={observations}
            className='w-full px-5 py-3 rounded-sm shadow-sm bg-primary-200 text-primary-800'
          />
        </div>

        <div className='flex items-center justify-end gap-6'>
          <button className='px-8 py-4 font-semibold transition-all bg-accent-500 text-primary-800 hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300'>
            Update reservation
          </button>
        </div>
      </form>
    </div>
  );
}
