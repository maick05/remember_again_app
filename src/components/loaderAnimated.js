import AnimatedLoader from "react-native-animated-loader";
import React, {Component} from "react";
import {StyleSheet, View} from "react-native";

export default class LoaderAnimated extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <AnimatedLoader
                    ref={'animeLoad'}
                    visible={this.props.visible}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("./loader.json")}
                    animationStyle={styles.lottie}
                    speed={1}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    lottie: {
        width: 100,
        height: 100
    }
});

