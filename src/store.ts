import {configureStore} from '@reduxjs/toolkit'
import { gifs } from './store/slices/loadDataSlice'

export const store = configureStore({
  reducer: {
    gifs
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
