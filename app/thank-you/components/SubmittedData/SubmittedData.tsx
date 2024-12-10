"use client";
import { FormData } from "@/types";
import Link from "next/link";

const SubmittedData = () => {
  if (typeof window === "undefined") return null;
  const formData = sessionStorage.getItem("formData");

  if (!formData) return null;

  const parsedFormData: FormData = JSON.parse(formData);
  return (
    <div className="flex flex-col gap-2 items-center [&_p]:text-center">
      <p className="text-lg">
        <b>Data you have submitted:</b>
      </p>
      <p>
        <b>Name: </b>
        {parsedFormData.name}
      </p>
      <p>
        <b>Email: </b>
        {parsedFormData.email}
      </p>
      <p>
        <b>Assignment: </b>
        {parsedFormData.assignment_description}
      </p>
      <p>
        <b>Github: </b>
        <Link href={parsedFormData.github_repo_url}>
          {parsedFormData.github_repo_url}
        </Link>
      </p>
      <p>
        <b>Level: </b>
        {parsedFormData.candidate_level}
      </p>
    </div>
  );
};

export default SubmittedData;
