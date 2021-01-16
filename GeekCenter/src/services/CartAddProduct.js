import Axios from 'axios';
import { BASE_URL } from '../commons/BaseURL';

export const cartAddProduct = async (product_id, token, quantidade) => {

    let response = false;

    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    await Axios.post(`${BASE_URL}/user/cart/add`,{
        product_id: product_id,
        quantidade: quantidade
    },config).then(res => {
        if(res) response = true;
    }).catch(err => console.log(err.response));

    return response;
}
