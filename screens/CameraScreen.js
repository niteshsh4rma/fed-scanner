import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useRef } from 'react';

const CameraScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [images, setImages] = useState([])
    const [flash, setFlash] = useState(false)
    let camera = useRef()

    const clickImage = async () => {
        let photo = await camera.takePictureAsync({ base64: true, quality: 0.2 })
        setImages(imgs => {
            const tempImages = [...imgs, photo]
            return tempImages
        })
    }

    const ImagesPreview = () => {
        return (
            <Image source={{ uri : images[images.length - 1].uri }} style={{height: 60, width: 60}}/>
        )
    }

    const editSend = () => {
        navigation.navigate('CameraEditor', { images, notConverted: false })
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();

            if (status === 'granted') {
                setHasPermission(status === 'granted');
            } else {
                navigation.navigate("Home")
            }

        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>

            <Camera style={styles.camera} type={type} flashMode={flash ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off} autoFocus={Camera.Constants.AutoFocus.on} ref={ref => {camera = ref}}>
                <View style={{ backgroundColor: "rgba(0,0,0,0.3)", height: "10%", alignItems: "center", justifyContent: "space-evenly", flexDirection: "row"}}>
                    <TouchableOpacity onPress={() => setFlash(!flash)} style={{ backgroundColor: "transparent" }}>
                        {flash ? <MaterialCommunityIcons name="flashlight" size={24} color="white" /> : <MaterialCommunityIcons name="flashlight-off" size={24} color="white" />}
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <MaterialIcons name="flip-camera-android" size={24} color="white" onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}></MaterialIcons>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    {images.length != 0 && <TouchableOpacity>
                            <ImagesPreview />
                        </TouchableOpacity>
                    }
                    
                    <TouchableOpacity onPress={() => clickImage()}>
                        <MaterialIcons name="camera" size={60} color="white"/>
                    </TouchableOpacity>
                    {images.length != 0 && <TouchableOpacity onPress={() => editSend()}>
                            <MaterialIcons name="done" size={60} color="white" />
                        </TouchableOpacity>
                    }
                </View>
            </Camera>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        height: "15%",
        width: "100%",
        backgroundColor: "#0580FF",
        flexDirection: 'row',
        position: "absolute",
        bottom: 0,
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default CameraScreen