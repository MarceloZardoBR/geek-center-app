import React from 'react';
import CustomSearchBar from './components/CustomSearchBar';

const Header = ({ scene }) => {
    const { options } = scene.descriptor;

    return (
        <CustomSearchBar style={options.headerStyle}/>
  
    )
}

export default Header;