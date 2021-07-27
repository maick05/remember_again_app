import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, FlatList, Alert} from "react-native";
import request from '../services/service';
import { showMessage } from "react-native-flash-message";
import { NavigationEvents } from 'react-navigation';
import LoaderAnimated from "../components/loaderAnimated";
import Icon from 'react-native-vector-icons/FontAwesome';


export default class ListCards extends Component{
    static navigationOptions = {
        title: 'Todos os cards'
    };

    state = {
        loading: false,
        results: [],
        response: ''
    };

    componentDidMount() {
        const context = this;
        this.setState({loading: true});
        this.loadCards();
    }

    loadCards = async () => {
        const response = await request('/cards/list', {}, true);
        this.setState({results: response.data.results, loading: false});

        if(response.data.sucesso)
            return;

        showMessage({
            message: response.data.mensagem,
            type: response.data.type,
        });
    };

    deleteCard = async (id) => {
        Alert.alert(
            'Atenção',
            'Dseja realmente apagar esse registro?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'Sim', onPress: () => this.confirmDeleteCard(id)},
            ],
            {cancelable: false},
        );
    };

    confirmDeleteCard = async (id) => {
        this.setState({loading: true});
        let params = {id:id};
        const res = await request('/cards/delete', params);

        this.setState({loading: false});
        showMessage({
            message: res.data.mensagem,
            type: res.data.type,
        });

        if(res.data.sucesso)
            this.loadCards();
    };

    renderItem = ({ item }) => (
        <View style={styles.itemList} >
                <TouchableWithoutFeedback
                        onPress={() => {this.props.navigation.navigate('SaveCard', {word: item.word, id: item.id})}}>
                    <Text style={{fontWeight: "bold"}}>{item.word}</Text>
                </TouchableWithoutFeedback>
                <View style={{alignItems: 'flex-end', width: '100%'}}>
                    <TouchableWithoutFeedback onPress={() => {this.deleteCard(item.id)}}>
                        <Icon style={{marginRight: 10, float: "right"}} name="trash" reverse={true} size={22} color="black"/>
                    </TouchableWithoutFeedback>
                </View>

        </View>
    );


    render(){
        return (
            <View style={styles.body}>
                <NavigationEvents
                    onDidFocus={() => {this.loadCards();}}
                />
                <View style={styles.container}>
                    <FlatList
                        contentContainerStyle={styles.list}
                        data={this.state.results}
                        keyExtractor={item => item.id}
                        renderItem={this.renderItem}
                        onEndReached={this.loadMore}
                        onEndReachedThereshold={0.1}
                    />
                </View>
                {/*<Text> a -> {this.state.response}</Text>*/}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => this.props.navigation.navigate('SaveCard', {id: false})}
                    style={styles.TouchableOpacityStyle}>
                    {/*<Image*/}
                    {/*    //We are making FAB using TouchableOpacity with an image*/}
                    {/*    //We are using online image here*/}
                    {/*    source={{*/}
                    {/*        uri:'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',*/}
                    {/*    }}*/}
                    {/*    //You can use you project image Example below*/}
                    {/*    //source={require('./images/float-add-icon.png')}*/}
                    {/*    style={styles.FloatingButtonStyle}*/}
                    {/*/>*/}
                    <Icon name="plus" reverse={true} size={35} color="#999" style={styles.iconStyle} />
                </TouchableOpacity>
                <LoaderAnimated visible={this.state.loading}/>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    body:{
        padding: 20,
        height: "100%"
    },
    container:{
        padding: 5,
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 55,
    },
    itemList:{
        backgroundColor: "lightgray",
        padding: 20,
        borderRadius: 9,
        marginBottom: 15,
    },
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
        //backgroundColor:'black'
    },
    iconStyle:
    {
        backgroundColor: "blue",
        width: 50,
        height: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 35,
        color: "white",
    }
});

