import React, {useState} from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import { ImageEditor } from "expo-image-editor"

const ImageEditorScreen = ({ route, navigation }) => {

    const { photo, i } = route.params;
    const [imageUri, setImageUri] = useState(photo.uri);
    const [editorVisible, setEditorVisible] = useState(false);
    const [imageData, setImageData] = useState(null)

    return (
        <View style={{ width: Dimensions.get('screen').width, height: Dimensions.get('screen').width }}>
            <ImageEditor
                visible={true}
                onCloseEditor={() => setEditorVisible(false)}
                imageUri={imageUri}
                minimumCropDimensions={{
                    width: 100,
                    height: 100,
                }}
                onEditingComplete={(result) => {
                    setImageData(result);
                    navigation.navigate('ImagePicker')
                }}
                mode="full"
            />
        </View>
    )
}

export default ImageEditorScreen

const styles = StyleSheet.create({})
