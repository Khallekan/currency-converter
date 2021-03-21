import React from 'react';

const CurrencyRow = ({
  currency,
  selected,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) => {
  return (
    <div className='converter-row'>
      <input
        type='number'
        name='input'
        id='input'
        autoComplete='off'
        min='0'
        value={amount || 0}
        onChange={onChangeAmount}
      />
      <select
        name='rates'
        id='rates'
        value={selected}
        onChange={onChangeCurrency}
      >
        {currency.map((item, index) => {
          return (
            <option key={index} value={item} className='currency-options'>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CurrencyRow;
