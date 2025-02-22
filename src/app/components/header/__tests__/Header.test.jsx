import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header Component test cases", () => {
  it("should render the title correctly", () => {
    render(<Header />);
    const titleElement = screen.getByText("Weather App");
    expect(titleElement).toBeInTheDocument();
  });

  it("should render the tagline correctly", () => {
    render(<Header />);
    const taglineElement = screen.getByText(
      "Choose a city to view the weather forecast",
    );
    expect(taglineElement).toBeInTheDocument();
  });

  it("should have correct class names applied", () => {
    render(<Header />);
    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass("header");
  });
});
