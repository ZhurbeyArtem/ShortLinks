import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlicer from './userSlicer'
import { linksApi } from '../pages/link/store'
import { authApi } from '../pages/auth/store'

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const rootReducer = combineReducers({
  user: authSlicer,
  [linksApi.reducerPath]: linksApi.reducer,
  [authApi.reducerPath]: authApi.reducer
})
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore 
   ({
     reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(linksApi.middleware, authApi.middleware)
  })

export const persister = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store