import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Button, ImageBackground, ScrollView, SafeAreaView } from 'react-native'
import { ImageBrowser } from 'expo-image-picker-multiple'
import { ImageManipulator } from 'expo-image-crop'
import { MaterialIcons } from '@expo/vector-icons'


const ImagePicker = ({ navigation }) => {

    const [photos, setPhotos] = useState([])
    const [select, setSelect] = useState(false)
    const [editor, setEditor] = useState(null)

    const updatePhotos = async (outputUri) => {
        let tempPhotos = photos
        tempPhotos[editor.index].uri = outputUri
        await setPhotos(tempPhotos)
    }

    const SelectPicker = () => {

        const _getHeaderLoader = () => (
            <ActivityIndicator size="large" color={'#0580FF'} style={{ marginRight: 20 }} />
        )

        const imagesCallback = (callback) => {
            navigation.setOptions({
                headerRight: () => _getHeaderLoader()
            })

            callback.then(async (photos) => {
                const cPhotos = [];
                for (let photo of photos) {
                    cPhotos.push({
                        uri: photo.uri,
                        name: photo.filename,
                        type: 'image/jpg'
                    })
                }
                await setPhotos(cPhotos)
                await setSelect(true)
                navigation.setOptions({
                    headerRight: null,
                    title: "Edit Images",
                })
            })
                .catch((e) => console.log(e));
        }

        const _renderDoneButton = (count, onSubmit) => {
            if (!count) return null;
            return <TouchableOpacity title={'Done'} onPress={onSubmit} style={{ marginRight: 20 }}>
                <Text onPress={onSubmit} style={{ fontSize: 16, fontWeight: "bold" }}>Done</Text>
            </TouchableOpacity>
        }

        const updateHandler = (count, onSubmit) => {
            navigation.setOptions({
                title: `Selected ${count} files`,
                headerRight: () => _renderDoneButton(count, onSubmit)
            });

        };

        return (
            <View style={{ height: "100%" }}>
                <ImageBrowser
                    onChange={(count, onSubmit) => updateHandler(count, onSubmit)}
                    callback={(callback) => imagesCallback(callback)}
                    renderSelectedComponent={
                        (number) => <View style={styles.countBadge}>
                            <Text style={styles.countBadgeText}>{number}</Text>
                        </View>
                    }
                    emptyStayComponent={() => <Text style={styles.emptyStay}>Empty =(</Text>}

                />
            </View>
        )
    }

    const EditorComponent = () => {

        const onToggleModal = () => {
            setEditor(null)
        }

        const setUpdated = async (uri, index) => {

            await setPhotos(updPhotos => {
                const i = editor?.index
                const tempPhotos = updPhotos.map((photo, index) => {
                    if (index == i) {
                        photo.uri = uri.uri
                        return photo
                    } else {
                        return photo
                    }
                })

                return tempPhotos
            })
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

    const EditScreen = ({ edited, index }) => {
        return (

            editor?.visible ? <EditorComponent /> : (


                <SafeAreaView style={styles.container}>
                    <ScrollView style={{ height: "70%", width: Dimensions.get('screen').width, flexDirection: "row", flexWrap: "wrap" }}>
                    {
                            photos.map((photo, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => setEditor({ visible: true, photo: photo, index: i })} style={{borderWidth: 1}}>
                                        <Image source={{ uri: photo.uri }} key={i} style={{ height: Dimensions.get('screen').width * 0.5, width: Dimensions.get('screen').width * 0.33 }} />
                                    </TouchableOpacity>
                                )
                            })
                    }
                    </ScrollView>
                    <View style={styles.bottomNav}>
                        <TouchableOpacity style={styles.touchableNav} onPress={() => navigation.navigate('ImagePicker')}>
                            <MaterialIcons name="picture-as-pdf" size={30} color="#fff" />
                            <Text style={{ color: "#fff" }}>Export as PDF</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )

        )
    }


    return (
        <View style={{ flex: 1, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
            { select ? <EditScreen /> : <SelectPicker />}
        </View>
    )
}

export default ImagePicker

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
