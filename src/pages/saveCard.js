import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList} from "react-native";
import request from '../services/service';
import MyTextInput from "../components/inputText";
import { showMessage } from "react-native-flash-message";
import { Menu, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import LoaderAnimated from "../components/loaderAnimated";
import Icon from 'react-native-vector-icons/FontAwesome';
import DialogInput from 'react-native-dialog-input';


export default class SaveCard extends Component{


    static navigationOptions = ({ navigation }) => {
        const edit = navigation.getParam('id', false);
        let obj = {};

        if(edit) {
            obj.title = 'Alterar Card';
            obj.headerRight = (
                <Menu onSelect={value => navigation.getParam('deleteCard')()}>
                    <MenuTrigger  >
                        <Text style={styles.headerText}>...</Text>
                    </MenuTrigger  >
                    <MenuOptions>
                        <MenuOption value="Login">
                            <Text style={styles.menuContent}> <Icon style={{marginRight: 10}} name="trash" reverse={true} size={22} color="red"/> Excluir </Text>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            );
        }
        else
            obj.title = 'Novo Card';

        return obj;
    };

    state = {
        loading: false,
        word: '',
        id: false,
        acao: 'incluir',
        answers: [],
        isDialogVisible: false,
    };

    componentDidMount() {
        const context = this;
        if(this.props.navigation.state.params.id) {
            this.setState({
                id: this.props.navigation.state.params.id,
                word: this.props.navigation.state.params.word,
                acao: 'alterar'
            });

            this.loadAnswers(this.props.navigation.state.params.id);

            this.props.navigation.setParams({
                deleteCard: this.deleteCard,
            });
        }
    }

    insertCard = async () => {

        if(this.state.word.length <= 0) {Alert.alert('Atenção', 'O campo palavra deve ser preenchido!'); return;}

        this.setState({loading: true});
        let params = {nome: this.state.word, id:this.state.id, acao: this.state.acao};
        const res = await request('/cards/save', params, true);

        this.setState({loading: false});

        showMessage({
            message: res.data.mensagem,
            type: res.data.type,
        });

        // this.setState({response: res.data});

        if(res.data.sucesso && this.state.acao == 'incluir')
            this.props.navigation.navigate('ListCards');
    };

    insertAnswer = async (palavra) => {

        if(palavra.length <= 0) {Alert.alert('Atenção', 'O campo resposta deve ser preenchido!'); return;}

        this.setState({loading: true});
        let params = {nome: palavra, idcard:this.state.id, acao: 'incluir'};
        const res = await request('/answers/save', params, true);

        this.setState({loading: false, isDialogVisible: false});

        if(res.data.sucesso)
            this.loadAnswers(this.state.id);

        showMessage({
            message: res.data.mensagem,
            type: res.data.type,
        });

        // this.setState({response: res.data});
    };

    loadAnswers = async (id) => {
        let params = {idcard:id};
        const response = await request('/answers/listBy', params, true);
        this.setState({ answers: response.data.results});
    };

    confirmDeleteCard = async () => {
        let params = {id:this.state.id};
        const res = await request('/cards/delete', params, true);
        this.setState({loading: false});
        showMessage({
            message: res.data.mensagem,
            type: res.data.type,
        });

        if(res.data.sucesso)
            this.props.navigation.navigate('ListCards');
    };

    deleteCard = async () => {
        let id = this.state.id;
        Alert.alert(
            'Atenção',
            'Dseja realmente apagar esse card?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Sim', onPress: () => this.confirmDeleteCard()},
            ],
            {cancelable: false},
        );
    };

    deleteAnswer = async (id) => {
        Alert.alert(
            'Atenção',
            'Dseja realmente apagar esse registro?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Sim', onPress: () => this.confirmDeleteAnswer(id)},
            ],
            {cancelable: false},
        );
    };

    confirmDeleteAnswer = async (id) => {
        let params = {id:id};
        const res = await request('/answers/desvinculaAnswerFromCard', params, true);
        this.setState({loading: false});
        showMessage({
            message: res.data.mensagem,
            type: res.data.type,
        });

        if(res.data.sucesso)
            this.loadAnswers(this.state.id);
    };

    renderItem = ({ item }) => (
        <View style={styles.itemList} >
            <Text style={styles.textItem}>{item.word}</Text>
            <Icon
                onPress={() => this.deleteAnswer(item.id)}
                style={{float: "left"}} name="times" size={22} color="black"/>
        </View>
    );


    render(){
        return (
            <View style={styles.body}>
                <View style={styles.container}>
                    <Text> Palavra (Em inglês) </Text>
                    <MyTextInput
                        editable
                        maxLength={40}
                        value={this.state.word}
                        onChangeText={(value) => this.setState({word: value})}
                    />
                    <Button
                        title="Salvar"
                        onPress={() => this.insertCard()}
                        disabled={this.state.loading}
                    />
                </View>
                <View style={{padding: 20}}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={this.state.answers}
                        keyExtractor={item => item.id}
                        renderItem={this.renderItem}
                    />
                    <View style={{marginTop: 10,alignItems: 'flex-end'}}>
                        <Button
                            title="Adicionar Resposta"
                            onPress={() => this.setState({isDialogVisible: true})}
                            disabled={this.state.loading}
                            color={"green"}
                            icon={<Icon
                                name="plus"
                                size={15}
                                color="white"
                            />}
                        />
                    </View>
                </View>
                <Text>{this.state.response}</Text>
                <LoaderAnimated visible={this.state.loading}/>
                <DialogInput isDialogVisible={this.state.isDialogVisible}
                             title={"Nova Resposta"}
                             message={"Insira uma reposta para o card"}
                             hintInput ={"Resposta"}
                             cancelText={"Cancelar"}
                             submitText={"Salvar"}
                             submitInput={ (inputText) => {this.insertAnswer(inputText)} }
                             closeDialog={ () => {this.setState({isDialogVisible: false});}}>
                </DialogInput>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    body:{
        padding: 20,
    },
    container:{
        padding: 20,
    },
    headerText: {
        fontSize: 20,
        margin: 10,
        fontWeight: "bold"
    },
    menuContent: {
        color: "#000",
        fontWeight: "bold",
        padding: 2,
        fontSize: 20
    },
    list:{
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "lightgray",
        borderRadius: 9,
        flexDirection: 'column',
    },
    textItem:{
        fontWeight: "bold",
        paddingTop: 10,
        paddingBottom: 10,
        width: "70%",
    },
    itemList: {
        flexDirection: 'row', // a must
        alignItems: 'center', // to make items center vertically.
        justifyContent: 'center'
    }
});

