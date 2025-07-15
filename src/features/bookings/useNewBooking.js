import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createBooking as createBookingApi } from "../../services/apiBookings";
// import { useForm } from "react-hook-form";

function useCreateBooking() {
  const queryClient = useQueryClient();
  // const { reset } = useForm();
  const { mutate: createBooking, isLoading: isAdding } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("New Booking created Succesfully");
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      queryClient.invalidateQueries({
        queryKey: ["today-activity"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createBooking, isAdding };
}

export default useCreateBooking;
