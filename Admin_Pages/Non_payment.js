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
import axios from 'axios';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class Non_payment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student_data: this.props.route.params.student_data,
            grade: this.props.route.params.grade,
            outlay: [
                // {
                //     text: 'لم يتم سداد مصاريف شهر 8', outlay_date: new Date().toDateString(), show: 1
                // }
            ]
        };
    }
    componentDidMount() {
        this.refreshDataInterval = setInterval(this.fetchData, 100);
    }
    componentWillUnmount() {
        clearInterval(this.refreshDataInterval);
    }
    fetchData = async () => {
        try {
            const response = await axios
                .post('http://192.168.1.5/AhmedRagab_System/Select_Student_NonPayment.php', {
                    student_code: this.state.student_data.student_code
                })
            this.setState({ outlay: response.data });
        } catch (error) {
            console.error(error);
        }
    };
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

                        <Text style={styles.headerTittleTxtStyle}>شهور عدم السداد </Text>

                    </View>

                </View>

                {/* Body */}
                <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                    <View style={styles.bodyContainer}>
                        {this.state.outlay.map((item, index) =>
                            // item.show == 1 ? (
                            <View style={styles.contianerOfOutlay}>
                                <View
                                    key={index}
                                    style={{ justifyContent: 'center', marginLeft: 15 }}
                                >
                                    <Text style={{ color: '#1D1D1D', fontSize: 17, alignSelf: 'center', fontWeight: 'bold' }}>لم يتم سداد مصاريف شهر { }{item.month} </Text>
                                    <Text style={{ alignSelf: 'center', color: gray_color }}>{item.outlay_date}</Text>

                                </View>
                                <TouchableOpacity
                                    style={{
                                        justifyContent: 'center', width: 40, height: 40, borderRadius: 15, backgroundColor
                                            : '#FFFFFF', elevation: 3, alignSelf: 'center', marginRight: 10
                                    }}
                                    onPress={() => {
                                        Alert.alert(
                                            'أدمن',
                                            'تسجيل سداد مصاريف هذا الشهر للطالب' + ' ' + this.state.student_data.student_name,
                                            [
                                                {
                                                    text: 'نعم', onPress: () =>
                                                        axios
                                                            .post('http://192.168.1.5/AhmedRagab_System/update_payData.php', {
                                                                student_code: this.state.student_data.student_code,
                                                                outlay_token: this.state.grade[0].grade_token,
                                                                month: item.month

                                                            })
                                                            .then(res => {
                                                                // console.log(res.data);
                                                                if (res.data == 'outlay_updated') {
                                                                    Alert.alert('أدمن', ' تم سداد مصاريف هذا الشهر للطالب/ة' + ' ' + this.state.student_data.student_name);
                                                                } else if (res.data == 'failed_to_edited_outlay') {
                                                                    Alert.alert('أدمن', 'فشل فى سداد مصاريف هذا الشهر')
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
                            // ) : null,
                        )}
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
        alignItems: 'center',
        backgroundColor: Background,
    },
    contianerOfOutlay: {
        backgroundColor: '#FFFFFF',
        elevation: 5,
        width: width * .95,
        height: height * .08,
        borderRadius: 15,
        justifyContent: 'space-around',
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
    }
});