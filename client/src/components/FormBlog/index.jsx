import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_BLOG } from '../../utils/mutations';
import { QUERY_BLOGS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const BlogForm = () => {
  const [blogText, setBlogText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addBlog, { error }] = useMutation
  (ADD_BLOG, {
    refetchQueries: [
      QUERY_BLOGS,
      'getBlogs',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addBlog({
        variables: {
          blogText,
          blogAuthor: Auth.getProfile().data.username
        },
      });

      setBlogText('');
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'blogText' && value.length <= 280) {
      setBlogText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className='card-icon'>
      <h3>What's on your mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="blogText"
                placeholder="Here's a new blog..."
                value={blogText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="trans" type="submit">
              <img src='/writeblog.gif' className='gif' />
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your blogs. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default BlogForm;
