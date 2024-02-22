/* eslint-disable prettier/prettier */
import React, { useRef } from 'react';
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
import { Background, initial_color, beige_color, secondary_color, Café_color, gray_color } from './Colors'
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';
import { Hoshi, Fumi } from 'react-native-textinput-effects';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class Student_info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student_data: this.props.route.params.student_data,
            showInfo: false,
            student_grades: [],
            selectedItem: [],
            selectedGroup: [],
            attendence: []
        };
        this.groupDropdownRef = React.createRef();
    }
    componentDidMount() {
        // console.log(this.state.student_data)
        this.fetchData(),
            this.getData()
        // this.refreshDataInterval = setInterval(this.fetchData, 100);
        // refresh data every 5 seconds
    }
    // componentWillUnmount() {
    //     clearInterval(this.refreshDataInterval);
    // }

    fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.1.5/AhmedRagab_System/select_Grades_and_groups.php",
            );
            const grades = response.data;
            this.setState({ student_grades: grades });
        } catch (error) {
            console.error(error);
        }
    };
    getData() {
        axios
            .post('http://192.168.1.5/AhmedRagab_system/select_student_absence.php', {
                student_code: this.state.student_data.student_code,
            })
            .then(res => {
                // console.log(res.data);
                if (typeof res.data == typeof {}) {
                    this.setState({ attendence: res.data });
                    console.log(this.state.attendence);
                } else if (res.data == 'Error') {
                    console.log('error');
                }
            });
    }
    updated() {
        var error = 0
        if (this.state.selectedItem == '') {
            alert("من فضلك قم بأختيار أسم الدفعة")
            error++
        } else if (this.state.selectedGroup == '') {
            alert('من فضلك قم بأختيار أسم المجموعة')
            error++
        }
        else if (error == 0) {
            axios
                .post(
                    'http://192.168.1.5/AhmedRagab_System/Edit_student_grade_and_group.php',
                    {
                        student_id: this.state.student_data.student_id,
                        grade_id: this.state.selectedItem.grade_id,
                        group_id: this.state.selectedGroup.group_id,
                        group_name: this.state.selectedGroup.group_name,
                        grade_name: this.state.selectedItem.grade_name,
                    },
                )
                .then(res => {
                    if (res.data == 'updated_success') {
                        alert('تم التعديل بنجاح');
                        this.setState({ showInfo: false });
                    } else if (res.data == 'there_is_no_changes') {
                        alert('فشل تعديل بيانات الطالب');
                    } else if (res.data == 'student_not_found') {
                        alert('هذا الطالب غير موجود')
                    }
                });
        }
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
                    <TouchableOpacity style={{ marginRight: 15 }}
                        onPress={() => {
                            this.setState({ showInfo: true });
                        }}
                    >
                        <FontAwesome name="edit" color='#1D1D1D' size={30} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>

                </View>

                {/* Body */}
                <ScrollView style={{ flex: 1, backgroundColor: Background }}>
                    <View style={{ width: 90, height: 90, alignSelf: 'center', borderRadius: 5, justifyContent: 'center', borderWidth: .2, borderColor: '#000', marginTop: 10 }}>


                        <Image source={require('../images/user.png')} style={{ width: 70, height: 70, alignSelf: 'center', borderRadius: 10 }}
                            resizeMode='stretch'
                        />


                    </View>

                    <View style={styles.bodyContainer}>
                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 20, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            أسم الطالب
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>

                            <Text style={{ color: '#1D1D1D', fontSize: 17, alignSelf: 'flex-start' }}>{this.state.student_data.user_name}</Text>

                        </View>
                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 20, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            كود الطالب
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>

                            <Text style={{ color: '#1D1D1D', fontSize: 17, alignSelf: 'flex-start' }}>{this.state.student_data.student_code}</Text>

                        </View>
                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 10, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            الدفعة
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>
                            <Text style={{ color: '#1D1D1D', fontSize: 17 }}>{this.state.student_data.student_grade}</Text>

                        </View>
                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 10, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            المجموعة
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>
                            <Text style={{ color: '#1D1D1D', fontSize: 17 }}>{this.state.student_data.student_group}</Text>

                        </View>

                        <Text style={{
                            fontSize: 16, marginLeft: 20,
                            marginTop: 10, fontWeight: 'bold', color: '#1D1D1D'
                        }}>
                            رقم الهاتف
                        </Text>

                        <View
                            style={styles.contianerOfInfo}>
                            <Text style={{ color: '#1D1D1D', fontSize: 17, alignSelf: 'flex-start' }}>{this.state.student_data.user_phone}</Text>

                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-around' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Student_Attendence', {
                                        student_data: this.state.student_data
                                    });
                                }}
                                style={{
                                    width: width * .45, height: 80, backgroundColor: '#FFFFFF',
                                    elevation: 3, marginBottom: 5, borderRadius: 10,
                                    borderColor: initial_color, justifyContent: 'center', borderWidth: 1.5
                                }}>
                                <Text style={{
                                    fontSize: 18, alignSelf: 'center',
                                    fontWeight: 'bold', color: initial_color
                                }}>الغياب</Text>
                                {this.state.attendence.length == 0 ? <Text style={{
                                    fontSize: 16, alignSelf: 'center',
                                    marginTop: 5, color: '#1D1D1D'
                                }}>0</Text> : <Text style={{
                                    fontSize: 16, alignSelf: 'center',
                                    marginTop: 5, color: '#1D1D1D'
                                }}>{this.state.attendence.length} أيام</Text>}

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate('Student_Outlay', {
                                        student_data: this.state.student_data
                                    });
                                }}
                                style={{
                                    width: width * .45, height: 80, backgroundColor: initial_color,
                                    elevation: 3, marginBottom: 5, borderRadius: 10,
                                    borderColor: initial_color, justifyContent: 'center'
                                }}>
                                <Text style={{
                                    fontSize: 18, alignSelf: 'center',
                                    marginTop: 5, fontWeight: 'bold', color: '#FFFFFF'
                                }}>المصاريف</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
                <Modal
                    transparent
                    statusBarTranslucent
                    visible={this.state.showInfo}
                    onRequestClose={() => {
                        showModelInfo = this.state.showInfo;
                        this.setState({ showInfo: !showModelInfo });
                    }}>
                    <View style={styles.infoModalBackground}>
                        <View style={styles.studentInfoBox}>
                            {/* Header Of Charity Info Box */}
                            <View style={styles.NameImgContainer}>
                                <SelectDropdown
                                    data={this.state.student_grades}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index);
                                        this.setState({ selectedItem: selectedItem })
                                        this.groupDropdownRef.current.reset();
                                        this.setState({ groups: [] });
                                        this.setState({ groups: selectedItem.groups });
                                    }}

                                    defaultButtonText={this.state.student_data.student_grade}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.grade_name;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item.grade_name;
                                    }}
                                    buttonStyle={styles.textInputStyle}
                                    buttonTextStyle={{ color: "#000", fontWeight: "bold", fontSize: 18 }}
                                    renderDropdownIcon={isOpened => {
                                        return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} style={{
                                            color: gray_color,
                                            fontSize: 20,
                                            width: 30
                                        }} />
                                    }}
                                    dropdownIconPosition={'left'}
                                />
                                {/* student group */}
                                <SelectDropdown
                                    ref={this.groupDropdownRef}
                                    data={this.state.groups}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                        this.setState({ selectedGroup: selectedItem })
                                    }}
                                    defaultButtonText={this.state.student_data.student_group}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.group_name;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item.group_name;
                                    }}
                                    buttonStyle={[styles.textInputStyle, { marginTop: RFValue(20) }]}
                                    buttonTextStyle={{ color: "#000", fontWeight: "bold", fontSize: 18 }}
                                    renderDropdownIcon={isOpened => {
                                        return <AntDesign name={isOpened ? 'caretup' : 'caretdown'} style={{
                                            color: gray_color,
                                            fontSize: 20,
                                            width: 30
                                        }} />
                                    }}
                                    dropdownIconPosition={'left'}
                                />
                            </View>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignSelf: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // this.props.navigation.navigate('Accounts');
                                        // this.setState({ showInfo: false })
                                        // achievements: this.state.charityDetails,
                                        {
                                            this.setState({ showInfo: false });
                                        }
                                    }}
                                    style={[
                                        styles.Btn,
                                        { marginRight: 40, backgroundColor: '#ddd' },
                                    ]}
                                >
                                    <Text
                                        style={{
                                            color: '#1D1D1D',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: '600',
                                        }}>
                                        الغاء
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        // console.log(selectedItem)
                                        this.props.navigation.navigate('Student_info', {
                                            // achievements: this.state.charityDetails,
                                        });
                                        this.updated()


                                    }}
                                    style={styles.Btn}
                                >
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: width * 0.053,
                                            // fontSize: RFValue(19),
                                            fontWeight: '600',
                                        }}>
                                        حفظ
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
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
        alignSelf: 'center',
        padding: 15,
        justifyContent: 'flex-start'

    },
    infoModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    studentInfoBox: {
        alignItems: 'center',
        justifyContent: 'center',
        height: height * 0.4,
        marginTop: height * 0.05,
        paddingHorizontal: height * 0.02,
        paddingVertical: height * 0.015,
        borderRadius: height * 0.013,
        backgroundColor: '#fff',
    },
    NameImgContainer: {
        width: width * 0.8,
        height: height * 0.2,
        alignItems: 'center',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
    },

    Btn: {
        width: width * 0.3,
        alignItems: 'center',
        height: height * 0.05,
        justifyContent: 'center',
        marginTop: height * 0.035,
        borderRadius: height * 0.018,
        backgroundColor: initial_color,
        elevation: 3,
        shadowRadius: 9.51,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 7 },
    },
    textInputStyle: {
        fontSize: 17,
        alignSelf: 'center',
        width: width * 0.8,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 5,
        borderRadius: 10,
        color:"#000",
    },
});