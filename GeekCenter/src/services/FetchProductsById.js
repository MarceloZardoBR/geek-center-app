import axios from 'axios';
import { BASE_URL } from '../commons/BaseURL';

const sortById = (a,b) =>{

    let compare = 0;

    if(a._id < b._id){
        compare = -1;
    }else if(a._id > b._id){
        compare = 1;
    }

    return compare;
}

const fetchProductsById = async (cart_products) => {

    const products = [];
    let cart = null;
    let auxProducts = null;

    const products_ids = cart_products.map(prd => prd._id);

    await axios.post(`${BASE_URL}/products/get/id`, {
        products_ids: products_ids
    }).then(res => {
        auxProducts = res.data;
    }).catch(err => console.log(err));

    auxProducts = auxProducts.sort(sortById);
    cart = cart_products.sort(sortById);

    for(let i=0;i<auxProducts.length;i++){
        if(auxProducts[i]._id == cart[i]._id){
            products.push({
                ...auxProducts[i],
                quantidade: cart[i].quantidade
            })
        }
    }
    return products;
}

export default fetchProductsById;
