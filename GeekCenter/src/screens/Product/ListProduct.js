import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import { getProducts } from '../../services/FetchProductsByCategory';
import ProductListView from '../../components/ProductsListView';

const ListProduct = ({ navigation }) => {
    
    const [products, setProducts] = useState([]);
    const [isLoadingProd, setIsLoadingProd] = useState(true);
    const [category_id, setCategory_id] = useState('');

    const fetchProductsByCategory = useCallback(() => {
        getProducts(category_id).then(res => {
            setProducts(res);
        }).catch(err => {
            console.log(err);
        })
    },[category_id]);

    useEffect(() => {
        setCategory_id(navigation.getParam('category_id'));
        fetchProductsByCategory();
    },[category_id])

    useEffect(() => {
        if(!products){
            setIsLoadingProd(false);
        }
    },[products]);

    return (
        <ScrollView>
            <View style={styles.container}>
                {!products.length ? (
                    <View style={styles.emptyProducts}>
                        <ActivityIndicator size={"large"} color='#673AB7' animating={isLoadingProd} />
                        <Text style={styles.emptyProductsText}>Não há nenhum produto nessa categoria</Text>
                    </View>
                ) : (
                        //Alterar o navigation
                        <ProductListView products={products} navigation={navigation} />
                    )}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    emptyProducts: {
        display: 'flex',
        height: 600,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyProductsText: {
        fontFamily: 'roboto-regular',
        fontSize: 17,
        marginTop: 10,
        color: '#666'
    },
})

export default ListProduct;