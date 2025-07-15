import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins";

function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });

  return { isLoading, cabins, error };
}

export default useCabins;
