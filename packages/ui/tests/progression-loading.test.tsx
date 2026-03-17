import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Sheet,
  SheetBody,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Stepper,
  StepperItem
} from "../src";

describe("Accordion, Sheet, Stepper, and Skeleton", () => {
  it("expands accordion content when triggered", async () => {
    const user = userEvent.setup();

    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="motion">
          <AccordionTrigger>Motion notes</AccordionTrigger>
          <AccordionContent>Panels open with gentle lift.</AccordionContent>
        </AccordionItem>
      </Accordion>
    );

    await user.click(screen.getByRole("button", { name: /motion notes/i }));

    expect(screen.getByText(/panels open with gentle lift/i)).toBeInTheDocument();
  });

  it("opens and closes a sheet", async () => {
    const user = userEvent.setup();

    render(
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open sheet</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Side workflow</SheetTitle>
            <SheetDescription>Focused utility panel.</SheetDescription>
          </SheetHeader>
          <SheetBody>
            <p>Annotations ready for final pass.</p>
          </SheetBody>
          <SheetFooter>
            <Button size="sm">Continue</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

    await user.click(screen.getByRole("button", { name: /open sheet/i }));

    expect(screen.getByText(/side workflow/i)).toBeInTheDocument();
    expect(screen.getByText(/annotations ready for final pass/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close sheet/i }));

    await waitFor(() => {
      expect(screen.queryByText(/side workflow/i)).not.toBeInTheDocument();
    });
  });

  it("renders stepper item states", () => {
    render(
      <Stepper>
        <StepperItem step="1" status="complete" title="Prepared" />
        <StepperItem step="2" status="current" title="Review" />
        <StepperItem step="3" status="upcoming" title="Publish" />
      </Stepper>
    );

    const items = screen.getAllByRole("listitem");

    expect(items[0]).toHaveAttribute("data-status", "complete");
    expect(items[1]).toHaveAttribute("data-status", "current");
    expect(items[2]).toHaveAttribute("data-status", "upcoming");
  });

  it("renders a shimmering skeleton block", () => {
    render(<Skeleton className="h-10 w-32" />);

    const skeleton = document.querySelector('[aria-hidden="true"]');

    expect(skeleton).toHaveClass("animate-shimmer", "h-10", "w-32");
  });
});
