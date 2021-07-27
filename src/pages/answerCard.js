import React, { Component } from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import request from '../services/service';
import { showMessage } from "react-native-flash-message";
import LoaderAnimated from "../components/loaderAnimated";
import CardFlip from 'react-native-card-flip';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, Text, Icon} from 'native-base';
import InputButton from '../components/inputButton';
import {NavigationEvents} from 'react-navigation';

export default class AnswerCard extends Component {

    static navigationOptions = ({ navigation }) => {
        const nome = navigation.getParam('nome', false);
        let obj = {title:'Cards '+ nome};
        return obj;
    };

    state = {
        loading: false,
        idcontainer: false,
        item: {},
        results: [],
        countSucesso: 0,
        countFalha: 0,
        pos: 0,
        lado: 1,
        fim: false,
        botoesVisiveis: false,
        mostraResposta: false,
        respondido: false,
        lista: [new Object({id: '1', nome: 't'})],
        matchAnswer: "",
    };

    loadCards = async (idcontainer) => {
        this.setState({loading: true});

        const response = await request('/cards/listByContainer', {idcontainer:idcontainer}, true);
        this.setState({results: response.data.results, loading: false});

        if (response.data.sucesso && response.data.results.length > 0) {
            this.setState({item: response.data.results[this.state.pos]});
            return;
        }

        showMessage({
            message: response.data.mensagem,
            type: response.data.type,
        });
    };

    flipCard = () => {
        let lado = this.state.lado;
        if (lado == 1)
            lado = 2;
        else
            lado = 1;

        this.setState({lado: lado, botoesVisiveis: lado == 2, mostraResposta: lado == 2});

        this.card.flip();
    };

    sendAnswer = async (acerto) => {

        this.setState({loading: true});
        acerto ? this.state.countSucesso++ : this.state.countFalha++;
        let params = {acerto: acerto, idcard: this.state.item.id, idcontainer: this.state.item.idcontainer};
        const response = await request('/answers/logarTentativa', params,true);

        this.setState({loading: false});


        // showMessage({
        //     message: response.data.mensagem,
        //     type: response.data.type,
        // });

        this.next();

    };

    matchAnswer = async () => {

        this.setState({loading: true});

        let params = {resposta: this.state.matchAnswer, idcard: this.state.item.id, idcontainer: this.state.item.idcontainer};
        const response = await request('/answers/matchAnswer', params, true);

        this.setState({loading: false, respondido: true});
        // this.setState({response: response.data});

        showMessage({
            message: response.data.mensagem,
            type: response.data.type,
        });

        response.data.acerto ? this.state.countSucesso++ : this.state.countFalha++;

        this.flipCard();
    };

    next = () => {
        this.setState({respondido: false});
        this.flipCard();


        if (this.state.pos == this.state.results.length - 1) {
            this.setState({fim: true});
            return;
        }

        this.state.pos++;
        this.setState({item: this.state.results[this.state.pos], matchAnswer: ""});
    };


    componentDidMount() {
        const context = this;
        this.loadCards(this.props.navigation.state.params.idcontainer);
    }

    renderItem = ({item}) => (
        <View style={styles.itemList}>
            {this.state.mostraResposta ?
                <Text visible={this.state.mostraResposta} style={styles.respostas}>{item}</Text> : null}
        </View>
    );

    render() {
        return (
            <View style={styles.body}>
                {!this.state.fim ? this.renderCards() : this.renderEnd()}
                <Text>{this.state.response}</Text>

                <LoaderAnimated visible={this.state.loading}/>
            </View>
        );
    }

    renderCards = () => {
        return (
            <View style={styles.container}>
                <CardFlip style={styles.cardContainer} ref={(card) => this.card = card}>
                    <View style={styles.itemCard1}>
                        <Text style={styles.titulo}>{this.state.item.card}</Text>
                    </View>
                    <View style={styles.itemCard2}>
                        <View style={{justifyContent: "center"}}>
                            <FlatList
                                contentContainerStyle={styles.list}
                                data={this.state.item.respostas}
                                keyExtractor={item => item.id}
                                renderItem={this.renderItem}
                                onEndReached={this.loadMore}
                                onEndReachedThereshold={0.1}
                            />
                        </View>
                    </View>
                </CardFlip>

                <Button info
                        onPress={() => this.flipCard(2)}
                        style={styles.botaoVer}>
                    <Icon style={{textAlign: "center"}} name="eye" type={"FontAwesome"}/>
                    <Text style={{textAlign: "center"}}> Ver Resposta </Text>
                </Button>

                {!this.state.botoesVisiveis && !this.state.respondido ? this.renderMatch() : null}

                {this.state.botoesVisiveis && !this.state.respondido ? this.botoesAcerto() : null}

                {this.state.respondido ? this.botaoProximo() : null}

            </View>
        );
    };

