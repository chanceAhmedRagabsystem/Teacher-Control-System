import { useState } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput, Alert
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
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { RFValue } from 'react-native-responsive-fontsize';
export default function Add_Grade(props) {
  const [grade_name, setgrade_name] = useState('');
  const [grade_name_err, setgrade_name_err] = useState('');
  const [grade_outlay, setgrade_outlay] = useState('');
  const [grade_outlay_err, setgrade_outlay_err] = useState('');

  Add_Grade = () => {
    let errors = 0;
    if (grade_name.trim() == '') {
      setgrade_name_err('الرجاء إدخال إسم الدفعة');
      errors++;
    } else {
      setgrade_name_err('');
    }
    if (grade_outlay.trim() == '') {
      setgrade_outlay_err('الرجاء إدخال مصاريف الدفعة');
      errors++;
    } else {
      setgrade_outlay_err('');
    }
    if (errors == 0) {
      let dataToSend = {
        grade_name: grade_name,
        grade_token: grade_outlay,
      };
      axios.post('http://192.168.1.5/AhmedRagab_System/Add_Grades.php', dataToSend)
        .then(res => {
          console.log(res.data);
          if (res.data == 'grade_added') {
            Alert.alert('تم اضافة ');
          } else if (res.data == 'grade_name_already_exist') {
            Alert.alert('الدفعة موجودة بالفعل');
          } else if (res.data == 'failed_to_add_grade') {
            Alert.alert('حدث خطأ ما');
          }
        });
      props.navigation.navigate('Grades');
    }
  };
  return (

    <View style={styles.container}>
      <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
      {/* Header  */}
      <View style={styles.headerContainer}>
        {/* Header Tittle  */}
        <TouchableOpacity
          style={{ justifyContent: 'center', marginLeft: 15 }}
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
          <Text style={styles.headerTittleTxtStyle}>إضافة دفعة</Text>
        </View>
      </View>


      <TextInput
        style={styles.TextInputStyle}
        placeholder="أسم الدفعة"
        placeholderTextColor={gray_txt}
        value={grade_name}
        onChangeText={value => {
          setgrade_name(value);
        }} />
      <Text
        style={styles.error_txt}>
        {grade_name_err}
      </Text>
      <TextInput
        style={styles.TextInputStyle}
        placeholder="قيمة المصاريف"
        placeholderTextColor={gray_txt}
        value={grade_outlay}
        onChangeText={value => {
          setgrade_outlay(value);
        }} />
      <Text
        style={styles.error_txt}>
        {grade_outlay_err}
      </Text>
      <TouchableOpacity style={styles.Button}
        onPress={Add_Grade}
      >
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            alignSelf: 'center',
            color: '#FFFFFF',
          }}>
          إضافة
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('Grades');
        }}
        style={styles.Button2}>
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
    marginTop: RFValue(5),
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
  error_txt: {
    fontSize: 15,
    color: secondary_color,
    textAlign: 'center',
    marginBottom: height * 0.001,
    marginTop: height * 0.001,
    fontWeight: "700"
  }
});
