import React, { useEffect, useState } from 'react';
import { NavigationAction } from 'react-navigation'
import {
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableWithoutFeedback as TWD
} from 'react-native';
import commonStyles from '../CommonStyles';

const ProductsListView = (props) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(props.products);
    },[])

    const onSelectedProduct = product => {
        props.navigation.navigate('DisplayProduct', { product });
    }

    return (
        <View style={styles.container}>
            {products.map(product => (
                <TWD key={product._id} onPress={() => onSelectedProduct(product)}>
                    <View style={styles.previewStyle}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: product.fotos[0] }} style={styles.imageStyle} />
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.productName}>{product.titulo}</Text>
                            <Text style={styles.productPrice}>{product.preco} </Text>
                        </View>
                    </View>
                </TWD>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    previewStyle: {
        ...commonStyles.shadowStyle,
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.4,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 0.5,
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: '95%',
        height: '95%',
        alignItems: 'center'
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    productName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,

    },
    productPrice: {
        fontSize: 15,
        marginLeft: 20,
        marginTop: 10,
    }
});

export default ProductsListView;