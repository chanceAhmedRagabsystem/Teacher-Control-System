import { useState, useEffect } from 'react';
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
import {
  Background,
  initial_color,
  beige_color,
  secondary_color,
  Café_color,
  gray_color,
  gray_txt,
} from './Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import DateTimePicker from '@react-native-community/datetimepicker';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
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
}];
export default function Edit_Group(props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('time');
  const [date2, setDate2] = useState(new Date());
  const [show2, setShow2] = useState(false);
  const [mode2, setMode2] = useState('time');
  const [group_name, setGroup_name] = useState('');
  const [group_students, setGroup_students] = useState(0);
  const [group_days, setGroup_days] = useState('');
  const [group_data, setGroup_data] = useState(props.route.params.group_data);
  const [selectedItems, setselectedItems] = useState('');

  const onSelectedItemsChange = (selectedItems) => {
    setselectedItems(selectedItems)
    setGroup_data({
      group_id: group_data.group_id,
      grade_id: group_data.grade_id,
      group_name: group_data.group_name,
      start_time: group_data.start_time,
      end_time: group_data.end_time,
      group_day: selectedItems.toString(),
      group_students: group_data.group_students
    });
    // this.setState({ selectedItems });
  };
  useEffect(() => {
    console.log(group_data.grade_id);
  }, []);

  function updated_group() {
    axios
      .post('http://192.168.1.5/AhmedRagab_System/edit_groups.php', {
        group_id: group_data.group_id,
        grade_id: group_data.grade_id,
        group_name: group_data.group_name,
        group_students: group_data.group_students,
        group_day: group_data.group_day,
        date: group_data.start_time,
        date2: group_data.end_time,
      })
      .then(res => {
        console.log(res.data)
        if (res.data == 'group_updated') {
          Alert.alert('success');
          props.navigation.navigate('Groups');
        } else if (res.data == 'failed_to_edited_group') {
          Alert.alert('failed');
        } else if (res.data == 'group_not_found') {
          Alert.alert("هذا الجروب غير موجود")
        }
      });
  };

  const showMode = modeToShow => {
    setShow(true);
    setMode(modeToShow);
  };
  const onChange = (e, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
    setGroup_data({
      group_id: group_data.group_id,
      grade_id: group_data.grade_id,
      group_name: group_data.group_name,
      start_time: selectedDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }),
      end_time: group_data.end_time,
      group_day: group_data.group_day,
      group_students: group_data.group_students
    });
  };
  const showMode2 = modeToShow => {
    setShow2(true);
    setMode2(modeToShow);
  };
  const onChange2 = (e, selectedDate) => {
    setDate2(selectedDate);
    setShow2(false);
    setGroup_data({
      group_id: group_data.group_id,
      grade_id: group_data.grade_id,
      group_name: group_data.group_name,
      start_time: group_data.start_time,
      end_time: selectedDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      }),
      group_day: group_data.group_day,
      group_students: group_data.group_students
    });
  };
  return (
    <View style={styles.container}>
      {/* Header  */}
      <View style={styles.headerContainer}>
        {/* Header Tittle  */}
        <TouchableOpacity
          style={{ justifyContent: 'center', marginLeft: 15 }}
          onPress={() => {
            props.navigation.navigate('Groups');
          }}>
          <Entypo
            name="chevron-with-circle-right"
            color="#000"
            size={30}
            style={{ alignSelf: 'center' }}
          />
        </TouchableOpacity>
        <View style={styles.headerTittleContainer}>
          <Text style={styles.headerTittleTxtStyle}>تعديل مجموعة</Text>
        </View>
      </View>
      <ScrollView>
        <TextInput
          style={styles.TextInputStyle}
          placeholder="أسم المجموعة"
          placeholderTextColor={gray_txt}
          value={group_data.group_name}
          onChangeText={value => {
            setGroup_data({
              group_id: group_data.group_id,
              grade_id: group_data.grade_id,
              group_name: value,
              start_time: group_data.start_time,
              end_time: group_data.end_time,
              group_day: group_data.group_day,
              group_students: group_data.group_students
            });
          }}></TextInput>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={false}
            onChange={onChange}
            display="spinner"
          />
        )}
        <TouchableOpacity
          style={styles.TouchableStyle}
          onPress={() => showMode('time')}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              alignSelf: 'center',
              color: gray_txt,
            }}>
            اختار وقت بداية المجموعة
          </Text>
        </TouchableOpacity>
        {!show ? (
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
              alignSelf: 'center',
              color: initial_color,
              fontWeight: '600',
            }}>
            {group_data.start_time}</Text>) : (<Text></Text>)}
        {show2 && (
          <DateTimePicker
            value={date2}
            mode={mode2}
            is24Hour={false}
            onChange={onChange2}
            display="spinner"
          />
        )}
        <TouchableOpacity
          style={styles.TouchableStyle}
          onPress={() => showMode2('time')}>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
              alignSelf: 'center',
              color: gray_txt,
            }}>
            اختار وقت نهاية المجموعة
          </Text>
        </TouchableOpacity>
        {!show2 ? (
          <Text
            style={{
              fontSize: 17,
              textAlign: 'center',
              alignSelf: 'center',
              color: initial_color,
              fontWeight: '600',
            }}>
            {group_data.end_time}
          </Text>
        ) : (
          <Text></Text>
        )}
        <TextInput
          style={styles.TextInputStyle}
          placeholder="عدد طلاب المجموعة"
          placeholderTextColor={gray_txt}
          value={group_data.group_students}
          onChangeText={value => {
            setGroup_data({
              group_id: group_data.group_id,
              grade_id: group_data.grade_id,
              group_name: group_data.group_name,
              start_time: group_data.start_time,
              end_time: group_data.end_time,
              group_day: group_data.group_day,
              group_students: value
            });
          }}></TextInput>
        {/* <TextInput
          style={styles.TextInputStyle}
          placeholder="أيام حضور المجموعة"
          placeholderTextColor={gray_txt}
          value={group_data.group_day}
          onChangeText={value => {
            setGroup_data({
              group_id: group_data.group_id,
              grade_id: group_data.grade_id,
              group_name: group_data.group_name,
              start_time: group_data.start_time,
              end_time: group_data.end_time,
              group_day: value,
              group_students: group_data.group_students
            });
          }}></TextInput> */}

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
            selectText={group_data.group_day}
            showDropDowns={true}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            searchPlaceholderText="أيام الأسبوع"
            confirmText="حفظ"
            styles={{
              button: { backgroundColor: initial_color },
              confirmText: { backgroundColor: initial_color },
              separator: { height: 1.5 },
              item: {
                height: 50
              }
            }}
            alwaysShowSelectText


          />
        </View>
        <TouchableOpacity style={styles.Button}
          onPress={() => { updated_group() }}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              alignSelf: 'center',
              color: '#FFFFFF',
            }}>
            تعديل
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button2}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              alignSelf: 'center',
              color: '#1D1D1D',
            }}>
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
    marginRight: width * 0.1,
  },
  headerTittleTxtStyle: {
    color: secondary_color,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(18),
  },
  container: {
    flex: 1,
    backgroundColor: Background,
  },
  TextInputStyle: {
    width: width * 0.95,
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
    color: "#000",
  },
  TouchableStyle: {
    width: width * 0.95,
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
  },
  Button: {
    width: width * 0.55,
    height: 50,
    backgroundColor: initial_color,
    // elevation: 5,
    marginTop: RFValue(10),
    marginBottom: RFValue(5),
    paddingRight: 20,
    paddingLeft: 20,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
  Button2: {
    width: width * 0.55,
    height: 50,
    backgroundColor: '#ddd',
    // elevation: 5,
    marginTop: RFValue(10),
    marginBottom: RFValue(5),
    paddingRight: 20,
    paddingLeft: 20,
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
  },
});
