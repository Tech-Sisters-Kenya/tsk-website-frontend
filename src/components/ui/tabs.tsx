'use client';

import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2 max-w-4xl mx-auto ', className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        // 👇 center horizontally
        'flex justify-center  text-muted-foreground h-12 w-full items-center  p-[3px] ',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Layout & base styling
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 p-6 text-sm font-medium whitespace-nowrap transition-all focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // Colors (inactive)
        'bg-[#45084A0D] text-[#45084a] hover:bg-[#efd5f8]',

        // Active
        'data-[state=active]:bg-[#45084a] data-[state=active]:text-white data-[state=active]:shadow-sm',

        // Rounded only on the outer edges
        'rounded-xl md:first:rounded-l-xl md:last:rounded-r-xl md:not-first:rounded-none md:not-last:rounded-none',

        // Vertical divider with fade effect
        // - Full height
        // - Fades out if active (using opacity transition)
        'md:after:absolute md:after:top-0 md:after:bottom-0 md:after:right-0 md:after:w-[1px] md:after:bg-[#45084a] md:after:transition-opacity after:duration-300',
        // Hide divider when this tab is active OR this tab has an immeadiate next sibling that is active AND remove the divider on the last tab
        'data-[state=active]:after:opacity-0 [&:has(+[data-state=active])]:after:opacity-0 last:after:hidden',

        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
