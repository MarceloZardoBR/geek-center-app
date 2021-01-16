const chatModel = require('../models/Chats');
const moment = require('moment');

module.exports = {

    async getUserChats(req, res){
        const user_id = req.userId;

        const chats = await chatModel.find({ participants: user_id },{ _id: 1 , participants: 1 });

        if(!chats){
            res.status(400).send('User not have chats');
        }

        res.send(chats);
    },

    async verifyExistsChat(req, res){

        const user_id = req.userId;
        const { targetUser } = req.query;

        const existChat = await chatModel.findOne({'participants': { $all:[targetUser, user_id] }});

        if(existChat){
            res.status(200).send(existChat);
        }else{
            res.status(404).send('Dont Exists');
        }

    },

    async newMessage(req, res){

        const user_id = req.userId;
        const io = req.io;
        const connectedUsers = req.connectedUsers;

        const { targetUser, message } = req.body;

        const nsp = io.of(`${targetUser}-${user_id}`);

        const existChat = await chatModel.findOne({'participants': { $all:[targetUser, user_id] }});

        if(!existChat){

            const data = {
                participants:[
                    user_id,
                    targetUser
                ],
                messages:[{
                    user_id: user_id,
                    message: message,
                    date: moment().format('LLL')
                }],
                status: 'Ativo'
            }
    
            chatModel.create(data).catch(err => {
                console.log(err);
            }).then(res => {
                if(res){
                    nsp.emit('output', res.messages[res.messages.length -1]);
                }
            });
        }else{
          chatModel.findByIdAndUpdate({'_id': existChat._id},{$push:{
               'messages':{
                    user_id: user_id,
                    message: message,
                    date: moment().format('LLL')
                }
           }},{upsert: true, new: true}).exec((err, any) => {
                if(any){
                    nsp.emit('output', any.messages[any.messages.length - 1])
                }
           });       
        }

    }
}