/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect } from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert, SafeAreaView, Button
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Background, initial_color, beige_color, secondary_color, Café_color, gray_color } from './Colors'
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Calendar, LocaleConfig, NewCalendarList } from 'react-native-calendars';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';
export default function Atten_absent(props) {




    // render() {
    const [grade_id, setgrade_id] = useState(props.route.params.grade_id)
    const [group_id, setgroup_id] = useState(props.route.params.group_id)
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const [student_atten, setstudent_atten] = useState([]);
    const [student_absent, setstudent_absent] = useState([]);
    const [chooseStatus, setchooseStatus] = useState(["الحضور", "الغياب"]);
    const [title, setTitle] = useState('')

    const onChange = (e, selectedDate) => {
        setShow(false);

        axios
            .post('http://192.168.1.5/AhmedRagab_System/select_absent_from_table.php', {
                group_id: group_id,
                grade_id: grade_id,
                date: selectedDate.toLocaleDateString('fr-CA')
            })
            .then(res => {
                console.log(res.data);
                if (res.status == 200) {
                    if (res.data == 'Error') {
                        alert('try again');
                    } else if (typeof res.data == typeof []) {
                        setstudent_absent(res.data);
                    }
                    // console.log(this.state.students)
                }
            });

        axios
            .post('http://192.168.1.5/AhmedRagab_System/select_attendance.php', {
                group_id: group_id,
                date: selectedDate.toLocaleDateString('fr-CA')
            })
            .then(res => {
                console.log(res.data);
                if (res.status == 200) {
                    if (res.data == 'Error') {
                        Alert.alert('try again');
                    } else if (typeof res.data == typeof []) {
                        setstudent_atten(res.data);
                    }
                    // console.log(this.state.students)
                }
            });

        setDate(selectedDate);
    };

    const showMode = (modeToShow) => {
        setShow(true);
        setMode(modeToShow);
    };

    useEffect(() => {
        console.log(date.toLocaleDateString('fr-CA'))
    }, []);

    // useLayoutEffect(() => {
    //     getdata()
    // })


    // const getdata = () => {
    //     axios
    //         .post('http://192.168.1.5/AhmedRagab_System/insert_absent_to_table.php', {
    //             group_id: group_id,
    //             grade_id: grade_id,
    //             date: date.toLocaleDateString('fr-CA')
    //         })
    //         .then(res => {
    //             console.log(res.data);
    //             if (res.status == 200) {
    //                 if (res.data == 'Error') {
    //                     alert('try again');
    //                 } else if (typeof res.data == typeof []) {
    //                     setstudent_absent(res.data);
    //                 }
    //                 // console.log(this.state.students)
    //             }
    //         });
    // }


    return (
        <>
            <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />

            {/* Header  */}
            <View style={styles.headerContainer}>
                {/* Header Tittle  */}
                <TouchableOpacity
                    style={{ justifyContent: 'center', marginLeft: RFValue(10) }}
                    onPress={() => {
                        props.navigation.goBack();
                    }}>
                    <Entypo
                        name="chevron-with-circle-right"
                        color="#000"
                        size={30}
                        style={{ alignSelf: 'center' }}
                    />
                </TouchableOpacity>
                <View style={styles.headerTittleContainer}>
                    <Text style={styles.headerTittleTxtStyle}>اسماء الغياب</Text>
                </View>

            </View>

            {/* Body */}
            <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                <View style={styles.bodyContainer}>
                    <View style={{
                        height: height * 0.08, width: width * 0.95, backgroundColor: "#FFFFFF",
                        flexDirection: "row", justifyContent: "space-between", alignSelf: "center",
                        marginBottom: RFValue(15)
                    }}>

                        <SelectDropdown
                            data={chooseStatus}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setTitle(selectedItem)

                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem

                            }}
                            rowTextForSelection={(item, index) => {
                                return item

                            }}
                            defaultButtonText={"اختار الحالة "}
                            dropdownIconPosition={'left'}
                            buttonStyle={styles.textInputStyle}
                            buttonTextStyle={{ color: "#000", fontWeight: '500', fontSize: 18 }}
                            renderDropdownIcon={isOpened => {
                                return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} style={{
                                    color: gray_color,
                                    fontSize: 20,
                                    width: 30
                                }} />
                            }}

                        />


                        {
                            show && (
                                <DateTimePicker
                                    value={date}
                                    mode={mode}
                                    is24Hour={false}
                                    onChange={onChange}
                                // display='calendar'

                                />
                            )
                        }
                        <TouchableOpacity style={styles.calenderStyle}
                            onPress={() => showMode("date")

                            }

                        >
                            <Text style={{
                                fontSize: 16,
                                textAlign: 'center',
                                alignSelf: 'center',
                                color: "#000",
                                fontWeight: '500'
                            }}
                            >
                                اختار التاريخ
                            </Text>
                            {!show ? (
                                <Text style={{
                                    fontSize: 15,
                                    textAlign: 'center',
                                    alignSelf: 'center',
                                    color: initial_color,
                                    fontWeight: '600'
                                }}>
                                    {date.toLocaleDateString('fr-CA')
                                    }
                                </Text>
                            )
                                : (<Text></Text>)
                            }
                        </TouchableOpacity>

                    </View>

                    {title == "الحضور" ?
                        (<>
                            {
                                student_atten.map((item, index) => (

                                    <View
                                        key={index}
                                        style={{
                                            backgroundColor: '#FFFFFF',
                                            elevation: 5,
                                            width: '92%',
                                            height: height * .07,
                                            borderRadius: 15,
                                            justifyContent: 'center',
                                            marginVertical: 10,
                                            alignSelf: "center",
                                            alignItems: "center",
                                            borderLeftWidth: 6,
                                            borderColor: initial_color,
                                            flexDirection: "row",
                                            paddingHorizontal: RFValue(10),

                                        }}>

                                        <View
                                            onPress={() => {
                                                null;
                                            }}
                                            style={{
                                                width: '88%',
                                                height: '100%',
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: '600',
                                                    color: '#000',
                                                    textAlign: 'left', marginTop: RFValue(10)
                                                }}>

                                                {item.student_name}
                                            </Text>
                                        </View>
                                        {/* 
                                        <TouchableOpacity
                                            onPress={() => {
                                                null;
                                            }}
                                            style={{
                                                width: '12%',
                                                height: '70%',
                                                justifyContent: 'center',
                                                alignItems: "center",
                                                borderRadius: 20,
                                                borderColor: initial_color,
                                                borderWidth: 1,


                                            }}>
                                            <Icon name='check'
                                                style={{ color: initial_color, fontSize: 18 }}
                                            />
                                        </TouchableOpacity> */}
                                    </View>
                                ))
                            }
                        </>) : null}

                    {title == "الغياب" ? (

                        <>
                            <View>
                                {
                                    student_absent.map((item, index) => (
                                        <View
                                            key={index}
                                            style={{
                                                backgroundColor: '#FFFFFF',
                                                elevation: 5,
                                                width: '92%',
                                                height: height * .07,
                                                borderRadius: 15,
                                                justifyContent: 'center',
                                                marginVertical: 10,
                                                alignSelf: "center",
                                                alignItems: "center",
                                                borderLeftWidth: 6,
                                                borderColor: initial_color,
                                                flexDirection: "row",
                                                paddingHorizontal: RFValue(10),

                                            }}>

                                            <View
                                                onPress={() => {
                                                    null;
                                                }}
                                                style={{
                                                    width: '88%',
                                                    height: '100%',
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: '600',
                                                        color: '#000',
                                                        textAlign: 'left', marginTop: RFValue(10)
                                                    }}>

                                                    {item.student_name}
                                                </Text>
                                            </View>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    Alert.alert(
                                                        'أدمن',
                                                        'تسجيل حضور الطالب' + ' ' + student_absent[index].student_name,
                                                        [
                                                            {
                                                                text: 'نعم', onPress: () =>
                                                                    axios
                                                                        .post('http://192.168.1.5/AhmedRagab_System/update_student_absence_to_Presence.php', {
                                                                            student_code: student_absent[index].student_code,
                                                                            date: date.toLocaleDateString('fr-CA')

                                                                        })
                                                                        .then(res => {
                                                                            // console.log(res.data);
                                                                            if (res.data == 'attendance_updated') {
                                                                                Alert.alert('أدمن', 'تم تسجيل حضور الطالب/ة' + student_absent[index].student_name);
                                                                            } else if (res.data == 'failed_to_edited_attendance') {
                                                                                Alert.alert('أدمن', 'فشل فى تسجيل غياب هذا الطالب/ة')
                                                                            } else if (res.data = 'student_already_presence') {
                                                                                Alert.alert('أدمن', 'هذا الطالب/ة حضر بالفعل')
                                                                            }
                                                                            // this.setState({loading: false});
                                                                        })
                                                            },
                                                            { text: 'لا', style: 'cancel' },
                                                        ],
                                                    )
                                                }}
                                                style={{
                                                    width: '12%',
                                                    height: '70%',
                                                    justifyContent: 'center',
                                                    alignItems: "center",
                                                    borderRadius: 20,
                                                    borderColor: initial_color,
                                                    borderWidth: 1,


                                                }}>
                                                <Icon name='check'
                                                    style={{ color: initial_color, fontSize: 18 }}
                                                />
                                            </TouchableOpacity>

                                        </View>

                                    ))
                                }
                                <TouchableOpacity style={{
                                    fontSize: 17,
                                    // alignSelf: 'f',
                                    width: width * 0.5,
                                    height: height * .08,
                                    // marginHorizontal: width * 0.03,
                                    backgroundColor: initial_color,
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 0,
                                        height: 1,
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 1.41,
                                    elevation: 2,
                                    borderRadius: 15,
                                    borderWidth: 1.5,
                                    borderColor: initial_color,
                                    alignSelf: 'center',
                                    marginTop: 10,
                                    justifyContent: 'center'
                                }}

                                    onPress={() => {
                                        axios
                                            .post('http://192.168.1.5/AhmedRagab_System/insert_student_absent.php', {
                                                group_id: group_id,
                                                date: date.toLocaleDateString('fr-CA')
                                            })
                                            .then(res => {
                                                if (res.data == 'student_added') {
                                                    Alert.alert('تم إرسال الغياب')
                                                } else if (res.data == 'failed_to_add_student') {
                                                    Alert.alert(' تم إرسال الغياب من قبل');
                                                }
                                            });
                                    }}
                                >
                                    <Text style={{
                                        fontSize: RFValue(15), fontWeight: 'bold',
                                        alignSelf: 'center', color: '#FFFFFF',
                                        textAlign: 'center'
                                    }}>إرسال الغياب للطالب{'\n'}و ولى الأمر</Text>
                                </TouchableOpacity>
                            </View>

                        </>
                    ) : null}













                </View>
            </ScrollView >
        </>
    );

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
        alignItems: 'center',
        backgroundColor: Background,
    },
    textInputStyle: {
        fontSize: 17,
        // alignSelf: 'f',
        width: width * 0.47,
        height: height * .08,
        // marginHorizontal: width * 0.03,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: initial_color,
        color:"#000",
    },
    calenderStyle: {
        fontSize: 17,
        // alignSelf: 'center',
        width: width * 0.45,
        height: height * .08,
        // marginHorizontal: width * 0.03,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: initial_color,
        alignItems: "center",
        justifyContent: "center"
    },

});