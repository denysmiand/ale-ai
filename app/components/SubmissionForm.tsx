"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "../validation/formSchema";
import FormField from "./FormField";
import FormLevelSelect from "./FormLevelSelect";
import { FormData } from "../types";
import { useMutation } from "@tanstack/react-query";
import sendFormData from "../api/sendFormData";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SubmissionForm = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const { mutate: submitForm, isPending: isSubmitting } = useMutation({
    mutationFn: sendFormData,
    onSuccess: (data) => {
      sessionStorage.setItem("formData", JSON.stringify(data.data));
      router.push("/thank-you");
    },
    onError: (error: { message: string }) => {
      setFormError(error.message);
    },
  });

  const onSubmit = (data: FormData) => {
    submitForm(data);
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
        name="assignment_description"
        register={register}
        error={errors.assignment_description}
        multiline
      />
      <FormField
        type="text"
        placeholder="Github"
        name="github_repo_url"
        register={register}
        error={errors.github_repo_url}
      />

      <FormLevelSelect register={register} error={errors.candidate_level} />
      {formError && <p className="error-message">{formError}</p>}
      <button
        type="submit"
        className="rounded border px-4 py-1 [&:disabled]:opacity-50 shadow-sm hover:shadow-md transition-shadow duration-300"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
};

export default SubmissionForm;
