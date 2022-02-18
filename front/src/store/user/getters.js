export const user = state => {
  return {
    isuserLogin: state.token.length > 0,
    isAdmin: state.role === 2,
    ...state
  }
}
