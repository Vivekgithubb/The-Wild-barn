import { useQuery } from "@tanstack/react-query";

import { getGuests } from "../../services/apiBookings";

function useGuests() {
  const { isLoading, data: guests } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
    retry: false,
  });

  return { isLoading, guests };
}

export default useGuests;
