"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { getFlipbooks } from "@/lib/flipbooks";

interface Flipbook {
  id: string;
  title: string;
  pages: number;
  size: number;
  links: {
    thumbnail: string;
    custom: string;
  };
}

export default function FlipbookPage() {
  const [flipbooks, setFlipbooks] = useState<Flipbook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getFlipbooks();
        setFlipbooks(data ?? []);
      } catch (error) {
        console.error("Failed to load flipbooks:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <section className="p-6 space-y-6">
      <Card>
        <CardBody>
          <Typography variant="h4">Flipbook Manager</Typography>
          <Typography color="gray">
            Manage, monitor, and analyze all flipbooks in one place.
          </Typography>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <Typography variant="h5" className="mb-4">
            All Flipbooks
          </Typography>

          {loading && (
            <Typography color="gray">Loading flipbooks...</Typography>
          )}

          {!loading && flipbooks.length === 0 && (
            <Typography color="gray">
              No flipbooks found.
            </Typography>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            {flipbooks.map((item) => (
              <Card key={item.id} className="border shadow-sm">
                <CardBody className="space-y-3">
                  
                  <img
                    src={item.links.thumbnail}
                    alt="thumbnail"
                    className="w-full h-48 object-cover rounded-lg"
                  />

                  <Typography variant="h6">
                    {item.title || "Untitled Flipbook"}
                  </Typography>

                  <Typography color="gray" className="text-sm">
                    {item.pages} pages
                  </Typography>

                  <a
                    href={item.links.custom}
                    target="_blank"
                    className="text-blue-500 text-sm underline"
                  >
                    View Flipbook
                  </a>
                </CardBody>
              </Card>
            ))}
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
