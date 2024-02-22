import React, { useState, useEffect } from 'react';
import QRCode from 'react-native-qrcode-svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import {
    Background,
    initial_color,
    secondary_color,
    Café_color,
} from './Colors';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { Dimensions } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
const Qr_Code = (props) => {
    // const [today, setToday] = useState([
    //     {
    //         date: moment().format('YYYY-MM-DD'),
    //         location: false,
    //     }
    // ])
    const [location, setLocation] = useState(false)
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'))
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log('granted', granted);
            if (granted === 'granted') {
                console.log('You can use Geolocation');
                return true;
            } else {
                console.log('You cannot use Geolocation');
                return false;
            }
        } catch (err) {
            return false;
        }
    };
    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
            console.log('res is:', res);
            if (res) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);
                        setLocation(position)
                        // this.setState({ location: position });
                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        setLocation(false)
                        // this.setState({ location: false });
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        });
    };
    // const [today, setToday] = useState();
    // // const date = today.getDate();
    useEffect(() => {
        getLocation()
    }, []);
    return (
        <>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
                <View style={styles.headerContainer}>
                    {/* Header Tittle  */}
                    {/* <TouchableOpacity
                    style={{ justifyContent: 'center', marginLeft: RFValue(10) }}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                    <Entypo
                        name="chevron-with-circle-right"
                        color="#000"
                        size={30}
                        style={{ alignSelf: 'center' }}
                    />
                </TouchableOpacity> */}
                    <View style={styles.headerTittleContainer}>
                        <MaterialCommunityIcons
                            name="qrcode-scan"
                            size={20}
                            style={{
                                color: Background,
                                marginRight: 5
                            }}
                        />
                        <Text style={styles.headerTittleTxtStyle}>كود الغيـاب </Text>
                    </View>
                </View>
                <ScrollView style={{ backgroundColor: Background }}>
                    <View style={styles.container}>

                        <QRCode
                            value={date + location}
                            size={300}
                            color="black"
                            backgroundColor="white"
                            alignSelf='center'
                            logo={require('../images/AppIcon.png')}
                            logoSize={30}
                            logoMargin={2}
                            logoBackgroundColor='transparent'
                        />

                        <Text style={styles.textStyle}>
                            قم بمسح الكود لتسجيل الغياب
                        </Text>

                        {/* <TextInput
                            style={styles.textInputStyle}
                            onChangeText={
                                (inputText) => setInputText(inputText)
                            }
                            placeholder="قم بإدخال قيمة"
                            value={inputText}
                        /> */}
                        {/* <TouchableOpacity
                            style={styles.buttonStyle}
                            onPress={() => {
                                setQrvalue(inputText)
                                //  console.log(qrvalue)
                            }}>
                            <Text style={styles.buttonTextStyle}>
                                إنشاء كود الغياب
                            </Text>
                        </TouchableOpacity> */}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* footer */}

            <View
                style={{
                    height: height * 0.075,
                    backgroundColor: '#fff',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    elevation: 5,
                    shadowRadius: 9.51,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 7 },
                    shadowOpacity: 0.43,
                    justifyContent: 'space-around',
                    bottom: 0,
                }}>
                {/* home page */}

                <TouchableOpacity
                    onPress={() => {
                        props.navigation.navigate('HomePage');
                    }}
                    style={{
                        alignItems: 'center',
                        width: width * 0.16,
                        height: height * 0.08,
                        justifyContent: 'center',
                        // marginRight: width * 0.1,
                    }}>
                    <FontAwesome
                        name="home"
                        size={30}
                        style={{
                            color: Café_color,
                            marginTop: -10,
                        }}
                    />

                </TouchableOpacity>

                <TouchableOpacity

                    style={{
                        alignItems: 'center',
                        width: width * 0.16,
                        height: height * 0.08,
                        justifyContent: 'center',
                        // marginRight: width * 0.1,
                    }}>
                    <MaterialCommunityIcons
                        name="qrcode-scan"
                        size={30}
                        style={{
                            color: initial_color,
                            marginTop: -10,
                        }}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}


export default Qr_Code;

const styles = StyleSheet.create({
    headerContainer: {
        width: width,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: height * 0.08,
        justifyContent: 'space-around',
        backgroundColor: initial_color,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headerTittleContainer: {
        width: width,
        // alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerTittleTxtStyle: {
        color: Background,
        // fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFValue(16),
    },
    container: {
        backgroundColor: Background,
        alignItems: 'center',
        textAlign: 'center',
        marginTop: height * .033,
        height: height * .7,
        justifyContent: 'center',
        borderRadius: 30,
        width: width * .95,
        alignSelf: 'center',
        elevation: 3,
        marginBottom: 5

        // padding: 10,
    },
    titleStyle: {
        fontSize: RFValue(17),
        color: '#1D1D1D',
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    textStyle: {
        fontSize: RFValue(16),
        textAlign: 'center',
        color: '#1D1D1D',
        margin: 25,
    },
    textInputStyle: {
        flexDirection: 'row',
        width: width * .85,
        height: 50,
        alignSelf: 'center',
        elevation: 5,
        borderRadius: 5,
        backgroundColor: Background,
        padding: 15
    },
    buttonStyle: {
        backgroundColor: initial_color,
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: initial_color,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
        padding: 10,
        width: width * .5,
        alignSelf: 'center',
        marginBottom: 20
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 15,
        alignSelf: 'center'
    },
});