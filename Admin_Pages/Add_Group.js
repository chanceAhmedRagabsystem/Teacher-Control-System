import { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import { Background, initial_color, beige_color, secondary_color, Café_color, gray_color, gray_txt } from './Colors'
import Entypo from 'react-native-vector-icons/Entypo';
import axios from "axios";
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import DateTimePicker from '@react-native-community/datetimepicker';
import { RFValue } from "react-native-responsive-fontsize";
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const items = [{
    id: '1',
    name: 'السبت'
}, {
    id: '2',
    name: 'الأحد'
}, {
    id: '3',
    name: 'الأثنين'
}, {
    id: '4',
    name: 'الثلاثاء'
}, {
    id: '5',
    name: 'الأربعاء'
}, {
    id: '6',
    name: 'الخميس'
}, {
    id: '7',
    name: 'الجمعة'
}
];
export default function Add_Group(props) {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('time');
    const [date2, setDate2] = useState(new Date());
    const [show2, setShow2] = useState(false);
    const [mode2, setMode2] = useState('time');
    const [group_name, setGroup_name] = useState('');
    const [group_students, setGroup_students] = useState(0);
    const [group_days, setGroup_days] = useState('');
    const [errors_txt, SetErrors] = useState('');
    const [groupsOfGrade, SetgroupsOfGrade] = useState(props.route.params.groupsOfGrade)

    const [selectedItems, setselectedItems] = useState('');

    const onSelectedItemsChange = (selectedItems) => {
        setselectedItems(selectedItems)
        setGroup_days(selectedItems.toString())
        // this.setState({ selectedItems });
    };

    const showMode = (modeToShow) => {
        setShow(true)
        setMode(modeToShow)
    }
    const onChange = (e, selectedDate) => {
        setDate(selectedDate);
        setShow(false)
    };
    const showMode2 = (modeToShow) => {
        setShow2(true)
        setMode2(modeToShow)
    }
    const onChange2 = (e, selectedDate) => {
        setDate2(selectedDate);
        setShow2(false)
    };
    useEffect(() => {
        console.log(groupsOfGrade.grade_id)
    }, [])
    function addGroup() {
        let errors = 0
        console.log(date)
        if (group_name.trim() == '' &&
            group_students == '' && group_days.trim() == '') {
            alert("من فضلك ادخل جميع البيانات");
            errors++
        }
        else if (group_name.trim() == '') {
            SetErrors('ادخل اسم الجروب')
            errors++
        }
        else if (group_students == '') {
            SetErrors('ادخل عدد طلاب المجموعة')
            errors++
        }
        else if (group_days == '') {
            SetErrors("ادخل ايام حضور المجموعة")
            errors++
        } else {
            SetErrors('')
        }
        if (errors == 0) {
            axios.post('http://192.168.1.5/AhmedRagab_System/Add_groups.php', {
                group_name: group_name,
                date: date.toLocaleTimeString(
                    'nu',
                    {
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: 'Africa/Cairo'

                    }
                ),
                date2: date2.toLocaleTimeString(
                    'nu',
                    {
                        hour: "numeric",
                        minute: "numeric",
                        timeZone: 'Africa/Cairo'

                    }
                ),
                group_students: group_students,
                group_days: group_days,
                grade_id: groupsOfGrade.grade_id
            }).then(res => {
                if (res.data == 'group_added') {
                    // props.navigation.setParams({ refresh: true });
                    Alert.alert('تم إضافة مجموعة جديدة');
                    props.navigation.navigate('Groups')
                    console.log(res.data)
                } else if (res.data == 'failed_to_add_group') {
                    Alert.alert('فشل في إضافة مجموعة جديدة')
                } else if (res.data == 'group_name_already_exist') {
                    Alert.alert('هذه المجموعة موجودة مسبقا')
                }

                // props.navigation.navigate('Groups');

            })
        }
    }
    return (
        <View style={styles.container}>
            {/* Header  */}
            <View style={styles.headerContainer}>

                {/* Header Tittle  */}
                <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 15 }}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                >
                    <Entypo name="chevron-with-circle-right" color='#000' size={30} style={{ alignSelf: 'center' }} />
                </TouchableOpacity>
                <View style={styles.headerTittleContainer}>

                    <Text style={styles.headerTittleTxtStyle}>إضافة مجموعة</Text>

                </View>

            </View>

            <ScrollView>
                <TextInput style={styles.TextInputStyle}
                    placeholder='أسم المجموعة'
                    placeholderTextColor={gray_txt}
                    value={group_name}
                    onChangeText={value => {
                        setGroup_name(value)
                    }}
                >
                </TextInput>
                {
                    show && (
                        <DateTimePicker
                            value={date}
                            mode={mode}
                            is24Hour={false}
                            onChange={onChange}
                            display='spinner'


                        />
                    )
                }
                <TouchableOpacity style={styles.TouchableStyle}
                    onPress={() => showMode("time")}
                >
                    <Text style={{
                        fontSize: 16,
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: gray_txt
                    }}
                    >
                        اختار وقت بداية المجموعة
                    </Text>
                </TouchableOpacity>
                {!show ? (
                    <Text style={{
                        fontSize: 17,
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: initial_color,
                        fontWeight: '600'
                    }}>
                        {date.toLocaleTimeString(
                            'nu',
                            {
                                hour: "numeric",
                                minute: "numeric",
                                timeZone: 'Africa/Cairo'

                            }
                        )}</Text>) : (<Text></Text>)}
                {
                    show2 && (
                        <DateTimePicker
                            value={date2}
                            mode={mode2}
                            is24Hour={false}
                            onChange={onChange2}
                            display='spinner'
                            timezone="Africa/Cairo"
                        />
                    )
                }
                <TouchableOpacity style={styles.TouchableStyle}
                    onPress={() => showMode2("time")}
                >
                    <Text style={{
                        fontSize: 16,
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: gray_txt
                    }}
                    >
                        اختار وقت نهاية المجموعة
                    </Text>
                </TouchableOpacity>
                {!show2 ? (
                    <Text style={{
                        fontSize: 17,
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: initial_color,
                        fontWeight: '600'
                    }}>
                        {date2.toLocaleTimeString(
                            'nu',
                            {
                                hour: 'numeric',
                                minute: 'numeric',
                                timeZone: 'Africa/Cairo'

                            }
                        )}</Text>) : (<Text></Text>)}
                <TextInput style={styles.TextInputStyle}
                    placeholder='عدد طلاب المجموعة'
                    placeholderTextColor={gray_txt}
                    value={group_students}
                    onChangeText={value => {
                        setGroup_students(value)
                    }}
                >
                </TextInput>
                <View style={{
                    width: width * .95,
                    // height: 67,
                    backgroundColor: Background,
                    elevation: 5,
                    marginTop: RFValue(10),
                    marginBottom: RFValue(5),
                    paddingRight: 20,
                    paddingLeft: 20,
                    fontSize: 17,
                    textAlign: 'center',
                    borderRadius: 10,
                    alignSelf: 'center',
                    borderLeftWidth: 6,
                    borderColor: initial_color,
                }}>
                    <SectionedMultiSelect
                        items={items}
                        IconRenderer={Icon}
                        uniqueKey="name"
                        subKey="children"
                        selectText="أيام حضور المجموعة"
                        showDropDowns={true}
                        onSelectedItemsChange={onSelectedItemsChange}
                        selectedItems={selectedItems}
                        searchPlaceholderText="أيام الأسبوع"
                        confirmText="حفظ"
                        styles={{
                            button: { backgroundColor: initial_color },
                            separator: { height: 1.5 },
                            item: {
                                height: 50
                            }
                        }}
                        alwaysShowSelectText

                    />
                </View>
                {/* <TextInput style={styles.TextInputStyle}
                    placeholder='أيام حضور المجموعة'
                    placeholderTextColor={gray_txt}
                    value={group_days}
                    onChangeText={value => {
                        setGroup_days(value)
                    }}
                >
                </TextInput> */}
                <Text style={{
                    alignSelf: 'center', fontSize: RFValue(15),
                    color: secondary_color, fontWeight: 'bold', marginBottom: 5, marginTop: 5
                }}>{errors_txt}</Text>
                <TouchableOpacity style={styles.Button}
                    onPress={() => {
                        addGroup()
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: '#FFFFFF'
                    }}
                    >
                        إضافة
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Button2}
                    onPress={() => {
                        props.navigation.goBack()
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        textAlign: 'center',
                        alignSelf: 'center',
                        color: '#1D1D1D'
                    }}
                    >
                        إلغاء
                    </Text>
                </TouchableOpacity>
            </ScrollView>
            <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
        </View>
    );
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
        marginRight: width * .1
    },
    headerTittleTxtStyle: {
        color: secondary_color,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFValue(18)
    },
    container: {
        flex: 1,
        backgroundColor: Background,
    },
    TextInputStyle: {
        width: width * .95,
        height: 60,
        backgroundColor: Background,
        elevation: 5,
        marginTop: RFValue(10),
        marginBottom: RFValue(5),
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 17,
        textAlign: 'center',
        borderRadius: 10,
        alignSelf: 'center',
        borderRightWidth: 6,
        borderColor: initial_color,
        color: "#000",
    },
    TouchableStyle: {
        width: width * .95,
        height: 60,
        backgroundColor: Background,
        elevation: 5,
        marginTop: RFValue(10),
        marginBottom: RFValue(5),
        paddingRight: 20,
        paddingLeft: 20,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        borderLeftWidth: 6,
        borderColor: initial_color,
    },
    Button: {
        width: width * .55,
        height: 50,
        backgroundColor: initial_color,
        // elevation: 5,
        marginTop: RFValue(10),
        marginBottom: RFValue(5),
        paddingRight: 20,
        paddingLeft: 20,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center'
    },
    Button2: {
        width: width * .55,
        height: 50,
        backgroundColor: '#ddd',
        // elevation: 5,
        marginTop: RFValue(10),
        marginBottom: RFValue(5),
        paddingRight: 20,
        paddingLeft: 20,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center'
    }
});