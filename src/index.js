import React from 'react';
import IndexTab from './indexTab';
import Login from './pages/login';
import {getItem} from './services/storage';
import {AsyncStorage, View} from 'react-native';
import RouteLogin from './routes/routeLogin';
import FlashMessage from 'react-native-flash-message';
import RouteListCards from './routes/routeListCards';

console.disableYellowBox = true;

export default class App extends React.Component {
    render() {
        // AsyncStorage.clear();
        if((AsyncStorage.getAllKeys()).length > 0 && getItem('userSession').length > 0)
            return this.renderTabs();
        else
            return this.login();
    }

    renderTabs = () => (
        <IndexTab/>
    );

    login = () => (
        <View style={{ flex: 1 }}>
            <RouteLogin/>
            {/* GLOBAL COMPONENT INSTANCE */}
            <FlashMessage position="bottom" animated={true} />
        </View>
    );
}

