/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// Student Application:
import Qr_Code from './Admin_Pages/Qr_Code';
import Add_Group from './Admin_Pages/Add_Group';
import Student_info from './Admin_Pages/Student_info';
import Student_Attendence from './Admin_Pages/Student_Attendence';
import Student_Outlay from './Admin_Pages/Student_Outlay';
import Non_payment from './Admin_Pages/Non_payment';
import Grades from './Admin_Pages/Grades';
import Groups from './Admin_Pages/Groups';
import HomePage from './Admin_Pages/HomePage';
import All_Attendence from './Admin_Pages/All_Attendence';
import All_Parents from './Admin_Pages/All_Parents';
import All_Students from './Admin_Pages/All_Students';
import Edit_Grade from './Admin_Pages/Edit_Grade';
import Edit_Group from './Admin_Pages/Edit_Group';
import Group_Student from './Admin_Pages/Group_Student';
import Parent_info from './Admin_Pages/Parent_info';
import WaitingList from './Admin_Pages/WaitingList';
import Attendence_Grade from './Admin_Pages/Attendence_Grade';
import Attendence_Group from './Admin_Pages/Attendence_Group';
import Outlay_Grades from './Admin_Pages/Outlay_Grades';
import OutlayGroups_info from './Admin_Pages/OutlayGroups_info';
import Students_NotPay from './Admin_Pages/Students_NotPay';
import Add_Grade from './Admin_Pages/Add_Grade';
import OutlayGroups from './Admin_Pages/OutlayGroups';
import Outlay_months from './Admin_Pages/Outlay_months'
import Atten_absent from './Admin_Pages/Atten_absent'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>

            {/* Introduction */}
          
            <Stack.Screen name='HomePage' component={HomePage} />
            <Stack.Screen name='Student_info' component={Student_info} />
            <Stack.Screen name='Non_payment' component={Non_payment} />
            <Stack.Screen name='Qr_Code' component={Qr_Code} />
            <Stack.Screen name='Add_Group' component={Add_Group} />
            <Stack.Screen name='Student_Attendence' component={Student_Attendence} />
            <Stack.Screen name='Student_Outlay' component={Student_Outlay} />
            <Stack.Screen name='Groups' component={Groups} />
            <Stack.Screen name='Grades' component={Grades} />
            <Stack.Screen name='All_Attendence' component={All_Attendence} />
            <Stack.Screen name='All_Parents' component={All_Parents} />
            <Stack.Screen name='All_Students' component={All_Students} />
            <Stack.Screen name='Edit_Grade' component={Edit_Grade} />
            <Stack.Screen name='Edit_Group' component={Edit_Group} />
            <Stack.Screen name='Group_Student' component={Group_Student} />
            <Stack.Screen name='Parent_info' component={Parent_info} />
            <Stack.Screen name='WaitingList' component={WaitingList} />
            <Stack.Screen name='Attendence_Grade' component={Attendence_Grade} />
            <Stack.Screen name='Attendence_Group' component={Attendence_Group} />
            <Stack.Screen name='Outlay_Grades' component={Outlay_Grades} />
            <Stack.Screen name='OutlayGroups' component={OutlayGroups} />
            <Stack.Screen name='OutlayGroups_info' component={OutlayGroups_info} />
            <Stack.Screen name='Students_NotPay' component={Students_NotPay} />
            <Stack.Screen name='Add_Grade' component={Add_Grade} />
            <Stack.Screen name='Outlay_months' component={Outlay_months} />
            <Stack.Screen name='Atten_absent' component={Atten_absent} />
          
          </Stack.Navigator>
        </NavigationContainer>

      </>
    );
  }
}

export default App;