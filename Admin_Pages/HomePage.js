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
} from 'react-native';
import {
  Background,
  initial_color,
  beige_color,
  secondary_color,
  Café_color,
} from '../Admin_Pages/Colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
// import Entypo from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import ImagePicker from 'react-native-image-crop-picker';
// import {Hoshi} from 'react-native-textinput-effects';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // student_image: require('../images/user.png'),
      // student_name: 'دينا البني',
    };
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
        {/* Header  */}
        <View style={styles.headerContainer}>
          <View style={styles.headerTittleContainer}>
            <FontAwesome
              name="home"
              size={20}
              style={{
                color: Background,
                marginRight: 5
              }}
            />
            <Text style={styles.headerTittleTxtStyle}>الصفحة الرئيسية</Text>

          </View>
        </View>

        {/* Body */}
        <ScrollView style={{ flex: 1, backgroundColor: Background }}>
          <View style={styles.bodyContainer}>
            <TouchableOpacity
              style={styles.contianerOfOptions}
              onPress={() => {
                this.props.navigation.navigate('Grades');
              }}>
              <Image
                source={require('../images/groups.jpg')}
                resizeMode="center"
                style={styles.optionLogoStyle}
              />

              <View>
                <Text
                  style={[
                    styles.styleOfOptionTxt,
                    { marginTop: height * 0.015 },
                  ]}>
                  الدفعات
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contianerOfOptions}
              onPress={() => {
                this.props.navigation.navigate('All_Students');
              }}>
              <Image
                source={require('../images/all_students.jpg')}
                resizeMode="center"
                style={styles.optionLogoStyle}
              />

              <View>
                <Text
                  style={[
                    styles.styleOfOptionTxt,
                    { marginTop: height * 0.015 },
                  ]}>
                  جميع الطلاب
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contianerOfOptions}
              onPress={() => {
                this.props.navigation.navigate('WaitingList');
              }}>
              <Image
                source={require('../images/Waiting.png')}
                resizeMode="center"
                style={styles.optionLogoStyle}
              />

              <View>
                <Text
                  style={[
                    styles.styleOfOptionTxt,
                    { marginTop: height * 0.015 },
                  ]}>
                  قائمة الانتظار
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contianerOfOptions}
              onPress={() => {
                this.props.navigation.navigate('All_Parents');
              }}>
              <Image
                source={require('../images/parents.jpg')}
                resizeMode="center"
                style={styles.optionLogoStyle}
              />

              <View>
                <Text
                  style={[
                    styles.styleOfOptionTxt,
                    { marginTop: height * 0.015 },
                  ]}>
                  أولياء الأمور
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contianerOfOptions}
              onPress={() => {
                this.props.navigation.navigate('Attendence_Grade');
              }}>
              <Image
                source={require('../images/absence.jpg')}
                resizeMode="center"
                style={styles.optionLogoStyle}
              />

              <View>
                <Text
                  style={[
                    styles.styleOfOptionTxt,
                    { marginTop: height * 0.015 },
                  ]}>
                  أسماء الغياب
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contianerOfOptions}
              onPress={() => {
                this.props.navigation.navigate('Outlay_Grades');
              }}>
              <Image
                source={require('../images/outlay.jpg')}
                resizeMode="center"
                style={styles.optionLogoStyle}
              />

              <View>
                <Text
                  style={[
                    styles.styleOfOptionTxt,
                    { marginTop: height * 0.015 },
                  ]}>
                  المصاريف
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* footer */}

        <View
          style={{
            height: height * 0.075,
            backgroundColor: '#fff',
            flexDirection: 'row',
            flexWrap: 'wrap',
            elevation: 5,
            shadowRadius: 9.51,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 7 },
            shadowOpacity: 0.43,
            justifyContent: 'space-around',
            bottom: 0,
          }}>
          {/* home page */}

          <TouchableOpacity
            onPress={() => { }}
            style={{
              alignItems: 'center',
              width: width * 0.16,
              height: height * 0.08,
              justifyContent: 'center',
              // marginRight: width * 0.1,
            }}>
            <FontAwesome
              name="home"
              size={30}
              style={{
                color: initial_color,
                marginTop: -10,
              }}
            />

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Qr_Code');
            }}
            style={{
              alignItems: 'center',
              width: width * 0.16,
              height: height * 0.08,
              justifyContent: 'center',
              // marginRight: width * 0.1,
            }}>
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={30}
              style={{
                color: Café_color,
                marginTop: -10,
              }}
            />

          </TouchableOpacity>
        </View>
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
    backgroundColor: initial_color,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTittleContainer: {
    width: width * 0.9,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // marginLeft: RFValue(15)
  },
  headerTittleTxtStyle: {
    color: Background,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(16),
  },

  // Body Style
  // ------------------------------------------------------------------------
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',

    justifyContent: 'space-evenly',
  },

  contianerOfOptions: {
    elevation: 5,
    borderRadius: 15,
    shadowRadius: 7.51,
    shadowColor: '#000',
    shadowOpacity: 0.23,
    width: width * 0.42,
    height: height * 0.22,

    marginTop: height * 0.02,
    marginBottom: height * 0.01,
    shadowOffset: { width: 0, height: 7 },
    backgroundColor: '#ffffff',
    justifyContent: 'center'
  },
  styleOfOptionTxt: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: RFValue(14),
    // marginTop: height * -0.02,
  },
  optionLogoStyle: {
    width: width * 0.3,
    height: height * 0.14,
    alignSelf: 'center',
  },
});
