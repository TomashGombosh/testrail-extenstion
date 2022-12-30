import React from "react";
import { render, screen } from "@testing-library/react";
import Form from "../Form";

import "@testing-library/jest-dom";

test("Check the render of the form", async () => {
  render(<Form content={<div data-testid="test">Test</div>} header="Rest" />);
  const content = screen.getByTestId("test");
  const contentText = screen.getByText("Test");
  const header = screen.getByText("Rest");
  expect(content).toBeVisible();
  expect(contentText).toBeVisible();
  expect(header).toBeVisible();
});
