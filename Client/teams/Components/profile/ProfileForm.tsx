import {View, StyleSheet} from 'react-native';
import React from 'react';
import FormComponent from './FormComponent';
import {Button} from 'react-native-paper';
import {useAppDispatch} from '../../redux/hooks/customHook';
import {clearToken} from '../../redux/services/auth/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProfileProps} from '../../Screens/Profile';

type User = {
  userDetails: {
    name: string;
    email: string;
    id: string;
    designation: string | null;
  };
};

type Props = User & ProfileProps;

const ProfileForm = ({userDetails, navigation}: Props) => {
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(clearToken());
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };
  const {name, email, id, designation} = userDetails;
  console.log('>>><<<', userDetails.name);
  return (
    <View style={styles.container}>
      <FormComponent val={id} label={'ID'} disabled={true} />
      <FormComponent val={name} label={'Name'} disabled={true} />
      <FormComponent val={email} label={'Email'} disabled={true} />
      <FormComponent val={designation} label={'Designation'} disabled={true} />

      <Button onPress={handleLogout} style={{alignSelf: 'center'}}>
        Logout
      </Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
});
export default ProfileForm;
