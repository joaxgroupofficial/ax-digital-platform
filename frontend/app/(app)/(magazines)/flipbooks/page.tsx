"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { getFlipbooks } from "@/lib/flipbooks";

interface Flipbook {
  id: string;
  title: string;
  date: string;
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

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
          <Typography variant="h5" className="mb-6">
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

          <div className="grid lg:grid-cols-4 gap-8">
            {flipbooks.map((item) => (
              <Card
                key={item.id}
                className="border shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden"
              >
                <div className="w-full aspect-[3/4] overflow-hidden relative">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium top-3 right-1 text-gray-70 absolute">
                    {item.pages ?? 0} pages
                  </span>

                  <img
                    src={item.links.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <CardBody className="space-y-4">
                  <Typography
                    variant="h6"
                    className="font-semibold line-clamp-2 "
                  >
                    {item.title || "Untitled Flipbook"}
                  </Typography>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {formatDate(item.date)}
                    </span>
                  </div>

                  <a
                    href={item.links.custom}
                    target="_blank"
                    className="inline-block text-blue-600 font-medium hover:underline"
                  >
                    View Flipbook →
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
