"use client";

import * as React from "react";

import { cn } from "../lib/cn";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from "./command";

export interface CommandPaletteItem {
  value: string;
  label: React.ReactNode;
  shortcut?: React.ReactNode;
  keywords?: string[];
  disabled?: boolean;
  onSelect?: (value: string) => void;
}

export interface CommandPaletteGroup {
  heading?: React.ReactNode;
  items: CommandPaletteItem[];
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  emptyMessage?: React.ReactNode;
  groups: CommandPaletteGroup[];
  className?: string;
}

export function CommandPalette({
  open,
  onOpenChange,
  title = "Command palette",
  description = "Search actions, destinations, and shortcuts.",
  placeholder = "Type a command or search...",
  emptyMessage = "No command found.",
  groups,
  className
}: CommandPaletteProps) {
  const visibleGroups = groups.filter((group) => group.items.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent hideClose className={cn("w-[min(92vw,42rem)] overflow-hidden p-0", className)}>
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{description}</DialogDescription>
        <Command className="rounded-none">
          <CommandInput placeholder={placeholder} />
          <CommandList className="max-h-[24rem] p-2">
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {visibleGroups.map((group, groupIndex) => (
              <React.Fragment key={typeof group.heading === "string" ? group.heading : groupIndex}>
                <CommandGroup heading={group.heading}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      keywords={item.keywords}
                      disabled={item.disabled}
                      onSelect={(selectedValue) => {
                        item.onSelect?.(selectedValue);
                        onOpenChange(false);
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
                {groupIndex < visibleGroups.length - 1 ? <CommandSeparator /> : null}
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

