import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog } from '../app/blogSlice';

const BlogView = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector((store) => store.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  if (!blogs) {
    return;
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => dispatch(likeBlog(blog.id))}>like</button>
      </p>
      <p>added by {blog.user.name}</p>

      <h3>comments</h3>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.body}</li>
        ))}
      </ul>
    </div>
  );
};

export default BlogView;
