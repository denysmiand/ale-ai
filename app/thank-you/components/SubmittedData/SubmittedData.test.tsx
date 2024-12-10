import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubmittedData from "./SubmittedData";

describe("SubmittedData", () => {
  const mockFormData = {
    name: "Denys Miand",
    email: "miand.denys@gmail.com",
    assignment_description: "Test description",
    github_repo_url: "https://github.com/denysmiand/ale-ai",
    candidate_level: "Middle",
  };

  beforeEach(() => {
    const mockSessionStorage = {
      getItem: jest.fn(),
    };
    Object.defineProperty(window, "sessionStorage", {
      value: mockSessionStorage,
    });

    const originalLocation = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...originalLocation, assign: jest.fn() },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders null when sessionStorage is empty", () => {
    jest.spyOn(window.sessionStorage, "getItem").mockReturnValue(null);
    const { container } = render(<SubmittedData />);
    expect(container.firstChild).toBeNull();
  });

  it("renders submitted data when sessionStorage has data", () => {
    jest
      .spyOn(window.sessionStorage, "getItem")
      .mockReturnValue(JSON.stringify(mockFormData));
    render(<SubmittedData />);

    expect(screen.getByText("Data you have submitted:")).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "p" &&
          element.textContent === `Name: ${mockFormData.name}`
        );
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "p" &&
          element.textContent === `Email: ${mockFormData.email}`
        );
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "p" &&
          element.textContent ===
            `Assignment: ${mockFormData.assignment_description}`
        );
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === "p" &&
          element.textContent === `Level: ${mockFormData.candidate_level}`
        );
      })
    ).toBeInTheDocument();
  });

  it("renders a link for the GitHub repo URL", () => {
    jest
      .spyOn(window.sessionStorage, "getItem")
      .mockReturnValue(JSON.stringify(mockFormData));
    render(<SubmittedData />);

    const link = screen.getByRole("link", {
      name: mockFormData.github_repo_url,
    });
    expect(link).toHaveAttribute("href", mockFormData.github_repo_url);
  });
});
