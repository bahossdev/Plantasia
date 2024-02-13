// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_BLOG } from '../utils/queries';

const SingleBlog = () => {
  const { blogId } = useParams();
console.log(blogId)
  const { loading, data, error } = useQuery(QUERY_SINGLE_BLOG, {
    variables: { blogId: blogId },
  });
  console.log(data)
  const blog = data?.blog || {};

  if (loading) {return <div>Loading...</div>};
  if (error) {return <p>Error: {error.message}</p>};

  return (
    <div className="my-3">
      <h3>
        {blog.blogAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this blog on {blog.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        {blog.blogText}
      </div>
      <div className="my-5">
        <CommentList comments={blog.comments} blogId={blog._id}/>
      </div>
      <div className="m-3 p-4" >
        <CommentForm blogId={blog._id} />
      </div>
    </div>
  );
};

export default SingleBlog;
