const ProductModel = require('../models/Products');

module.exports = {

    async setUserProducts(user_id){
        
        const user = await ProductModel.findOne({_id: user_id});

        if(!user){
            console.log('User Not Found');
        }

        user.update({$addToSet:{products}})

    }
}