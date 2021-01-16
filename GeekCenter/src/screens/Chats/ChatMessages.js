import React, {useRef} from 'react';

import {View, ScrollView, Text, StyleSheet, FlatList} from 'react-native';

const ChatMessagesList = props => {
  const scrollRef = useRef();

  const ChatMessages = ({messages, chatInfo}) => (
    <ScrollView>
      {messages ? (
        messages.user_id !== chatInfo.user_id ? (
          <View style={styles.receivedMessageBox} key={messages._id}>
            <Text style={styles.receivedMessage}>{messages.message}</Text>
          </View>
        ) : (
          <View style={styles.sendedMessageBox} key={messages._id}>
            <Text style={styles.sendedMessage}>{messages.message}</Text>
          </View>
        )
      ) : (
        <View />
      )}
    </ScrollView>
  );

  return (
    <FlatList
      data={props.chatMessages}
      renderItem={({item}) => (
        <ChatMessages messages={item} chatInfo={props.chatInfo} />
      )}
      keyExtractor={item => item._id}
      ref={scrollRef}
      onContentSizeChange={() =>
        scrollRef.current.scrollToEnd({animated: true})
      }
    />
  );
};

const styles = StyleSheet.create({
  receivedMessageBox: {
    borderWidth: 0,
    marginTop: 10,
    marginLeft: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#a033ff',
  },
  receivedMessage: {
    flexWrap: 'wrap',
    fontSize: 15,
    margin: 10,
    color: '#FFF',
    fontWeight: 'bold',
  },
  sendedMessageBox: {
    borderWidth: 0,
    marginRight: 10,
    margin: 5,
    marginBottom: 5,
    borderRadius: 10,
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    backgroundColor: '#c7b8ff',
  },
  sendedMessage: {
    flexWrap: 'wrap',
    fontSize: 15,
    margin: 10,
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ChatMessagesList;
