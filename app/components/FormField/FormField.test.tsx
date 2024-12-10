import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormField from "./FormField";
import { UseFormRegister } from "react-hook-form";
import { FormData } from "@/types";

const createMockRegister = (): UseFormRegister<FormData> => {
  return jest.fn((name: keyof FormData) => ({
    onChange: jest.fn(),
    onBlur: jest.fn(),
    name,
    ref: jest.fn(),
  })) as UseFormRegister<FormData>;
};

describe("FormField", () => {
  let mockRegister: UseFormRegister<FormData>;

  beforeEach(() => {
    mockRegister = createMockRegister();
  });

  it("renders an input field correctly", () => {
    const placeholder = "Name";
    render(
      <FormField
        type="text"
        placeholder={placeholder}
        name="name"
        register={mockRegister}
      />
    );

    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(screen.getByLabelText(placeholder)).toBeInTheDocument();
  });

  it("renders a textarea when multiline prop is true", () => {
    const placeholder = "Assignment";
    render(
      <FormField
        type="text"
        placeholder={placeholder}
        name="assignment_description"
        register={mockRegister}
        multiline={true}
      />
    );

    const textareaElement = screen.getByPlaceholderText(placeholder);
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement.tagName).toBe("TEXTAREA");
  });

  it("displays an error message when error prop is provided", () => {
    const errorMessage = "Email is required.";
    const placeholder = "Email";
    render(
      <FormField
        type="text"
        placeholder={placeholder}
        name="email"
        register={mockRegister}
        error={{ type: "required", message: errorMessage }}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("calls register function with correct name", () => {
    render(
      <FormField
        type="text"
        placeholder="Name"
        name="name"
        register={mockRegister}
      />
    );

    expect(mockRegister).toHaveBeenCalledWith("name");
  });
});
