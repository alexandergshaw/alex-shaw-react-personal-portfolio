
import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("SCRUM-22 Portfolio Introduction", () => {
  test("displays my name on the homepage", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /Hi, I'm Lapan Sieba/i })
    ).toBeInTheDocument();
  });

  test("shows my IT student background", () => {
    render(<Home />);

    expect(
      screen.getByText(/Information Technology student at Metropolitan Community College/i)
    ).toBeInTheDocument();
  });

  test("shows my education in the homepage introduction", () => {
    render(<Home />);

    expect(
      screen.getByText(/I am an IT student at Metropolitan Community College learning software development/i)
    ).toBeInTheDocument();
  });
});
