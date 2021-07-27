import * as React from "react";
import {
    StyleSheet,
    TextInputProps,
} from "react-native";
import {Button, Icon, Input, Item} from 'native-base';

interface State {
    isFocused: boolean;
}

class InputButton extends React.Component<TextInputProps, State> {
    state = {
        isFocused: false,
        palavra: "",
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {isFocused} = this.state;
        const {onFocus, onBlur, ...otherProps} = this.props;
        return (
            <Item>
                <Input placeholder={this.props.placeholder} value={this.props.value} {...otherProps} />
                <Button success onPress={this.props.onClick}>
                    <Icon style={{textAlign: "center"}} name={this.props.icon} type={"FontAwesome"}/>
                </Button>
            </Item>
        );
    };
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        paddingLeft: 6
    }
});

export default InputButton;
