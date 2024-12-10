import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ThankYouPage from "./page";

describe("ThankYouPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the confirmation message", () => {
    render(<ThankYouPage />);
    expect(
      screen.getByText("Thank you for your submission!")
    ).toBeInTheDocument();
  });

  it("renders a link back to the form", () => {
    render(<ThankYouPage />);
    const link = screen.getByText("Back to Form");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
