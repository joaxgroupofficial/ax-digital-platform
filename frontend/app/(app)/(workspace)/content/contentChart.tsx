"use client";

import { useEffect, useState } from "react";
import { CardHeader, Typography, Button, Select, Option } from "@material-tailwind/react";
import TableLayout from "@/components/layout/TableLayout";
import ChartCard from "@/components/layout/ChartCard";

type PeriodType = "7d" | "30d" | "90d";

interface AnalyticsResponse {
  visitors: number[];
  postViews: number[];
  categories: string[];
  totalVisitors: number;
  totalPostViews: number;
}

export default function ContentChart() {
  const [period, setPeriod] = useState<PeriodType>("7d");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsResponse | null>(null);

  useEffect(() => {
    
    // async function fetchAnalytics() {
    //   try {
    //     setLoading(true);

    //     const res = await fetch(
    //       `/api/analytics?period=${period}&site=all`
    //     );

    //     const result = await res.json();
    //     setData(result);
    //   } catch {
    //     setData(null);
    //   } finally {
    //     setLoading(false);
    //   }
    // }

    // fetchAnalytics();
    setLoading(true);

    setTimeout(() => {
      setData({
        visitors: [120, 200, 150, 300, 280, 400, 350],
        postViews: [80, 150, 100, 220, 190, 310, 280],
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        totalVisitors: 1800,
        totalPostViews: 1330,
      });
      setLoading(false);
    }, 500);
  }, [period]);

  return (
    <TableLayout
      header={
        <CardHeader
          floated={false}
          shadow={false}
          className="flex justify-between md:items-center gap-y-4 flex-col md:flex-row"
        >
          <div>
            <Typography className="font-bold">
              Analytics Overview
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600"
            >
              Visitors & Post Views
            </Typography>
          </div>

          <div className="w-40">
            <Select
              size="sm"
              value={period}
              onChange={(value) => {
                if (!value) return;
                setPeriod(value as PeriodType);
              }}
            >
              <Option value="7d">Last 7 Days</Option>
              <Option value="30d">Last 30 Days</Option>
              <Option value="90d">Last 90 Days</Option>
            </Select>
          </div>

        </CardHeader>
      }
    >
      <div className="grid md:grid-cols-2 gap-6 p-4">
        <ChartCard
          title="Total Visitors"
          total={data?.totalVisitors}
          series={[
            { name: "Visitors", data: data?.visitors ?? [] },
          ]}
          categories={data?.categories ?? []}
          color="#3b82f6"
          loading={loading}
        />

        <ChartCard
          title="Total Post Views"
          total={data?.totalPostViews}
          series={[
            { name: "Post Views", data: data?.postViews ?? [] },
          ]}
          categories={data?.categories ?? []}
          color="#10b981"
          loading={loading}
        />
        <ChartCard
          title="View by Site"
          type="bar"
          series={[{ name: "Viewbysite", data: [5400, 3200, 2100, 1800] }]}
          categories={["Thailand", "UAE", "HongKong", "Saudi"]}
        />

      </div>
    </TableLayout>
  );
}
