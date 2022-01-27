import React, {useEffect, useLayoutEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {circleArrow} from "./components/common/img";
import Convert from "./components/convert";
import {getCurrency} from "./redux/reducers/currency";

const currencySelector = s => s.currency;

const onChange = (e, func) => {
  if (/[0-9]/.test(+e.target.value)) func(+e.target.value)
  else alert('Не правильный ввод')
}

function App() {
  const dispatch = useDispatch()
  const currency = useSelector(currencySelector)
  const [meConvert, setMeConvert] = useState('RUB')
  const [getCovert, setGetConvert] = useState('USD')

  const [meConvertCurrency, setMeConvertCurrency] = useState(1)
  const [getCovertCurrency, setGetConvertCurrency] = useState(1)

  const [meConvertValue, setMeConvertValue] = useState('')
  const [getCovertValue, setGetConvertValue] = useState('')

  const [meFocus, setMeFocus] = useState(false)
  const [getFocus, setGetFocus] = useState(false)

  const onChangeMe = (e) => onChange(e, setMeConvertValue)
  const onChangeGet = (e) => onChange(e, setGetConvertValue)

  useLayoutEffect(() => {
    dispatch(getCurrency())
  }, [])

  useEffect(() => {
    if (currency) {
      setMeConvertCurrency(currency[`${getCovert}_${meConvert}`])
      setGetConvertCurrency(currency[`${meConvert}_${getCovert}`])
    }
  }, [currency, meConvert, getCovert])

  useEffect(() => {
    setGetConvertValue((meConvertValue / getCovertCurrency).toFixed(2))
    setMeConvertValue((getCovertValue / meConvertCurrency).toFixed(2))
  }, [getCovertCurrency, meConvertCurrency])

  useEffect(() => {
    meFocus && setGetConvertValue((meConvertValue / getCovertCurrency).toFixed(2))
  }, [meFocus, meConvertValue])

  useEffect(() => {
    getFocus && setMeConvertValue((getCovertValue / meConvertCurrency).toFixed(2))
  }, [getFocus, getCovertValue])

  const onReversalValues = () => {
    setMeConvertValue(getCovertValue)
    setGetConvertValue(meConvertValue)
    setMeConvert(getCovert)
    setGetConvert(meConvert)
  }

  return (
    <div className="app">
      <Convert value={meConvertValue} onChange={onChangeMe} setFocus={setMeFocus} currentValueName={meConvert}
               currentConvertValueName={getCovert} activeBtn={meConvert} convertValue={getCovertCurrency}
               setActiveBtn={setMeConvert}/>

      <img onClick={onReversalValues} className='circle-arrow' src={circleArrow} alt="circle-arrow"/>

      <Convert value={getCovertValue} onChange={onChangeGet} setFocus={setGetFocus} currentValueName={getCovert}
               currentConvertValueName={meConvert} activeBtn={getCovert} convertValue={meConvertCurrency}
               setActiveBtn={setGetConvert}/>
    </div>
  );
}

export default App;
