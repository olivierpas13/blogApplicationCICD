import NewBlogForm from './NewBlogForm';
import Togglable from './Togglable';
import Blogs from './Blogs';

const Home = () => (
  <div>
    <Togglable buttonLabel={'Create new'}>
      <NewBlogForm/>
    </Togglable>
    <Blogs/>
  </div>
);

export default Home;
