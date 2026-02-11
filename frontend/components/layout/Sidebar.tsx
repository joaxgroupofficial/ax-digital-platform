"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import {
  Cog6ToothIcon,
  UserGroupIcon,
  Square2StackIcon
} from "@heroicons/react/24/solid";

import {
  ChevronRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  const [open, setOpen] = React.useState<number>(1);
  const pathname = usePathname();

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <Card className="h-screen w-64 p-4 shadow-xl">
      <div className="mb-4 px-2">
        <Link href="/">
        <Typography variant="h5" color="blue-gray">
          AX Digital Platform
        </Typography></Link>
      </div>

      <List>
        {/* Dashboard */}
        <Accordion
          open={open === 1}
          icon={
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <Square2StackIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal">
                Content Manager
              </Typography>
            </AccordionHeader>
          </ListItem>

          <AccordionBody className="py-1">
            <List className="p-0">
              <Link href="/content">
                <ListItem selected={isActive("/content")}>
                  <ListItemPrefix>
                    <ChevronRightIcon className="h-3 w-5" />
                  </ListItemPrefix>
                  Overview
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>

        {/* HR Management */}
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              className={`h-4 w-4 transition-transform ${
                open === 2 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 2} >
            <AccordionHeader
              onClick={() => handleOpen(2)}
              className="border-b-0 p-3"
            >
              <ListItemPrefix>
                <UserGroupIcon className="h-5 w-5" />
              </ListItemPrefix>
              <Typography className="mr-auto font-normal">
                Magazines
              </Typography>
            </AccordionHeader>
          </ListItem>

          <AccordionBody className="py-1">
            <List className="p-0">
              <Link href="/flipbooks">
                <ListItem selected={isActive("/flipbook")}>
                  <ListItemPrefix>
                    <ChevronRightIcon className="h-3 w-5" />
                  </ListItemPrefix>
                  Flipbooks Dashboard
                </ListItem>
              </Link>

              <Link href="/dashboard/products">
                <ListItem selected={isActive("/dashboard/products")}>
                  <ListItemPrefix>
                    <ChevronRightIcon className="h-3 w-5" />
                  </ListItemPrefix>
                  Report
                </ListItem>
              </Link>
            </List>
          </AccordionBody>
        </Accordion>

        <hr className="my-2" />

        {/* Static links */}

        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>

      </List>
    </Card>
  );
}
