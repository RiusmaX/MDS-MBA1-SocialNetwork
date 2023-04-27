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
  const { increment, decrement } = useCounter()
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <br />
      <label>
        Nombre :
        <input type='number' />
      </label>
      <br />
      <button>Ajouter au compteur</button>
    </>
  )
}

export default Home
