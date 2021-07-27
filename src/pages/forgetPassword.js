import React, { Component } from 'react';
import {AsyncStorage, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import MyTextInput from '../components/inputText';
import request from '../services/service';
import {showMessage} from 'react-native-flash-message';
import LoaderAnimated from '../components/loaderAnimated'; // Import package from node modules


export default class ForgetPassword extends Component{

    static navigationOptions = {
        title: 'Configurações',
    };

    state = {
        etapa: 1,
        loading: false,
        response: '',
        logado: true,
        email: '',
        code: '',
        senha1: '',
        senha2: '',
    };

    sendCode = async () => {
        this.setState({loading: true});
        let params = {email:this.state.email};
        const response = await request('/users/sendForgotPassword', params, false);
        this.setState({loading: false});
        showMessage({
            message: response.data.mensagem,
            type: response.data.type,
        });

        if(response.data.sucesso){
            this.setState({etapa: 2});
        }
    };

    verifyCode = async () => {
        this.setState({loading: true});
        let params = {email:this.state.email, code: this.state.code};
        const response = await request('/users/verifyCode', params, false);
        this.setState({loading: false});
        showMessage({
            message: response.data.mensagem,
            type: response.data.type,
        });

        if(response.data.sucesso){
            this.setState({etapa: 3});
        }
    };

    updatePass = async () => {

        if(this.state.senha1 != this.state.senha2){
            showMessage({
                message: 'A senha de confirmação não é igual a senha de cima!',
                type: 'danger',
            });
            return;
        }

        this.setState({loading: true});
        let params = {password:this.state.senha1, email: this.state.email};
        const response = await request('/users/updatePassword', params, false);
        this.setState({loading: false});

        if(response.data.sucesso){
            this.props.navigation.navigate('Login');
        }

        showMessage({
            message: response.data.mensagem,
            type: response.data.type,
        });
    };


    render(){
        return (
            <View>
                <View style={styles.container}>
                    { this.state.etapa == 1 ? this.viewSend() : null}
                    { this.state.etapa == 2 ? this.viewCode() : null}
                    { this.state.etapa == 3 ? this.viewPassword() : null}
                </View>
                <LoaderAnimated visible={this.state.loading}/>
            </View>
        );
    }

    viewSend = () =>
    {
        return (
            <View style={styles.body}>
                <Text> Email:</Text>
                <MyTextInput style={styles.campos}
                             editable
                             maxLength={50}
                             value={this.state.email}
                             onChangeText={(value) => this.setState({email: value})}
                />

                <Button style={styles.botao}
                        title="Enviar"
                        onPress={() => this.sendCode()}
                        disabled={this.state.loading}
                        color={"blue"}
                />
            </View>
        );
    }

    viewCode = () =>
    {
        return (
            <View style={styles.body}>
                <Text> Código:</Text>
                <MyTextInput style={styles.campos}
                             editable
                             keyboardType='numeric'
                             maxLength={6}
                             value={this.state.code}
                             onChangeText={(value) => this.setState({code: value})}
                />

                <Button style={styles.botao}
                        title="Verificar"
                        onPress={() => this.verifyCode()}
                        disabled={this.state.loading}
                        color={"blue"}
                />
            </View>
        );
    }

    viewPassword = () =>
    {
        return (
            <View style={styles.body}>
                <Text> Nova Senha:</Text>
                <MyTextInput style={styles.campos}
                             editable
                             maxLength={20}
                             value={this.state.senha1}
                             secureTextEntry={true}
                             password={true}
                             onChangeText={(value) => this.setState({senha1: value})}
                />

                <Text> Confirmar Nova Senha:</Text>
                <MyTextInput style={styles.campos}
                             editable
                             maxLength={20}
                             value={this.state.senha2}
                             secureTextEntry={true}
                             password={true}
                             onChangeText={(value) => this.setState({senha2: value})}
                />

                <Button style={styles.botao}
                        title="Alterar Senha"
                        onPress={() => this.updatePass()}
                        disabled={this.state.loading}
                        color={"blue"}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        padding: 20,
        height: '100%',
        marginTop: 50,
        width: '100%',
    },
    campos: {
        width: '100%',
    },
    botao: {
        width: '100%',
    },
    botaoCadastro: {
        width: '100%',

    },
    logo: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    forgetPass: {
        marginTop: 10,
        textDecorationLine: "underline",
        textAlign: 'center',
        marginBottom: 20,
        color: "blue",
    }
});

