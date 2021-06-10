import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Button, ImageBackground, ScrollView, SafeAreaView } from 'react-native'
import { ImageBrowser } from 'expo-image-picker-multiple'
import * as ExpoManipulator from 'expo-image-manipulator'
import { ImageManipulator } from 'expo-image-crop'
import { MaterialIcons } from '@expo/vector-icons'
import * as Print from 'expo-print';
import * as MediaLibrary from 'expo-media-library';
import Toast from 'react-native-root-toast'
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react/cjs/react.development'

const CameraEditor = ({ route, navigation }) => {

    const { images } = route.params
    const [photos, setPhotos] = useState(images)
    const [editor, setEditor] = useState(null)
    const [isButtonLoading, setButtonLoading] = useState(false)

    const _renderBackButton = () => {
        return (
            <TouchableOpacity style={{ paddingLeft: 10 }} onPress={() => navigation.navigate("Home")}>
                <Ionicons name="arrow-back-sharp" size={30} color="black" />
            </TouchableOpacity>
        )
    }

    navigation.setOptions({
        headerLeft: () => _renderBackButton()
    })

    const updateEditorBasic = async (status) => {
        await setEditor(status)
    }

    const updateEditor = async (state) => {
        await setEditor(state)
    }


    const updatePhotos = (uri) => {
        setPhotos(updPhotos => {
            const i = editor?.index
            const tempPhotos = updPhotos.map((photo, index) => {
                if (index == i) {
                    photo.uri = uri.uri
                    photo.base64 = uri.base64
                    return photo
                } else {
                    return photo
                }
            })

            return tempPhotos
        })
    }

    const EditorComponent = () => {

        const onToggleModal = () => {
            updateEditorBasic(null)
        }

        const setUpdated = async (uri) => {

            const image = await ExpoManipulator.manipulateAsync(uri.uri, [], {
                base64: true
            })

            await updatePhotos(image)
        }

        return (
            <ImageManipulator
                photo={{ uri: editor?.photo.uri }}
                isVisible={true}
                onPictureChoosed={(uri) => setUpdated(uri)}
                onToggleModal={onToggleModal}
            />
        )
    }

    const _generateHtml = async () => {

        const htmlImages = await photos.map((photo, index) => `
            <img 
                src="data:image/png;base64,${photo.base64}" 
                style="height: 98vh; width: 100vw; object-fit: contain"
            >
            `
        )

        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <style>
            h1 {
                margin-top: 200px;
            }
        </style>
        <body>
            ${htmlImages.join('')}
        </body>
        </html>
        `
        
    }

    const updateButtonLoading = async (status) => {
        await setButtonLoading(status)
    }

    const EditScreen = ({ edited, index }) => {

        const printPdf = async () => {

            updateButtonLoading(true)

            const html = await _generateHtml()
            
            const object = await Print.printToFileAsync({
                html
            })

            try {

                const perm = await MediaLibrary.requestPermissionsAsync()

                if (perm.status === 'granted') {
                    const asset = await MediaLibrary.createAssetAsync(object.uri);
                    const album = await MediaLibrary.getAlbumAsync('Download');
                    if (album == null) {
                        await MediaLibrary.createAlbumAsync('Download', asset, false);
                    } else {
                        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
                    }
                    let toast = Toast.show('Saved in Downloads', {
                        duration: Toast.durations.LONG,
                    });

                    setTimeout(function hideToast() {
                        Toast.hide(toast);
                        updateButtonLoading(false)
                        navigation.navigate('Home')
                    }, 2000);
                } else {
                    navigation.navigate('Home')
                }

            } catch (e) {
                console.log(e);
            }

            updateButtonLoading(false)

        }

        return (

            editor?.visible ? <EditorComponent /> : (
                <SafeAreaView style={styles.container}>
                    <ScrollView style={{ height: "70%", width: Dimensions.get('screen').width }} contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap",  }}>
                        {
                            photos.map((photo, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => updateEditor({ visible: true, photo: photo, index: i })} style={{ height: Dimensions.get('screen').width * 0.5, width: Dimensions.get('screen').width / 3, }}>
                                        <Image source={{ uri: photo.uri }} key={i} style={{ height: Dimensions.get('screen').width * 0.5, width: Dimensions.get('screen').width / 3 }} />
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={styles.bottomNav}>
                        {isButtonLoading ? <ActivityIndicator size="large" color="white" /> :
                            <TouchableOpacity style={styles.touchableNav} onPress={() => printPdf()}>
                                <MaterialIcons name="picture-as-pdf" size={30} color="#fff" />
                                <Text style={{ color: "#fff" }}>Export as PDF</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </SafeAreaView>
            )

        )
    }


    return (
        <View style={{ flex: 1, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
            <EditScreen />
        </View>
    )
}

export default CameraEditor

const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: "center",
        alignItems: "center"
    },
    emptyStay: {
        textAlign: 'center',
    },
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#0580FF'
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff'
    },
    bottomNav: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 1,
        position: "absolute",
        height: 50,
        bottom: 20,
        width: "50%",
        borderStyle: "solid",
        backgroundColor: colors.blue,
        borderRadius: 30,
        elevation: 5
    },
    touchableNav: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    }
});
