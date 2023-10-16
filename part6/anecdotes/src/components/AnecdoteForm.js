import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/anecdoteReducer';
import anecService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const add = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newNote = await anecService.create(content);
    event.target.anecdote.value = '';
    dispatch(addAnecdote(newNote));
  };
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={add}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
