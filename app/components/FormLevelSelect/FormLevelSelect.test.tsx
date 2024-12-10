import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormLevelSelect from "./FormLevelSelect";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

const mockRegister = jest.fn();

describe("FormLevelSelect", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders dropdown options when data is successfully fetched", () => {
    const mockData = {
      levels: ["Junior", "Middle", "Senior", "Principal"],
    };

    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });

    render(<FormLevelSelect register={mockRegister} />);

    expect(screen.getByText("Select a level")).toBeInTheDocument();
    expect(screen.getByText("Junior")).toBeInTheDocument();
    expect(screen.getByText("Middle")).toBeInTheDocument();
    expect(screen.getByText("Senior")).toBeInTheDocument();
    expect(screen.getByText("Principal")).toBeInTheDocument();
  });

  it("displays loading state when data is being fetched", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<FormLevelSelect register={mockRegister} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("disables select when loading", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      data: null,
    });

    render(<FormLevelSelect register={mockRegister} />);

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("displays error message when API fails to fetch levels", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: null,
    });

    render(<FormLevelSelect register={mockRegister} />);

    expect(screen.getByText("Could not retrieve levels.")).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: { levels: ["Junior", "Middle", "Senior", "Principal"] },
    });

    const errorMessage = "Candidate level is required.";
    render(
      <FormLevelSelect
        register={mockRegister}
        error={{ message: errorMessage, type: "" }}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
