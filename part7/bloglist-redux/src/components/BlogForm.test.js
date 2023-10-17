import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

describe('<BlogForm/>', () => {
  test('should call the event handler with details', async () => {
    const onSubmit = jest.fn();
    const user = userEvent.setup();

    render(<BlogForm addBlog={onSubmit} />);

    const titleInput = screen.getByPlaceholderText('Blog title');
    const authorInput = screen.getByPlaceholderText('Blog author');
    const urlInput = screen.getByPlaceholderText('Blog url');

    const createButton = screen.getByText('Create');

    await user.type(titleInput, 'React testing with jest');
    await user.type(authorInput, 'imbekrishna');
    await user.type(urlInput, 'https://imbekrishna.github.io');

    await user.click(createButton);


    expect(onSubmit.mock.calls).toHaveLength(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      title: 'React testing with jest',
      author: 'imbekrishna',
      url: 'https://imbekrishna.github.io',
    });
  });
});
