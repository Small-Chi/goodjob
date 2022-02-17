export const user = state => {
  return {
    isuserLogin: state.token.length > 0,
    // 用 id 判斷是不是本人
    isMeLogin: state._id !== user._id,
    isAdmin: state.role === 2,
    ...state
  }
}
