"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../validation/formSchema";
import FormField from "./FormField";
import FormLevelSelect from "./FormLevelSelect";
import { FormData } from "../types";

const SubmissionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("SUCCESS", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full md:w-1/2 max-w-[32rem]"
    >
      <FormField
        type="name"
        placeholder="Name"
        name="name"
        register={register}
        error={errors.name}
      />
      <FormField
        type="email"
        placeholder="Email"
        name="email"
        register={register}
        error={errors.email}
      />
      <FormField
        type="text"
        placeholder="Assignment"
        name="assignment"
        register={register}
        error={errors.assignment}
        multiline
      />
      <FormField
        type="text"
        placeholder="Github"
        name="github"
        register={register}
        error={errors.github}
      />

      <FormLevelSelect register={register} error={errors.level} />
      <button type="submit" className="border border-foreground rounded py-1">
        Submit
      </button>
    </form>
  );
};

export default SubmissionForm;
