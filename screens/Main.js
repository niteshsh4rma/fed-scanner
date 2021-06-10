import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Platform, StatusBar, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import colors from '../colors';
import RecentFiles from '../components/RecentFiles';
import ImagePicker from 'react-native-image-crop-picker';

const Main = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ height: "70%", width: "100%" }}>
                <RecentFiles />
            </ScrollView>
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.touchableNav} onPress={() => navigation.navigate('ImagePicker')}>
                    <MaterialIcons name="camera" size={45} color="#fff" />
                    <Text style={{ color: "#fff" }}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableNav} onPress={() => navigation.navigate('ImagePicker')}>
                    <MaterialIcons name="photo-library" size={45} color="#fff" />
                    <Text style={{ color: "#fff" }}>Library</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center"
    },
    bottomNav: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 1,
        height: 50,
        width: "60%",
        position: "absolute",
        bottom: 20,
        borderStyle: "solid",
        backgroundColor: colors.blue,
        borderRadius: 30,
        elevation: 5
    },
    touchableNav: {
        alignItems: "center"
    }
});

export default Main
