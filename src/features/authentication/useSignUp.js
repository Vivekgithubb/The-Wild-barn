import { useMutation } from "@tanstack/react-query";
import { SignUp as SignUpApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: SignUpApi,
    onSuccess: () => {
      toast.success(
        "User Succesfully Created! Please Verify new Account from user's Email Address"
      );
    },
  });
  return { signUp, isLoading };
}
