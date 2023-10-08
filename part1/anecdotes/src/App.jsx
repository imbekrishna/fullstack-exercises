import { useState } from "react";

const Button = ({ clickHandler, text }) => {
  return <button onClick={clickHandler}>{text}</button>;
};

const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Display = ({ text, vote }) => {
  return (
    <p>
      {text} <br /> has {vote} vote
    </p>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const handleClick = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index);
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const maxVote = () => {
    const copyArr = [...votes];

    const max = copyArr.reduce((a, b) => Math.max(a, b));
    const maxIndex = votes.indexOf(max);

    return maxIndex;
  };

  const mostVotedIndex = maxVote();

  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <Display text={anecdotes[selected]} vote={votes[selected]} />
      <Button text={"next anecdote"} clickHandler={handleClick} />
      <Button text={"vote"} clickHandler={handleVote} />
      <Header text={"Anecdote with most vote"} />
      <Display text={anecdotes[mostVotedIndex]} vote={votes[mostVotedIndex]} />
    </div>
  );
};

export default App;
