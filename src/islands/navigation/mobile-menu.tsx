"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "~/app";
import { Link } from "~/navigation";
import { SidebarNavItem, type MainMenuItem } from "~/types";
import { cn } from "~/utils";

import { Icons } from "~/islands/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/islands/primitives/accordion";
import { Button } from "~/islands/primitives/button";
import { ScrollArea } from "~/islands/primitives/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "~/islands/primitives/sheet";

interface MobileMenuProps {
  MainMenuItems?: MainMenuItem[];
  sidebarNavItems: SidebarNavItem[];
}

export function MobileMenu({
  MainMenuItems,
  sidebarNavItems,
}: MobileMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
          <span className="ml-2 font-heading tracking-wide">Relivator</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pl-1 pr-0">
        <div className="px-7">
          <Link
            aria-label="Home"
            href="/"
            className="flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <span className="font-heading">{siteConfig.name}</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="single" collapsible className="w-full">
              {MainMenuItems?.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger className="text-sm capitalize">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            href={String(subItem.href)}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                            disabled={subItem.disabled}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={index}
                            className="text-foreground/70 transition-colors"
                          >
                            {item.title}
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
              <AccordionItem value="sidebar">
                <AccordionTrigger className="text-sm">
                  Sidebar Menu
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {sidebarNavItems?.map((item, index) =>
                      item.href ? (
                        <MobileLink
                          key={index}
                          href={String(item.href)}
                          pathname={pathname}
                          setIsOpen={setIsOpen}
                          disabled={item.disabled}
                        >
                          {item.title}
                        </MobileLink>
                      ) : (
                        <div
                          key={index}
                          className="text-foreground/70 transition-colors"
                        >
                          {item.title}
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps {
  children?: React.ReactNode;
  href: string | null;
  disabled?: boolean;
  pathname: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      href={`${href}`}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60",
      )}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </Link>
  );
}
