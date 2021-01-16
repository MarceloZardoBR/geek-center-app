import React from 'react';

import {
    View,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import CustomSearchBar from '../../components/CustomSearchBar';
import ProductListView from '../../components/ProductsListView';

const ProductsSearched = ({ navigation }) => {

    const products = navigation.getParam('products');

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                {/* <View style={styles.arrowCotainer}>
                    <TouchableOpacity>
                        <Icon name='arrow-left' size={20} color='#FFF' />
                    </TouchableOpacity>
                </View> */}
                <CustomSearchBar navigation={navigation} />
                <View style={styles.cartContainer}>
                    <TouchableOpacity>
                        <Icon name='shopping-cart' size={30} color='#FFF' />
                    </TouchableOpacity>
                </View>
            </View>
            {/**Alterar Isso Aqui - Navigation */}
            <ProductListView products={products} navigation={navigation} />
        </View>
    )
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
    cartContainer: {
        width: '13%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    arrowCotainer:{
        width: '5%',
    }
})

export default ProductsSearched;