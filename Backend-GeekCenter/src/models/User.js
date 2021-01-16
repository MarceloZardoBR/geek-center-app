const { Schema, model} = require('mongoose');

const CarrinhoSchema = new Schema({
    itens:[{
        _id: String,
        quantidade: Number,
        preco: String, 
    }],
    status:String,
    modified_on: Date
});

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        required: true,
        default: Date.now()
    },
    localizacao:{
        type: String,
        required: true,
    },
    enderecos:[{
        rua:String,
        numero:String,
        bairro:String,
        cidade:String,
        estado:String,
        cep:Number
    }],
    compras:[{
        itens:[{
            type: String, ref:'Product'
        }],
        status:String
    }],
    vendas:[{
        itens:[{
            type: String, ref:'Product'
        }],
        status:String
    }],
    carrinho:{
        type: CarrinhoSchema,
        default:{
            itens:[],
            status:"Ativo"
        }
    }
});

module.exports = model('Users', UserSchema);