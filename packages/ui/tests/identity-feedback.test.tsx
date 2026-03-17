import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Progress
} from "../src";

describe("Alert, Progress, Breadcrumb, and Avatar", () => {
  it("renders an alert with title and description", () => {
    render(
      <Alert variant="warning">
        <AlertTitle>Review warning</AlertTitle>
        <AlertDescription>Final sign-off is still pending.</AlertDescription>
      </Alert>
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Review warning");
    expect(screen.getByText(/final sign-off is still pending/i)).toBeInTheDocument();
  });

  it("renders a progressbar with the provided value", () => {
    render(<Progress value={68} />);

    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "68");
  });

  it("renders breadcrumb trail and current page", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Library</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Review draft</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByText(/review draft/i)).toHaveAttribute("aria-current", "page");
  });

  it("renders avatar fallback content", () => {
    render(
      <Avatar>
        <AvatarFallback>EM</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByText("EM")).toBeInTheDocument();
  });
});
