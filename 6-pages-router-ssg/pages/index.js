import Post from '@/components/Post';

// This function gets called at build time
export async function getStaticProps() {
  
  console.log('calling https://jsonplaceholder.typicode.com/posts');

  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await response.json();
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
};

export default function Home({ posts }) {
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
