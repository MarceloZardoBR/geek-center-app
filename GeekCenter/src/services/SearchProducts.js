import axios from 'axios';

import { BASE_URL } from '../commons/BaseURL';

export const searchProducts = async (value) =>{

    let response = [];

    await axios.get(`${BASE_URL}/products/find/?search=${value}`)
        .then(res => {
            response = res.data;
        }).catch(err => console.log(err));

    return response;
}