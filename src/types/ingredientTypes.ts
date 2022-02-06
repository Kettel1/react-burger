export interface IIngredient {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    dragId?: string;
    idx?: number;
}

export interface IResponse {
    password: string;
    email: string;
    token?: string;
}

export interface IUserTypes {
    name: string;
    email: string;
}

export interface ILoginUserTypes {
    email: string;
    password: string;
}

export interface IRegisterUserTypes extends ILoginUserTypes {
    name?: string;
}

export interface IForgotPasswordUserTypes {
    email: string;
}

export interface CustomResponse extends Body {
    readonly message?: string;
}

export interface IUpdateUserTypes extends IUserTypes {
    password?: string;
}

export interface IResetPasswordTypes {
    password: string;
    token: string;
}
