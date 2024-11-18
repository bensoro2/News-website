// src/app/blog/[id]/metadata.ts

interface MetadataProps {
  params: { id: string };
}

export async function generateMetadata({ params }: MetadataProps) {
  const { id } = params;

  // Fetch data or perform async operations
  const response = await fetch(`http://localhost:3001/news/${id}`);

  if (!response.ok) {
    return {
      title: "บทความไม่พบ",
    };
  }

  const news = await response.json();

  return {
    title: news.title,
    description: news.description.substring(0, 150),
    openGraph: {
      images: [news.image],
    },
  };
}
