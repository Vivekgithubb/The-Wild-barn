import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleteing, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking deleted Succesfully");
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDeleteing, deleteBooking };
}

export default useDeleteBooking;
