import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Model,
    TextInput,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import {
    Background,
    initial_color,
    beige_color,
    secondary_color,
    Café_color,
    gray_color,
} from '../Admin_Pages/Colors';
import { Dimensions } from 'react-native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
export default class Attendence_Grade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: [],
            inputValue: '',
            modalVisible: false,
        };
    }
    componentDidMount() {
        this.refreshDataInterval = setInterval(this.fetchData, 100);
        // refresh data every 5 seconds
    }
    componentWillUnmount() {
        clearInterval(this.refreshDataInterval);
    }

    fetchData = async () => {
        try {
            const response = await axios.get(
                'http://192.168.1.5/AhmedRagab_System/select_Grades_and_groups.php',
            );
            const grades = response.data;
            this.setState({ grades: grades });
        } catch (error) {
            console.error(error);
        }
    };
    render() {
        return (
            <>
                <StatusBar backgroundColor={initial_color} barStyle={'light-content'} />
                {/* Header  */}
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ justifyContent: 'center', marginLeft: 15 }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Entypo name="chevron-with-circle-right" color='#000' size={30} style={{ alignSelf: 'center' }} />
                    </TouchableOpacity>
                    <View style={styles.headerTittleContainer}>
                        <Text style={styles.headerTittleTxtStyle}>الدفعات</Text>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ justifyContent: 'center' }}>
                            {this.state.grades.map((item, index) => (
                                <View key={index} style={styles.contianerOfGrades}>
                                    <TouchableOpacity
                                        style={{ height: height * 0.08, justifyContent: 'center' }}
                                        onPress={() => {
                                            {
                                                this.props.navigation.navigate('Attendence_Group', {
                                                    groupsOfGrade: item.groups,
                                                });
                                            }
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: '#1D1D1D',
                                                fontSize: 18,
                                                marginLeft: '4%',
                                                fontWeight: 'bold',
                                            }}>
                                            {item.grade_name}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: height,
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
        marginRight: width * .09
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
        marginTop: height * 0.02,
        justifyContent: 'center',
        borderLeftWidth: 6,
        borderColor: initial_color,

        shadowOffset: { width: 0, height: 7 },
        backgroundColor: '#ffffff',
    },
});