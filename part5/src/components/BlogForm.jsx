import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ addBlog, setErrorMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const blog = await blogService.create({ title, author, url });
      addBlog(blog);
      const message = `a new blog ${blog.title} by ${blog.author} added`;
      setErrorMessage({ message: message, isError: false });
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.error(error);
      setErrorMessage({ message: error.message, isError: true });
    }

    setTimeout(() => {
      setErrorMessage({ message: null, isError: false });
    }, 5000);
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
