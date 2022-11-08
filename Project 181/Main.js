import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from "expo-permissions";
import * as FaceDetector from 'expo-face-detector';
import Filter1 from './Filter1'
import Filter2 from './Filter2'
import Filter3 from './Filter3'
import Filter4 from './Filter4'
import Filter5 from './Filter5'

let data = {
    "crown": [
        {
            "id": "1",
            "image": require('../assets/crown-pic-1.png')
        },
        {
            "id": "2",
            "image": require('../assets/crown-pic-2.png')
        },
        {
            "id": "3",
            "image": require('../assets/crown-pic-3.png')
        },
    ],
    "hat": [
        {
            
            "id": "4",
            "image": require('../assets/hair-pic-1.png')
        },
        {
            "id": "5",
            "image": require('../assets/hair-pic-2.png')
        },
    ],
    "hair":[
        {
            "id": "6",
            "image": require('../assets/hair-pic-1.png')
        },
    ],
    "flowers":[
        {
            "id": "7",
            "image": require('../assets/flower-pic-1.png')
        },
        {
            "id": "8",
            "image": require('../assets/flower-pic-2.png')
        },
        {
            "id": "9",
            "image": require('../assets/flower-pic-3.png')
        },
    ],
    "ears": [
        {
            "id": "10",
            "image": require('../assets/other-pic-1.png')
        },
        {
            "id": "11",
            "image": require('../assets/other-pic-2.png')
        },
        {
            "id": "12",
            "image": require('../assets/other-pic-3.png')
        },
    ]
}

export default class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasCameraPermission: null,
            faces: []
        }
    }

    componentDidMount() {
        Permissions
            .askAsync(Permissions.CAMERA)
            .then(this.onCameraPermission)
    }

    onCameraPermission = (status) => {
        this.setState({ hasCameraPermission: status.status === 'granted' })
    }

    onFacesDetected = (faces) => {
        this.setState({ faces: faces })
    }

    onFaceDetectionError = (error) => {
        console.log(error)
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />
        }
        if (hasCameraPermission === false) {
            return (
                <View style={styles.container}>
                    <Text>No access to camera</Text>
                </View>
            )
        }
        console.log(this.state.faces)
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.headingContainer}>
                    <Text style={styles.titleText}>FRAPP</Text>
                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                </View>
                <View style={styles.filterContainer}>

                </View>
                <View style={styles.cameraStyle}>
                    <Camera
                        style={{ flex: 1 }}
                        type={Camera.Constants.Type.front}
                        faceDetectorSettings={{
                            mode: FaceDetector.Constants.Mode.fast,
                            detectLandmarks: FaceDetector.Constants.Landmarks.all,
                            runClassifications: FaceDetector.Constants.Classifications.all
                        }}
                        onFacesDetected={this.onFacesDetected}
                        onFacesDetectionError={this.onFacesDetectionError}
                    />
                    {
                        this.state.faces.map(face => {
                            if (this.state.current_filter === "filter_1") {
                                return <Filter1 key={face.faceID} face={face} />
                            } else if (this.state.current_filter === "filter_2") {
                                return <Filter2 key={face.faceID} face={face} />
                            } else if (this.state.current_filter === "filter_3") {
                                return <Filter3 key={face.faceID} face={face} />
                            } else if (this.state.current_filter === "filter_4") {
                                return <Filter4 key={face.faceID} face={face} />
                            } else if (this.state.current_filter === "filter_5") {
                                return <Filter5 key={face.faceID} face={face} />
                            }
                        })
                    }
                </View>
                <View style={styles.actionContainer}>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {},
    actionContainer: {}
});