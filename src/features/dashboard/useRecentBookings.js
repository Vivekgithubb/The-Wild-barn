import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

function useRecentBookings() {
  const [searchParams] = useSearchParams();
  const numsDays = !searchParams.get("last")
    ? 120
    : Number(searchParams.get("last"));

  const queryDate = subDays(new Date(), numsDays).toISOString();

  const { isLoading, data: booking } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["booking", `last-${numsDays}`],
  });
  console.log("👣 useRecentBookings CALLED");

  return { isLoading, booking, numsDays };
}

export default useRecentBookings;
