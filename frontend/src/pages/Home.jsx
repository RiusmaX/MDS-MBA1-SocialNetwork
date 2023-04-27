import { useState } from 'react'
import { CounterProvider, useCounter } from '../contexts/CounterContext'

const Home = () => {
  return (
    <>
      <h1>Accueil</h1>
      <CounterProvider>
        <CounterView />
        <CounterActions />
      </CounterProvider>
    </>
  )
}

const CounterView = () => {
  const { state } = useCounter()
  return (
    <h3>Counter: {state.counter}</h3>
  )
}

const CounterActions = () => {
  const [value, setValue] = useState()
  const { increment, decrement } = useCounter()
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={() => increment()}>+</button>
      <br />
      <label>
        Nombre :
        <input
          type='number'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <br />
      <button onClick={() => increment(Number(value))}>Ajouter au compteur</button>
    </>
  )
}

export default Home
