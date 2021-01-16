import React, { useState } from 'react';

import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { searchProducts } from '../services/SearchProducts';

import {
    StyleSheet,
} from 'react-native';

const CustomSearchBar = (props) => {

    const [searchValue, setSearchValue] = useState('');

    const startSearch = () =>{
        searchProducts(searchValue)
            .then(res => {
                if(res){
                    props.navigation.push('ProductsSearched', {products: res})
                }
            });
    }

    return (
        <SearchBar containerStyle={styles.searchContainer}
            inputStyle={{ backgroundColor: '#673AB7', color: '#FFF' }}
            inputContainerStyle={{ backgroundColor: '#673AB7'}}
            placeholder='Pesquisar'
            placeholderTextColor='#FFF'
            searchIcon={<Icon name="search" size={20} color='#FFF' />}
            value={searchValue} onChangeText={value => setSearchValue(value)}
            onSubmitEditing={startSearch}>
        </SearchBar>
    )
};

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#673AB7',
        borderRadius: 6,
        width: '85%',
        height: '100%'
    }
});

export default CustomSearchBar;