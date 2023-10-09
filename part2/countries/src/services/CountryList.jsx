export const CountryList = ({ countries, handleClick }) => {
  return (
    <>
      {countries.map((country) => (
        <p key={country.ccn3}>
          {country.name.common}{" "}
          <button onClick={() => handleClick(country)}>show</button>
        </p>
      ))}
    </>
  );
};
