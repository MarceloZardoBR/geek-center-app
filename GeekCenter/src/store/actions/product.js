import {
  SET_PRODUCTS,
  ADDING_PRODUCT,
  PRODUCT_ADDED,
  PRODUCT_REMOVED,
  REQ_REMOVE_PRODUCT,
} from '../actions/ActionTypes';

import axios from 'axios';
import { uploadImage } from '../../services/UploadProductImage';
import { fetchProducts } from '../../services/FetchUserProducts';
import { removeProduct } from '../../services/RemoveProduct';
import { getUser } from './user';
import { setMessage } from './message';
import { BASE_URL } from '../../commons/BaseURL';

//promisse de upload do Array de Imagens
const uploadImageArray = async (images, productId) => {
  return Promise.all(images.map(image => uploadImage(image.base64, productId)));
};

export const newProduct = (product, token) => {
  return async dispatch => {
    dispatch(addingProduct());
    const imagesUrls = [];

    await uploadImageArray(product.pictures, product._id)
      .then(urls => imagesUrls.push(...urls))
      .catch(err => console.log(err));

    if (imagesUrls.length >= 1) {
      const price = product.preco.replace("R$","");
      const newProduct = {
        ...product,
        preco: price,
        fotos: imagesUrls,
        status: 'Aberto',
      };

      const config = {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }

      await axios.post(`${BASE_URL}/product/create`,{
        product: newProduct
      },config).catch(err => console.log(err.response))
        .then(res =>{
          console.log(res);
        })

      dispatch(getUser(token));
      dispatch(productAdded()); 
    }else{
      dispatch(setMessage({title: 'Erro', message: 'Ocorreu um erro ao fazer upload da Imagem'}));
    }
  };
};

export const getUserProducts = (token) => {
  return async dispatch => {
    await fetchProducts(token).then(res => {
      dispatch(updateUserProducts(res));
      dispatch(reqRemoveProduct());
    });
  };
};

export const updateUserProducts = products => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

export const deleteUserProduct = (product_id, token) => {
  return async dispatch => {
    dispatch(reqRemoveProduct());
    await removeProduct(product_id, token)
      .then(res => {
        if(res){
          dispatch(productRemoved());
        }
      });
  };
};

export const addingProduct = () => {
  return {
    type: ADDING_PRODUCT,
  };
};

export const productAdded = () => {
  return {
    type: PRODUCT_ADDED,
  };
};

export const reqRemoveProduct = () =>{
  return {
    type: REQ_REMOVE_PRODUCT,
  };
};

export const productRemoved = () =>{
  return {
    type: PRODUCT_REMOVED
  };
};