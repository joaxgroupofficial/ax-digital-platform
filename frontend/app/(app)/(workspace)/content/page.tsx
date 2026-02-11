"use client";

import { Card, CardBody, Typography } from "@material-tailwind/react";
import ContentTable from "./contentTable";

export default function ContentManagerPage() {
  return (
    <section className="p-6 space-y-6">
      <Card>
        <CardBody>
          <Typography variant="h4">Content Manager</Typography>
          <Typography color="gray">
            Overview & future features will live here
          </Typography>
        </CardBody>
      </Card>

      <ContentTable />
    </section>
  );
}
