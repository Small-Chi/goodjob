export const owner = state => {
  return {
    isownerLogin: state.token.length > 1,
    isAdmin: state.role === 2,
    ...state
  }
}
