import axios from 'axios';

import { BASE_URL } from '../commons/BaseURL';

export const getUserById = async (user_id) =>{

    let user = ''; 

    await axios.get(`${BASE_URL}/user/get/id?id=${user_id}`)
        .catch(err => console.log(err))
        .then(res => {
            user = res;
        })

    return user;
}