"use client";

import React from "react";
import {
    Input,
    Typography,
    Select,
    Option,
    Textarea,
    Checkbox,
    Button,
} from "@material-tailwind/react";

const WEBSITE_GROUPS: Record<string, string[]> = {
    Thailand: [
        "bangkokone.news",
        "travelerthailand.com",
        "magazinethailand.com",
    ],
    UAE: [
        "traveleruae.com",
        "magazineuae.com",
    ],
    HongKong: [
        "travelerhongkong.com",
        "magazinehongkong.com",
    ],
    SaudiArabia: [
        "travelersa.com",
        "magazinesa.com",
    ],
};
import { useRouter } from "next/navigation";

export default function AddContentForm() {
    const [sites, setSites] = React.useState<string[]>([]);

    const toggleSite = (site: string) => {
        setSites((prev) =>
            prev.includes(site)
                ? prev.filter((s) => s !== site)
                : [...prev, site]
        );
    };

    const router = useRouter();

    return (
        <section className="mx-auto px-8 py-10 max-w-5xl">
            <Typography variant="h4" color="blue-gray">
                Add Content
            </Typography>
            <Typography variant="small" className="text-gray-600 mt-1">
                Create post or banner and publish to selected websites
            </Typography>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                    <Typography variant="small" className="mb-2 font-medium">
                        Title
                    </Typography>
                    <Input size="lg" placeholder="Content title" />
                </div>

                <div>
                    <Typography variant="small" className="mb-2 font-medium">
                        Content Type
                    </Typography>
                    <Select size="lg">
                        <Option value="post">Post</Option>
                        <Option value="banner">Banner</Option>
                        <Option value="page">Page</Option>
                    </Select>
                </div>

                <div>
                    <Typography variant="small" className="mb-2 font-medium">
                        Status
                    </Typography>
                    <Select size="lg">
                        <Option value="draft">Draft</Option>
                        <Option value="published">Published</Option>
                        <Option value="scheduled">Scheduled</Option>
                    </Select>
                </div>

                <div className="md:col-span-2">
                    <Typography variant="small" className="mb-2 font-medium">
                        Content Details
                    </Typography>
                    <Textarea rows={6} placeholder="Write your content here..." />
                </div>
            </div>

            <div className="mt-10">
                <Typography variant="h6" color="blue-gray">
                    Publish to Websites
                </Typography>
                <Typography variant="small" className="text-gray-600 mb-6">
                    Select one or more websites by region
                </Typography>

                <div className="space-y-6">
                    {Object.entries(WEBSITE_GROUPS).map(
                        ([region, regionSites]) => (
                            <div key={region}>
                                <Typography
                                    variant="small"
                                    className="mb-3 font-semibold text-blue-gray-800"
                                >
                                    {region}
                                </Typography>

                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {regionSites.map((site) => (
                                        <label
                                            key={site}
                                            className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-blue-gray-50"
                                        >
                                            <Checkbox
                                                checked={sites.includes(site)}
                                                onChange={() => toggleSite(site)}
                                            />
                                            <span className="text-sm text-blue-gray-800">
                                                {site}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <div className="mt-10 flex justify-end gap-4">
                <Button variant="outlined" onClick={() => router.back()}>Back</Button>
                <Button color="blue">Save Content</Button>
            </div>
        </section>
    );
}
