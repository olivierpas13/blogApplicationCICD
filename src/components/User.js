const User = ({ user }) => (
  <div>
    <h1>{user.name}</h1>
    <h2>Added blogs</h2>
    <ul>
      {user.blogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
    </ul>
  </div>
);

export default User;
