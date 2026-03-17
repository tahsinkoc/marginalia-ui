"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label
} from "@marginalia/ui";

import type { UsageSection } from "./usage-types";

export const foundationUsageSections: UsageSection[] = [
  {
    id: "button",
    label: "Button",
    category: "Foundations",
    description: "Primary, secondary, ghost, outline, and loading states share the same editorial rhythm.",
    filename: "button.tsx",
    code: `<Button>Publish</Button>
<Button variant="secondary">Save draft</Button>
<Button variant="ghost" size="sm">Read later</Button>
<Button loading>Saving</Button>`,
    preview: (
      <div className="inline-actions" style={{ marginTop: 0 }}>
        <Button>Publish</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="ghost" size="sm">
          Read later
        </Button>
        <Button loading>Saving</Button>
      </div>
    )
  },
  {
    id: "badge",
    label: "Badge",
    category: "Foundations",
    description: "Small semantic labels for status, category, or compact metadata.",
    filename: "badge.tsx",
    code: `<Badge>Neutral</Badge>
<Badge variant="accent">Featured</Badge>
<Badge variant="success">Stable</Badge>`,
    preview: (
      <div className="inline-actions" style={{ marginTop: 0 }}>
        <Badge>Neutral</Badge>
        <Badge variant="accent">Featured</Badge>
        <Badge variant="success">Stable</Badge>
      </div>
    )
  },
  {
    id: "alert",
    label: "Alert",
    category: "Foundations",
    description: "Compact feedback surfaces for warnings, successes, and operational notes.",
    filename: "alert.tsx",
    code: `<Alert variant="warning">
  <AlertTitle>Review window is closing</AlertTitle>
  <AlertDescription>
    This draft has been waiting for editorial approval for 48 hours.
  </AlertDescription>
</Alert>`,
    preview: (
      <Alert variant="warning">
        <AlertTitle>Review window is closing</AlertTitle>
        <AlertDescription>This draft has been waiting for editorial approval for 48 hours.</AlertDescription>
      </Alert>
    )
  },
  {
    id: "avatar",
    label: "Avatar",
    category: "Foundations",
    description: "Identity surfaces for people, collaborators, and editorial roles.",
    filename: "avatar.tsx",
    code: `<Avatar>
  <AvatarFallback>SC</AvatarFallback>
</Avatar>`,
    preview: (
      <div className="inline-actions" style={{ marginTop: 0 }}>
        <Avatar>
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
        <Avatar className="h-12 w-12">
          <AvatarFallback>MR</AvatarFallback>
        </Avatar>
      </div>
    )
  },
  {
    id: "card",
    label: "Card",
    category: "Foundations",
    description: "Measured containers for grouped content, metadata, and actions.",
    filename: "card.tsx",
    code: `<Card>
  <CardHeader>
    <CardTitle>Editorial notes</CardTitle>
    <CardDescription>Warm, restrained surfaces for grouped UI.</CardDescription>
  </CardHeader>
  <CardContent>
    <Input value="Scholar's annotation ready" readOnly />
  </CardContent>
</Card>`,
    preview: (
      <Card>
        <CardHeader>
          <CardTitle>Editorial notes</CardTitle>
          <CardDescription>Warm, restrained surfaces for grouped UI.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input value="Scholar's annotation ready" readOnly />
        </CardContent>
        </Card>
      )
  },
  {
    id: "label",
    label: "Label",
    category: "Foundations",
    description: "Accessible labels that inherit the same restrained type and spacing scale as the rest of the kit.",
    filename: "label.tsx",
    code: `<div className="grid gap-2">
  <Label htmlFor="author-email">Author email</Label>
  <Input id="author-email" placeholder="editorial@marginalia.dev" />
</div>`,
    preview: (
      <div className="section-stack" style={{ gap: "0.65rem" }}>
        <Label htmlFor="usage-author-email">Author email</Label>
        <Input id="usage-author-email" placeholder="editorial@marginalia.dev" />
      </div>
    )
  }
];
