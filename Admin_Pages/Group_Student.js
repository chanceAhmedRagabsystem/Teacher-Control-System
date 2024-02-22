/* eslint-disable prettier/prettier */
import React from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
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
import axios from 'axios';
import { Dimensions } from 'react-native';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import NetInfo from '@react-native-community/netinfo';
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

export default class Group_Student extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      numOfItems: 0,
      found: true,
      search_key: '',
      loading: true,
      network: false,
      cancel_button: false,
      searchBox_width: '95%',
      searchColor: '#FFFFFF',
      groupDetails: this.props.route.params.groupDetails,
      loading: true,
      network: false,
    };
  }
  componentDidMount() {
    console.log(this.state.groupDetails);
    console.log(this.state.students);
    this.net();
    // this.refreshDataInterval = setInterval(this.fetchData, 100);
    // refresh data every 5 seconds
  }
  net() {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        this.setState({ network: true, loading: true });
        if (this.state.students.length == 0) {
          this.fetchData();
          // this.refreshDataInterval = setInterval(this.fetchData, 100);
        }
      } else {
        this.setState({ network: false, loading: false });
      }
    });
  }

  //get_data_from_database
  // getdata() {
  //     axios
  //         .post('http://192.168.1.5/AhmedRagab_System/group_student.php', {
  //             group_id: this.state.groupDetails.group_id,
  //             grade_id: this.state.groupDetails.grade_id,
  //         })
  //         .then(res => {
  //             if (res.status == 200) {
  //                 if (res.data == 'Error') {
  //                     alert('try again');
  //                 } else if (typeof res.data == typeof []) {
  //                     this.setState({ students: res.data });
  //                 }
  //             }
  //             this.setState({ loading: false });
  //         });
  // }
  componentWillUnmount() {
    clearInterval(this.refreshDataInterval);
  }

  fetchData = async () => {
    try {
      const response = await axios.post(
        'http://192.168.1.5/AhmedRagab_System/group_student.php',
        {
          group_id: this.state.groupDetails.group_id,
          grade_id: this.state.groupDetails.grade_id,
        },
      );
      const students = response.data;
      this.setState({ students: students, loading: false });
    } catch (error) {
      console.error(error);
    }
  };
  // Functions
  searchfun(value) {
    let newStudent = this.state.students;
    let counter = 0;
    let found = false;
    for (let i = 0; i < newStudent.length; i++) {
      if (
        newStudent[i].user_name
          .toUpperCase()
          .includes(value.toUpperCase().trim())
      ) {
        newStudent[i].student_show = 1;
        found = true;
      } else {
        newStudent[i].student_show = 0;

        // counter++;
      }
      if (newStudent[i].user_name == '') {
        this.setState({ searchColor: '#FFFFFF' });
      }

      this.setState({ students: newStudent, numOfItems: counter, found: found });
    }
  }

  Deletestudent(index) {
    axios
      .post('http://192.168.1.5/AhmedRagab_System/Delete_Students.php', {
        user_id: this.state.students[index].user_id,
      })
      .then(res => {
        console.log(res.data);
        if (res.data == 'deleted_success') {
          newArray.splice(index, 1);
          this.setState({ students: newArray });
          alert('تم الحذف بنجاح');
        } else if (res.data == 'deleted_failed') {
          alert('حدث خطأ ما');
        } else if (res.data == 'student_not_found') {
          alert('not found ');
        }
      });
  }

  render() {
    return (
      <>
        {this.state.network ? (
          <>
            {/* Header */}
            <StatusBar
              backgroundColor={initial_color}
              barStyle={'light-content'}
            />
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={{ justifyContent: 'center', marginLeft: 15 }}
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
                <Text style={styles.headerTittleTxtStyle}>طلاب المجموعة</Text>
              </View>
            </View>
            <View
              style={{
                width: width,
                alignSelf: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: Background,
                marginTop: height * -0.015,
              }}>
              <View
                style={{
                  height: height * 0.085,
                  backgroundColor: Background,
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}>
                {/* Search */}
                <SearchBar
                  fontColor="#c6c6c6"
                  iconColor="#c6c6c6"
                  shadowColor="#282828"
                  cancelIconColor="#c6c6c6"
                  backgroundColor={this.state.searchColor}
                  placeholder="البحث بإسم الطالب"
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
                    marginBottom: 10,
                    marginTop: 10,
                    width: '89%',
                    borderRadius: 10,
                    elevation: 5,
                    height: 43,
                    backgroundColor:
                      this.state.searchColor === searchColor
                        ? searchColor
                        : '#FFFFFF',
                  }}
                  textInputStyle={{
                    paddingRight: 10,
                    paddingLeft: 10,
                    width:
                      this.state.searchColor === searchColor ? '75%' : '80%',
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
                      });
                    }}
                    style={{ alignSelf: 'center', marginLeft: '2%' }}>
                    <Icon name={'times'} color={'#D9D9D9'} size={19} />
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={{ marginTop: -15, marginRight: 20 }}>
                <Entypo name="users" size={25} color="#000" />
                <View
                  style={{
                    height: 25,
                    minWidth: 25,
                    backgroundColor: '#FFFFFF',
                    borderWidth: 0.5,
                    borderRadius: 15,
                    justifyContent: 'center',
                    marginTop: -40,
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 15,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                      color: initial_color,
                    }}>
                    {this.state.students.length}
                  </Text>
                </View>
              </View>
            </View>

            {/* Body */}
            {this.state.found ? (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                  flex: 1,
                  backgroundColor: Background,
                }}>
                <ScrollView>
                  {this.state.loading ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <ActivityIndicator
                        size={50}
                        color={'#4e7d91'}
                        style={{ marginTop: height * 0.3 }}
                      />
                    </View>
                  ) : (
                    <KeyboardAvoidingView
                      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                      style={{
                        flex: 1,
                        backgroundColor: Background,
                      }}>
                      {this.state.students.length != 0 ? (
                        <>
                          <View>
                            {this.state.students.map((item, index) =>
                              // key = {index};
                              item.student_show == 1 ? (
                                <>
                                  <View
                                    key={index}
                                    style={{
                                      backgroundColor: '#FFFFFF',
                                      elevation: 5,
                                      width: '92%',
                                      height: height * 0.06,
                                      borderRadius: 15,
                                      justifyContent: 'center',
                                      marginVertical: 10,
                                      alignSelf: 'center',
                                      alignItems: 'center',
                                      borderLeftWidth: 6,
                                      borderColor: initial_color,
                                      flexDirection: 'row',
                                      paddingHorizontal: RFValue(10),
                                    }}>
                                    <TouchableOpacity
                                      onPress={() => {
                                        console.log(item);
                                        this.props.navigation.navigate(
                                          'Student_info',
                                          {
                                            student_data: item,
                                          },
                                        );
                                      }}
                                      style={{
                                        width: '88%',
                                        height: '100%',
                                      }}>
                                      <Text
                                        style={{
                                          fontSize: 18,
                                          fontWeight: '600',
                                          color: '#000',
                                          textAlign: 'left',
                                          marginTop: RFValue(10),
                                        }}>
                                        {item.user_name}
                                      </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                      onPress={() => {
                                        Alert.alert('', 'هل تريد الحذف ', [
                                          {
                                            text: 'نعم',
                                            onPress: () => {
                                              this.Deletestudent(index);
                                            },
                                          },
                                          {
                                            text: 'لا',
                                            onPress: () => null,
                                          },
                                        ]);
                                      }}
                                      style={{
                                        width: '12%',
                                        height: '80%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 23,
                                        borderColor: initial_color,
                                        borderWidth: 1,
                                      }}>
                                      <Icon
                                        name="trash"
                                        style={{
                                          color: initial_color,
                                          fontSize: 17,
                                        }}
                                      />
                                    </TouchableOpacity>
                                  </View>
                                </>
                              ) : null,
                            )}
                          </View>
                        </>
                      ) : (
                        <>
                          <View>
                            <Image
                              source={require('../images/noPersons.png')}
                              resizeMode="contain"
                              style={{
                                width: 300,
                                height: 250,
                                alignSelf: 'center',
                                marginTop: width * 0.35,
                              }}
                            />
                            <Text
                              style={{
                                color: '#aaa',
                                textAlign: 'center',
                                // justifyContent: 'center',
                                marginTop: RFValue(30),
                                fontSize: 18,
                                fontWeight: 'bold',
                              }}>
                              لا يوجد طلاب
                            </Text>
                          </View>
                          {/* <View> */}
                        </>
                      )}
                    </KeyboardAvoidingView>
                  )}
                </ScrollView>
              </KeyboardAvoidingView>
            ) : (
              <View style={{ backgroundColor: Background, height: height }}>
                <Image
                  source={require('../images/noPersons.png')}
                  resizeMode="contain"
                  style={{
                    width: 300,
                    height: 250,
                    alignSelf: 'center',
                    marginTop: width * 0.35,
                  }}
                />
                <Text
                  style={{
                    color: '#aaa',
                    textAlign: 'center',
                    // justifyContent: 'center',
                    marginTop: RFValue(30),
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  لا يوجد طالب بهذا الأسم
                </Text>
              </View>
            )}
          </>
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
              style={{
                width: 300,
                height: 250,
                alignSelf: 'center',
                marginTop: width * 0.35,
              }}
            />
            <Text
              style={{
                color: '#aaa',
                textAlign: 'center',
                // justifyContent: 'center',
                marginTop: RFValue(30),
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              لا يوجد اتصال بالانترنت{' '}
            </Text>
          </KeyboardAvoidingView>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  addCaseBtn: {
    bottom: 0,
    elevation: 5,
    right: RFValue(15),
    shadowRadius: 9.51,
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
    backgroundColor: '#0f0',
    shadowOffset: { width: 0, height: 7 },
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
    marginRight: height * 0.06,
  },
});
