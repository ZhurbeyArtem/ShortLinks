import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: '',
  isAuth: false
}
const authSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload
      state.token = token
      state.isAuth = true
    },

    logOut: (state) => {
      state.token = ''
      state.isAuth = false
    }
  },

})
export default authSlicer.reducer
export const { setCredentials, logOut } = authSlicer.actions




