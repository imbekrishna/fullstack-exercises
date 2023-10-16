import { useSelector, useDispatch } from 'react-redux';
import { updateAnecdote } from '../reducers/anecdoteReducer';
import { addMessage } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, search }) => {
    const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes);
    if (!search) {
      return sorted;
    }

    return sorted.filter((and) =>
      and.content.toLowerCase().includes(search.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(updateAnecdote(id));
    dispatch(addMessage(`you voted '${content}'`));
    setTimeout(() => {
      dispatch(addMessage(null));
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
