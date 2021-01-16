import axios from 'axios';
import { BASE_URL } from '../commons/BaseURL'

export const fetchProducts = async (token) => {
    
        const products = [];
        
        await axios.get(`${BASE_URL}/products/user/get`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).catch(err => console.log(err))
          .then(res => {
              products.push(...res.data);
          })

        return products;
};