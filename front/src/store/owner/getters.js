export const owner = (state) => {
  return {
    isownerLogin: state.token.length > 0,
    isAdmin: state.role === 1,
    ...state
  }
}
