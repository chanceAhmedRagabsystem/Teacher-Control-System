/* eslint-disable prettier/prettier */
import React from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import {
    StatusBar,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator,
    I18nManager,
    Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import axios from 'axios';
import { Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';


import {
    Background,
    initial_color,
    beige_color,
    secondary_color,
    Café_color,
    gray_color,
    searchColor, gray_txt
} from './Colors';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class All_Attendence extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [
                {
                    id: 101,
                    student_name: 'مروه محمد ابوالعلا',
                    student_grade: "الصف الاول الثانوي",
                    student_group: "الشعبيه",
                    student_show: 1
                },
                {
                    id: 102,
                    student_name: "امنيه محمد الجزار",
                    student_grade: "الصف الثاني الثانوي",
                    student_group: "محب",
                    student_show: 1
                },
                {
                    id: 103,
                    student_name: 'مديحه طارق احمد',
                    student_grade: "الصف الاول الثانوي",
                    student_group: "الشعبيه",
                    student_show: 1
                },
                {
                    id: 104,
                    student_name: 'دينا مصطفي البني',
                    student_grade: "الصف الثالث الثانوي",
                    student_group: "الجمهوريه",
                    student_show: 1
                },
                {
                    id: 105,
                    student_name: 'غاده',
                    student_grade: "الصف الثالث الثانوي",
                    student_group: "الجمهوريه",
                    student_show: 1
                },
            ],

            numOfItems: 0,
            found: true,
            search_key: '',
            loading: true,
            network: false,
            cancel_button: false,
            searchBox_width: '95%',
            searchColor: '#FFFFFF',
        };
    }
    // Functions
    searchfun(value) {
        let newStudent = this.state.students;
        let counter = 0;
        let found = false;
        for (let i = 0; i < newStudent.length; i++) {
            if (newStudent[i].student_name.toUpperCase().includes(value.toUpperCase().trim())) {
                newStudent[i].student_show = 1;
                found = true;
            } else {
                newStudent[i].student_show = 0;

                // counter++;
            }
            if (newStudent[i].student_name == '') {
                this.setState({ searchColor: '#FFFFFF' });
            }

            this.setState({ students: newStudent, numOfItems: counter, found: found });
        }
    }







    render() {
        return (
            <>
                {/* {this.state.network ? (
          <> */}


                {/* Header */}
                <View style={styles.headerContainer}>

                    {/* Header Tittle  */}
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 20 }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Entypo name="chevron-with-circle-right" color='#000' size={30} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <View style={styles.headerTittleContainer}>

                        <Text style={styles.headerTittleTxtStyle}> غياب المجموعة</Text>

                    </View>
                    <View
                        style={{ marginTop: -15, marginRight: 20 }}
                    >
                        <Entypo name="users" size={25} color='#000' />
                        <View style={{ height: 25, minWidth: 25, backgroundColor: '#FFFFFF', borderWidth: .5, borderRadius: 15, justifyContent: 'center', marginTop: -40, marginRight: 10 }}>
                            <Text style={{ fontSize: 15, alignSelf: 'center', fontWeight: 'bold', color: initial_color }}>5</Text>
                        </View>
                    </View>

                </View>

                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />




                {/* Body */}

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{
                        flex: 1,
                        backgroundColor: Background,
                    }}>
                    {/* {this.state.students.length != 0 ? ( */}
                    <>
                        <ScrollView>
                            <View>
                                {this.state.students.map((item, index) =>
                                    // key = {index};
                                    item.student_show == 1 ? (
                                        <>
                                            <View
                                                key={index}
                                                style={{
                                                    backgroundColor: '#FFFFFF',
                                                    elevation: 5,
                                                    width: width * 0.95,
                                                    height: height * .07,
                                                    borderRadius: 15,
                                                    justifyContent: 'center',
                                                    marginVertical: 5,
                                                    alignSelf: "center",
                                                    alignItems: "center",
                                                    borderLeftWidth: 6,
                                                    borderColor: initial_color,
                                                    flexDirection: "row",
                                                    paddingHorizontal: RFValue(10),
                                                    paddingVertical: RFValue(5),
                                                    // borderBlockColor: "#f0f"
                                                }}>

                                                <View
                                                    style={{
                                                        width: '99%',
                                                        height: '90%',
                                                        alignItems: "center",
                                                        // backgroundColor: "#ff0",
                                                        justifyContent: "center",
                                                        flexDirection: "column"

                                                    }}
                                                    key={index}>
                                                    <Text
                                                        key={index}
                                                        style={{
                                                            fontSize: 18,
                                                            fontWeight: '600',
                                                            color: '#000',
                                                            marginTop: RFValue(4)
                                                        }}>{item.student_name}
                                                    </Text>
                                                </View>
                                            </View>

                                        </>
                                    ) : null,
                                )}
                            </View >
                        </ScrollView>
                    </>


                </KeyboardAvoidingView>


            </>
        );
    }
}

const styles = StyleSheet.create({
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
        // marginRight: width * .1
    },
    headerTittleTxtStyle: {
        color: secondary_color,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFValue(18),
    },

    addCaseBtn: {
        bottom: 0,
        elevation: 5,
        right: RFValue(15),
        shadowRadius: 9.51,
        shadowColor: '#000',
        shadowOpacity: 0.43,
        width: width * 0.3,
        position: 'absolute',
        alignItems: 'center',
        alignSelf: 'flex-end',
        height: height * 0.05,
        padding: width * 0.009,
        borderRadius: width * 0.5,
        justifyContent: 'center',
        marginBottom: height * 0.03,
        backgroundColor: "#0f0",
        shadowOffset: { width: 0, height: 7 },
    },
});
