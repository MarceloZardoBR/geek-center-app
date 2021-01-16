const UserModel = require("../models/User");
const ProductModel = require("../models/Products");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../.env");

const generateToken = (user_id) => {
  return jwt.sign({ id: user_id }, secret, {
    expiresIn: 86400,
  });
};

module.exports = {
  async createUser(req, res) {
    const userData = req.body;
    const { email } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (userExist) {
      res.status(409).send("User Already Exists");
    }

    const { password } = userData;

    const hash = await bcrypt.hash(password, 10);

    delete userData.password;

    const user = {
      ...userData,
      password: hash,
    };

    await UserModel.create(user)
      .then((response) => {
        delete response.password;
        res.status(200).send(response);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  },

  async authUser(req, res) {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).send("User does not exists");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      res.status(400).send("Invalid Password");
    }

    user.password = undefined;

    res.send({
      user,
      token: generateToken(user._id),
    });
  },

  async getUser(req, res) {
    if (!req.userId) {
      res.status(401).send({ Error: "ID not provided" });
    }

    const user = await UserModel.findOne({ _id: req.userId });

    if (!user) {
      res.status(401).send("User Not Found");
    }

    user.password = undefined;

    const token = generateToken(user._id);
    res.send({
      user,
      token,
    });
  },

  async addAdress(req, res) {
    const user_id = req.userId;

    const user = await UserModel.findById(user_id);

    if (!user) {
      res.status(401).send("User Not Found");
    }

    const enderecos = req.body.endereco;
    user.update({ $addToSet: { enderecos: enderecos } }, (err, raw) => {
      if (err) {
        res.status(501).send(err);
      }
      res.status(200).send("OK");
    });
  },

  async removeAddress(req, res) {
    const user_id = req.userId;

    const user = await UserModel.findById(user_id);

    if (!user) {
      res.status(401).send("User Not Found");
    }

    const address_id = req.body.address_id;

    user.update({ $pull: { enderecos: { _id: address_id } } }, (err, raw) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).send("OK");
    });
  },

  async getUserById(req, res) {
    const data = await UserModel.findOne({ _id: req.query.id });

    if (!data) {
      res.status(400).send("User Not Found");
    }

    const { name, lastname, email } = data;

    const user = {
      name,
      lastname,
      email,
    };

    res.send(user);
  },

  async cartAddProduct(req, res) {
    const userId = req.userId;
    const { product_id, quantidade } = req.body;

    const product = await ProductModel.findOne({ _id: product_id });

    if (product.quantidade < quantidade) {
      res.status(409).send("Not Enough Amount");
    }

    const rawData = await UserModel.findOne({ _id: userId });

    const { carrinho } = rawData;

    let oldQuantity = 0;
    let contains = false;

    for (let i = 0; i < carrinho.itens.length; i++) {
      if (carrinho.itens[i]._id == product_id) {
        oldQuantity = carrinho.itens[i].quantidade;
        contains = true;
      }
    }

    if (contains) {
      const delta = quantidade - oldQuantity;
      const newQuantity = parseInt(quantidade) + parseInt(oldQuantity);

      //Alterando a quantidade no carrinho do usuario
      UserModel.findOneAndUpdate(
        {
          _id: userId,
          "carrinho.itens._id": product_id,
          "carrinho.status": "Ativo",
        },
        {
          $set: {
            "carrinho.itens.$.quantidade": newQuantity,
            "carrinho.modified_on": new Date(),
          },
        },
        { upsert: true },
        (err, response) => {
          if (err) {
            console.log(err);
          }
        }
      );

      ProductModel.findOneAndUpdate(
        { _id: product_id, "reserved.user_id": userId },
        {
          $inc: { quantidade: -quantidade },
          $set: {
            "reserved.$.quantidade": newQuantity,
            "reserved.$.modified_on": new Date(),
          },
        },
        { upsert: true },
        (err, response) => {
          if (err) {
            console.log(err);
          }

          res.status(200).send("OK");
        }
      );
    } else {

      ProductModel.findOneAndUpdate({
        _id: product_id },
        { $push: {
            'reserved': {
              quantidade: quantidade,
              user_id: userId,
              created_on: new Date(),
            }
          },
          $inc: { quantidade: -quantidade },
        },
        { upsert: true, new: true },
        (err, response) => {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

      UserModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            "carrinho.itens": {
              _id: product._id,
              quantidade: quantidade,
              preco: product.preco,
            },
          },
        },
        { upsert: true, new: true },

        (err, response) => {
          if (err) {
            res.status(500).send(err);
          }

          res.status(200).send("OK");
        }
      );
    }
  },

  async changeCartAmount(req, res) {
    const userId = req.userId;
    const { product_id, newQuantity } = req.body;

    let oldQuantity = 0;

    const rawData = await UserModel.findOne({ _id: userId });

    const { carrinho } = rawData;

    for (let i = 0; i < carrinho.itens.length; i++) {
      if (carrinho.itens[i]._id == product_id) {
        oldQuantity = carrinho.itens[i].quantidade;
      }
    }

    const delta = oldQuantity - newQuantity;

    if (newQuantity <= 0) {
      UserModel.findOneAndUpdate(
        {
          _id: userId,
          'carrinho.status': 'Ativo',
        },
        {  
            $pull: {'carrinho.itens': {'_id': product_id } } },
        (err, response) => {
          if (err) {
            console.log(err);
          }
        }
      );

      ProductModel.findOneAndUpdate(
        {
          _id: product_id,
        },
        { 
          $inc: { quantidade: delta },
          $pull: { reserved: { user_id: userId } },
        },
        (err, response) => {
          if (err) {
            console.log(err);
          }

          res.status(200).send("OK");
        }
      );
    }else {
      UserModel.findOneAndUpdate(
        {
          _id: userId,
          'carrinho.status': 'Ativo',
          'carrinho.itens._id': product_id
        },
        {  
            $set: {'carrinho.itens.$.quantidade': newQuantity,
                  'carrinho.modified_on': new Date()} },
        (err, response) => {
          if (err) {
            console.log(err);
          }
        }
      );

      ProductModel.findOneAndUpdate(
        {
          _id: product_id,
          'reserved.user_id': userId
        },
        { 
          $inc: { quantidade: delta },
          $set: { 'reserved.$.quantidade': newQuantity,
                  'reserved.$.modified_on': new Date() },
        },
        (err, response) => {
          if (err) {
            console.log(err);
          }

          res.status(200).send("OK");
        }
      );
    }

  },
};
