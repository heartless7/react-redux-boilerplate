import reducer, { actions, selectCounter } from '../counter'

describe('Counter reducer', () => {
  let state

  it('should return initial state of 0', () => {
    state = reducer(state, {})
    expect(state).toEqual(0)
  })

  it('should increment the counter by value, passed via increment action', () => {
    state = reducer(state, actions.increment(3))
    expect(state).toEqual(3)
    state = reducer(state, actions.increment(2))
    expect(state).toEqual(5)
  })

  it('should reset back to initial state on reset action', () => {
    state = reducer(state, actions.reset())
    expect(state).toEqual(0)
  })
})

describe('Counter selectors', () => {
  let state

  it('selectCounter should select counters value', () => {
    state = { counter: 10 }
    expect(selectCounter(state)).toEqual(10)
    state = { counter: 20 }
    expect(selectCounter(state)).toEqual(20)
  })
})
