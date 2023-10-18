import React from 'react';
import { useParams } from 'react-router-dom';
import { comment, getOne, likeBlog } from '../services/blogs';
import { Button, Container, Form } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const BlogView = () => {
  const id = useParams().id;

  const queryClient = useQueryClient();

  const blogInfo = useQuery({
    queryKey: ['blogInfo'],
    queryFn: () => getOne(id),
  });

  const commentMutation = useMutation({
    mutationFn: comment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogInfo'] });
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogInfo'] });
    },
  });

  if (blogInfo.isLoading) {
    return <p>loading...</p>;
  }

  const blog = blogInfo.data;
  const onSubmit = (event) => {
    event.preventDefault();
    const newComment = event.target.body.value;
    event.target.body.value = '';
    commentMutation.mutate({ id: blog.id, newComment });
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
        <Button size="sm" onClick={() => likeBlogMutation.mutate(blog.id)}>
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
