// state = user module 的 state
// this.state = vuex root state
// this.state.module名 = 其他 module 的 state
export const userlogin = (state, data) => {
  state.token = data.token
  state.account = data.account
  state.role = data.role
  state.email = data.email
  state.cart = data.cart
}

export const userlogout = (state, data) => {
  state.token = ''
  state.account = ''
  state.role = 0
  state.email = ''
  state.cart = 0
}

export const usergetInfo = (state, data) => {
  state.account = data.account
  state.role = data.role
  state.email = data.email
  state.cart = data.cart
}

export const extend = (state, data) => {
  state.token = data
}

export const updateCart = (state, data) => {
  state.cart = data
}
