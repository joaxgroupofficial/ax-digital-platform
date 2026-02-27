"use client";

import React from "react";
import {
    Typography,
    Select,
    Option,
    Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/solid";

const WEBSITE_GROUPS: Record<string, string[]> = {
    Thailand: ["travelerthailand.com"],
    UAE: ["traveleruae.com"],
    HongKong: ["travelerhongkong.com"],
    SaudiArabia: ["travelersa.com"],
};

interface ContentFormProps {
    mode?: "create" | "edit";
    initialData?: any;
    onSubmit?: (data: any) => vo;
    onCancel?: void;
}

export default function ContentForm({
    mode = "create",
    initialData,
}: ContentFormProps) {
    const router = useRouter();

    const [title, setTitle] = React.useState("");
    const [slug, setSlug] = React.useState("");
    const [content, setContent] = React.useState("");
    const [status, setStatus] = React.useState("draft");
    const [sites, setSites] = React.useState<string[]>([]);

    const [tags, setTags] = React.useState<string[]>([]);
    const [tagInput, setTagInput] = React.useState("");

    const [images, setImages] = React.useState<File[]>([]);
    const [previews, setPreviews] = React.useState<string[]>([]);
    const [imageAlts, setImageAlts] = React.useState<string[]>([]);

    const [seoTitle, setSeoTitle] = React.useState("");
    const [seoDescription, setSeoDescription] = React.useState("");

    const [showSEO, setShowSEO] = React.useState(false);
    const previewTitle =
        seoTitle || title || "Your SEO title will appear here";

    const previewDescription =
        seoDescription ||
        "Your meta description will appear here. Keep it between 140–160 characters.";

    React.useEffect(() => {
        if (mode === "edit" && initialData) {
            setTitle(initialData.title || "");
            setSlug(initialData.slug || "");
            setContent(initialData.content || "");
            setStatus(initialData.status || "draft");
            setSites(initialData.sites || []);
            setTags(initialData.tags || []);
        }
    }, [mode, initialData]);

    const addTag = () => {
        const trimmed = tagInput.trim();
        if (!trimmed || tags.includes(trimmed)) return;
        setTags((prev) => [...prev, trimmed]);
        setTagInput("");
    };

    const removeTag = (tag: string) => {
        setTags((prev) => prev.filter((t) => t !== tag));
    };

    const handleTagKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    const handleImageChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);

        setImages((prev) => [...prev, ...fileArray]);

        const previewUrls = fileArray.map((file) =>
            URL.createObjectURL(file)
        );

        setPreviews((prev) => [...prev, ...previewUrls]);

        setImageAlts((prev) => [...prev, ...fileArray.map(() => "")]);
    };

    const removeImage = (index: number) => {
        URL.revokeObjectURL(previews[index]);
        setImages((prev) => prev.filter((_, i) => i !== index));
        setPreviews((prev) => prev.filter((_, i) => i !== index));
        setImageAlts((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <section className="px-8 py-10">
            <div className="max-w-7xl mx-auto">
                <Typography variant="h4">
                    {mode === "create" ? "Create New Post" : "Edit Post"}
                </Typography>

                <Typography variant="small" className="text-gray-600 mt-1">
                    Create and publish content across selected websites
                </Typography>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
                            <div>
                                <Typography variant="small" className="mb-2 font-medium text-gray-700">
                                    Post Title
                                </Typography>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter post title..."
                                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none transition-colors duration-150"
                                />
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 font-medium text-gray-700">
                                    Slug 
                                </Typography>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="/post-slug"
                                    className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none transition-colors duration-150"
                                />
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 font-medium text-gray-700">
                                    Content
                                </Typography>
                                <textarea
                                    rows={8}
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your content here..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none focus:border-blue-500 focus:outline-none transition-colors duration-150"
                                />
                            </div>
                        </div>
                        {/* SEO SETTINGS */}
                        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
                            <button
                                type="button"
                                onClick={() => setShowSEO(!showSEO)}
                                className="flex justify-between items-center w-full"
                            >
                                <Typography variant="h6">SEO Settings</Typography>
                                <span className="text-sm text-blue-600">
                                    {showSEO ? "Hide" : "Optimize for Google"}
                                </span>
                            </button>

                            {showSEO && (
                                <div className="space-y-5 pt-2">

                                    {/* SEO Title */}
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="SEO Title (50–60 characters)"
                                            value={seoTitle}
                                            onChange={(e) => setSeoTitle(e.target.value)}
                                            className="w-full h-11 px-4 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                                        />
                                        <p
                                            className={`text-xs mt-1 ${previewTitle.length > 60 ? "text-red-500" : "text-gray-500"
                                                }`}
                                        >
                                            {previewTitle.length} / 60 characters
                                        </p>
                                    </div>

                                    {/* SEO Description */}
                                    <div>
                                        <textarea
                                            rows={3}
                                            placeholder="Meta Description (140–160 characters)"
                                            value={seoDescription}
                                            onChange={(e) => setSeoDescription(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
                                        />
                                        <p
                                            className={`text-xs mt-1 ${seoDescription.length > 160 ? "text-red-500" : "text-gray-500"
                                                }`}
                                        >
                                            {seoDescription.length} / 160 characters
                                        </p>
                                    </div>

                                </div>
                            )}
                        </div>




                        <div className="bg-white border rounded-xl p-6 shadow-sm">
                            <Typography variant="h6" className="mb-4">
                                Gallery Images
                            </Typography>

                            <label className="block">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                <div className="border-2 border-dashed border-blue-gray-200 rounded-xl h-44 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition">
                                    <Typography variant="small">
                                        Click to upload or drag & drop
                                    </Typography>
                                    <Typography variant="small" className="text-gray-500 mt-1">
                                        PNG, JPG up to 5MB
                                    </Typography>
                                </div>
                            </label>

                            {previews.length > 0 && (
                                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {previews.map((src, index) => (
                                        <div key={index} className="relative group space-y-2">
                                            <img
                                                src={src}
                                                alt={imageAlts[index] || "preview"}
                                                className="h-32 w-full object-cover rounded-lg border"
                                            />

                                            <input
                                                type="text"
                                                value={imageAlts[index] || ""}
                                                onChange={(e) => {
                                                    const newAlts = [...imageAlts];
                                                    newAlts[index] = e.target.value;
                                                    setImageAlts(newAlts);
                                                }}
                                                placeholder="Alt text (SEO description)"
                                                className="w-full px-2 py-1 text-xs border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            />

                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white border rounded-xl p-6 shadow-sm sticky top-6 space-y-6">
                            <Typography variant="h6">Publish Settings</Typography>

                            <div>
                                <Typography variant="small" className="mb-2 font-medium">
                                    Status
                                </Typography>
                                <Select value={status} onChange={(val) => val && setStatus(val)}>
                                    <Option value="draft">Draft</Option>
                                    <Option value="published">Published</Option>
                                    <Option value="scheduled">Scheduled</Option>
                                </Select>
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 font-medium">
                                    Publish to Websites
                                </Typography>
                                <Select
                                    size="lg"
                                    value=""
                                    selected={() => {
                                        if (sites.length === 0) {
                                            return (
                                                <span className="text-gray-400 text-sm">
                                                    Select websites
                                                </span>
                                            );
                                        }

                                        const visible = sites.slice(0, 2);
                                        const remaining = sites.length - 2;

                                        return (
                                            <div className="flex items-center gap-1 overflow-hidden">
                                                {visible.map((site) => (
                                                    <span
                                                        key={site}
                                                        className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full truncate max-w-[90px]"
                                                    >
                                                        {site}
                                                    </span>
                                                ))}
                                                {remaining > 0 && (
                                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                                        +{remaining} more
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    }}
                                    onChange={(value) => {
                                        if (!value) return;
                                        setSites((prev) =>
                                            prev.includes(value)
                                                ? prev.filter((s) => s !== value)
                                                : [...prev, value]
                                        );
                                    }}
                                >
                                    {Object.entries(WEBSITE_GROUPS).map(([region, regionSites]) =>
                                        regionSites.map((site) => (
                                            <Option key={site} value={site}>
                                                <div className="flex justify-between items-center">
                                                    <span>
                                                        {region} — {site}
                                                    </span>
                                                    {sites.includes(site) && (
                                                        <span className="text-blue-600 font-bold">✓</span>
                                                    )}
                                                </div>
                                            </Option>
                                        ))
                                    )}
                                </Select>
                            </div>

                            <div>
                                <Typography variant="small" className="mb-2 font-medium">
                                    Keywords & Tags
                                </Typography>

                                <div className="border rounded-lg p-3 bg-white flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 rounded-full"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(tag)}
                                                className="ml-1 hover:text-red-500 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}

                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        placeholder="Type and press enter..."
                                        className="flex-1 min-w-[120px] outline-none text-sm"
                                    />
                                </div>
                            </div>
                            {/* Google Preview */}
                            <div className="border rounded-lg p-4 bg-gray-50 space-y-1">
                                <p className="text-xs text-green-700 truncate">
                                    https://yourdomain.com/{slug || "post-slug"}
                                </p>
                                <p className="text-base text-blue-700 font-medium truncate">
                                    {previewTitle}
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {previewDescription}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outlined" fullWidth onClick={() => router.back()}>
                                    Cancel
                                </Button>
                                <Button color="blue" fullWidth>
                                    Save
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
