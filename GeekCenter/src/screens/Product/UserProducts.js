import React, { useEffect, useState, useCallback } from 'react';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ModalComponent from '../../components/ModalDeleteProduct';

import { useSelector } from 'react-redux';
import UserProductsList from '../../components/UserProductsList';
import { fetchProducts } from '../../services/FetchUserProducts';

function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const UserProducts = ({ navigation }) => {

  const token = useSelector(state => state.user.token);
  const is_product_deleted = useSelector(state => state.product.removing_product)

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [displayModal, setDisplayModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const getUserProduct = useCallback(() => {
    fetchProducts(token).then(res => {
      setProducts(res);
    })
  }, [token])

  useEffect(() => {
    getUserProduct();
  }, [getUserProduct]);

  const onHadleModal = productId => {
    setSelectedProduct(productId);
    setDisplayModal(true);
  };

  const onHadleCloseModal = () => {
    setDisplayModal(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserProduct();

    wait(2000).then(() => setRefreshing(false))
  }, [])

  useEffect(() => {
    if (is_product_deleted) {
      onHadleCloseModal();
      getUserProduct();
    }
  }, [is_product_deleted])

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onHadleModal(item._id)}>
      <UserProductsList
        pictures={item.fotos}
        titulo={item.titulo}
        descricao={item.descricao}
        preco={item.preco}
        status={item.status}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {Array.isArray(products) && products.length == 0 ? (
        <View style={styles.emptyProducList}>
          <Text style={styles.emptyProducText}>
            Você não está anunciando nenhum produto
          </Text>
        </View>
      ) : (
          <View>
            <ModalComponent
              isVisible={displayModal}
              onCancel={onHadleCloseModal}
              productId={selectedProduct}
            />
            <FlatList
              data={products}
              renderItem={renderItem}
              keyExtractor={item => item._id}
              onRefresh={onRefresh} refreshing={refreshing}
            />
          </View>
        )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emptyProducList: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyProducText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#AAA',
  },
});

export default UserProducts;
