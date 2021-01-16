import {
    LOGGIN_USER,
    IS_LOADED,
    LOGOUT_USER,
    EXPIRED_LOGIN,
    LOADING_USER,
    ADD_PRODUCT_CART,
    GET_USER_CART
} from '../actions/ActionTypes';

const initialState = {
    id: null,
    name:null,
    lastname:null,
    localizacao: null,
    email:null,
    token:null,
    enderecos:[],
    compras:[],
    vendas:[],
    createdAt:null,
    products:[],
    carrinho:[],
    successLogged:null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGGIN_USER:
            return{
                ...state,
                id: action.payload._id,
                name: action.payload.name,
                lastname: action.payload.lastname,
                localizacao: action.payload.localizacao,
                email: action.payload.email,
                token: action.payload.token,
                enderecos: action.payload.enderecos,
                compras: action.payload.compras,
                vendas: action.payload.vendas,
                products: action.payload.products,
                createdAt: action.payload.createdAt,
                carrinho: action.payload.carrinho
            }
        case LOADING_USER:
            return {
                ...state,
                successLogged: false,
            }
        case IS_LOADED:
            return {
                ...state,
                successLogged: true
            }
        case LOGOUT_USER:
            return {
                ...initialState
            }
        case EXPIRED_LOGIN:
            return {
                ...initialState
            }
        case ADD_PRODUCT_CART:
            return {
                ...state,
                carrinho: action.payload.carrinho
            }
        default: return state
    }
}

export default reducer;