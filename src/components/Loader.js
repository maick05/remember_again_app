import React, {Component} from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";


export default class Loader extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator animating={this.props.visible} size="large" color="#0000ff"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 20
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});
