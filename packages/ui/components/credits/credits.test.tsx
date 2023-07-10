/* eslint-disable playwright/missing-playwright-await */
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Credits from "./Credits";

vi.mock("../../../../apps/web/package.json", async () => {
  return {
    default: {
      version: "mockedVersion",
    },
  };
});

describe("Tests for Credits component", () => {
  test("Should render credits section with links", () => {
    render(<Credits />);

    const creditsLinkElement = screen.getByRole("link", { name: /Cal\.com, Inc\./i });
    expect(creditsLinkElement).toBeInTheDocument();
    expect(creditsLinkElement).toHaveAttribute("href", "https://go.cal.com/credits");
    expect(creditsLinkElement).toHaveClass("hover:underline");

    const versionLinkElement = screen.getByRole("link", { name: /mockedVersion/i });
    expect(versionLinkElement).toBeInTheDocument();
    expect(versionLinkElement).toHaveAttribute("href", "https://go.cal.com/releases");
    expect(versionLinkElement).toHaveClass("hover:underline");
  });

  test("Should render credits section with correct text", () => {
    render(<Credits />);

    const currentYear = new Date().getFullYear();
    const copyrightElement = screen.getByText(`© ${currentYear}`);
    expect(copyrightElement).toHaveTextContent(`${currentYear}`);
  });
});
