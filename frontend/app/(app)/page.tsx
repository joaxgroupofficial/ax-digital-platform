"use client";

import { Card, CardBody, Typography } from "@material-tailwind/react";

export default function HomePage() {
  return (
    <Card>
      <CardBody>
        <Typography variant="h4">
          Admin Dashboard
        </Typography>

        <Typography color="gray">
          Overview & future features will live here
        </Typography>
      </CardBody>
    </Card>
  );
}
