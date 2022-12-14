import { useDispatch } from 'react-redux';
import { deleteOneBlog, voteForBlog } from '../reducers/blogReducer';
import Comments from './Comments';

const OneBlog = ({
  blog, loggedUser,
}) => {
  const dispatch = useDispatch();

  const likeBlog = (id, e) => {
    e.preventDefault();
    dispatch(voteForBlog(id));
  };

  const removeBlog = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteOneBlog(blog.id));
    }
  };

  return (

    <div className='blog'>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button className='likeButton' onClick={(e) => likeBlog(blog.id, e)}>Like</button>
      </p>
      <p>Added by {blog.user.username}</p>
      <Comments comments={blog.comments} blogId={blog.id} />
      {loggedUser && (blog.user.username === loggedUser.username)
      && <button onClick={(e) => removeBlog(e)}>Delete</button>}
    </div>
  );
};

export default OneBlog;
