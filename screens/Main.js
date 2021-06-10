import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, StatusBar, SafeAreaView, ImageBackground, Dimensions, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import colors from '../colors';
import FedLogo from '../assets/fedscanner.png'

const Main = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: "https://i.stack.imgur.com/JHYTI.jpg" }} style={styles.backgroundImage}>
                <Image source={FedLogo} style={{ height: "20%", width: "65%", position: "absolute", top: "-5%", resizeMode: "contain", alignSelf: "center" }}/>
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.touchableNav} onPress={() => navigation.navigate('CameraScreen')}>
                        <MaterialIcons name="camera" size={60} color={colors.blue} />
                        <Text style={{ color: colors.blue }}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableNav} onPress={() => navigation.navigate('ImagePicker')}>
                        <MaterialIcons name="photo-library" size={60} color={colors.blue} />
                        <Text style={{ color: colors.blue }}>Library</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight
    },
    bottomNav: {
        alignItems: "center",
        flex: 1,
        position: "absolute",
        height: "50%",
        justifyContent: "space-evenly",
        width: "50%",
        alignSelf: "center",
        top: "40%",
        borderStyle: "solid",
        backgroundColor: "white",
        borderRadius:300,
        elevation: 70
    },
    touchableNav: {
        alignItems: "center"
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch',
        width: "100%",
        justifyContent: 'center',
        height: Dimensions.get('screen').height *0.8,
        bottom: 0,
        position: "absolute"
    }
});

export default Main
