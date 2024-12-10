import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SubmissionForm from "./SubmissionForm";
import sendFormData from "@/api/sendFormData";
import { LevelSelectProps } from "../FormLevelSelect/FormLevelSelect";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/api/sendFormData");

jest.mock("@/components/FormLevelSelect/FormLevelSelect", () => {
  const MockFormLevelSelect = ({ register, error }: LevelSelectProps) => (
    <div className="flex flex-col gap-2">
      <label htmlFor="level">Level</label>
      <select
        className="bg-background border border-foreground rounded py-2 px-4"
        id="level"
        {...register("candidate_level")}
      >
        <option value="">Select a level</option>
        <option value="Junior">Junior</option>
        <option value="Middle">Middle</option>
        <option value="Senior">Senior</option>
        <option value="Principal">Principal</option>
      </select>
      {error && <span className="error-message">{error.message}</span>}
    </div>
  );

  MockFormLevelSelect.displayName = "FormLevelSelect";

  return MockFormLevelSelect;
});

const createWrapper = () => {
  const queryClient = new QueryClient();
  const MockWrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  MockWrapper.displayName = "Wrapper";

  return MockWrapper;
};

describe("SubmissionForm", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("renders all form fields correctly", () => {
    render(<SubmissionForm />, { wrapper: createWrapper() });

    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Assignment")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Github")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("displays validation errors when inputs are not valid", async () => {
    render(<SubmissionForm />, { wrapper: createWrapper() });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText("Name is required.")).toBeInTheDocument();
      expect(screen.getByText("Email is required.")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Assignment description must be at least 10 characters."
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText("Github repository URL is required.")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Candidate level is required.")
      ).toBeInTheDocument();
    });
  });

  it("disables submit button when required fields are missing", async () => {
    render(<SubmissionForm />, { wrapper: createWrapper() });

    const submitButton = screen.getByRole("button", { name: "Submit" });
    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  it("calls API with correct data upon form submission", async () => {
    (sendFormData as jest.Mock).mockResolvedValue({ data: {} });

    render(<SubmissionForm />, { wrapper: createWrapper() });

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Denys Miand" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "miand.denys@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Assignment"), {
      target: { value: "Test description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Github"), {
      target: { value: "https://github.com/denysmiand/ale-ai" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Middle" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(sendFormData).toHaveBeenCalledWith({
        name: "Denys Miand",
        email: "miand.denys@gmail.com",
        assignment_description: "Test description",
        github_repo_url: "https://github.com/denysmiand/ale-ai",
        candidate_level: "Middle",
      });
    });

    expect(mockPush).toHaveBeenCalledWith("/thank-you");
  });

  it("displays error message when API call fails", async () => {
    const errorMessage = "API Error";
    (sendFormData as jest.Mock).mockRejectedValue(new Error(errorMessage));

    render(<SubmissionForm />, { wrapper: createWrapper() });

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Miand Denys" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "miand.denys@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Assignment"), {
      target: { value: "Test description" },
    });
    fireEvent.change(screen.getByPlaceholderText("Github"), {
      target: { value: "https://github.com/denysmiand/ale-ai" },
    });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Middle" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
