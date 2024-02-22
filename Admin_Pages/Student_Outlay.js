/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    Text,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { Background, initial_color, beige_color, secondary_color, Café_color, gray_color } from './Colors'
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import axios from 'axios';
export default class Student_Outlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outlay_months: [],
            student_data: this.props.route.params.student_data,
            parents: [],
            grade: []
        };
    }

    componentDidMount() {
        this.fetchData();
        // this.refreshDataInterval = setInterval(this.fetchData, 100);
        // this.select_token()
        // refresh data every 5 seconds
    }
    // componentWillUnmount() {
    //     clearInterval(this.refreshDataInterval);
    // }

    fetchData = async () => {
        try {
            const response = await axios.get(
                'http://192.168.1.5/AhmedRagab_System/select_months.php',
            );
            const outlay_months = response.data;
            this.setState({ outlay_months: outlay_months });
        } catch (error) {
            console.error(error);
        }
        try {
            const response = await axios
                .post('http://192.168.1.5/AhmedRagab_System/Select_outlay_grade.php', {
                    grade_id: this.state.student_data.grade_id
                })
            this.setState({ grade: response.data });
        } catch (error) {
            console.error(error);
        }
    };

    // select_token() {
    //     axios
    //         .post('http://192.168.1.5/AhmedRagab_System/Select_outlay_grade.php', {
    //             grade_id: this.state.student_data.grade_id
    //         })
    //         .then(res => {
    //             // console.log(res.data);
    //             if (res.status == 200) {
    //                 if (res.data == 'Error') {
    //                     alert('try again');
    //                 } else if (typeof res.data == typeof []) {
    //                     this.setState({ grade: res.data });
    //                 }
    //             }
    //             // this.setState({loading: false});
    //         });
    // }


    render() {
        return (
            <>
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />

                {/* Header  */}
                <View style={styles.headerContainer}>
                    {/* Header Tittle  */}
                    <TouchableOpacity
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
                    </TouchableOpacity>
                    <View style={styles.headerTittleContainer}>
                        <Text style={styles.headerTittleTxtStyle}>المصاريف </Text>
                    </View>

                </View>

                {/* Body */}
                <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                    <View style={styles.bodyContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('Non_payment',
                                    {
                                        student_data: this.state.student_data,
                                        grade: this.state.grade,
                                    }
                                );
                            }}
                            style={[styles.contianerOfattendence, {
                                borderWidth: 1.5, borderColor: initial_color
                            }
                            ]}>
                            <View style={{ width: width * .4, marginLeft: 10, justifyContent: 'center' }}>
                                <Text style={{ color: '#1D1D1D', fontSize: 16, fontWeight: 'bold', alignSelf: 'center' }}>شهور عدم السداد</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style={{ marginTop: 10, marginBottom: 10, marginLeft: 20, fontSize: 15, color: '#1D1D1D', alignSelf: 'flex-start', fontWeight: 'bold' }}>
                            تسجيل مصاريف الطالب
                        </Text>
                        {this.state.outlay_months.map((item, index) =>
                            item.month_show == 1 ? (
                                <View
                                    key={index}
                                    style={styles.contianerOfattendence}>
                                    <View style={{ width: width * .4, marginLeft: 10, justifyContent: 'center' }}>
                                        <Text style={{ color: '#1D1D1D', fontSize: 16 }}> مصاريف شهر  {item.month_number}</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{
                                            justifyContent: 'center', width: 40, height: 40, borderRadius: 15, backgroundColor
                                                : '#FFFFFF', elevation: 3, alignSelf: 'center', marginLeft: width * .2
                                        }}
                                        onPress={() => {
                                            Alert.alert(
                                                'أدمن',
                                                'تسجيل عدم سداد مصاريف هذا الشهر للطالب' + ' ' + this.state.student_data.student_name,
                                                [
                                                    {
                                                        text: 'نعم', onPress: () =>
                                                            axios
                                                                .post('http://192.168.1.5/AhmedRagab_System/Student_outlayNotPay.php', {
                                                                    student_code: this.state.student_data.student_code,
                                                                    grade_id: this.state.student_data.grade_id,
                                                                    group_id: this.state.student_data.group_id,
                                                                    month: item.month_number,

                                                                })
                                                                .then(res => {
                                                                    // console.log(res.data);
                                                                    if (res.data == 'added_succss') {
                                                                        Alert.alert('أدمن', 'تم');
                                                                    } else if (res.data == 'failed_to_add') {
                                                                        Alert.alert('أدمن', 'فشل فى اضافة هذا الطالب')
                                                                    } else if (res.data = 'student_already_exist') {
                                                                        Alert.alert('أدمن', 'هذا الشهر مدفوع بالفعل')
                                                                    }
                                                                    // this.setState({loading: false});
                                                                })
                                                    },
                                                    { text: 'لا', style: 'cancel' },
                                                ],
                                            )

                                        }}>
                                        <Entypo
                                            name="circle-with-cross"
                                            color='#bd4b61'
                                            size={28}
                                            style={{ alignSelf: 'center' }}
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{
                                            justifyContent: 'center', width: 40, height: 40, borderRadius: 15, backgroundColor
                                                : '#FFFFFF', elevation: 3, alignSelf: 'center'
                                        }}
                                        onPress={() => {
                                            Alert.alert(
                                                'أدمن',
                                                'سداد مصاريف هذا الشهر للطالب' + ' ' + this.state.student_data.student_name,
                                                [
                                                    {
                                                        text: 'نعم', onPress: () =>
                                                            axios
                                                                .post('http://192.168.1.5/AhmedRagab_System/Student_payment.php', {
                                                                    student_code: this.state.student_data.student_code,
                                                                    outlay_token: this.state.grade[0].grade_token,
                                                                    grade_id: this.state.student_data.grade_id,
                                                                    group_id: this.state.student_data.group_id,
                                                                    month: item.month_number,

                                                                })
                                                                .then(res => {
                                                                    // console.log(res.data);
                                                                    if (res.data == 'added_succss') {
                                                                        Alert.alert('أدمن', 'تم دفع هذا الشهر للطالب' + ' ' + this.state.student_data.student_name);
                                                                    } else if (res.data == 'failed_to_add') {
                                                                        Alert.alert('أدمن', 'فشل فى اضافة هذا الطالب')
                                                                    } else if (res.data = 'student_already_exist') {
                                                                        Alert.alert('أدمن', 'هذا الشهر مدفوع بالفعل')
                                                                    }
                                                                    // this.setState({loading: false});
                                                                })
                                                    },
                                                    { text: 'لا', style: 'cancel' },
                                                ],
                                            )

                                        }}
                                    >
                                        <Entypo
                                            name="check"
                                            color="#5bc16b"
                                            size={28}
                                            style={{ alignSelf: 'center' }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            ) : null,
                        )}
                    </View>
                </ScrollView >
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
        alignItems: 'center',
        backgroundColor: Background,
    },
    contianerOfattendence: {
        backgroundColor: '#FFFFFF',
        elevation: 5,
        width: width * .95,
        height: height * .08,
        borderRadius: 15,
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    },

});