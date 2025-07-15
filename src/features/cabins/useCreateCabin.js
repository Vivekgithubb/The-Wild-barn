import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import newEditCabin from "../../services/apiCabins";
// import { useForm } from "react-hook-form";

function useCreateCabin() {
  const queryClient = useQueryClient();
  // const { reset } = useForm();
  const { mutate: createCabin, isLoading: isAdding } = useMutation({
    mutationFn: newEditCabin,
    onSuccess: () => {
      toast.success("New Cabin created Succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createCabin, isAdding };
}

export default useCreateCabin;
