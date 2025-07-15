import { Page_size } from "../utils/constants";
import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("booking")
    .select(
      "id,created_at,startDate,endDate,numGuests,numNights,status,totalPrice,cabins(name),guests(fullName,email)",
      { count: "exact" }
    );

  //filter
  if (filter) query = query.eq(filter.field, filter.value);
  //  query = query[filter.method || "eq"](filter.field, filter.value);

  //sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  if (page) {
    const from = (page - 1) * Page_size;
    const to = from + (Page_size - 1);
    query = query.range(from, to);
  }
  const { data, error, count } = await query;

  if (error) {
    console.log(error);
    throw new Error("Booking could not be loaded ");
  }

  console.log("Fetched bookings:", data);
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("booking")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("booking")
    .select("created_at, totalPrice, extraPrice,numNights")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("booking")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  console.log("🔥 getStaysAfterDate CALLED");

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const today = getToday(); // e.g., "2025-07-12"
  const tomorrow = getToday({ end: true }); // e.g., "2025-07-13T00:00:00"

  const { data, error } = await supabase
    .from("booking")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.gte.${today},startDate.lt.${tomorrow}),and(status.eq.checked-in,endDate.gte.${today},endDate.lt.${tomorrow})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  console.log("activitydata=", data);
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("booking")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("booking").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}

//this is for new bookings , api calls
export async function getGuests() {
  let { data, error } = await supabase.from("guests").select("*");
  if (error) {
    console.error(error);
    throw new Error("Could not get the guests");
  }
  return data;
}

export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from("booking")
    .insert([{ ...newBooking }])
    .select();
  if (error) {
    console.error(error);
    throw new Error("Could not add Booking");
  }
  return data;
}
