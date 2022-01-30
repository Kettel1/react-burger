import reducers from "../services/reducers";
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {IAuthActions} from "./authTypes";

const { store } = reducers()

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, IAuthActions>>;

export type AppDispatch = Dispatch<IAuthActions>;
