import React, { Component } from 'react';
import {AsyncStorage, Button, StyleSheet, Text, View} from 'react-native';
import MyTextInput from "../components/inputText";
import FlashMessage, {showMessage} from 'react-native-flash-message';
import request from '../services/service';
import LoaderAnimated from '../components/loaderAnimated';
import IndexTab from '../indexTab';
import {setItem, getItem} from '../services/storage';

export default class Register extends Component{

    state = {
        nome: '',
        email: '',
        senha: '',
        loading: false,
        logado: false,
    };

    login = async () => {
        this.setState({loading: true});
        let params = {name: this.state.nome, email:this.state.email, password: this.state.senha};
        const response = await request('/users/register', params, false);

        if(response.data.sucesso){
            let userSession = {tokenApp: response.data.tokenApp, iduser: response.data.usuario.id};
            await setItem('userSession', userSession);
            this.setState({loading: false, logado: true});
            return ;
        }

        showMessage({
            message: response.data.mensagem,
            type: response.data.type,
        });

        this.setState({loading: false});
    };

    render() {
        return (!this.state.logado ? this.viewCadastro() : this.viewLogado());
    }

    viewLogado = () => {
        return (<IndexTab/>);
    };

    viewCadastro = () => {
        return (
            <View>
                <View style={styles.container}>
                    <Text style={styles.logo}> Remember Again </Text>
                    <Text> Nome: </Text>
                    <MyTextInput style={styles.campos}
                                 editable
                                 maxLength={33}
                                 value={this.state.nome}
                                 onChangeText={(value) => this.setState({nome: value})}
                    />
                    <Text> Email: </Text>
                    <MyTextInput style={styles.campos}
                                 editable
                                 maxLength={40}
                                 value={this.state.email}
                                 onChangeText={(value) => this.setState({email: value})}
                    />
                    <Text> Senha: </Text>
                    <MyTextInput style={styles.campos}
                                 editable
                                 maxLength={20}
                                 value={this.state.senha}
                                 secureTextEntry={true}
                                 password={true}
                                 onChangeText={(value) => this.setState({senha: value})}
                    />

                    <Button style={styles.botao}
                            title="Criar Conta"
                            onPress={() => this.login()}
                            disabled={this.state.loading}
                            color={"blue"}
                    />

                </View>
                <LoaderAnimated visible={this.state.loading}/>

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        height: '100%',
        justifyContent: 'center',
        width: '100%',
    },
    campos: {
        width: '100%',
    },
    botao: {
        width: '100%',
    },
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    }
});

