import {deleteProductImage} from './DeleteProductImages';
import axios from 'axios';

const BASE_URL = 'http://localhost:3333'

export const removeProduct = async (product_id, token) => {

  const config = {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }

  await deleteProductImage(product_id).catch(err => {
    console.log(err);
  });

  await axios.post(`${BASE_URL}/products/user/delete`,{
    product_id: product_id
  },config)
    .catch(err => console.log(err))

    return true;
  
};
