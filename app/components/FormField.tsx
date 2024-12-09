import { FC } from "react";
import { FormData, ValidFieldNames } from "../types";
import { FieldError, UseFormRegister } from "react-hook-form";

type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error?: FieldError;
  multiline?: boolean;
};

const FormField: FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  multiline,
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={name}>{placeholder}</label>
    {multiline ? (
      <textarea
        placeholder={placeholder}
        {...register(name)}
        className="min-h-24 bg-background border border-foreground rounded py-2 px-4"
        id={name}
      />
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className="bg-background border border-foreground rounded py-2 px-4"
        id={name}
      />
    )}
    {error && <span className="error-message">{error.message}</span>}
  </div>
);
export default FormField;
