import {
    LOGGIN_USER,
    IS_LOADED,
    LOGOUT_USER,
    EXPIRED_LOGIN,
    LOADING_USER
} from './ActionTypes';

import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import { setMessage } from '../actions/message';

import { BASE_URL } from '../../commons/BaseURL';

const db = firestore().collection('users');

const state = {
    enderecos: [{

    }],
    compras: [{
        itens: [],
        status: null
    }],
    vendas: [{
        itens: [],
        status: null
    }],
    products: []
}

export const userLogged = user => {
    return {
        type: LOGGIN_USER,
        payload: user
    }
};

export const createUser = user => {
    return dispatch => {
        axios.post(`${BASE_URL}/user/create`, {
            ...user
        }).catch(err => {
            dispatch(setMessage({ title: 'Erro', message: err }))
        })
    }
};

export const authUser = user => {
    return dispatch => {
        dispatch(loadingUser());
        axios.post(`${BASE_URL}/user/auth`, {
            email: user.email,
            password: user.password
        }).catch(err => {
            dispatch(setMessage({
                title: 'Falha no Login',
                message: 'Email ou Senha Incorretos'
            }));
        }).then(res => {
            const user = {
                ...res.data.user,
                token: res.data.token
            }
            dispatch(userLogged(user));
            dispatch(isLoaded());
        })
    }
};

export const getUser = token => {
    return dispatch => {
        dispatch(loadingUser());
        axios.get(`${BASE_URL}/user/get`, {
            headers: { Authorization: `Bearer ${token}` }
        }).catch(err => {
            if (err.response.status == 401) {
                dispatch(setMessage({
                    title: 'Falha no Login',
                    message: 'É necessário efetuar o login novamente'
                }))
                return
            }
        })
            .then(res => {
                const user = {
                    ...res.data.user,
                    token: res.data.token
                }

                dispatch(userLogged(user));
                dispatch(isLoaded());
            })
    }
};

export const addAddress = data => {
    return async dispatch => {
        const { endereco, token } = data;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.post(`${BASE_URL}/user/set-address`, {
            endereco: endereco
        },
            config
        ).catch(err => console.log(err))
        .then(res =>{
            if(res.status == 200){
                dispatch(getUser(token));
            }
        })
    }
};

export const updateUserCart = (carrinho) =>{
    return dispatch =>{
        
    }
}

export const setUserProducts = (productId, user_id) => {
    return dispatch => {
        db.doc(user_id).get().then(doc => {
            if (!doc.data().products) {
                db.doc(user_id).update({
                    'id': productId
                }).then(res => {
                    console.log('Resposta Set User Products: ' + res);
                });
            } else {
                const userProducts = doc.data().products;
                userProducts.push({
                    id: productId,
                });
                db.doc(user_id).update({
                    products: userProducts
                }).catch(err => dispatch(setMessage({
                    title: 'Erro',
                    message: 'Ocorreu um erro ' + err
                })));
            }
        }).catch(err => console.log(err));
    }
}

export const deleteAddress = data => {
    return async dispatch => {
        const { address_id, token } = data;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios.post(`${BASE_URL}/user/remove-address`, {
            address_id: address_id
        },
            config
        ).catch(err => console.log(err))
            .then(res => {
                if(res.status == 200){
                    dispatch(getUser(token));
                }
            })
    }
};

export const loadingUser = () => {
    return {
        type: LOADING_USER,
    }
}

export const isLoaded = () => {
    return {
        type: IS_LOADED
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
};

export const expiredLogin = () => {
    return {
        type: EXPIRED_LOGIN
    }
};