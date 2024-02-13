import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_BLOGS } from '../utils/queries';
import BlogForm from '../components/BlogForm/index.jsx';

const BlogList = ({  showUsername = true }) => {
  const { loading, data } = useQuery(QUERY_BLOGS);
  
  if (loading) return <p>Loading...</p>;
  if (!data || !data.blogs || data.blogs.length === 0) {
    return <h3>No Blogs Yet</h3>;
  }

  return (
    <div>
      <BlogForm />
      <div>
      {data.blogs.map((blog) => (
        <div key={blog._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
              
            {showUsername ? (
                <p>{blog.blogAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  had this blog on {blog.createdAt}
                </span></p>
            ) : (
              <>
                <span style={{ fontSize: '1rem' }}>
                  You had this blog on {blog.createdAt}
                </span>
              </>
            )}
          </h4>
          <div className="card-body bg-light p-2">
            <p>{blog.blogText}</p>
          </div>
          <Link
            className="btn btn-primary btn-block btn-squared"
            to={`/blogs/${blog._id}`}
          >
            Join the discussion on this blog.
          </Link>
        </div>
        
      ))}
      </div>
    </div>
  );
};

export default BlogList;
