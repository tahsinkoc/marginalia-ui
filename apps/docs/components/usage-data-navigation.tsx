"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@marginalia/ui";

import type { UsageSection } from "./usage-types";

export const navigationUsageSections: UsageSection[] = [
  {
    id: "tabs",
    label: "Tabs",
    category: "Navigation",
    description: "Segment closely related content without leaving the page.",
    filename: "tabs.tsx",
    code: `<Tabs defaultValue="principles">
  <TabsList>
    <TabsTrigger value="principles">Principles</TabsTrigger>
    <TabsTrigger value="usage">Usage</TabsTrigger>
  </TabsList>
  <TabsContent value="principles">Warm surfaces and calm contrast.</TabsContent>
</Tabs>`,
    preview: (
      <Tabs defaultValue="principles">
        <TabsList>
          <TabsTrigger value="principles">Principles</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="principles">Warm surfaces and calm contrast.</TabsContent>
        <TabsContent value="usage">Use tabs for adjacent settings or closely related content.</TabsContent>
        <TabsContent value="notes">State changes stay subtle instead of loud.</TabsContent>
      </Tabs>
    )
  },
  {
    id: "accordion",
    label: "Accordion",
    category: "Navigation",
    description: "Reveal layered explanations or settings progressively.",
    filename: "accordion.tsx",
    code: `<Accordion type="single" collapsible>
  <AccordionItem value="motion">
    <AccordionTrigger>How is motion handled?</AccordionTrigger>
    <AccordionContent>
      Movements stay short and soft.
    </AccordionContent>
  </AccordionItem>
</Accordion>`,
    preview: (
      <Accordion type="single" collapsible className="grid gap-3">
        <AccordionItem value="motion">
          <AccordionTrigger>How is motion handled?</AccordionTrigger>
          <AccordionContent>Movements stay short and soft.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="density">
          <AccordionTrigger>Can spacing be compact?</AccordionTrigger>
          <AccordionContent>Yes, density tokens can tighten the entire system.</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
  {
    id: "breadcrumb",
    label: "Breadcrumb",
    category: "Navigation",
    description: "Compact path context for nested views and editorial flows.",
    filename: "breadcrumb.tsx",
    code: `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="#">Library</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Review draft</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`,
    preview: (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Library</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Editorial</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Review draft</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  },
  {
    id: "menubar",
    label: "Menubar",
    category: "Navigation",
    description: "Desktop-like top-level action bars for richer productivity and editorial tooling flows.",
    filename: "menubar.tsx",
    code: `<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New note
        <MenubarShortcut>Cmd+N</MenubarShortcut>
      </MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>`,
    preview: (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Document</MenubarLabel>
            <MenubarItem>
              New note
              <MenubarShortcut>Cmd+N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Duplicate draft
              <MenubarShortcut>Cmd+D</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Archive current draft</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarLabel>Density</MenubarLabel>
            <MenubarItem>Comfortable layout</MenubarItem>
            <MenubarItem>Compact layout</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  },
  {
    id: "pagination",
    label: "Pagination",
    category: "Navigation",
    description: "Page controls for longer archives, tables, and listings.",
    filename: "pagination.tsx",
    code: `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" active>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`,
    preview: (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(event) => event.preventDefault()} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" onClick={(event) => event.preventDefault()}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" active onClick={(event) => event.preventDefault()}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" onClick={(event) => event.preventDefault()} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }
];
