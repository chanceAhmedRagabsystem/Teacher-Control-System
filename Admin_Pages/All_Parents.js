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
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import axios from 'axios';
import { Dimensions } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RFValue } from 'react-native-responsive-fontsize';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
import Parent_info from './Parent_info';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import NetInfo from '@react-native-community/netinfo';
export default class All_Parents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parents: [],
      numOfItems: 0,
      found: true,
      search_key: '',
      loading: true,
      network: false,
      cancel_button: false,
      searchBox_width: '95%',
      searchColor: '#FFFFFF',
    };
  }

  componentDidMount() {
    this.net();
  }

  getdata() {
    axios
      .get('http://192.168.1.5/AhmedRagab_System/Select_AllParents.php')
      .then(res => {
        console.log(res.data);
        if (res.status == 200) {
          if (res.data == 'Error') {
            alert('try again');
          } else if (typeof res.data == typeof []) {
            this.setState({ parents: res.data });
          }
        }
      });
  }

  // componentWillUnmount() {
  //   clearInterval(this.fetchDataInterval);
  // }

  // fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://192.168.1.5/AhmedRagab_System/Select_AllParents.php',
  //     );
  //     const parents = response.data;
  //     this.setState({ parents: parents });
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // Functions
  searchfun(value) {
    let newParent = this.state.parents;
    let counter = 0;
    let found = false;
    for (let i = 0; i < newParent.length; i++) {
      if (
        newParent[i].user_name
          .toUpperCase()
          .includes(value.toUpperCase().trim())
      ) {
        newParent[i].parent_show = 1;
        found = true;
      } else {
        newParent[i].parent_show = 0;

        // counter++;
      }
      if (newParent[i].user_name == '') {
        this.setState({ searchColor: '#FFFFFF' });
      }

      this.setState({ parents: newParent, numOfItems: counter, found: found });
    }
  }
  net() {
    NetInfo.addEventListener(state => {
      if (state.isConnected) {
        this.setState({ network: true, loading: true });
        if (this.state.parents.length == 0) {
          this.getdata();
        }
      } else {
        this.setState({ network: false, loading: false });
      }
    });
  }

  DeleteParent(index) {
    axios
      .post('http://192.168.1.5/AhmedRagab_System/Delete_parents.php', {
        parent_id: this.state.parents[index].user_id,
        // dataToSend
      })
      .then(res => {
        // console.log(res.data);
        if (res.data == 'deleted_success') {
          newArray = this.state.parents
          newArray.splice(index, 1);
          this.setState({ parents: newArray });
          alert('تم الحذف بنجاح');
        } else if (res.data == 'deleted_failed') {
          alert('حدث خطأ ما');
        } else if (res.data == 'parent_not_found') {
          alert('not found');
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
                <Text style={styles.headerTittleTxtStyle}>أولياء الأمور</Text>
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
                  placeholder="البحث بإسم ولي الأمر"
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
                    height: 43,
                    elevation: 5,
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
                    {this.state.parents.length}
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
                {this.state.parents.length != 0 ? (
                  <>
                    <ScrollView>
                      <View>
                        {this.state.parents.map((item, index) =>
                          // item.category_cases.map((user_item, user_index) =>
                          item.parent_show == 1 ? (
                            <>
                              <View
                                key={index}
                                style={{
                                  backgroundColor: '#fff',
                                  marginTop: 5,
                                  borderRadius: RFValue(20),
                                  width: '95%',
                                  alignSelf: 'center',
                                  elevation: 5,
                                  height: height * 0.203,
                                  marginBottom: RFValue(16),
                                }}>
                                <View
                                  style={{
                                    height: height * 0.13,
                                    width: '100%',
                                    marginTop: RFValue(10),
                                    // backgroundColor: "#f0f"
                                  }}>
                                  <View
                                    style={{
                                      height: height * 0.14,
                                      width: '90%',
                                      flexDirection: 'row',
                                    }}
                                    key={index}>
                                    <Image
                                      source={require('../images/parents.jpg')}
                                      style={{
                                        width: '22%',
                                        // height: '95%',
                                        // borderRadius: 15,
                                        alignSelf: 'center',
                                        // borderWidth: 0.5,
                                        borderColor: '#B9C9CE',
                                        marginLeft: '3%',
                                      }}
                                      resizeMode="contain"
                                    />
                                    <View
                                      style={{
                                        alignSelf: 'center',
                                        marginLeft: '5%',
                                        width: '80%',
                                        flexDirection: 'column',
                                        // backgroundColor: '#000',
                                      }}>
                                      <Text
                                        key={index}
                                        style={{
                                          fontSize: 18,
                                          fontWeight: '600',
                                          color: '#000',
                                          textAlign: 'left',
                                        }}>
                                        اسم ولي الامر: {item.user_name}
                                      </Text>
                                      <Text
                                        key={index}
                                        style={{
                                          fontSize: 16,
                                          fontWeight: '600',
                                          color: '#000',
                                          marginTop: RFValue(10),
                                          textAlign: 'left',
                                        }}>

                                        كود الطالب/ة :  {item.student_code}
                                      </Text>
                                    </View>
                                  </View>
                                </View>

                                <View
                                  style={{
                                    flexDirection: 'row',
                                    // backgroundColor: '#ff0',
                                    justifyContent: 'center',
                                    marginTop: width * 0.02,
                                    borderBottomStartRadius: RFValue(20),
                                    borderBottomEndRadius: RFValue(20),
                                    bottom: 0,
                                  }}>
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.props.navigation.navigate(
                                        'Parent_info',
                                        {
                                          parents_data: item,
                                        },
                                      );
                                    }}
                                    style={{
                                      backgroundColor: initial_color,
                                      width: width * 0.475,
                                      height: height * 0.05,
                                      justifyContent: 'center',
                                      // borderRadius: 20,
                                      borderBottomLeftRadius: RFValue(20),
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        color: '#fff',
                                      }}>
                                      عرض
                                    </Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      Alert.alert('', 'هل تريد الحذف ', [
                                        {
                                          text: 'نعم',
                                          onPress: () => {
                                            this.DeleteParent(index);
                                          },
                                        },
                                        {
                                          text: 'لا',
                                          onPress: () => null,
                                        },
                                      ]);
                                    }}
                                    style={{
                                      backgroundColor: gray_color,
                                      width: width * 0.475,
                                      height: height * 0.05,
                                      justifyContent: 'center',
                                      borderBottomRightRadius: RFValue(20),
                                    }}>
                                    <Text
                                      style={{
                                        textAlign: 'center',
                                        fontSize: 18,
                                        color: '#1D1D1D',
                                      }}>
                                      إزاله
                                    </Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </>
                          ) : null,
                        )}
                      </View>
                      {/* )} */}
                    </ScrollView>
                    {/* <View> */}
                  </>
                ) : (
                  <>
                    <View style={{}}>
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
                        لا يوجد اولياء أمور
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
                  backgroundColor: '#fff',
                  flex: 1,
                }}>
                <Image
                  source={require('../images/noPersons.png')}
                  resizeMode="contain"
                  style={{
                    width: 300,
                    height: 250,
                    alignSelf: 'center',
                    marginTop: RFValue(130),
                  }}
                />
                <Text
                  style={{
                    color: '#aaa',
                    textAlign: 'center',
                    // justifyContent: 'center',
                    marginTop: RFValue(25),
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  لا يوجد ولي أمر بهذا الأسم
                </Text>
              </KeyboardAvoidingView>
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
    marginRight: width * 0.09,
  },
});
