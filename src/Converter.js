import React, { useEffect, useState } from 'react';
import CurrencyRow from './CurrencyRow';
import CurrencyName from './CurrencyName';

const Converter = () => {
  const [currency, setCurrency] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [toOrFrom, setToOrFrom] = useState(true);

  // console.log(exchangeRate);

  let fromAmount, toAmount;
  if (toOrFrom) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    const url = `https://api.exchangeratesapi.io/latest`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        const toCurrency = Object.keys(data.rates)[26];
        // console.log(data.rates);
        setCurrency([data.base, ...Object.keys(data.rates)]);
        setFrom(data.base);
        setTo(toCurrency);
        setExchangeRate(data.rates[toCurrency]);
        return true;
      });
  }, []);

  useEffect(() => {
    if (from != null && to != null) {
      const url = `https://api.exchangeratesapi.io/latest`;
      fetch(`${url}?base=${from}&symbols=${to}`)
        .then((resp) => resp.json())
        .then((data) => {
          setExchangeRate(data.rates[to]);
        });
    }
  }, [from, to]);

  const handleFromChange = (e) => {
    setAmount(e.target.value);
    return setToOrFrom(true);
  };
  const handleToChange = (e) => {
    setAmount(e.target.value);
    return setToOrFrom(false);
  };

  return (
    <div className='converter'>
      <CurrencyRow
        currency={currency}
        selected={from}
        amount={fromAmount}
        onChangeCurrency={(e) => setFrom(e.target.value)}
        onChangeAmount={handleFromChange}
      />
      <CurrencyName name={from} />
      {toOrFrom && <div className='converter-img'>⬇</div>}
      {!toOrFrom && <div className='converter-img'>⬆</div>}
      <CurrencyRow
        currency={currency}
        selected={to}
        amount={toAmount}
        onChangeCurrency={(e) => setTo(e.target.value)}
        onChangeAmount={handleToChange}
      />
      <CurrencyName name={to} />
    </div>
  );
};

export default Converter;
