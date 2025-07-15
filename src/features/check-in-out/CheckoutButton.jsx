import Button from "../../ui/Button";
import { useCheckout } from "../check-in-out/useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, ischeckedout } = useCheckout();
  return (
    <Button
      variation="primary"
      sizes="small"
      onClick={() => checkout(bookingId)}
      disabled={ischeckedout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
