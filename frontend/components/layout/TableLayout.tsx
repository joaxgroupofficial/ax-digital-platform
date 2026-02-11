"use client";

import { Card, CardBody } from "@material-tailwind/react";

export default function TableLayout({
  header,
  children,
}: {
  header?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Card className="w-full">
      {header}
      <CardBody className="overflow-x-auto !px-0">
        {children}
      </CardBody>
    </Card>
  );
}
