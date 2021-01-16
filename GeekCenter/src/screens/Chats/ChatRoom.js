import React, {useState, useEffect, useRef} from 'react';

import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {BASE_URL} from '../../commons/BaseURL';
import ChatMessagesList from './ChatMessages';
import axios from 'axios';
import io from 'socket.io-client';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatRoom = ({navigation}) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const chatInfo = navigation.getParam('chatInfo');
  const chatData = navigation.getParam('chatData');

  useEffect(() => {
    if (chatData) {
      setChatMessages(chatData.messages);
    }
  }, []);

  useEffect(() => {
    const socket = io(
      `http://localhost:3333/${chatInfo.saler_id}-${chatInfo.user_id}`,
      {
        query: {user_id: chatInfo.user_id},
      },
    );

    socket.on('output', msg => {
      setChatMessages(oldState => [...oldState, msg]);
      setMessage('');
    });
  }, []);

  const onSendMessage = () => {
    if (message && message.trim()) {
      axios
        .post(
          `${BASE_URL}/user/chats/new-message`,
          {
            targetUser: chatInfo.saler_id,
            message: message,
          },
          {
            headers: {
              Authorization: `Bearer ${chatInfo.token}`,
            },
          },
        )
        .then(res => {
          setMessage('');
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        <ChatMessagesList chatMessages={chatMessages} chatInfo={chatInfo} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputStyle}
          multiline={true}
          autoCapitalize="sentences"
          value={message}
          onChangeText={msg => setMessage(msg)}
        />
        <TouchableOpacity onPress={onSendMessage}>
          <Icon name={'arrow-circle-right'} size={40} color={'#a033ff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 15,
  },
  messagesContainer: {
    marginTop: 10,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: Dimensions.get('window').width,
    height: '90%',
  },
  inputContainer: {
    height: Dimensions.get('screen').height * 0.1,
    alignSelf: 'auto',
    flexDirection: 'row',
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputStyle: {
    alignSelf: 'auto',
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#666',
    fontSize: 15,
    width: '90%',
    height: '70%',
    textAlign: 'left',
  },
});

export default ChatRoom;
