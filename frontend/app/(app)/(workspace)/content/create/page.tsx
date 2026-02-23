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
        "travelerthailand.com",
    ],
    UAE: [
        "traveleruae.com",
    ],
    HongKong: [
        "travelerhongkong.com",
    ],
    SaudiArabia: [
        "travelersa.com",
    ],
};
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/solid";

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

    const [images, setImages] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<string[]>([]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);

        setImages((prev) => [...prev, ...fileArray]);

        const previewUrls = fileArray.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviews((prev) => [...prev, ...previewUrls]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <section className="mx-auto px-8 py-10 max-w-5xl">
            <Typography variant="h4" color="blue-gray">
                Add Content
            </Typography>
            <Typography variant="small" className="text-gray-600 mt-1">
                Create post or banner and publish to selected websites
            </Typography>

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-3">
                    <Typography variant="small" className="mb-2 font-medium">
                        Title
                    </Typography>
                    <Input size="lg" placeholder="Content title" />
                </div>

                <div>
                    <Typography variant="small" className="mb-2 font-medium">
                        Slug
                    </Typography>
                    <Input size="lg" placeholder="/" />
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

                <div className="md:col-span-3">
                    <Typography variant="small" className="mb-2 font-medium">
                        Content Details
                    </Typography>
                    <Textarea rows={6} placeholder="Write your content here..." />
                </div>

                <div className="mt-8 md:col-span-2">
                    <Typography variant="small" className="mb-2 font-medium">
                        Upload Images
                    </Typography>

                    <label className="inline-block">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="hidden"
                        />

                        <span className="cursor-pointer inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                            Select Images
                        </span>
                    </label>

                    {previews.length > 0 && (
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {previews.map((src, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={src}
                                        alt="preview"
                                        className="h-32 w-full object-cover rounded-lg border"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-90 hover:opacity-100"
                                    >
                                        <TrashIcon className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
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

                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
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
