import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

describe('<Blog/>', () => {
  let likeBlog;
  let removeBlog;
  let container;

  beforeEach(() => {
    const blog = {
      title: 'A blog with title',
      author: 'roronoa',
      likes: 10,
      url: 'https://www.example.com',
      user: {
        id: 'somerandomthsa',
        username: 'root',
      },
    };

    likeBlog = jest.fn();
    removeBlog = jest.fn();

    container = render(
      <Blog
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        userId="somerandomthsa"
      />
    ).container;
  });

  test('should render title and author only at start', async () => {
    const element = container.querySelector('#note-input');
    expect(element).toBeDefined();
  });

  test('should not render detail at start', () => {
    const element = container.querySelector('#detail-div');
    expect(element).toHaveStyle('display: none');
  });

  test('should show detail when clicked view', async () => {
    const element = screen.queryByText('view');
    expect(element).not.toBeNull();

    const user = userEvent.setup();
    await user.click(element);

    const detailDiv = container.querySelector('#detail-div');
    expect(detailDiv).toBeDefined();
    expect(detailDiv).not.toHaveStyle('display: none');

    const likes = screen.queryByText('likes 10');
    expect(likes).toBeDefined();

    const url = container.querySelector('#blog-url');
    expect(url).toBeDefined();
  });

  test('should can click like twice', async () => {
    const element = screen.queryByText('view');
    expect(element).not.toBeNull();

    const user = userEvent.setup();
    await user.click(element);

    const detailDiv = container.querySelector('#detail-div');
    expect(detailDiv).toBeDefined();
    expect(detailDiv).not.toHaveStyle('display: none');

    const likeButton = screen.queryByText('like');
    expect(likeButton).not.toBeNull();

    await user.click(likeButton);
    await user.click(likeButton);

    console.log(likeBlog.mock.calls);
    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
