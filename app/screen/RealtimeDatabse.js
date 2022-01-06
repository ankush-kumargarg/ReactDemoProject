import React from "react";
import database, { firebase } from "@react-native-firebase/database";
import { View, Text, StyleSheet } from "react-native";

export default class RealtimeDatabase extends React.Component {

    constructor(props) {
        super(props);
        this.props = {
            userList: []
        }
    }

    componentDidMount() {
        console.log('start', "start");
        const reference = database().ref('users');
        reference.once('value', snapshot => {
            console.log('User data: ', snapshot);
            /*this.setState({
                userList: snapshot.val()
            })
            console.log("UserListsdsd", this.userList);*/
        });
    }

    addItem = (name, mName, lname) => {
        console.log('start', "start");
        const reference = database().ref('users');
        reference.push({
            name: name,
            mName: mName,
            lname: lname
        });
    };

    render() {
        return (
            <View>
                <Text style={style.textStyle} onPress={() => this.addItem("Ankush", "Kumar", "Garg")}>Add Data</Text>
            </View>

        );
    }
}

const style = StyleSheet.create({
    textStyle: {
        margin: 20,
        color: "black",
        textAlign: "center",
        backgroundColor: "orange",
        borderRadius: 10,
        padding: 10

    }

});
