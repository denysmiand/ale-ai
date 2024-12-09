import { FormData } from "../types";

const sendFormData = async (formData: FormData) => {
  const response = await fetch("/api/tools/candidates/assignments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    return new Error("Failed to submit form data.");
  }

  return response.json();
};

export default sendFormData;
