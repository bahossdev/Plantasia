// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/BlogList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_BLOG } from '../utils/queries';

const SingleBlog = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { blogId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_BLOG, {
    // pass URL parameter
    variables: { blogId: blogId },
  });

  const blog = data?.blog || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {blog.blogAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this blog on {blog.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        {/* <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
        </blockquote> */}
          {blog.blogText}
      </div>

      <div className="my-5">
        <CommentList comments={blog.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <CommentForm blogId={blog._id} />
      </div>
    </div>
  );
};

export default SingleBlog;
