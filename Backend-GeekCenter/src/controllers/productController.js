const ProductModel = require('../models/Products');

module.exports = {

    async createProduct(req, res) {
        const user_id = req.userId;

        const product = {
            user_id: user_id,
            ...req.body.product
        }

        ProductModel.create(product)
            .catch(err => res.status(500).send(err))
            .then(response => {
                res.status(200).send('Product Created');
            })
    },

    async getUserProducts(req, res) {
        const user_id = req.userId;

        const products = [];

        await ProductModel.find({user_id: user_id }, (err, response) => {
            if (err) {
                res.status(500).send(err);
            }
            products.push(...response);
        });

        res.send(products);
    },

    async deleteProduct(req, res){

        await ProductModel.deleteOne({_id: req.body.product_id}, (err, response) => {
            if(err){
                res.status(500).send(err);
            }
            res.status(200).send('Product Deleted');
        });

    },

    async getProductByCategory(req, res){

        let products = null;
        //ToDo - Remover Dados Sensiveis

        await ProductModel.find({categoria: req.query.category_id}, (err, response) =>{
            if(err){
                res.status(500).send(err);
            }
            products = response;
        })

        res.send(products);
    },

    async searchProductsName(req, res){

        const valueToSearch = req.query.search;

        ProductModel.find({$text:{$search:valueToSearch,$caseSensitive:false}}).exec((err, response) =>{
            if(err){
                res.status(400).send(err);
            }
            res.send(response);
        });

    },

    async getProductsById(req, res){

        const products_ids = req.body.products_ids;

        await ProductModel.find({ _id: { $in: products_ids }},(err, response) =>{
            if(err){
                res.status(400).send(err.response);
            }
            
            let products = [];

            for(let prod in response){
                products.push({
                    _id: response[prod]._id,
                    titulo: response[prod].titulo,
                    fotos: response[prod].fotos,
                    preco: response[prod].preco,
                    categoria: response[prod].categoria
                })
            }

            res.send(products);
        })

        
    }
}