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
  TextInput,
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
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import Entypo from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
// import ImagePicker from 'react-native-image-crop-picker';
import { Hoshi, Fumi } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Edit_Grade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grade_data: this.props.route.params.grade_data,
    };
  }
  //   componentDidMount() {
  //     console.log(this.state.grade_data);
  //   }
  updated_grade() {
    axios
      .post('http://192.168.1.5/AhmedRagab_System/Edit_Grade.php', {
        grade_id: this.state.grade_data.grade_id,
        grade_name: this.state.grade_data.grade_name,
        grade_token: this.state.grade_data.grade_token,
      })
      .then(res => {
        if (res.data == 'Grade_edited') {
          alert('success');
          this.props.navigation.navigate('Grades');
          //   this.setState({
          //     user_id: this.state.charity_data.user_id,
          //     user_name: this.state.charity_data.user_name,
          //   });
        } else if (res.data == 'Failed_to_update_grade') {
          alert('failed');
        }
      });
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
        {/* Header  */}
        <View style={styles.headerContainer}>
          <View style={styles.headerContainer}>
            {/* Header Tittle  */}
            <TouchableOpacity
              style={{ justifyContent: 'center', marginLeft: 15 }}
              onPress={() => {
                this.props.navigation.navigate('Grades');
              }}>
              <Entypo
                name="chevron-with-circle-right"
                color="#000"
                size={30}
                style={{ alignSelf: 'center' }}
              />
            </TouchableOpacity>
            <View style={styles.headerTittleContainer}>
              <Text style={styles.headerTittleTxtStyle}>تعديل اسم الدفعة</Text>
            </View>
          </View>
        </View>

        {/* Body */}
        <ScrollView style={{ backgroundColor: Background }}>
          <TextInput
            style={styles.TextInputStyle}
            placeholder="أسم الدفعة"
            placeholderTextColor={gray_txt}
            value={this.state.grade_data.grade_name}
            onChangeText={value => {
              this.setState({
                grade_data: {
                  grade_id: this.state.grade_data.grade_id,
                  grade_name: value,
                  grade_token: this.state.grade_data.grade_token,
                },
              });
            }}></TextInput>
          <TextInput
            style={styles.TextInputStyle}
            placeholder="قيمة المصاريف"
            placeholderTextColor={gray_txt}
            value={this.state.grade_data.grade_token}
            onChangeText={value => {
              this.setState({
                grade_data: {
                  grade_id: this.state.grade_data.grade_id,
                  grade_name: this.state.grade_data.grade_name,
                  grade_token: value,
                },
              });
            }}></TextInput>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              this.updated_grade();
            }}>
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

        {/* footer */}
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
    marginRight: width * 0.1,
  },
  headerTittleTxtStyle: {
    color: secondary_color,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(18),
  },

  // Body Style
  // ------------------------------------------------------------------------
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#0ff',
    // justifyContent:"center",
    backgroundColor: Background,
  },
  TittleTxtStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 23,
    marginTop: RFValue(25),
  },
  textInputStyle: {
    fontSize: 17,
    marginBottom: RFValue(20),
    alignSelf: 'center',
    width: width * 0.9,
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
    color:"#000"
  },
  contianerOfpage: {
    // backgroundColor: ,
    // elevation: 2,
    width: '100%',
    height: height * 0.17,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: RFValue(15),
    marginBottom: 10,
    flexDirection: 'row',
    padding: RFValue(10),
    alignItems: 'center',
  },
  contianerOfInfo: {
    backgroundColor: '#FFF',
    elevation: 5,
    width: '47%',
    height: height * 0.1,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    padding: 15,
  },
  contianerOfProfileInfo: {
    backgroundColor: '#FFF',
    elevation: 5,
    width: RFValue(300),
    height: height * 0.08,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: RFValue(15),
    marginBottom: 10,
    alignSelf: 'center',
    padding: 15,
    alignItems: 'center',
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
    borderRightWidth: 6,
    borderColor: initial_color,
    color:"#000"
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
