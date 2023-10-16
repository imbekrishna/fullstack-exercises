import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAll, update } from './requests';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotificationDispatch } from './helpers/contextHelper';

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const updateMutation = useMutation(update, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((and) =>
          and.id === updatedAnecdote.id ? updatedAnecdote : and
        )
      );

      notificationDispatch(`you voted '${updatedAnecdote.content}'`);
    },
  });

  const handleVote = (anecdote) => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const { isError, isLoading, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (isLoading) {
    return <p>loading data...</p>;
  }

  if (isError) {
    return <p>anecdote service not available due to problems in server</p>;
  }

  const anecdotes = data;

  return (
    <>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default App;
