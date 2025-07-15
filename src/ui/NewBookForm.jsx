import { useState } from "react";
import Checkbox from "./Checkbox";
import Form from "./Form";
import FormRow2 from "./FormRow2";
import Input from "./Input";
import Textarea from "./Textarea";
import Button from "./Button";

import useCabins from "../features/cabins/useCabins";
import Spinner from "./Spinner";
// import styled from "styled-components";
import ImagePicker from "./ImagePicker";
import { useForm, Controller } from "react-hook-form";
import { differenceInDays, isBefore, isDate, startOfToday } from "date-fns";

import useSettings from "../features/settings/useSettings";
import useGuests from "../features/bookings/useGuests";
import styled from "styled-components";
import useCreateBooking from "../features/bookings/useNewBooking";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StyledSelect = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

function NewBookForm() {
  const navigate = useNavigate();
  const [breakfast, setbreakfast] = useState(false);
  const [paid, setPaid] = useState(false);
  const { cabins, isLoading: isCabining } = useCabins();
  const { settings } = useSettings();
  const { guests, isLoading: isGuesting } = useGuests();
  const { createBooking, isAdding } = useCreateBooking();
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    getValues,
  } = useForm();

  if (!cabins) return <Spinner />;
  if (!settings) return <Spinner />;
  if (!guests) return <Spinner />;
  const sortedCabins = [...cabins].sort((a, b) => a.id - b.id);
  console.log("cabins=", cabins, cabins.id, isCabining);
  console.log("GUests=", guests, isGuesting);
  console.log(createBooking, isAdding);
  function onSubmit(data) {
    console.log(data);
    console.log("data.selectedCabinId =", data.selectedCabin);

    const numNights = differenceInDays(
      new Date(data.endDate),
      new Date(data.startDate)
    );

    const today = startOfToday();
    //date filtering
    if (isBefore(new Date(data.startDate), today)) {
      toast.error("Start Date cant be before Today..");
    }
    if (numNights < 1) {
      toast.error("End date cant be before Start Date");
    }
    if (numNights > settings.maxBookingLength) {
      toast.error(
        `Cannot Book for more than ${settings.maxBookingLength} days`
      );
    }
    if (numNights < settings.minBookingLength) {
      toast.error(
        `Cannot Book for less than ${settings.minBookingLength} days`
      );
    }
    //selecting cabin (use find instead of filter if u want entire cabin data)
    const resCabin = cabins.find(
      (cabin) => cabin.id === Number(data.selectedCabin)
    );
    const CapacityCabin = cabins.filter(
      (cabin) => cabin.id === Number(data.selectedCabin)
    );

    if (data.numGuests > CapacityCabin[0].maxCapacity) {
      toast.error(
        "Cant book Cabin cause Guests are more than the max Capcity for the cabin"
      );
    }

    //cabina dn total calculation
    const finalCabin = data.selectedCabin;
    const singleCabinPrice = resCabin.regularPrice;
    const cabinPrice = singleCabinPrice * numNights;
    const breakfastTotal = breakfast
      ? settings.breakFastPrice * data.numGuests * numNights
      : 0;

    const TotalPrice = cabinPrice + breakfastTotal;
    const finalData = {
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      numNights,
      numGuests: Number(data.numGuests),
      cabinPrice: singleCabinPrice,
      extraPrice: breakfastTotal,
      totalPrice: TotalPrice,
      status: "unconfirmed",
      hasBreakfast: breakfast,
      isPaid: paid,
      observations: data.comments,
      cabinId: Number(data.selectedCabin),
      guestId: Number(data.guestId),
    };
    console.log(finalData);
    console.log(finalCabin);
    createBooking(finalData, {
      onSuccess: (data) => {
        const newBookingId = data[0].id;
        navigate(`/bookings/${newBookingId}`);
      },
    });
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow2 label="Start-date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="start-date "
          {...register("startDate", {
            required: "This field is required",
            validate: isDate(getValues().startDate) || "Choose a valid date",
          })}
        />
      </FormRow2>

      <FormRow2 label="End-date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="end-date "
          {...register("endDate", {
            required: "This field is required",
            validate: isDate(getValues().endDate) || "Choose a valid date",
          })}
        />
      </FormRow2>

      <FormRow2 label="No Of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          min={1}
          defaultValue={1}
          {...register("numGuests", {
            required: "Select Number of guests",
            min: { value: 1, message: "Minimum guests is 1" },
            max: {
              value: settings.maxGuestsPerBooking,
              message: `max guests is ${settings.maxGuestsPerBooking}`,
            },
          })}
        />
      </FormRow2>
      <FormRow2 label="Select Guest">
        <StyledSelect
          {...register("guestId", { required: "Please select a guest" })}
        >
          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullName}
            </option>
          ))}
        </StyledSelect>
      </FormRow2>

      <FormRow2 label="Select Cabin" error={errors?.selectedCabin?.message}>
        <Controller
          name="selectedCabin"
          control={control}
          rules={{ required: "Select Cabin" }}
          render={({ field }) => (
            <ImagePicker
              cabins={sortedCabins}
              selectedCabinId={field.value}
              onSelectCabin={field.onChange}
            />
          )}
        />
      </FormRow2>

      <FormRow2 label="Breakfast" error={errors?.breakfastStatus?.message}>
        <Checkbox onChange={() => setbreakfast(!breakfast)}>
          I want Breakfast
        </Checkbox>
      </FormRow2>

      <FormRow2 label="Paid" error={errors?.paidStatus?.message}>
        <Checkbox onChange={() => setPaid(!paid)}>
          The booking is already paid for
        </Checkbox>
      </FormRow2>

      <FormRow2
        label="Additional Comments or requirements "
        error={errors?.comments?.message}
      >
        <Textarea
          {...register("comments")}
          placeholder="Anything to say...?"
        ></Textarea>
      </FormRow2>

      <FormRow2>
        <Button type="cancel" variation="danger">
          Cancel
        </Button>
        <Button type="submit" variation="primary">
          Submit
        </Button>
      </FormRow2>
    </Form>
  );
}

export default NewBookForm;
