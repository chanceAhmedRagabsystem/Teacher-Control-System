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
  gray_color,
} from '../Student_App/Colors';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default class Outlay_info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outlay: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    axios
      .post('http://192.168.1.5/AhmedRagab_system/select_student_outlay.php', {
        //   student_code: this.state.student_data.student_code,
        student_code: '##12',
      })
      .then(res => {
        // console.log(res.data);
        if (typeof res.data == typeof {}) {
          this.setState({ outlay: res.data });
          console.log(this.state.outlay);
        } else if (res.data == 'Error') {
          console.log('error');
        }
      });
  }
  render() {
    return (
      <>
        <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />

        {/* Header  */}
        <View style={styles.headerContainer}>
          {/* Header Tittle  */}
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
            <Text style={styles.headerTittleTxtStyle}>المصاريف</Text>
          </View>
        </View>

        {/* Body */}
        <ScrollView style={{ flex: 1, backgroundColor: Background }}>
          <View style={styles.bodyContainer}>
            {this.state.outlay.map((item, index) => (
              <View key={index} style={styles.contianerOfOutlay}>
                {item.outlay_payment == 'pay' ? (
                  <Text
                    style={{
                      color: '#1D1D1D',
                      fontSize: 18,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    تم سداد مصاريف شهر {item.month}
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: '#1D1D1D',
                      fontSize: 18,
                      alignSelf: 'center',
                      fontWeight: 'bold',
                    }}>
                    لم يتم سداد مصاريف شهر {item.month}
                  </Text>
                )}
                <Text style={{ alignSelf: 'center', color: gray_color }}>
                  {item.outlay_date.toString()}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
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
    fontSize: 18,
  },

  // Body Style
  // ------------------------------------------------------------------------
  bodyContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Background,
  },
  contianerOfOutlay: {
    backgroundColor: '#FFFFFF',
    elevation: 5,
    width: '95%',
    height: height * 0.11,
    borderRadius: 15,
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    borderLeftWidth: 6,
    borderColor: initial_color,
  },
});
