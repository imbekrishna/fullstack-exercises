import { useSelector, useDispatch } from 'react-redux';
import { updateAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, search }) => {
    if (!search) {
      return anecdotes.sort((a, b) => b.votes - a.votes);
    }

    return anecdotes.filter((and) =>
      and.content.toLowerCase().includes(search.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(updateAnecdote(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
