import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchDropdownMenu from "../SearchDropdownMenu";

const handleSubmitMock = jest.fn();

describe("SearchDropdownMenu Component", () => {
  let location;
  let setLocation;

  beforeEach(() => {
    location = "Toronto";
    setLocation = jest.fn();
  });

  it("should renders SearchDropdownMenu component with city options", () => {
    render(
      <SearchDropdownMenu
        location={location}
        setLocation={setLocation}
        handleSubmit={handleSubmitMock}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toBeInTheDocument();

    const optionElements = screen.getAllByRole("option");
    expect(optionElements).toHaveLength(4);

    expect(selectElement).toHaveValue("Toronto");
  });

  it("should close dropdown and calls handleSubmit when an option is selected", () => {
    render(
      <SearchDropdownMenu
        location={location}
        setLocation={setLocation}
        handleSubmit={handleSubmitMock}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "New York" } });

    expect(setLocation).toHaveBeenCalledWith("New York");

    expect(handleSubmitMock).toHaveBeenCalled();

    expect(selectElement).not.toHaveFocus();
  });

  it("should close dropdown when enter key is pressed", () => {
    render(
      <SearchDropdownMenu
        location={location}
        setLocation={setLocation}
        handleSubmit={handleSubmitMock}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.focus(selectElement);
    fireEvent.keyDown(selectElement, { key: "Enter" });

    expect(handleSubmitMock).toHaveBeenCalled();
    expect(selectElement).not.toHaveFocus();
  });

  it("should close dropdown when esc key is pressed", () => {
    render(
      <SearchDropdownMenu
        location={location}
        setLocation={setLocation}
        handleSubmit={handleSubmitMock}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.focus(selectElement);
    fireEvent.keyDown(selectElement, { key: "Escape" });

    expect(selectElement).not.toHaveFocus();
  });

  it("should close dropdown when it loses focus", () => {
    render(
      <SearchDropdownMenu
        location={location}
        setLocation={setLocation}
        handleSubmit={handleSubmitMock}
      />,
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.focus(selectElement);
    fireEvent.blur(selectElement);

    expect(selectElement).not.toHaveFocus();
  });
});
