import reducers from "../services/store";
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TAuthActions } from "./authTypes";
import { TBurgerConstructorActions } from "./burgerConstructorTypes";
import { TBurgerIngredientsActions } from "./burgerIngredientsTypes";
import { TOrderActions } from "./ordersTypes";
import { TFeedActions } from "./feedTypes";

type AllActions =
    | TAuthActions
    | TBurgerConstructorActions
    | TBurgerIngredientsActions
    | TOrderActions
    | TFeedActions

const { store } = reducers()

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, AllActions>>;

export type dispatch = <TReturn = void>(action: AllActions | AppThunk) => TReturn;

export type AppDispatch = Dispatch<AllActions>;
