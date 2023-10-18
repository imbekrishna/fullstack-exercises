import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog, addComment } from '../app/blogSlice';
import { Button, Container, Form } from 'react-bootstrap';

const BlogView = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blogs = useSelector((store) => store.blogs);
  const blog = blogs.find((blog) => blog.id === id);

  const onSubmit = (event) => {
    event.preventDefault();
    const body = event.target.body.value;
    event.target.body.value = '';
    dispatch(addComment(id, body));
  };

  if (!blog) {
    return;
  }
  return (
    <Container>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{' '}
        <Button size="sm" onClick={() => dispatch(likeBlog(blog.id))}>
          like
        </Button>
      </p>
      <p>added by {blog.user.name}</p>

      <h3>comments</h3>
      <Container>
        <Form className="row" onSubmit={onSubmit}>
          <Form.Control className="col" type="text" name="body" required />
          <Button
            className="col-3 ms-3"
            size="sm"
            variant="outline-primary"
            type="submit"
          >
            add comment
          </Button>
        </Form>
      </Container>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.body}</li>
        ))}
      </ul>
    </Container>
  );
};

export default BlogView;
