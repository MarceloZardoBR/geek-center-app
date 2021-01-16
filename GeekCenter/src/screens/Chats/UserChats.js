import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';

import {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Dimensions
} from 'react-native';

import {useSelector} from 'react-redux';
import {getUserChats} from '../../services/UserActivesChats';
import { BASE_URL } from '../../commons/BaseURL';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserChats = ({ navigation }) => {
  const token = useSelector(state => state.user.token);
  const user_id = useSelector(state => state.user.id);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getUserChats(token, user_id).then(res => setChats(res));
  }, []);

  const onSelectChat = (chat) =>{
      const chatInfo = {
        saler_id: chat.sender,
        token: token,
        user_id: user_id
      }
  
      axios.get(`${BASE_URL}/user/chats/verify/`,{
          params:{
              'targetUser': chat.sender
          },
          headers:{
              'Authorization': `Bearer ${token}`
          }      
      }).then(res => {
          const chatData = {
              ...res.data,
          }
          navigation.navigate('ChatRoom', { chatData, chatInfo });
      }).catch(err => {
          navigation.navigate('ChatRoom', { chatInfo });
      })
  }

  return (
    <View style={styles.container}>
      {chats ? (
          chats.map(chat => 
          <TouchableOpacity key={chat._id} onPress={() => onSelectChat(chat)}>
            <View style={styles.chatPreview}>
              <Text style={styles.senderName}>{`${chat.senderName} ${chat.senderLastname}`}</Text>
              <Icon name="envelope" size={30} color={'#D9D5DC'} />
            </View>
          </TouchableOpacity>
          )
    ): (
        <View>
          <Text>Você não possui nenhum chat ativo</Text>
        </View>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
  },
  chatPreview: {
    display: 'flex',
    flexDirection: 'row',
    width: Dimensions.get('screen').width * 0.9,
    height: Dimensions.get('screen').height * 0.1,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#d9d5d4',
    marginTop: 5,
  },
  senderName: {
    fontSize: 20,
    color: '#424040',
    fontFamily: 'roboto-regular',
  },
});

export default UserChats;
