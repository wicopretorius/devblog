// import Image from "next/image";
// import styles from "./page.module.css";
import Link from 'next/link'
import { client, urlFor } from '../lib/sanity'

export default async function Home() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    mainImage,
    publishedAt
  }`

  const posts = await client.fetch(query)

  return (
    <main className="max-w-4xl mx-auto p-5">
      <h1 className="text-4xl font-bold mb-6">DevBlog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map(post => (
          <Link
            key={post._id}
            href={`/post/${post.slug.current}`}
            className="block"
          >
            <article className="border p-4 rounded shadow-lg bg-white hover:shadow-2xl transition">
              {post.mainImage && (
                <img
                  src={urlFor(post.mainImage).width(400).url()}
                  alt={post.title}
                  className="rounded mb-4"
                />
              )}
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleString()}</p>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}

// export default function Page() {
//   return (
//     <main className="p-8">
//       <div className="rounded-xl bg-blue-600 p-6 text-white shadow">
//         Tailwind v4 is working 🎉
//       </div>
//     </main>
//   );
// }
