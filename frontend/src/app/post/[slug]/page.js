import { client, urlFor } from '../../../lib/sanity'
// If you use Portable Text, install and import the renderer:
import { PortableText } from '@portabletext/react'

export default async function PostPage({ params }) {
  // Await params if it's a Promise (for edge cases)
  const { slug } = await params

  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    mainImage,
    publishedAt,
    body,
    author->{name}
  }`
  const post = await client.fetch(query, { slug })

  if (!post) {
    return <div className="p-8">Post not found.</div>
  }

  return (
    <main className="max-w-2xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-1">
        {new Date(post.publishedAt).toLocaleString()}
      </p>
      {post.author?.name && (
        <p className="text-sm text-gray-700 mb-4">By {post.author.name}</p>
      )}
      {post.mainImage && (
        <img
          src={urlFor(post.mainImage).width(300).url()}
          alt={post.title}
          className="rounded mb-6"
        />
      )}
      <div className="prose">
        {post.body ? (
          <PortableText value={post.body} />
        ) : (
          <p>No content.</p>
        )}
      </div>
    </main>
  )
}