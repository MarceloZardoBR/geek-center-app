import axios from 'axios';
import { BASE_URL } from '../commons/BaseURL';

export const getProducts = async (category_id) =>{

    let products = null;

    await axios.get(`${BASE_URL}/products/category/?category_id=${category_id}`)
      .catch(err => console.log(err))
      .then(res => {
          products = res.data;
      })

    return products;
}