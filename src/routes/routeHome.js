import { createStackNavigator } from 'react-navigation';
import {pages, navOptions} from './configRoutes';

const estiloHeader = {
    navigationOptions: navOptions,
    initialRouteName: 'ListContainers'
};

export default createStackNavigator(pages, estiloHeader);

