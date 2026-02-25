"use client";

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Spinner,
} from "@material-tailwind/react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


interface ChartCardProps {
  title: string;
  total?: number;
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
  color?: string;
  height?: number;
  loading?: boolean;
  type?: "area" | "bar" | "line";
}

export default function ChartCard({
  title,
  total,
  series,
  categories,
  color = "#3b82f6",
  height = 250,
  loading = false,
  type = "area",
}: ChartCardProps) {
  const data =
    categories?.map((cat, index) => ({
      name: cat,
      value: series?.[0]?.data?.[index] ?? 0,
    })) ?? [];

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                fontSize: "12px",
              }}
            />
            <Bar
              dataKey="value"
              fill={color}
              radius={[6, 6, 0, 0]}
              barSize={30}
            />
          </BarChart>
        );

      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                fontSize: "12px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        );

      default:
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 12, fill: "#6B7280" }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid #E5E7EB",
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fill="url(#colorGradient)"
              dot={false}
            />
          </AreaChart>
        );
    }
  };

  return (
    <Card className="shadow-md border border-gray-200">
      <CardHeader floated={false} shadow={false}>
        <Typography variant="small" className="text-gray-600">
          {title}
        </Typography>

        {typeof total === "number" && (
          <Typography variant="h4">
            {total.toLocaleString()}
          </Typography>
        )}
      </CardHeader>

      <CardBody>
        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No data available
          </div>
        ) : (
          <div style={{ width: "100%", height }}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </div>
        )}
      </CardBody>

    </Card>
  );
}
