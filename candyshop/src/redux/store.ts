import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";


  const cartPersistConfig = {
    key: "cart",
    storage,
    version: 1,
  };


//   Applyi seperate configs to the reducers
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);

//  Combine the persisted reducers
const rootReducers = combineReducers({
    cart: persistedCartReducer,
});


// Create store with combined reducers
export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