    botoesAcerto = () => {
        return (
            <View style={styles.rowBotoes}>
                <Button iconLeft visible={this.state.botoesVisiveis}
                        onPress={() => this.sendAnswer(0)}
                        style={styles.botaoErro}>
                    <Icon name="times" type={"FontAwesome"}/>
                    <Text style={{fontWeight: "bold"}}>Errei</Text>
                </Button>
                <Button iconRight visible={this.state.botoesVisiveis}
                        onPress={() => this.sendAnswer(1)}
                        style={styles.botaoAcerto}>
                    <Icon name="check" type={"FontAwesome"} style={{marginLeft: "10%"}}/>
                    <Text style={{fontWeight: "bold"}}>Acertei</Text>
                </Button>
            </View>
        );
    };

    renderEnd = () => {
        return (
            <View>
                <View style={styles.itemEnd}>
                    <Text style={styles.t1}>Os cards chegaram ao fim.</Text>
                    <Text style={styles.t2}>{'\n Acertos: '}
                        <Text style={{fontWeight: "bold", color: "green"}}>{this.state.countSucesso}</Text>
                    </Text>
                    <Text style={styles.t2}>{'\n Erros: '}
                        <Text style={{fontWeight: "bold", color: "red"}}>{this.state.countFalha}</Text>
                    </Text>
                </View>
                <Button
                        onPress={() => this.props.navigation.navigate('ListContainers')}
                        style={styles.botaoVolta}>
                    <Icon style={{textAlign: "center",  color: "#6377F6"}} name="arrow-left" type={"FontAwesome"}/>
                    <Text style={{textAlign: "center", fontWeight: "bold", color: "#6377F6"}}> Voltar </Text>
                </Button>
            </View>
        );
    };

    renderMatch = () => {
        return (
            <InputButton
                placeholder={"Insira a Resposta"}
                value={this.state.matchAnswer}
                onClick={this.matchAnswer}
                changeText={this.setState}
                icon={"check"}
                onChangeText={(value) => this.setState({matchAnswer: value})}
                onPress={() => this.matchAnswer()}
            />
        );
    };


    botaoProximo = () => {
        return (
            <View>
                <Button primary onPress={() => this.next()} style={{width: "100%", marginTop: 20}}>
                    <Text style={{fontWeight: "bold"}}>Próximo</Text>
                    <Icon name="arrow-right" type={"FontAwesome"} />
                </Button>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    body:{
        padding: 20,
        justifyContent: "center",
    },
    container:{
        padding: 20,
        height: '100%',
    },
    cardContainer:{
        height: '70%',
        marginBottom: 20,
    },
    itemCard1:{
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "purple",
        borderWidth: 0,
        borderRadius: 13,
    },
    itemCard2:{
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "green",
        borderWidth: 0,
        borderRadius: 13,
    },
    titulo:{
        fontWeight: "bold",
        fontSize: 50,
        color: "white",
        textAlign: "center",
    },
    botaoVer:{
        fontWeight: "bold",
        width: "100%",
        marginBottom: 15,
        paddingLeft: "20%",
        paddingRight: "35%",
    },
    botaoVolta:{
        fontWeight: "bold",
        backgroundColor: "transparent",
        width: "100%",
        marginTop: 15,
        paddingLeft: "20%",
        paddingRight: "35%",
        borderWidth: 1,
        borderColor: "#6377F6"
    },
    botaoAcerto:{
        // fontWeight: "bold",
        width: "45%",
        backgroundColor: "green",
        // borderRadius: 13,
    },
    botaoErro:{
        // fontWeight: "bold",
        width: "45%",
        backgroundColor: "red",
        marginRight: "10%",
        // borderRadius: 13,
    },
    respostas:{
        color: "white",
        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
    },
    rowBotoes:{
        flexDirection: 'row',
        // marginTop: 25,
        // width: "100%"
    },
    t1: {
        fontSize: 20,
        fontWeight:"bold",
        fontStyle: "italic",
        color: "#515151",
        textAlign: "center",
        margin: "auto",
    },
    t2: {
        fontSize: 20,
    },
    itemEnd:{
        width: "100%",
        padding: 50,
        borderWidth: 1.5,
        borderColor: "lightgray",
        borderRadius: 13,
        marginTop: "30%",
        height: "53%",
    },
});

