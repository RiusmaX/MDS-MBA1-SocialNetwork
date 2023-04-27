import React from 'react'

const CounterContext = React.createContext()

const actionTypes = {
  INCREMENT: 'INCREMENT',
  DECREMENT: 'DECREMENT'
}

const initialState = {
  counter: 0
}

// state = initialState
// action = { type: actionTypes, data }
const CounterReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      // Jamais de traitement, jamais de déclaration ou d'affectation de variables
      return {
        counter: state.counter + 1
      }
    case actionTypes.DECREMENT:
      return {
        counter: state.counter - 1
      }
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

const CounterContextFactory = (dispatch) => ({
  increment: () => {
    dispatch({
      type: actionTypes.INCREMENT,
      data: null
    })
  },
  decrement: () => {
    dispatch({
      type: actionTypes.DECREMENT,
      data: null
    })
  }
})

const CounterProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CounterReducer, initialState)
  return (
    <CounterContext.Provider value={{ state, ...CounterContextFactory(dispatch) }}>
      {children}
    </CounterContext.Provider>
  )
}

const useCounter = () => {
  const context = React.useContext(CounterContext)
  if (!context) throw new Error('useCounter must be used inside a CounterProvider')
  return context
}

export {
  CounterProvider,
  useCounter
}
