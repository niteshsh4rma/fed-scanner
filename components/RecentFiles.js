import React from 'react'
import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native'
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import { useEffect } from 'react';

const RecentFiles = () => {

    const [images, setImages] = useState([])

    const getMedia = async () => {
        const result = await MediaLibrary.getAssetsAsync({
            mediaType: MediaLibrary.MediaType.video
        })

        setImages(result.assets)
    }

    MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.images
    })

    useEffect(() => {
        getMedia()
    }, [])

    return (
        <View>
            <View style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}>
                {images.map((image, i) => <Image source={{uri: image.uri}} key={i} style={{ height: Dimensions.get('screen').width*0.33, width: Dimensions.get('screen').width*0.33 }}/>)}
            </View>
        </View>
    )
}

export default RecentFiles

const styles = StyleSheet.create({

})
