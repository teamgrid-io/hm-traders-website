import {getProducts } from "../lib/api";
export default async function Home() {
  const posts = await getProducts();

  return (
    <div>
      <h1>Blog Posts</h1>

      {posts.map((post: any) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.slug}</p>
          <p>{post.createdAt}</p>
        </div>
      ))}
    </div>
  );
}