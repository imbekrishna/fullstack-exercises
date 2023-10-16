import { useNotificationDispatch } from '../helpers/contextHelper';
import { createNew } from '../requests';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const createNewMutation = useMutation(createNew, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));

      notificationDispatch(`Added '${newAnecdote.content}'`);
    },

    onError: (error) => {
      const errorMessage = error.response.data.error;
      notificationDispatch(errorMessage);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createNewMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
