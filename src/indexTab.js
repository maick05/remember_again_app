import React from 'react';

import RouteHome from './routes/routeHome';
import RouteListCards from './routes/routeListCards';
import RouteConfig from './routes/routeConfig';

import {View, StyleSheet} from "react-native";
import {Container, Tab, Tabs, TabHeading} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import FlashMessage from "react-native-flash-message";
import './config/StatusBarConfig';
import {MenuProvider} from "react-native-popup-menu";

export default class IndexTab extends React.Component {
    render() {
        return (
            <Container>
                <Tabs initialPage={0} tabBarPosition={"bottom"}>
                    <Tab heading={ <TabHeading><Icon style={styles.icon} name="check-square-o" /></TabHeading>}>
                        <MenuProvider>
                            <View style={{ flex: 1 }}>
                                <RouteHome/>
                                {/* GLOBAL COMPONENT INSTANCE */}
                                <FlashMessage position="bottom" animated={true} />
                            </View>
                        </MenuProvider>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon style={styles.icon} name="pencil-square-o" /></TabHeading>}>
                        <MenuProvider>
                            <View style={{ flex: 1 }}>
                                <RouteListCards/>
                                {/* GLOBAL COMPONENT INSTANCE */}
                                <FlashMessage position="bottom" animated={true} />
                            </View>
                        </MenuProvider>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon style={styles.icon} name="cog" /></TabHeading>}>
                        <MenuProvider>
                            <View style={{ flex: 1 }}>
                                <RouteConfig/>
                                {/* GLOBAL COMPONENT INSTANCE */}
                                <FlashMessage position="bottom" animated={true} />
                            </View>
                        </MenuProvider>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon style={styles.icon} name="info" /></TabHeading>}>
                        <MenuProvider>
                            <View style={{ flex: 1 }}>
                                <RouteListCards/>
                                {/* GLOBAL COMPONENT INSTANCE */}
                                <FlashMessage position="bottom" animated={true} />
                            </View>
                        </MenuProvider>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 20,
        color: "white"
    }
});
