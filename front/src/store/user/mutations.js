// state = user module 的 state
// this.state = vuex root state
// this.state.module名 = 其他 module 的 state
export const login = (state, data) => {
  state.token = data.token
  state.account = data.account
  state.role = data.role
  state.email = data.email
  state.favorite = data.favorite
  state._id = data._id
  state.username = data.username
}

export const logout = (state, data) => {
  state.token = ''
  state.account = ''
  state.role = 0
  state.email = ''
  state.favorite = 0
  state._id = ''
}

export const getInfo = (state, data) => {
  state.account = data.account
  state.role = data.role
  state.email = data.email
  state.favorite = data.favorite
  state._id = data._id
  state.username = data.username
}

export const extend = (state, data) => {
  state.token = data
}

export const updateFavorite = (state, data) => {
  state.favorite = data
}
