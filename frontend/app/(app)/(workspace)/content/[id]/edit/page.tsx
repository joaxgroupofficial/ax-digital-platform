import ContentForm from "../../components/ContentForm";
import { notFound } from "next/navigation";

export default async function EditContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const mockPosts = [
    {
      id: "1",
      title: "Post One",
      slug: "post-one",
      content: "Example content",
      status: "draft",
      sites: ["travelerthailand.com"],
      tags: ["travel", "luxury"],
    },
  ];

  const post = mockPosts.find((p) => p.id === id);

  // const post = await prisma.content.findUnique({where: {id}, })

  if (!post) notFound();

  return <ContentForm mode="edit" initialData={post} />;
}
