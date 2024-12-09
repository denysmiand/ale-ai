import { useQuery } from "react-query";
import { FormData, RestLevelsResponse } from "../types";
import { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type LevelSelectProps = {
  register: UseFormRegister<FormData>;
  error?: FieldError;
};

const FormLevelSelect: FC<LevelSelectProps> = ({ register, error }) => {
  const { isLoading, data } = useQuery<RestLevelsResponse>("levelsData", () =>
    fetch("/api/tools/candidates/levels").then((res) => res.json())
  );

  if (!data && !isLoading) return <p>Could not retrieve levels.</p>;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="level">Level</label>
      <select
        disabled={isLoading}
        className="bg-background border border-foreground rounded py-2 px-4"
        id="level"
        {...register("level")}
      >
        {data ? (
          <>
            <option value="">Select a level</option>
            {data.levels.map((level) => {
              return (
                <option key={level} value={level}>
                  {level}
                </option>
              );
            })}
          </>
        ) : (
          <option>Loading...</option>
        )}
      </select>
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );
};

export default FormLevelSelect;
