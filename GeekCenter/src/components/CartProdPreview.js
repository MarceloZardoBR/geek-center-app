import React, { useEffect, useState, useCallback } from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { BASE_URL } from '../commons/BaseURL';
import { useSelector, useDispatch } from 'react-redux';
import commonStyles from '../CommonStyles';
import fetchProductsById from '../services/FetchProductsById';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { getUser } from '../store/actions/user';

const CartProdPreview = (props) => {

    const cart_products = props.itens;
    const [products, setProducts] = useState([]);
    const token = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    useEffect(() => {
        onLoadProducts();
    }, [cart_products])

    const onLoadProducts = useCallback(() => {
        if (cart_products) {
            fetchProductsById(cart_products)
                .then(res => setProducts(res))
        }
    },[cart_products])

    const onChangeProductAmount = (product_id,newQuantity) => {
        const config = {
            headers:{
                Authorization: `Bearer ${token}`
            }
        }
        axios.put(`${BASE_URL}/user/cart/change`,{
            product_id: product_id,
            newQuantity: newQuantity
        },config).then(res => {
            if(res){
                dispatch(getUser(token));
            }
        });
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                {products ? products.map(product => (
                    <View key={product._id} style={styles.prodContainer}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: product.fotos[0] }}
                                style={styles.imageStyle} />
                        </View>
                        <View style={styles.descProduct}>
                            <Text style={styles.descriptionHeader}>{`${product.titulo.substring(0, 17)}...`}</Text>
                            <Text style={styles.descriptionText}>Preço: R$ {product.preco} </Text>
                            <View style={styles.changeQuantity}>
                                <Text style={styles.descriptionText}>Quantidade:</Text>
                                <TouchableOpacity style={styles.changeBtnContainer} 
                                onPress={() => onChangeProductAmount(product._id, product.quantidade - 1)}>
                                    <Icon name='minus' size={20} color={'#777'} />
                                    <Text style={styles.amountText}>{product.quantidade}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )) : (
                        <View>

                        </View>
                    )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    prodContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width * 0.9,
        height: 120,
        backgroundColor: '#eae8e8',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 5,
        ...commonStyles.shadowStyle
    },
    imageContainer: {
        height: 105,
        width: 105,
        margin: 10,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
    },
    descriptionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'roboto-regular',
    },
    descriptionText: {
        fontSize: 18,
        fontFamily: 'roboto-regular'
    },
    changeQuantity:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '55%',
        alignItems: 'center'
    },
    changeBtnContainer:{
        marginLeft: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    amountText:{
        fontSize: 16,
        marginLeft: 10,
    }
});

export default CartProdPreview;