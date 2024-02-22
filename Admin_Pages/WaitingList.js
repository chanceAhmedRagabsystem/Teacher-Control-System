/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
// import React from 'react';
import React, { Component } from 'react';
// import SearchBar from 'react-native-dynamic-search-bar';
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
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import SwitchSelector from "react-native-switch-selector";
import SearchBar from 'react-native-dynamic-search-bar';
import axios from 'axios';
import {
    Background,
    initial_color,
    beige_color,
    secondary_color,
    Café_color,
    gray_color,
    searchColor,
} from './Colors';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class WaitingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            parents: [],
            showHide: false,
            found: true,
            found_parent: true,
            numOfItemsOfStudent: 0,
            numOfItemsOfParents: 0,
            search_key: '',
            search_key_parent: '',
            loading: true,
            network: false,
            cancel_button: false,
            searchBox_width: '95%',
            searchColor: '#FFFFFF',
            searchColor2: '#FFFFFF',
        };
    }

    searchfun(value) {
        let newStudents = this.state.students;
        let counter = 0;
        let found = false;
        for (let i = 0; i < newStudents.length; i++) {
            if (newStudents[i].user_name.toUpperCase().includes(value.toUpperCase().trim())) {
                newStudents[i].student_show = 1;
                found = true;
            }
            else {
                newStudents[i].student_show = 0;

                // counter++;
            }
            if (newStudents[i].user_name == '') {
                this.setState({ searchColor: '#FFFFFF' });
            }
            this.setState({ students: newStudents, numOfItemsOfStudent: counter, found: found });
        }
    }
    searchfunForParent(value) {
        let newParent = this.state.parents;
        let counter = 0;
        let found_parent = false;
        for (let i = 0; i < newParent.length; i++) {
            if (newParent[i].user_name.toUpperCase().includes(value.toUpperCase().trim())) {
                newParent[i].parent_show = 1;
                found_parent = true;
            }
            else {
                newParent[i].parent_show = 0;

                // counter++;
            }
            if (newParent[i].user_name == '') {
                this.setState({ searchColor: '#FFFFFF' });
            }
            this.setState({ parents: newParent, numOfItemsOfParents: counter, found_parent: found_parent });
        }
    }

    componentDidMount() {
        this.fetchDataForStudent()
        this.fetchDataForParent()
        // this.refreshDataIntervalForStudent = setInterval(this.fetchDataForStudent, 100);
        // this.refreshDataIntervalForParent = setInterval(this.fetchDataForParent, 100);
        // refresh data every 5 seconds
    }
    // componentWillUnmount() {
    //     clearInterval(this.refreshDataIntervalForStudent);
    //     clearInterval(this.refreshDataIntervalForParent);
    // }
    fetchDataForStudent = async () => {
        try {
            const response = await axios.post("http://192.168.1.5/AhmedRagab_System/WaitingList.php", {
                user_type: 'student',
            });
            const students = response.data;
            this.setState({ students: students });
        } catch (error) {
            console.error(error);
        }
    };

    fetchDataForParent = async () => {
        try {
            const response = await axios.post("http://192.168.1.5/AhmedRagab_System/WaitingList.php", {
                user_type: 'parent',
            });
            const parents = response.data;
            this.setState({ parents: parents });
        } catch (error) {
            console.error(error);
        }
    };



    // student
    confirmStudent(index) {
        axios
            .post('http://192.168.1.5/AhmedRagab_System/approved_user.php', {
                user_id: this.state.students[index].user_id,
                // parent_id: this.state.parents[index].user_id
            })
            .then(res => {
                if (res.data == 'success') {
                    // this.props.navigation.navigate('All_Students', {
                    //     students: this.state.students,
                    // });
                    // console.log(this.state.students.user_data[index]);
                    Alert.alert('تم قبول هذا الطالب')
                }
                //user_not_found
                else if (res.data == 'failed') {
                    alert('حدث خطا ما');
                    errors++;
                }
                //call supporrt
                else if (res.data == 'user_not_found') {
                    alert('الطالب غير موجود');
                }
            }
            );
    }
    rejectStudent(index) {
        axios
            .post('http://192.168.1.5/AhmedRagab_System/reject_users.php', {
                user_type: 'student',
                user_id: this.state.students[index].user_id,
            })
            .then(res => {

                if (res.data == 'deleted_success') {
                    this.props.navigation.navigate('WaitingList', {
                        user_data: this.state.user_data,
                    });
                    console.log(this.state.user_data);
                    Alert.alert('تم عدم قبول هذا الطالب')

                }
                //user_not_found
                else if (res.data == 'deleted_failed') {
                    alert('حدث خطا ما');
                    errors++;
                }
                //call supporrt
                else if (res.data == 'user_not_found') {
                    alert('الطالب غير موجودة');
                }
            }
            );
    }
    // parent
    confirmParent(index) {
        axios
            .post('http://192.168.1.5/AhmedRagab_System/approved_user.php', {
                user_id: this.state.parents[index].user_id,
            })
            .then(res => {
                if (res.data == 'success') {
                    // this.props.navigation.navigate('All_Parents', {
                    //     parents: this.state.parents,
                    // });
                    console.log(this.state.parents[index].user_data);
                    Alert.alert('تم قبول ولى الأمر')
                }
                //user_not_found
                else if (res.data == 'failed') {
                    alert('حدث خطا ما');
                    errors++;
                }
                //call supporrt
                else if (res.data == 'user_not_found') {
                    alert('ولي الامر غير موجود');
                }
            }
            );
    }
    rejectParent(index) {
        axios
            .post('http://192.168.1.5/AhmedRagab_System/reject_users.php', {
                user_type: 'parent',
                user_id: this.state.parents[index].user_id,
            })
            .then(res => {

                if (res.data == 'deleted') {
                    Alert.alert('تم عدم قبول ولى الأمر')
                    this.props.navigation.navigate('WaitingList', {
                        user_data: this.state.user_data,
                    });
                    console.log(this.state.user_data);
                }
                //user_not_found
                else if (res.data == 'deleted_failed') {
                    alert('حدث خطا ما');
                    errors++;
                }
                //call supporrt
                else if (res.data == 'user_not_found') {
                    alert('ولي الامر غير موجودة');
                }
            }
            );
    }



    render() {
        return (
            <>
                {/* {this.state.network ? (
                <> */}
                {/* Header */}
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
                <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                    <View style={{
                    }}>
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

                                <Text style={styles.headerTittleTxtStyle}>قائمة الانتظار</Text>

                            </View>

                        </View>
                        <SwitchSelector
                            initial={0}
                            buttonColor={initial_color}
                            onPress={value => this.setState({ showHide: value })}
                            options={[
                                { label: "طالب", value: false },
                                { label: "ولي أمر", value: true },
                            ]}
                            style={{
                                borderRadius: 50,
                                borderColor: '#f0f',
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.22,
                                shadowRadius: 2.22,

                                elevation: 5,
                                width: width * 0.95,
                                backgroundColor: Background,
                                alignSelf: "center",

                                marginBottom: RFValue(25),
                                // marginTop: RFValue(-25)
                            }}
                        />
                    </View>


                    {/* Body */}
                    <View>
                        {this.state.showHide !== true ?
                            (<>
                                {/* Students */}
                                <View style={{
                                    width: width,
                                    alignSelf: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    backgroundColor: Background,
                                }}>
                                    <View
                                        style={{
                                            height: height * 0.085,
                                            // backgroundColor: Background,
                                            flexDirection: 'row',
                                            justifyContent: 'center',
                                            marginTop: RFValue(-30),
                                            marginBottom: RFValue(10)
                                        }}>
                                        {/* Search */}
                                        <SearchBar
                                            fontColor="#c6c6c6"
                                            iconColor="#c6c6c6"
                                            shadowColor="#282828"
                                            cancelIconColor="#c6c6c6"
                                            backgroundColor={this.state.searchColor}
                                            placeholder="البحث بأسم الطالب "
                                            onClearPress={() => {
                                                this.setState({ searchColor: '#FFFFFF' });
                                                this.searchfun('');
                                            }}
                                            onPressIn={() => this.setState({ searchColor: searchColor })}
                                            value={this.state.search_key}
                                            onChangeText={value => {
                                                if (value.length == 0) {
                                                    this.setState({ searchColor: '#FFFFFF' });
                                                } else {
                                                    this.setState({ searchColor: searchColor });
                                                }
                                                this.setState({ search_key: value });
                                                this.searchfun(value);
                                            }}
                                            style={{
                                                marginBottom: 5,
                                                marginTop: 20,
                                                width: '89%',
                                                borderRadius: 10,
                                                elevation: 3,
                                                height: 43,
                                                backgroundColor:
                                                    this.state.searchColor === searchColor
                                                        ? searchColor
                                                        : '#FFFFFF',
                                            }}
                                            textInputStyle={{
                                                paddingRight: 10,
                                                paddingLeft: 10,
                                                width: this.state.searchColor === searchColor ? '75%' : '80%',
                                            }}
                                            clearIconImageStyle={{
                                                width: this.state.searchColor === searchColor ? 30 : 0,
                                            }}
                                        />
                                        {this.state.cancel_button ? (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        cancel_button: false,
                                                        searchBox_width: '95%',
                                                        search_key: null,
                                                        // backgroundColor: "#0f0"
                                                    });
                                                }}
                                                style={{ alignSelf: 'center', marginLeft: '6%', }}>
                                                <Icon name={'times'} color={'#D9D9D9'} size={19} />
                                            </TouchableOpacity>
                                        ) : null}
                                    </View>
                                    <View
                                        style={{ marginTop: -35, marginRight: 20 }}
                                    >
                                        <Entypo name="users" size={25} color='#000' />
                                        <View style={{ height: 25, minWidth: 25, backgroundColor: '#FFFFFF', borderWidth: .5, borderRadius: 15, justifyContent: 'center', marginTop: -40, marginRight: 10 }}>
                                            <Text style={{
                                                fontSize: 15, alignSelf: 'center', fontWeight: 'bold',
                                                color: initial_color
                                            }}>{this.state.students.length}</Text>
                                        </View>
                                    </View>
                                </View>
                                {/* students... */}
                                {this.state.found ? (
                                    <KeyboardAvoidingView
                                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                        style={{
                                            flex: 1,
                                            backgroundColor: Background,
                                        }}>
                                        {this.state.students.length != 0 ? (
                                            <>
                                                <ScrollView>
                                                    <View>
                                                        {this.state.students.map((item, index) =>
                                                            item.student_show == 1 ? (
                                                                <View
                                                                    key={index}
                                                                    style={{
                                                                        backgroundColor: '#ffffff',
                                                                        marginBottom: RFValue(10),
                                                                        borderRadius: 15,
                                                                        width: '95%',
                                                                        alignSelf: 'center',
                                                                        elevation: 3,
                                                                        height: height * 0.25,
                                                                        marginTop: 5,
                                                                        borderLeftWidth: 6,
                                                                        borderColor: initial_color,
                                                                    }}>

                                                                    <View
                                                                        style={{
                                                                            height: height * 0.2,
                                                                            justifyContent: 'flex-start',
                                                                            paddingHorizontal: width * 0.07,
                                                                            // backgroundColor:"#f0f"
                                                                        }}
                                                                    // key={index}
                                                                    >
                                                                        {/* student name */}
                                                                        <Text
                                                                            // key={index}
                                                                            style={{
                                                                                fontSize: RFValue(14),
                                                                                fontWeight: '600',
                                                                                color: '#1D1D1D',
                                                                                textAlign: "justify",
                                                                                marginLeft: RFValue(10),
                                                                                marginTop: RFValue(20)
                                                                            }}>
                                                                            اسم الطالب : {item.user_name}
                                                                        </Text>
                                                                        {/* student grade */}
                                                                        <Text
                                                                            // key={index}
                                                                            style={{
                                                                                fontSize: RFValue(14),
                                                                                fontWeight: '600',
                                                                                color: '#1D1D1D',
                                                                                textAlign: "justify",
                                                                                marginLeft: RFValue(10),
                                                                                marginTop: RFValue(5)
                                                                            }}>
                                                                            الدفعة  : {item.student_grade}
                                                                        </Text>
                                                                        {/* student group */}
                                                                        <Text
                                                                            // key={index}
                                                                            style={{
                                                                                fontSize: RFValue(14),
                                                                                fontWeight: '600',
                                                                                color: '#1D1D1D',
                                                                                textAlign: "justify",
                                                                                marginLeft: RFValue(10),
                                                                                marginTop: RFValue(5)
                                                                            }}>
                                                                            المجموعة : {item.student_group}
                                                                        </Text>
                                                                        <View
                                                                            style={{
                                                                                flexDirection: 'row',
                                                                                // backgroundColor: '#ff0',
                                                                                justifyContent: 'center',
                                                                                marginTop: width * 0.06,
                                                                                // marginBottom: width * 0.09,
                                                                            }}>
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    this.confirmStudent(index);
                                                                                }}
                                                                                style={{
                                                                                    backgroundColor: '#37c05cd4',
                                                                                    width: width * 0.28,
                                                                                    height: height * 0.07,
                                                                                    justifyContent: 'center',
                                                                                    borderRadius: 20,
                                                                                }}>
                                                                                <Text
                                                                                    style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>
                                                                                    موافقه
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity
                                                                                onPress={() => {
                                                                                    this.rejectStudent(index);
                                                                                }}
                                                                                style={{
                                                                                    backgroundColor: '#c03737d4',
                                                                                    width: width * 0.28,
                                                                                    height: height * 0.07,
                                                                                    justifyContent: 'center',
                                                                                    marginLeft: width * 0.15,
                                                                                    borderRadius: 20,
                                                                                }}>
                                                                                <Text
                                                                                    style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>
                                                                                    رفض
                                                                                </Text>
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>

                                                                </View>
                                                            ) : null,
                                                        )}
                                                    </View>
                                                    {/* )} */}
                                                </ScrollView>
                                            </>
                                        ) : (
                                            <>
                                                <View>
                                                    <Text
                                                        style={{
                                                            color: gray_color,
                                                            textAlign: 'center',
                                                            // justifyContent: 'center',
                                                            marginTop: RFValue(250),
                                                            fontSize: 18,
                                                            fontWeight: 'bold',
                                                        }}>
                                                        لا توجد طلاب في قائمة الانتظار
                                                    </Text>
                                                </View>
                                                {/* <View> */}
                                            </>
                                        )}
                                    </KeyboardAvoidingView>
                                ) : (
                                    <KeyboardAvoidingView
                                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                        style={{
                                            height: '82%',
                                            width: '100%',
                                            backgroundColor: '#fff',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flex: 1,
                                        }}>
                                        <Image
                                            source={require('../images/noPersons.png')}
                                            resizeMode="contain"
                                            style={{ width: 300, height: 250, alignSelf: 'center' }}
                                        />
                                        <Text style={{ fontSize: 20, color: gray_color, fontWeight: 'bold' }}>
                                            لا  يوجد طالب بهذا الاسم
                                        </Text>
                                    </KeyboardAvoidingView>
                                )}

                            </>) : (
                                <>
                                    {/* Parents */}
                                    <View style={{
                                        width: width,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        backgroundColor: Background,
                                    }}>
                                        <View
                                            style={{
                                                height: height * 0.085,
                                                // backgroundColor: Background,
                                                flexDirection: 'row',
                                                justifyContent: 'center',
                                                marginTop: RFValue(-17),
                                                marginBottom: RFValue(5)
                                            }}>
                                            {/* Search */}
                                            <SearchBar
                                                fontColor="#c6c6c6"
                                                iconColor="#c6c6c6"
                                                shadowColor="#282828"
                                                cancelIconColor="#c6c6c6"
                                                backgroundColor={this.state.searchColor2}
                                                placeholder="البحث بأسم ولي الامر "
                                                onClearPress={() => {
                                                    this.setState({ searchColor2: '#FFFFFF' });
                                                    this.searchfunForParent('');
                                                }}
                                                onPressIn={() => this.setState({ searchColor2: searchColor })}
                                                value={this.state.search_key_parent}
                                                onChangeText={value => {
                                                    if (value.length == 0) {
                                                        this.setState({ searchColor2: '#FFFFFF' });
                                                    } else {
                                                        this.setState({ searchColor2: searchColor });
                                                    }
                                                    this.setState({ search_key_parent: value });
                                                    this.searchfunForParent(value);
                                                }}
                                                style={{
                                                    marginBottom: 5,
                                                    // marginTop: 5,
                                                    width: '89%',
                                                    borderRadius: 10,
                                                    elevation: 3,
                                                    height: 43,
                                                    backgroundColor:
                                                        this.state.searchColor2 === searchColor
                                                            ? searchColor
                                                            : '#FFFFFF',
                                                }}
                                                textInputStyle={{
                                                    paddingRight: 10,
                                                    paddingLeft: 10,
                                                    width: this.state.searchColor2 === searchColor ? '75%' : '80%',
                                                }}
                                                clearIconImageStyle={{
                                                    width: this.state.searchColor2 === searchColor ? 30 : 0,
                                                }}
                                            />
                                            {this.state.cancel_button ? (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this.setState({
                                                            cancel_button: false,
                                                            searchBox_width: '95%',
                                                            search_key_parent: null,
                                                            // backgroundColor: "#0f0"
                                                        });
                                                    }}
                                                    style={{ alignSelf: 'center', marginLeft: '6%', }}>
                                                    <Icon name={'times'} color={'#D9D9D9'} size={19} />
                                                </TouchableOpacity>
                                            ) : null}
                                        </View>
                                        <View
                                            style={{ marginTop: -35, marginRight: 20 }}
                                        >
                                            <Entypo name="users" size={25} color='#000' />
                                            <View style={{ height: 25, minWidth: 25, backgroundColor: '#FFFFFF', borderWidth: .5, borderRadius: 15, justifyContent: 'center', marginTop: -40, marginRight: 10 }}>
                                                <Text style={{ fontSize: 15, alignSelf: 'center', fontWeight: 'bold', color: initial_color }}>{this.state.parents.length}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {/* parents... */}
                                    {this.state.found_parent ? (
                                        <KeyboardAvoidingView
                                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                            style={{
                                                flex: 1,
                                                backgroundColor: Background,
                                            }}>
                                            {this.state.parents.length != 0 ? (
                                                <>
                                                    <ScrollView>
                                                        <View>
                                                            {this.state.parents.map((parent_item, parent_index) =>
                                                                parent_item.parent_show == 1 ? (
                                                                    <View
                                                                        key={parent_index}
                                                                        style={{
                                                                            backgroundColor: '#ffffff',
                                                                            marginBottom: RFValue(10),
                                                                            borderRadius: 15,
                                                                            width: '95%',
                                                                            alignSelf: 'center',
                                                                            elevation: 3,
                                                                            height: height * 0.25,
                                                                            marginTop: 5,
                                                                            borderLeftWidth: 6,
                                                                            borderColor: initial_color,
                                                                        }}>

                                                                        <View
                                                                            style={{
                                                                                height: height * 0.2,
                                                                                justifyContent: 'flex-start',
                                                                                paddingHorizontal: width * 0.07,
                                                                                // backgroundColor:"#f0f"
                                                                            }}
                                                                        // key={parent_index}
                                                                        >
                                                                            {/* parent name */}
                                                                            <Text
                                                                                // key={parent_index}
                                                                                style={{
                                                                                    fontSize: RFValue(14),
                                                                                    fontWeight: '600',
                                                                                    color: '#1D1D1D',
                                                                                    textAlign: "justify",
                                                                                    marginLeft: RFValue(10),
                                                                                    marginTop: RFValue(20)
                                                                                }}>
                                                                                اسم ولي الامر : {parent_item.user_name}
                                                                            </Text>
                                                                            {/* student grade */}
                                                                            <Text
                                                                                // key={parent_index}
                                                                                style={{
                                                                                    fontSize: RFValue(14),
                                                                                    fontWeight: '600',
                                                                                    color: '#1D1D1D',
                                                                                    // direction: 'ltr',
                                                                                    // textAlign: "justify",
                                                                                    marginLeft: RFValue(10),
                                                                                    marginTop: RFValue(5)
                                                                                }}>
                                                                                كود الطالب  : {parent_item.student_code}
                                                                            </Text>
                                                                            {/* student group */}
                                                                            <Text
                                                                                // key={parent_index}
                                                                                style={{
                                                                                    fontSize: RFValue(14),
                                                                                    fontWeight: '600',
                                                                                    color: '#1D1D1D',
                                                                                    textAlign: "justify",
                                                                                    marginLeft: RFValue(10),
                                                                                    marginTop: RFValue(5)
                                                                                }}>
                                                                                رقم الهاتف  : {parent_item.user_phone}
                                                                            </Text>
                                                                            <View
                                                                                style={{
                                                                                    flexDirection: 'row',
                                                                                    // backgroundColor: '#ff0',
                                                                                    justifyContent: 'center',
                                                                                    marginTop: width * 0.06,
                                                                                    // marginBottom: width * 0.09,
                                                                                }}>
                                                                                <TouchableOpacity
                                                                                    onPress={() => {
                                                                                        this.confirmParent(parent_index);
                                                                                    }}
                                                                                    style={{
                                                                                        backgroundColor: '#37c05cd4',
                                                                                        width: width * 0.28,
                                                                                        height: height * 0.07,
                                                                                        justifyContent: 'center',
                                                                                        borderRadius: 20,
                                                                                    }}>
                                                                                    <Text
                                                                                        style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>
                                                                                        موافقه
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                                <TouchableOpacity
                                                                                    onPress={() => {
                                                                                        this.rejectParent(parent_index);
                                                                                    }}
                                                                                    style={{
                                                                                        backgroundColor: '#c03737d4',
                                                                                        width: width * 0.28,
                                                                                        height: height * 0.07,
                                                                                        justifyContent: 'center',
                                                                                        marginLeft: width * 0.15,
                                                                                        borderRadius: 20,
                                                                                    }}>
                                                                                    <Text
                                                                                        style={{ textAlign: 'center', fontSize: 18, color: '#fff' }}>
                                                                                        رفض
                                                                                    </Text>
                                                                                </TouchableOpacity>
                                                                            </View>
                                                                        </View>

                                                                    </View>
                                                                ) : null,
                                                            )}
                                                        </View>
                                                        {/* )} */}
                                                    </ScrollView>
                                                </>
                                            ) : (
                                                <>
                                                    <View>
                                                        <Text
                                                            style={{
                                                                color: gray_color,
                                                                textAlign: 'center',
                                                                // justifyContent: 'center',
                                                                marginTop: RFValue(250),
                                                                fontSize: 18,
                                                                fontWeight: 'bold',
                                                            }}>
                                                            لا توجد ولي أمر في قائمة الانتظار
                                                        </Text>
                                                    </View>
                                                    {/* <View> */}
                                                </>
                                            )}
                                        </KeyboardAvoidingView>
                                    ) : (
                                        <KeyboardAvoidingView
                                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                            style={{
                                                height: '82%',
                                                width: '100%',
                                                backgroundColor: '#fff',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                flex: 1,
                                            }}>
                                            <Image
                                                source={require('../images/noPersons.png')}
                                                resizeMode="contain"
                                                style={{ width: 300, height: 250, alignSelf: 'center' }}
                                            />
                                            <Text style={{ fontSize: 20, color: gray_color, fontWeight: 'bold' }}>
                                                لا  توجد ولي أمر بهذا الاسم
                                            </Text>
                                        </KeyboardAvoidingView>
                                    )}

                                </>)}

                    </View>
                </ScrollView>
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
        height: height * 0.07,
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
        fontSize: RFValue(18),
    },

    //body
    addCaseBtn: {
        bottom: 0,
        elevation: 5,
        right: RFValue(15),
        shadowRadius: 5,
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
        backgroundColor: "#f00",
        shadowOffset: { width: 0, height: 7 },
    },


});
