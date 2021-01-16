import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../commons/BaseURL';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput
} from 'react-native';

import ViewProduct from '../../components/ViewProduct';
import SalerDescription from '../../components/SalerDescription';
import commonStyles from '../../CommonStyles';

import { getUserById } from '../../services/FetchUserById';
import { cartAddProduct } from '../../services/CartAddProduct';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../store/actions/user';

export default function DisplayProduct({ navigation }) {

    const product = navigation.getParam('product');
    const [user, setUser] = useState('');
    const [quantidade, setQuantidade] = useState('1');
    const [alertQtd, setAlertQtd] = useState(false);
    const loggedUser = useSelector(state => state.user);
    const [enableChatButton, setEnableChatButton] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        getUserById(product.user_id).then(res => {
            setUser(res.data);
        });
    }, [product.user_id]);

    useEffect(() => {
        if(loggedUser.id === product.user_id){
            setEnableChatButton(true);
        }
    },[]);

    const onAddCart = (product_id) => {
        
        if (!loggedUser.token) {
            Alert.alert('Ops!', 'É necessário fazer login antes adicionar no carrinho', [{
                text: 'Ok', onPress: () => navigation.navigate('Login')
            }
            ])
        }

        if(quantidade > product.quantidade) {
            Alert.alert('Ops!', 'O Vendedor não possui essa quantidade em estoque');
            setAlertQtd(true)
            setQuantidade(product.quantidade.toString());
            return
        }

        cartAddProduct(product_id, loggedUser.token, quantidade).then(res => {
            if (res == true) {
                Alert.alert('Sucesso!', 'Produto Adicionado ao Carrinho');
                dispatch(getUser(loggedUser.token));
                navigation.navigate('Cart');
            };
        });
    }

    const onChatWithSaler = () => {
        const chatInfo = {
            saler_id: product.user_id,
            token: loggedUser.token,
            user_id: loggedUser.id
        }
        
        axios.get(`${BASE_URL}/user/chats/verify/`,{
            params:{
                'targetUser': product.user_id
            },
            headers:{
                'Authorization': `Bearer ${loggedUser.token}`
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
            <ScrollView>
                <ViewProduct product={product} />
                <SalerDescription user={user} />
                <View style={styles.qtdContainer}>
                    <Text style={styles.qtdLabel}>Quantidade</Text>
                    <TextInput style={[{...styles.qtdInputStyle, borderColor: alertQtd ? '#b11' : '#FFF'}]}
                        value={quantidade}
                        onChangeText={qtd => setQuantidade(qtd) & setAlertQtd(false)}
                        keyboardType='numeric'
                    />
                </View>
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonStyle}>
                        <Text style={styles.buttonTextBuy}>Comprar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonCartStyle} onPress={() => onAddCart(product._id)} disabled={enableChatButton}>
                        <Text style={styles.cartText}>Adicionar ao Carrinho</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonStyle} onPress={onChatWithSaler} disabled={enableChatButton}>
                        <Text style={styles.buttonTextBuy}>Conversar com Vendedor</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle: {
        ...commonStyles.buttonStyle,
        marginTop: 15,
        width: '80%',
        height: 40
    },
    buttonTextBuy: {
        fontFamily: 'roboto-regular',
        fontSize: 15,
        color: '#FFF'
    },
    buttonCartStyle: {
        ...commonStyles.buttonStyle,
        backgroundColor: '#ebe3ff',
        borderColor: '#673AB7',
        borderWidth: 1,
        borderRadius: 5,
        width: '80%',
        height: 40,
        marginTop: 15,
    },
    cartText: {
        fontFamily: 'roboto-regular',
        fontSize: 15,
        fontWeight: 'bold'
    },
    qtdContainer:{
        marginLeft: 20,
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    qtdInputStyle:{
        marginLeft: 10,
        width: '20%',
        borderWidth: 2,
        fontSize: 20,
        color: '#111',
        backgroundColor: '#FFF',
        textAlign: 'center'
    },
    qtdLabel:{
        fontSize: 20,
        color: '#111',
        fontFamily: 'roboto-regular'
    }
});
