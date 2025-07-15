import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import newEditCabin from "../../services/apiCabins";

function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => newEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin Edited Succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { editCabin, isEditing };
}

export default useEditCabin;
