import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import * as ImageManipulator from 'expo-image-manipulator'
import { ImageBrowser } from 'expo-image-picker-multiple'

const ImagePicker = ({ navigation }) => {

    const [images, setImages] = useState([])

    useEffect(() => {
        if (images.length > 0){
            navigation.navigate('CameraEditor', { images })
        }
    }, [images.length])

    const _updateImages = async (tphotos) => {

        const imagesProcessPromise = new Promise(async (resolve, reject) => {
            let upImages = []
            let counter = tphotos.length
            await tphotos.forEach(async element => {
                const image = await ImageManipulator.manipulateAsync(element.uri, [], {
                    base64: true
                })
                counter--
                upImages = [...upImages, image]
                if (counter == 0){
                    resolve(upImages)
                }
            });

        })

        Promise.resolve(imagesProcessPromise).then((upImages) => setImages(upImages))

    }

    const SelectPicker = () => {

        const _getHeaderLoader = () => (
            <ActivityIndicator size="large" color={'#0580FF'} style={{ marginRight: 20 }} />
        )

        const imagesCallback = async(callback) => {
            navigation.setOptions({
                headerRight: () => _getHeaderLoader()
            })

            await callback.then((tphotos) => {
                _updateImages(tphotos)

            }).catch((e) => console.log(e));
        }

        const _renderDoneButton = (count, onSubmit) => {
            if (!count) return null;
            return <TouchableOpacity title={'Done'} onPress={onSubmit} style={{ marginRight: 20 }}>
                <Text onPress={onSubmit} style={{ fontSize: 16, fontWeight: "bold" }}>Done</Text>
            </TouchableOpacity>
        }

        const updateHandler = async (count, onSubmit) => {
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


    return (
        <View style={{ flex: 1, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
            <SelectPicker />
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
