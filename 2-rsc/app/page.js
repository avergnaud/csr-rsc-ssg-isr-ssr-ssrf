import Post from './Post';

export default async function Home() {

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();

  return (
    <main>
      <h1>Hello</h1>
      <table>
        <tbody>
          <tr>
            <th>userId</th>
            <th>title</th>
            <th>body</th>
          </tr>
          {posts.map(post => <Post
            key={post.id}
            userId={post.userId}
            title={post.title}
            body={post.body}
          />)}
        </tbody>
      </table>
    </main>
  );
}