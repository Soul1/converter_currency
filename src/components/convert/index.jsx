import React, {useCallback} from 'react';

const enumCurrency = ['RUB', 'USD', 'EUR']

const Convert = ({value, onChange, setFocus, activeBtn, setActiveBtn, convertValue, currentValueName, currentConvertValueName}) => {

  const onActiveBtn = (i) => {
    return () => {
      if (i === currentConvertValueName || i === currentValueName) {
        alert('Выберите другую валюту')
      } else {
        setActiveBtn(i)
      }
    }
  }

  const enumCurrencyMap = useCallback(
    i => <div key={i} onClick={onActiveBtn(i)} className={`convert__btns-btn ${activeBtn === i ? 'active' : ''}`}>{i}</div>,
    [activeBtn, currentConvertValueName, currentValueName]
  )

  const onFocus = () => setFocus(true)
  const onBlur = () => setFocus(false)

  return (
    <div className='convert'>
      <div className="convert__btns">
        {enumCurrency.map(enumCurrencyMap)}
      </div>
      <div className="convert__input">
        <label className="convert__input-label">
          <input value={value} onChange={onChange} onFocus={onFocus} onBlur={onBlur} type="text"/>
          <span className="convert__input-label__value">
            1 {currentValueName} = {convertValue ? convertValue.toFixed(2) : 1} {currentConvertValueName}
          </span>
        </label>
      </div>
    </div>
  );
};

export default Convert;
