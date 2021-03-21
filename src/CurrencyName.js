import React, { useState, useEffect } from 'react';

const CurrencyName = ({ name }) => {
  const [currencyName, setCurrencyName] = useState(``);

  useEffect(() => {
    if (name != null) {
      const url = `https://restcountries.eu/rest/v2/currency/${name}`;
      fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
          setCurrencyName(data[0].currencies[0].name);
        });
    }
  }, [name]);

  return (
    <>
      <h1 className='currency-name'>{currencyName}</h1>
    </>
  );
};

export default CurrencyName;
