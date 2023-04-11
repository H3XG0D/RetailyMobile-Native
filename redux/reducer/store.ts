import thunk from 'redux-thunk';
import {combineReducers, applyMiddleware, createStore} from 'redux';
import mainReducer from './reducer';

let rootReducer = combineReducers({
  main: mainReducer,
});

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;
type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;

export type InferActionsTypes<
  T extends {[key: string]: (...args: any[]) => any},
> = ReturnType<PropertiesType<T>>;

let store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
