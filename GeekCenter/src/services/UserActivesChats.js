import axios from 'axios';
import {BASE_URL} from '../commons/BaseURL';

const getUsersName = (id) =>{
  return new Promise((resolve, reject) => {

    axios.get(`${BASE_URL}/user/get/id/`,{
      params:{
        id: id
      }
    }).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.response);
    })

  })
}

export const getUserChats = async (token, user_id) => {
  let chatData = [];

  await axios.get(`${BASE_URL}/user/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => {
      for (let i = 0; i <= res.data.length - 1; i++) {
        const data = res.data[i];
        for (let y = 0; y <= data.participants.length - 1; y++) {
          if (data.participants[y] !== user_id) {
            chatData.push({
              _id: data._id,
              sender: data.participants[y],
            });
          }
        }
      }
    })
    .catch(err => {
      console.log(err);
    });

    const chatSenderInfo = [];

    for(let i=0;i<= chatData.length -1;i++){
      await getUsersName(chatData[i].sender).then(res => {
          chatSenderInfo.push({
            ...chatData[i],
            senderName: res.name,
            senderLastname: res.lastname
          })
      }).catch(err => {
        console.log(err);
      })
    }
  
    return chatSenderInfo;
};
