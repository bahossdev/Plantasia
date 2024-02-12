import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_BLOGS } from '../../utils/queries';
import BlogForm from '../BlogForm';

const BlogList = ({ title, showTitle = true, showUsername = true }) => {
  const { loading, data } = useQuery(QUERY_BLOGS);
  
  if (loading) return <p>Loading...</p>;
  if (!data || !data.blogs || data.blogs.length === 0) {
    return <h3>No Blogs Yet</h3>;
  }

  return (
    <div>
      <BlogForm />
      {showTitle && <h3>{title}</h3>}
      {data.blogs.map((blog) => (
        <div key={blog._id} className="card mb-3">
          <h4 className="card-header bg-primary text-light p-2 m-0">
            {showUsername ? (
              <Link
                className="text-light"
                to={`/profiles/${blog.blogAuthor}`}
              >
                {blog.blogAuthor} <br />
                <span style={{ fontSize: '1rem' }}>
                  had this blog on {blog.createdAt}
                </span>
              </Link>
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
  );
};

export default BlogList;
