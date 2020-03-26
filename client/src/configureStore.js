// import { createStore, applyMiddleware } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redu-persist/lib/storage";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// import { truckReducer } from "./reducers/truck-reducer";

// const persistConfig = {
//     key: 'root',
//     storage
// };

// const persistedReducer = persistReducer(persistConfig, truckReducer, applyMiddleware(thunk, logger));

// export default () => {
//     let store = createStore(persistedReducer);
//     let persistor = persistStore(store);
//     return { store, persistor };
// }

