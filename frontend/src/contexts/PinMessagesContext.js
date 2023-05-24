import React from 'react'

const PinContext = React.createContext()

const actionTypes = {
  ADD_PIN: 'ADD_PIN',
  REMOVE_PIN: 'REMOVE_PIN'
}

const initialState = {
  pinnedIds: []
}

const PinReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_PIN:
      return {
        pinnedIds: [...state.pinnedIds, action.id]
      }
    case actionTypes.REMOVE_PIN:
      return {
        pinnedIds: state.pinnedIds.filter((id) => id !== action.id)
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const PinContextFactory = (dispatch) => ({
  addPin: (id) => {
    dispatch({
      type: actionTypes.ADD_PIN,
      id
    })
  },
  removePin: (id) => {
    dispatch({
      type: actionTypes.REMOVE_PIN,
      id
    })
  }
})

const PinProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(PinReducer, initialState)
  return (
    <PinContext.Provider value={{ state, ...PinContextFactory(dispatch) }}>
      {children}
    </PinContext.Provider>
  )
}

const usePin = () => {
  const context = React.useContext(PinContext)
  if (!context) throw new Error('usePin must be used inside a PinProvider')
  return context
}

export { PinProvider, usePin }
