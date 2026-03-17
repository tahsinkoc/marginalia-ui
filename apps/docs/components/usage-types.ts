import type { ReactNode } from "react";

export type UsageSection = {
  id: string;
  label: string;
  category: string;
  description: string;
  code: string;
  filename: string;
  preview: ReactNode;
};

export type UsageGroup = {
  title: string;
  items: UsageSection[];
};
