"use client";

import * as React from "react";
import {
  Calendar,
  Checkbox,
  Combobox,
  DatePicker,
  Input,
  RadioGroup,
  Select,
  Switch,
  Textarea
} from "@marginalia/ui";

import { createUsageSnippet } from "./usage-snippet";
import type { UsageSection } from "./usage-types";

const selectOptions = [
  { value: "essay", label: "Essay", description: "Long-form editorial writing." },
  { value: "brief", label: "Brief", description: "Shorter, denser communication." },
  { value: "report", label: "Report", description: "Structured updates for teams." }
];

const comboboxOptions = [
  {
    value: "editorial",
    label: "Editorial review",
    description: "Warm hierarchy for article-like interfaces.",
    keywords: ["warm", "review", "editorial"]
  },
  {
    value: "archive",
    label: "Research archive",
    description: "Dense but calm data and reading surfaces.",
    keywords: ["archive", "research", "dense"]
  },
  {
    value: "brief",
    label: "Client brief",
    description: "Tighter rhythm for quick-moving teams.",
    keywords: ["brief", "team", "client"]
  }
];

export const formUsageSections: UsageSection[] = [
  {
    id: "input",
    label: "Input",
    category: "Forms",
    description: "Field primitives with consistent height, radius, and invalid state behavior.",
    filename: "input.tsx",
    code: createUsageSnippet({
      imports: ["Input"],
      body: `
export function AuthorFields() {
  return (
    <>
      <Input placeholder="editorial@marginalia.dev" />
      <Input invalid placeholder="Missing author email" />
    </>
  );
}
      `
    }),
    preview: (
      <div className="section-stack">
        <Input placeholder="editorial@marginalia.dev" />
        <Input invalid placeholder="Missing author email" />
      </div>
    )
  },
  {
    id: "textarea",
    label: "Textarea",
    category: "Forms",
    description: "Longer freeform input with the same token-driven spacing rhythm as the rest of the kit.",
    filename: "textarea.tsx",
    code: createUsageSnippet({
      imports: ["Textarea"],
      body: `
export function EditorialNotesField() {
  return (
    <Textarea placeholder="Describe the tone, layout, and supporting notes..." />
  );
}
      `
    }),
    preview: <Textarea placeholder="Describe the tone, layout, and supporting notes..." />
  },
  {
    id: "checkbox",
    label: "Checkbox",
    category: "Forms",
    description: "Checkbox with label and description support out of the box.",
    filename: "checkbox.tsx",
    code: createUsageSnippet({
      imports: ["Checkbox"],
      body: `
export function PreferencesCheckbox() {
  return (
    <Checkbox
      defaultChecked
      label="Include soft contrast"
      description="Keeps the palette warm without losing clarity."
    />
  );
}
      `
    }),
    preview: (
      <Checkbox
        defaultChecked
        label="Include soft contrast"
        description="Keeps the palette warm without losing clarity."
      />
    )
  },
  {
    id: "radio-group",
    label: "RadioGroup",
    category: "Forms",
    description: "Mutually exclusive options with descriptions and gentle spacing.",
    filename: "radio-group.tsx",
    code: createUsageSnippet({
      imports: ["RadioGroup"],
      body: `
const paletteOptions = [
  { value: "warm", label: "Warm editorial" },
  { value: "neutral", label: "Neutral paper" }
];

export function PaletteCharacterField() {
  return (
    <RadioGroup
      defaultValue="warm"
      label="Palette character"
      options={paletteOptions}
    />
  );
}
      `
    }),
    preview: (
      <RadioGroup
        defaultValue="warm"
        label="Palette character"
        options={[
          { value: "warm", label: "Warm editorial" },
          { value: "neutral", label: "Neutral paper" }
        ]}
      />
    )
  },
  {
    id: "switch",
    label: "Switch",
    category: "Forms",
    description: "Two-state controls for preference toggles and denser settings screens.",
    filename: "switch.tsx",
    code: createUsageSnippet({
      imports: ["Switch"],
      body: `
export function DensityToggle() {
  return (
    <Switch
      defaultChecked
      label="Enable compact review mode"
      description="Useful when showing multiple data cards side by side."
    />
  );
}
      `
    }),
    preview: (
      <Switch
        defaultChecked
        label="Enable compact review mode"
        description="Useful when showing multiple data cards side by side."
      />
    )
  },
  {
    id: "select",
    label: "Select",
    category: "Forms",
    description: "Keyboard-friendly option picking with labels, descriptions, and warm Radix surfaces.",
    filename: "select.tsx",
    code: createUsageSnippet({
      imports: ["Select"],
      body: `
const documentStyleOptions = [
  { value: "essay", label: "Essay", description: "Long-form editorial writing." },
  { value: "brief", label: "Brief", description: "Shorter, denser communication." },
  { value: "report", label: "Report", description: "Structured updates for teams." }
];

export function DocumentStyleField() {
  return (
    <Select
      label="Document style"
      description="Built with Radix for dependable interaction."
      defaultValue="essay"
      options={documentStyleOptions}
    />
  );
}
      `
    }),
    preview: (
      <Select
        label="Document style"
        description="Built with Radix for dependable interaction."
        defaultValue="essay"
        options={selectOptions}
      />
    )
  },
  {
    id: "combobox",
    label: "Combobox",
    category: "Forms",
    description: "Searchable selection for larger option sets than a simple select.",
    filename: "combobox.tsx",
    code: createUsageSnippet({
      react: true,
      imports: ["Combobox"],
      body: `
const contentModeOptions = [
  {
    value: "editorial",
    label: "Editorial review",
    description: "Warm hierarchy for article-like interfaces.",
    keywords: ["warm", "review", "editorial"]
  },
  {
    value: "archive",
    label: "Research archive",
    description: "Dense but calm data and reading surfaces.",
    keywords: ["archive", "research", "dense"]
  }
];

export function ContentModeField() {
  const [value, setValue] = React.useState("editorial");

  return (
    <Combobox
      label="Content mode"
      description="Search and pick a tone or structural mode."
      options={contentModeOptions}
      value={value}
      onValueChange={setValue}
    />
  );
}
      `
    }),
    preview: <ComboboxUsagePreview />
  },
  {
    id: "date-picker",
    label: "DatePicker",
    category: "Forms",
    description: "Single-date picking with a calmer editorial calendar surface.",
    filename: "date-picker.tsx",
    code: createUsageSnippet({
      react: true,
      imports: ["DatePicker"],
      body: `
export function ReviewDeadlineField() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 22));

  return (
    <DatePicker
      label="Review deadline"
      description="Choose a single date with the calmer editorial calendar."
      selected={date}
      onSelect={setDate}
      calendarProps={{ defaultMonth: new Date(2026, 2, 1) }}
    />
  );
}
      `
    }),
    preview: <DatePickerUsagePreview />
  },
  {
    id: "calendar",
    label: "Calendar",
    category: "Forms",
    description: "Standalone date grid when you want the calendar surface without wrapping it in a field.",
    filename: "calendar.tsx",
    code: createUsageSnippet({
      react: true,
      imports: ["Calendar"],
      body: `
export function EditorialCalendar() {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date(2026, 2, 18));

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      defaultMonth={new Date(2026, 2, 1)}
    />
  );
}
      `
    }),
    preview: <CalendarUsagePreview />
  }
];

function ComboboxUsagePreview() {
  const [value, setValue] = React.useState("editorial");

  return (
    <Combobox
      label="Content mode"
      description="Search and pick a tone or structural mode."
      options={comboboxOptions}
      value={value}
      onValueChange={setValue}
    />
  );
}

function DatePickerUsagePreview() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 22));

  return (
    <DatePicker
      label="Review deadline"
      description="Choose a single date with the calmer editorial calendar."
      selected={date}
      onSelect={setDate}
      calendarProps={{ defaultMonth: new Date(2026, 2, 1) }}
    />
  );
}

function CalendarUsagePreview() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 2, 18));

  return <Calendar mode="single" selected={date} onSelect={setDate} defaultMonth={new Date(2026, 2, 1)} />;
}
