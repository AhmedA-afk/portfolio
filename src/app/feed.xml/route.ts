import { Feed } from 'feed';


export async function GET() {
    const feed = new Feed({
        title: "Ahmed Ansari - AI/ML Engineer",
        description: "Thoughts on AI, LLMs, and Agentic Systems.",
        id: "https://www.ahmedansari.me/",
        link: "https://www.ahmedansari.me/",
        language: "en",
        image: "https://www.ahmedansari.me/favicon.png",
        favicon: "https://www.ahmedansari.me/favicon.ico",
        copyright: "All rights reserved 2026, Ahmed Ansari",
        author: {
            name: "Ahmed Ansari",
            email: "ahmedraza1ansari@gmail.com",
            link: "https://www.ahmedansari.me"
        }
    });

    // Add recent "blogs" (even if external)
    feed.addItem({
        title: "How can GenAI improve and reform the education sector?",
        id: "https://medium.com/@ahmedraza1ansari/how-can-genai-improve-and-reform-the-education-sector-instead-of-ruining-it-763cdadb5c20",
        link: "https://medium.com/@ahmedraza1ansari/how-can-genai-improve-and-reform-the-education-sector-instead-of-ruining-it-763cdadb5c20",
        description: "Exploring the transformative potential of Generative AI in education.",
        date: new Date("2024-01-01"),
    });

    return new Response(feed.rss2(), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
