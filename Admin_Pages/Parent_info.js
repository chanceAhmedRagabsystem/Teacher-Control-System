/* eslint-disable prettier/prettier */
import React from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Button,
    Modal,
    Alert
} from 'react-native';
import {
    Background,
    initial_color,
    beige_color,
    secondary_color,
    Café_color,
    gray_color,
    searchColor
} from './Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
import { Hoshi, Fumi } from 'react-native-textinput-effects';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class Parent_info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parents_data: this.props.route.params.parents_data,

        };
    }
    componentDidMount() {
        console.log("parent info", this.state.parents_data)
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />

                {/* Header  */}
                <View style={styles.headerContainer}>

                    {/* Header Tittle  */}
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 15 }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Entypo name="chevron-with-circle-right" color='#000' size={30} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <View style={styles.headerTittleContainer}>

                        <Text style={styles.headerTittleTxtStyle}>المعلومات الشخصية</Text>

                    </View>

                </View>

                {/* Body */}
                <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                    <View style={{
                        width: 95, height: 95, alignSelf: 'center', borderRadius: 5,
                        justifyContent: 'center', borderWidth: .2, borderColor: '#000', marginTop: 10,

                    }}>
                        <Image source={require('../images/parents.jpg')} style={{
                            width: 90, height: 90,
                            alignSelf: 'center', borderRadius: 10,
                        }}
                            resizeMode='center'
                        />


                    </View>

                    <View style={styles.bodyContainer}>
                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 20, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            اسم ولي الأمر
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>

                            <Text style={styles.txtStyle}>
                                {this.state.parents_data.user_name}</Text>

                        </View>
                        {/* <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 10, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            أسم الطالب
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>

                            <Text style={styles.txtStyle}>{this.state.parents_data.student_name}</Text>

                        </View> */}
                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 10, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            كود الطالب
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>

                            <Text style={styles.txtStyle}>{this.state.parents_data.student_code}</Text>

                        </View>
                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 10, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            البريد الإلكترونى
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>

                            <Text style={styles.txtStyle}>{this.state.parents_data.user_email}</Text>

                        </View>

                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 10, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            رقم الهاتف
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>

                            <Text style={styles.txtStyle}>{this.state.parents_data.user_phone}</Text>

                        </View>


                    </View>

                </ScrollView>

            </>
        );
    }
}

const styles = StyleSheet.create({
    // Header Style
    // ------------------------------------------------------------------------
    headerContainer: {
        width: width,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: height * 0.08,
        justifyContent: 'space-around',
        backgroundColor: Background,
    },
    headerTittleContainer: {
        width: width * 0.8,
        // alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: width * .1
    },
    headerTittleTxtStyle: {
        color: secondary_color,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },

    // Body Style
    // ------------------------------------------------------------------------
    bodyContainer: {
        flex: 1,
        backgroundColor: Background,
    },
    contianerOfInfo: {
        backgroundColor: '#FFFFFF',
        elevation: 5,
        width: '95%',
        borderRadius: 15,
        marginTop: 5,
        marginBottom: 10,
        padding: 20,
        alignSelf: "center",
        borderLeftWidth: 6,
        borderColor: initial_color,
    },
    txtStyle: {
        color: '#1D1D1D',
        fontSize: 17,
        marginRight: 10,
        // alignSelf: 'center',
        textAlign: "left"
    },
    NameImgContainer: {
        width: width * 0.8,
        height: height * 0.1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    Btn: {
        width: width * 0.3,
        alignItems: 'center',
        height: height * 0.05,
        justifyContent: 'center',
        marginTop: height * 0.035,
        borderRadius: height * 0.018,
        backgroundColor: initial_color,
        elevation: 5,
        shadowRadius: 9.51,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
    },
});