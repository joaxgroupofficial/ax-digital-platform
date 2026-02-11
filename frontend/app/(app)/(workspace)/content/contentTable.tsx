"use client";

import {
  CardHeader,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

import Link from "next/link";


import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import TableLayout from "@/components/layout/TableLayout";

export default function ContentTable() {
  return (
    <TableLayout
      header={
        <CardHeader
          floated={false}
          shadow={false}
          className="lex justify-between md:items-center gap-y-4 flex-col md:flex-row"
        >
          <div className="flex justify-between md:items-center gap-y-4 flex-col md:flex-row">
            <div>
              <Typography className="font-bold">Members List</Typography>
              <Typography variant="small" className="font-normal text-gray-600">
                See information about all members
              </Typography>
            </div>
            <div className="flex gap-2">
              <div className="lg:w-96">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
              <Button>Fillter</Button>

              <Link href="/content/create">
                <Button color="blue">Add Content</Button>
              </Link>
              
            </div>
          </div>

        </CardHeader>
      }
    >
      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-4 text-left">Title</th>
            <th className="p-4 text-left">Type</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Author</th>
            <th className="p-4 text-left">Updated</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="p-4">Homepage</td>
            <td className="p-4">Banner</td>
            <td className="p-4">Published</td>
            <td className="p-4">Admin</td>
            <td className="p-4">2026-02-03</td>
            <td className="p-4 text-right">⋯</td>
          </tr>
          
        </tbody>
      </table>

    </TableLayout>
  );
}
