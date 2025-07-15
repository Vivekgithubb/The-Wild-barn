import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckedout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success("Booking checked Out successfully for " + data.id);
      queryClient.invalidateQueries({
        activate: true,
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { checkout, isCheckedout };
}
