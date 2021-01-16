const cartProductQtd = (cart_products) =>{
    const products_ids = cart_products;

    products_amount = {};

    for(let i=0; i<products_ids.length; i++){
        products_amount[products_ids[i]] = (products_amount[products_ids[i]] || 0) + 1;
    }

    return products_amount;

};

export default cartProductQtd;