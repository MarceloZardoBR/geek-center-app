const { Schema, model } = require('mongoose');

const ProductModel = new Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true,
    },
    quantidade: {
        type: Number,
        required: true
    },
    preco: {
        type: String,
        required: true,
    },
    troca: {
        type: Boolean,
        default: false,
    },
    categoria: {
        type: Number,
        required: true,
    },
    fotos: {
        type: [String]
    },
    status: {
        type: String,
        default: 'Aberto',
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: 'Users',
        required: true
    },
    reserved: [{
        _id: false,
        quantidade: Number,
        user_id: {type: Schema.Types.ObjectId, ref: 'Users'},
        created_on: Date,
        modified_on: Date,
    }]
});

ProductModel.index({ titulo: 'text', descricao: 'text' })

module.exports = model('Product', ProductModel);