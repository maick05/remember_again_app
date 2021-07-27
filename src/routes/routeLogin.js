import { createStackNavigator } from 'react-navigation';
import {pages} from './configRoutes';

export const navOptions = {
    header: null,
};

const estiloHeader = {
    navigationOptions: navOptions,
    initialRouteName: 'Login',
};

export default createStackNavigator(pages, estiloHeader);
