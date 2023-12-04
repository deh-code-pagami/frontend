import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user-slice'
import groupReducer from './group-slice'

export const store = configureStore({
  reducer: {
    userState: userReducer,
    groupState: groupReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch