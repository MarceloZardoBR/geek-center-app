import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import CustomSearch from '../components/CustomSearchBar';
import CategoryButtons from '../components/CategoryButtons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';


export default function Main({ navigation }) {

  const user = useSelector(state => state.user);

  console.log('Rendering Tela Main...');

  const onHandleCart = () =>{
    if(user.id == null){
      Alert.alert('Ops!', 'É necessário fazer login antes de ver o carrinho',[{
        text:'Pode Deixar', onPress: () => navigation.navigate('Login')}
      ])
    }else {
      navigation.navigate('Cart');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <CustomSearch navigation={navigation} />
        <View style={styles.cartContainer}>
          <TouchableOpacity onPress={onHandleCart}>
            <Icon name='shopping-cart' size={30} color='#FFF' />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.categoryContainer}>
        <CategoryButtons navigation={navigation} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  searchBarContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '10%',
    backgroundColor: '#673AB7',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cartContainer:{
    width: '13%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryContainer: {
    height: 120,
  },
});
