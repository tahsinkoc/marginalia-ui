import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge, Card, CardContent, CardDescription, CardHeader, CardTitle } from "../src";

describe("Surface primitives", () => {
  it("renders card composition", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Elegant container</CardTitle>
          <CardDescription>Measured spacing and warm tones.</CardDescription>
        </CardHeader>
        <CardContent>Preview body</CardContent>
      </Card>
    );

    expect(screen.getByText(/elegant container/i)).toBeInTheDocument();
    expect(screen.getByText(/preview body/i)).toBeInTheDocument();
  });

  it("renders semantic badge variants", () => {
    render(<Badge variant="success">Stable</Badge>);

    expect(screen.getByText(/stable/i)).toHaveClass("text-success");
  });
});

