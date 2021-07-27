import React, { Component } from 'react';
import {View, TouchableOpacity, StyleSheet} from "react-native";
import { Content, Button, ListItem, Text, Icon, Left, Body } from 'native-base';
import request from '../services/service';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import RNRestart from 'react-native-restart'; // Import package from node modules


export default class Config extends Component{

    static navigationOptions = {
        title: 'Configurações',
    };

    state = {
        loading: false,
        response: '',
        logado: true,
    };

    logOff = async () => {
        const response = await request('/users/logoff', {}, false);
        RNRestart.Restart();
    };

    render(){
        return this.viewConfig();
    }

    viewConfig = () =>
    {
        return (
            <View style={styles.body}>
                <Content>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "lightgrey" }}
                                    onPress={() => this.logOff()}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Sair</Text>
                        </Body>
                    </ListItem>
                </Content>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height:"100%",
    },
    container:{
        height:"100%",
        marginTop: 120,
        padding: 2,
    },

});

