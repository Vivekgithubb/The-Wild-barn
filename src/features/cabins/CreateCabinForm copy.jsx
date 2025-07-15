import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm, useFormState } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newCabin from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow2 from "../../ui/FormRow2";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues } = useForm();
  const { errors } = useFormState;
  const queryClient = useQueryClient();
  const { mutate, isLoading: isAdding } = useMutation({
    mutationFn: newCabin,
    onSuccess: () => {
      toast.success("New Cabin created Succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
  }
  function onError(errors) {
    // const { value } = errors;
    // toast.error(errors.value.message);
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow2 label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This is required" })}
          disabled={isAdding}
        />
      </FormRow2>

      <FormRow2 label="Maximum Occupany" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This is required",
            min: {
              value: 1,
              message: "Max Capacity is atleast 1",
            },
          })}
          disabled={isAdding}
        />
      </FormRow2>

      <FormRow2 label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This is required",
            min: {
              value: 2500,
              message: "Minimum Cost is 2500",
            },
          })}
          disabled={isAdding}
        />
      </FormRow2>

      <FormRow2 label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This is required",
            min: {
              value: 1,
              message: "Minimum Discount is 1",
            },
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              "Discount should be less than room cost",
          })}
          disabled={isAdding}
        />
      </FormRow2>

      <FormRow2 label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow2>

      <FormRow2
        label="Cabin Image"
        error={errors?.image?.message}
        disabled={isAdding}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: "This field  is required",
          })}
        />
      </FormRow2>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isAdding}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
