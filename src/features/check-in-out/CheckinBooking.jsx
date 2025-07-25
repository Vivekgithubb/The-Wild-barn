import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/useSettings";

// import { add } from "date-fns";

const Box = styled.div`
  /* Box */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const { booking, isLoading } = useBooking();
  const { isLoading: isSetting, settings } = useSettings();
  const [confirmPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { checkin, isCheckedIn } = useCheckin();

  useEffect(() => setConfirmedPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading || isSetting) return <Spinner />; // or a spinner
  const {
    id: bookingId,
    guests,
    totalPrice,
    // numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  function handleCheckin() {
    if (!confirmPaid) {
      return; // or show an error message
    }
    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extraPrice: OptionalBreakfastPrice,
          totalPrice: totalPrice + OptionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }
  const OptionalBreakfastPrice = settings?.breakFastPrice * numNights;
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setBreakfast((addBreakfast) => !addBreakfast);
              setConfirmedPaid(false);
            }}
            id={bookingId}
            // disabled={isSetting}
          >
            Want to add Breakfast for {formatCurrency(OptionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmedPaid((confirmPaid) => !confirmPaid)}
          id={bookingId}
          disabled={confirmPaid || isCheckedIn}
        >
          I confirm that {guests.fullName} have Paid the entire Amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + OptionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} +
                  ${formatCurrency(OptionalBreakfastPrice)} )`}
        </Checkbox>
        <ButtonGroup>
          <Button
            onClick={handleCheckin}
            disabled={!confirmPaid || isCheckedIn}
            isLoading={isCheckedIn}
          >
            Check in booking #{bookingId}
          </Button>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}

export default CheckinBooking;
