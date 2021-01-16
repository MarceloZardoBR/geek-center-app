import UserInfo from '../screens/UserInfo';
import ConfigAddress from '../screens/ConfigAddress';
import AddAddress from '../screens/AddAddress';
import UserProducts from '../screens/Product/UserProducts';
import NewProduct from '../screens/Product/NewProduct';
import ListProduct from '../screens/Product/ListProduct';
import DisplayProduct from '../screens/Product/DisplayProduct';
import Cart from '../screens/Cart';
import UserChats from '../screens/Chats/UserChats';
import ChatRoom from '../screens/Chats/ChatRoom';

const headerConfig = {
    headerStyle: {
        backgroundColor: '#673AB7',
    },
    headerTitleStyle: {
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        color: '#FFF',
        flex: 1,
    },
};

export default Screens = {
    UserInfo: {
        screen: UserInfo,
        navigationOptions: {
            title: 'Dados da Conta',
            ...headerConfig,
        },
    },
    ConfigAddress: {
        screen: ConfigAddress,
        navigationOptions: {
            title: 'Endereços de Entrega',
            ...headerConfig,
        },
    },
    AddAddress: {
        screen: AddAddress,
        navigationOptions: {
            title: 'Adicionar Endereço',
            ...headerConfig,
        },
    },
    UserProducts: {
        screen: UserProducts,
        navigationOptions: {
            title: 'Meus Produtos',
            ...headerConfig,
        },
    },
    NewProduct: {
        screen: NewProduct,
        navigationOptions: {
            title: 'Novo Produto',
            ...headerConfig,
        },
    },
    ListProduct: {
        screen: ListProduct,
        navigationOptions: {
            title: null,
            ...headerConfig,
        },
    },
    DisplayProduct: {
        screen: DisplayProduct,
        navigationOptions: {
            title: null,
            ...headerConfig,
        },
    },
    Cart: {
        screen: Cart,
        navigationOptions: {
            title: 'Carrinho',
            ...headerConfig
        }
    },
    UserChats: {
        screen: UserChats,
        navigationOptions: {
            title: 'Mensagens',
            ...headerConfig
        }
    },
    ChatRoom: {
        screen: ChatRoom,
        navigationOptions: {
            title: null,
            ...headerConfig
        }
    }
}