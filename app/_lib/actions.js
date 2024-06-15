"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut, auth } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  // authentication part 🔒
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  // authentication part 🔒
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Server side
  const guestBookings = await getBookings(session.user.guestId);
  const guestsBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestsBookingIds.includes(bookingId))
    throw new Error("You can only delete your own bookings");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Guest could not be deleted");

  revalidatePath("/account/profile");
}
export async function updateBooking(formData) {
  const bookingId = Number(formData.get("reservationId"));


  // authentication part 🔒
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Authorization 
  const guestBookings = await getBookings(session.user.guestId);
  const guestsBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestsBookingIds.includes(bookingId))
    throw new Error("You can only delete your own bookings");


  // Building update Data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };


  // Here is the Mutation Proper 🪄🔮
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // Error Handling
  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  // Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`)
  revalidatePath("/account/reservations")

  // Redirecting 🚸🚦
  redirect("/account/reservations");

}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
