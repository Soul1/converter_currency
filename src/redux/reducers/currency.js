import axios from "axios";

const initState = null

const INIT_CURRENCY = 'currency/INIT_CURRENCY'

export const currency = (state = initState, action) => {
  switch (action.type) {
    case INIT_CURRENCY: return action.data
    default:
      return state
  }
}

const setCurrency = (data) => ({type: INIT_CURRENCY, data})

export const getCurrency = () => async (dispatch) => {
  try {
    const {data: {USD_RUB, RUB_USD}} = await axios.get('https://free.currconv.com/api/v7/convert?apiKey=7f7168a5cd1f582bcdfe&q=USD_RUB,RUB_USD&compact=ultra')
    const {data: {EUR_RUB, RUB_EUR}} = await axios.get('https://free.currconv.com/api/v7/convert?apiKey=7f7168a5cd1f582bcdfe&q=EUR_RUB,RUB_EUR&compact=ultra')
    const {data: {USD_EUR, EUR_USD}} = await axios.get('https://free.currconv.com/api/v7/convert?apiKey=7f7168a5cd1f582bcdfe&q=USD_EUR,EUR_USD&compact=ultra')

    //fixme: запрос на обновление через каждые 15 с нереально сделать, из-за того что у стороннего api есть ограниченное количество запросов в месяц

    // const {USD_RUB, RUB_USD, EUR_RUB, RUB_EUR, USD_EUR, EUR_USD} = {
    //   "USD_RUB": 79.614499,
    //   "RUB_USD": 0.012564,
    //   "EUR_RUB": 89.24517,
    //   "RUB_EUR": 0.011164,
    //   "USD_EUR": 0.88867,
    //   "EUR_USD": 1.124138
    // }

    dispatch(setCurrency({USD_RUB, RUB_USD, EUR_RUB, RUB_EUR, USD_EUR, EUR_USD}))
  } catch (e) {
    console.log(e, {e}, e.request, 'getCurrency')
  }
}


