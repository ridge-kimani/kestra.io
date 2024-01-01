export default {
    title: "Insights & News on Data Orchestration",
    description:
        "Explore the Kestra Blog for the latest articles, insights, product updates & engineering deep dives.",
    meta: ({ title, description, image, origin }) => [
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@kestra_io" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: `${origin + image}` },
        { name: "twitter:image:alt", content: title },
    ],
    script: ({ slug, title, image, date, author, description }) => [
        {
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                mainEntityofPage: {
                    "@type": "Webpage",
                    "@id": slug,
                },
                headline: title,
                image: [image],
                datePublished: date,
                author: { "@type": "Person", name: `${author.name}` },
                publisher: {
                    "@type": "Organization",
                    name: "Kestra",
                    logo: {
                        "@type": "ImageObject",
                        url: "https://kestra.io/logo.svg",
                    },
                },
                description: description,
            }),
            type: "application/ld+json",
        },
    ],
    articles: {
        title: "All things Kestra",
        description:
            "Company news, product updates, and engineering deep dives.",
        categories: [
            "All News",
            "Company News",
            "News & Products Updates",
            "Solutions",
        ],
    },
};
