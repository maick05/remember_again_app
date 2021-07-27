import React, { Component } from 'react';
import {View, TouchableOpacity, StyleSheet} from "react-native";
import request from '../services/service';
import { Text } from 'native-base';
import CardView from 'react-native-cardview';
import IconBadge from 'react-native-icon-badge';
import LoaderAnimated from "../components/loaderAnimated";


import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCloudSun, faCalendarWeek, faCalendar } from '@fortawesome/free-solid-svg-icons';
import {NavigationEvents} from 'react-navigation';
export default class ListContainers extends Component{

    static navigationOptions = {
        title: 'Containers',
    };

    state = {
        loading: false,
        qtd1:0,
        qtd2:0,
        qtd3:0,
        qtd4:0,
        response: '',
    };

    componentDidMount(): void {
        this.setState({ loading: true});
        this.loadQtd();
    }

    loadQtd = async () => {
        this.setState({loading: false });

        const response = await request('/containers/getQtdCardsByContainer', {}, true);

        if(response.data.results[0] != undefined)
            this.setState({qtd1: response.data.results[0].qtd});
        if(response.data.results[1] != undefined)
            this.setState({qtd2: response.data.results[1].qtd});
        if(response.data.results[2] != undefined)
            this.setState({qtd3: response.data.results[2].qtd});
        if(response.data.results[3] != undefined)
            this.setState({qtd4: response.data.results[3].qtd});
        this.setState({loading: false});
    }

    render(){
        return (
            <View style={styles.body}>
                <View style={styles.container}>
                    <NavigationEvents onDidFocus={this.loadQtd}/>
                    <View style={styles.MainContainer}>
                        <View style={styles.itemCardList} >
                            <IconBadge
                                MainElement={
                                    <View>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => this.props.navigation.navigate('AnswerCard', {idcontainer: 1, nome: 'Diário'})}
                                            style={styles.TouchableOpacityStyle}>
                                            <CardView
                                                cardElevation={5}
                                                cardMaxElevation={5}
                                                cornerRadius={5}
                                                style={styles.cardViewStyle}>
                                                <Text style={styles.cardView_InsideText}> Diário </Text>
                                                <FontAwesomeIcon size={70} color={"grey"} icon={ faCloudSun } />
                                            </CardView>
                                        </TouchableOpacity>
                                    </View>
                                }
                                BadgeElement={<Text style={{color:'#FFFFFF'}}>{this.state.qtd1}</Text>}
                                IconBadgeStyle={styles.badgeCard}
                                Hidden={false}
                            />
                        </View>
                        <View style={styles.itemCardList}>
                            <IconBadge
                                MainElement={
                                    <View>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => this.props.navigation.navigate('AnswerCard', {idcontainer: 2, nome: 'Semanal'})}
                                            style={styles.TouchableOpacityStyle}>
                                            <CardView
                                                cardElevation={5}
                                                cardMaxElevation={5}
                                                cornerRadius={5}
                                                style={styles.cardViewStyle}>
                                                <Text style={styles.cardView_InsideText}> Semanal </Text>
                                                <FontAwesomeIcon size={70} color={"grey"} icon={ faCalendarWeek } />
                                            </CardView>
                                        </TouchableOpacity>
                                    </View>
                                }
                                BadgeElement={<Text style={{color:'#FFFFFF'}}>{this.state.qtd2}</Text>}
                                IconBadgeStyle={styles.badgeCard}
                                Hidden={false}
                            />
                        </View>
                    </View>

                    <View style={styles.MainContainer}>
                        <View style={styles.itemCardList}>
                            <IconBadge
                                MainElement={
                                    <View>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => this.props.navigation.navigate('AnswerCard', {idcontainer: 3, nome: 'Quinzenal'})}
                                            style={styles.TouchableOpacityStyle}>
                                            <CardView
                                                cardElevation={5}
                                                cardMaxElevation={5}
                                                cornerRadius={5}
                                                style={styles.cardViewStyle}>
                                                <Text style={styles.cardView_InsideText}> Quinzenal </Text>
                                                <FontAwesomeIcon size={70} color={"grey"} icon={ faCalendarWeek } />
                                            </CardView>
                                        </TouchableOpacity>
                                    </View>
                                }
                                BadgeElement={<Text style={{color:'#FFFFFF'}}>{this.state.qtd3}</Text>}
                                IconBadgeStyle={styles.badgeCard}
                                Hidden={false}
                            />
                        </View>
                        <View style={styles.itemCardList}>
                            <IconBadge
                                MainElement={
                                    <View>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => this.props.navigation.navigate('AnswerCard', {idcontainer: 4, nome: 'Mensal'})}
                                            style={styles.TouchableOpacityStyle}>
                                            <CardView
                                                cardElevation={5}
                                                cardMaxElevation={5}
                                                cornerRadius={5}
                                                style={styles.cardViewStyle}>
                                                <Text style={styles.cardView_InsideText}> Mensal </Text>
                                                <FontAwesomeIcon size={70} color={"grey"} icon={ faCalendar } />
                                            </CardView>
                                        </TouchableOpacity>
                                    </View>
                                }
                                BadgeElement={<Text style={{color:'#FFFFFF'}}>{this.state.qtd4}</Text>}
                                IconBadgeStyle={styles.badgeCard}
                                Hidden={false}
                            />
                        </View>
                    </View>
                    {/*<Text> a -> {this.state.response}</Text>*/}
                </View>


                <LoaderAnimated visible={this.state.loading}/>

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
    cards: {
      width: "40%",
    },
    MainContainer: {
        justifyContent: 'center',
        height:"25%",
        flexDirection: 'row',
    },
    cardViewStyle:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        zIndex: 2,
    },
    cardView_InsideText:{
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    iconCard: {

    },
    badgeCard: {
        width:30,
        height:30,
        backgroundColor: 'blue',
        elevation: 7,
        alignSelf: 'flex-end',
        marginTop: -13,
        marginRight: -10,
    },
    itemCardList:{
        width: "40%",

        margin: 10,
        marginTop: 0,
        marginBottom: 0,
    }
});

