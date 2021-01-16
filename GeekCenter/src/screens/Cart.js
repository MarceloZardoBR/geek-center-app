import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import CartProdPreview from '../components/CartProdPreview';
import { useSelector, useDispatch } from 'react-redux';

const Cart = ({ navigation }) =>{

    const userCart = useSelector(state => state.user.carrinho);
    const [isEmpty, setIsEmpty] = useState(null);

    useEffect(() => {
        if(userCart.itens[0] == null){
            setIsEmpty(true);
        }
    },[userCart])

    return (
        <View style={styles.container}>
            <View style={styles.cartTextContainer}>
                <Text style={styles.cartHeader}>Carrinho</Text>
                <Text style={styles.cartAmount}>({userCart.itens.length})</Text>
            </View>
            {isEmpty ? (
                <View style={styles.emptyCarContainer}>
                    <Text style={styles.emptyCar}>Seu Carrinho Está Vazio</Text>
                </View>
            ) : (
                <View style={styles.cartProds}>
                    <CartProdPreview itens={userCart.itens} />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginTop: 10,
        justifyContent: 'flex-start'
    },
    cartTextContainer:{
        flexDirection: 'row',
        marginLeft: 20,
        width: '90%',
        height: '7%',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cartHeader:{
        fontSize: 20,
        fontFamily: 'roboto-regular',
        color: '#555',
    },
    cartAmount:{
        fontSize: 20,
        fontFamily: 'roboto-regular',
        color: '#555',
    },
    emptyCarContainer:{
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyCar:{
        fontSize: 17,
        color: '#555',
        fontFamily: 'roboto-regular'
    },
    cartProds:{
        flex: 1,
    }
})

export default Cart;
