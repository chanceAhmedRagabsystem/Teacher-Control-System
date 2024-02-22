import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
  Alert,
  ScrollView,RefreshControl
} from 'react-native';
import {
  Background,
  initial_color,
  secondary_color,
  color_txt,
} from '../Admin_Pages/Colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { RFValue } from 'react-native-responsive-fontsize';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
// const [refreshing, setRefreshing] = React.useState(false);
export default class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupsOfGrade: this.props.route.params.groupsOfGrade,
      inputValue: '',
      modalVisible: false,
      index_of_group: null,
      group_data: {},
      groups:[],
      // refreshing:React.false
    };
  }
  
   

  componentDidMount() {
    console.log(this.state.groupsOfGrade);
    // this.refreshDataInterval = setInterval(this.fetchData, 100);
    // refresh data every 5 seconds
  }
  // componentWillUnmount() {
  //   clearInterval(this.refreshDataInterval);
  // }

  // fetchData = async () => {
  //   try {
  //     const response = await axios.get(
  //       'http://192.168.1.5/AhmedRagab_System/select_Grades_and_groups.php',{
  //         // grade_id: this.state.groupsOfGrade.grade_id
  //       }
  //     );
  //     const groupsOfGrade = response.data;
  //     this.setState({ groupsOfGrade: groupsOfGrade });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
 
  

  DeleteGroup(index) {
    console.log(index);
    let newArray = this.state.groupsOfGrade.groups;
    let group_id = newArray[index].group_id;
    let dataToSend = {
      group_id: group_id,
    };
    axios
      .post(
        'http://192.168.1.5/AhmedRagab_System/Delete_Groups.php',
        dataToSend,
      )
      .then(res => {
        console.log(res.data);
        if (res.data == 'deleted_success') {
          // this.setState({ groupsOfGrade: newArray });
          newArray.splice(index, 1);
          this.setState({ group_data: newArray });
          console.log(this.state.groupsOfGrade.groups);
          Alert('تم الحذف بنجاح');
        } else if (res.data == 'deleted_failed') {
          Alert('حدث خطأ ما');
        } else if (res.data == 'group_not_found') {
          Alert('المجموعة ليست موجودة');
        }
      });
  }



  render() {
    return (
      <>
        <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
        {/* Header  */}
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
            <Text style={styles.headerTittleTxtStyle}>المجموعات</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.container}>
         
            <View
            // refreshing={this.state.refreshing} onRefresh={this.onRefresh}
            style={{ justifyContent: 'center' }}>
              {this.state.groupsOfGrade.groups.map((item, index) => (
                <View key={index} style={styles.contianerOfGrades}>
                  <TouchableOpacity
                    style={{ height: height * 0.08, justifyContent: 'center' }}
                    onPress={() => {
                      {
                        this.props.navigation.navigate('Group_Student', {
                          groupDetails: item,
                        });
                      }
                    }}
                    onLongPress={() => {
                      {
                        this.setState({
                          modalVisible: true,
                          index_of_group: index,
                          group_data: item,
                        });
                      }
                    }}>
                    <Text
                      style={{
                        color: '#1D1D1D',
                        fontSize: RFValue(17),
                        fontWeight: 'bold',
                        alignSelf: 'center',
                      }}>
                      {item.group_name}
                    </Text>
                    <Text
                      style={{
                        color: color_txt,
                        fontSize: RFValue(15),
                        alignSelf: 'center',
                      }}>
                      {item.group_day} {item.start_time}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

          
            <TouchableOpacity
              style={styles.addCategoryBtn}
              onPress={() => {
                this.props.navigation.navigate('Add_Group', {
                  groupsOfGrade: this.state.groupsOfGrade,
                 
                });
              }}>
              <FontAwesome5 name="plus" size={RFValue(18)} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          // onShow={this.state.index_of_group}
          onPress={() => {
            // console.log(this.state.index_of_group)
          }}
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
        // onRequestClose={() => {
        //   this.setState({ modalVisible: false });
        // }}
        >
          <View
            style={{
              height: height * 0.83,
              backgroundColor: '#c8c4c49e',
            }}></View>
          <View
            style={{
              height: height * 0.17,
              width: width,
              alignSelf: 'center',
              marginTop: 22,
              backgroundColor: Background,
              position: 'absolute',
              bottom: 0,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Edit_Group', {
                  group_data: this.state.group_data,
                });

                this.setState({ modalVisible: false });
              }}
              style={{
                flexDirection: 'row',
              }}>
              <FontAwesome5
                name="user-edit"
                color={initial_color}
                size={RFValue(24)}
                style={{ alignSelf: 'center', marginLeft: '5%' }}
              />
              <Text
                style={{
                  fontSize: RFValue(18),
                  marginLeft: '3.5%',
                  color: '#1D1D1D',
                }}>
                تعديل
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('', 'هل تريد الحذف ', [
                  {
                    text: 'نعم',
                    onPress: () => {
                      this.setState({ modalVisible: false });
                      this.DeleteGroup(this.state.index_of_group);
                    },
                  },
                  {
                    text: 'لا',
                    onPress: () => this.setState({ modalVisible: false }),
                  },
                ]);
              }}
              style={{ flexDirection: 'row', marginTop: '4%' }}>
              <Entypo
                name="trash"
                color={'#D35B66'}
                size={RFValue(25)}
                style={{ alignSelf: 'center', marginLeft: '5%' }}
              />
              <Text
                style={{
                  fontSize: RFValue(18),
                  marginLeft: '5%',
                  color: '#1D1D1D',
                }}>
                حذف
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: 'row', marginTop: '4%' }}
              onPress={() => {
                this.setState({ modalVisible: false });
              }}>
              <MaterialIcons
                name="cancel-presentation"
                color={'#9A9A9A'}
                size={RFValue(25)}
                style={{ alignSelf: 'center', marginLeft: '5%' }}
              />
              <Text
                style={{
                  fontSize: RFValue(18),
                  marginLeft: '5%',
                  color: '#1D1D1D',
                }}>
                الغاء
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: height * 0.92,
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
    marginRight: height * 0.06,
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
    marginTop: height * 0.01,
    justifyContent: 'center',
    borderLeftWidth: 6,
    borderColor: initial_color,

    shadowOffset: { width: 0, height: 7 },
    backgroundColor: '#ffffff',
  },
  addCategoryBtn: {
    bottom: 0,
    elevation: 5,
    right: RFValue(15),
    shadowRadius: 9.51,
    shadowColor: '#000',
    shadowOpacity: 0.43,
    width: width * 0.12,
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'flex-end',
    height: height * 0.054,
    padding: width * 0.009,
    borderRadius: width * 0.9,
    justifyContent: 'center',
    marginBottom: height * 0.1,
    backgroundColor: initial_color,
    shadowOffset: { width: 0, height: 7 },
  },
});
