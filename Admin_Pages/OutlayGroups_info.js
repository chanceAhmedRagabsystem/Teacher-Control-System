import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Model,
    TextInput,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import {
    Background,
    initial_color,
    beige_color,
    secondary_color,
    Café_color,
    gray_color,
} from '../Admin_Pages/Colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
export default class OutlayGroups_info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            modalVisible: false,
            details: this.props.route.params.detailsOfGrade,
            detailsOfGroup: this.props.route.params.detailsOfGroup,
            months: this.props.route.params.months,
            outlay: [],
            group: []
        };
    }
    componentDidMount() {
        this.getdata()
        this.group_length()
    }
    group_length() {
        axios.post("http://192.168.1.5/AhmedRagab_System/select_group_length.php", {
            group_id: this.state.detailsOfGroup.group_id
        }).then(res => {
            if (typeof res.data == typeof {}) {
                console.log(res.data)
                this.setState({ group: res.data });
            } else if (res.data == 'Error') {
                console.log('error');
            }
        });
    }
    getdata() {
        axios
            .post('http://192.168.1.5/AhmedRagab_System/select_pay_outlay.php', {
                group_id: this.state.detailsOfGroup.group_id,
                month: this.state.months.month_number
            })
            .then(res => {
                console.log(res.data);
                if (res.status == 200) {
                    if (res.data == 'Error') {
                        alert('try again');
                    } else if (typeof res.data == typeof []) {
                        this.setState({ outlay: res.data });
                    }
                    console.log(this.state.outlay)
                }
            });
    }
    all_outlay() {
        var outlay = this.state.details.grade_token
        var students = this.state.group.length
        var total = outlay * students
        return (total)
    }
    received_outlay() {
        var outlay = this.state.details.grade_token
        var students = this.state.outlay.length
        var total = outlay * students
        return (total)
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
                {/* Header  */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 15 }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Entypo name="chevron-with-circle-right" color='#000' size={30} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <View style={styles.headerTittleContainer}>
                        <Text style={styles.headerTittleTxtStyle}>مصاريف الدفعة</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.container}>

                        <View style={{
                            backgroundColor: Background, width: width * .95,
                            height: height * .08, elevation: 5, alignSelf: 'center', justifyContent: 'center', marginTop: width * .02,
                            borderRadius: 15, borderLeftWidth: 6, borderColor: initial_color,
                        }}>
                            <Text style={{ fontSize: RFValue(17), fontWeight: '600', alignSelf: 'center', color: '#1D1D1D' }}>عدد طلاب المجموعة = {this.state.group.length}</Text>
                        </View>
                        <View style={{
                            backgroundColor: Background, width: width * .95,
                            height: height * .08, elevation: 5, alignSelf: 'center', justifyContent: 'center', marginTop: width * .02,
                            borderRadius: 15, borderLeftWidth: 6, borderColor: initial_color,
                        }}>
                            <Text style={{ fontSize: RFValue(17), fontWeight: '600', alignSelf: 'center', color: '#1D1D1D' }}> مصاريف الشهر = {this.state.details.grade_token}</Text>
                        </View>
                        <View style={{
                            backgroundColor: Background, width: width * .95,
                            height: height * .08, elevation: 5, alignSelf: 'center', justifyContent: 'center', marginTop: width * .02,
                            borderRadius: 15, borderLeftWidth: 6, borderColor: initial_color,
                        }}>
                            <Text style={{ fontSize: RFValue(17), fontWeight: '600', alignSelf: 'center', color: '#1D1D1D' }}>إجمالى مصاريف الشهر = {this.all_outlay()}</Text>
                        </View>
                        <View style={{
                            backgroundColor: Background, width: width * .95,
                            height: height * .08, elevation: 5, alignSelf: 'center', justifyContent: 'center', marginTop: width * .02,
                            borderRadius: 15, borderLeftWidth: 6, borderColor: initial_color,
                        }}>
                            <Text style={{ fontSize: RFValue(17), fontWeight: '600', alignSelf: 'center', color: '#1D1D1D' }}>المبلغ المستلم = {this.received_outlay()}</Text>
                        </View>
                        <View style={{
                            backgroundColor: Background, width: width * .95,
                            height: height * .08, elevation: 5, alignSelf: 'center', justifyContent: 'center', marginTop: width * .02,
                            borderRadius: 15, borderLeftWidth: 6, borderColor: initial_color,
                        }}>
                            <Text style={{ fontSize: RFValue(17), fontWeight: '600', alignSelf: 'center', color: '#1D1D1D' }}>المبلغ المتبقى = {this.all_outlay() - this.received_outlay()}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                {
                                    this.props.navigation.navigate('Students_NotPay', {
                                        detailsOfGroup: this.state.detailsOfGroup,
                                        month: this.state.months,
                                        details: this.state.details
                                    });
                                }
                            }}
                            style={{
                                backgroundColor: Background, width: width * .95,
                                height: height * .08, elevation: 5, alignSelf: 'center', justifyContent: 'center', marginTop: width * .02,
                                borderRadius: 15, borderWidth: 2, borderColor: initial_color,
                            }}>
                            <Text style={{ fontSize: RFValue(17), fontWeight: 'bold', alignSelf: 'center', color: '#1D1D1D' }}>طلاب لم يقوموا بالدفع</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
        backgroundColor: Background,
    },
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
        width: width * 0.9,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        // marginLeft: RFValue(15)
    },
    headerTittleTxtStyle: {
        color: secondary_color,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFValue(18),
        marginRight: width * .09
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignSelf: 'center',
    },
    input: {
        width: width * 0.8,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginRight: '2%',
    },
    element: {
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#f1f1f1',
        borderRadius: 4,
    },

    TouchableOpacityStyle: {
        alignSelf: 'center',
        backgroundColor: initial_color,
        height: height * 0.05,
        width: width * 0.12,
        justifyContent: 'center',
        borderRadius: 7,
    },
    contianerOfGrades: {
        elevation: 5,
        borderRadius: 15,
        shadowRadius: 7.51,
        shadowColor: '#000',
        shadowOpacity: 0.23,
        width: width * 0.95,
        height: height * 0.08,
        alignSelf: 'center',
        marginTop: height * 0.02,
        justifyContent: 'center',
        borderLeftWidth: 6,
        borderColor: initial_color,

        shadowOffset: { width: 0, height: 7 },
        backgroundColor: '#ffffff',
    },
});