import {View, StyleSheet, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import LoginIcons from '../LoginIcons';
import Buttons from '../Button';
import axiosInstance from '../../middleware/axiosConfig/axiosConfig';
import {RegisterProp} from '../../Screens/Register';

const Form = ({navigation}: RegisterProp) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const onPressHandler = () => {
    setEmail('');
    setName('');
    setPassword('');
    setPasswordShown(false);
    navigation.navigate('Login');
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const postApiData = async () => {
    try {
      const data = await axiosInstance.post('/auth/register', {
        name: name,
        email: email,
        password: password,
        designation: 'Tech',
      });
      if (data.data) {
        Alert.alert('Registration', 'User Registered successfully', [
          {text: 'OK', onPress: onPressHandler},
        ]);
      }
    } catch (error) {
      console.error((error as any).message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        label={'Enter Your Name'}
        value={name}
        onChangeText={setName}
        mode="outlined"
        outlineColor={'blue'}
        activeOutlineColor="blue"
        style={styles.input}
      />
      <TextInput
        label={'Enter Your Email'}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        outlineColor={'blue'}
        activeOutlineColor="blue"
        style={styles.input}
      />
      <TextInput
        secureTextEntry={!passwordShown}
        label={'Enter Your Password'}
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        outlineColor={'blue'}
        activeOutlineColor="blue"
        style={styles.input}
        right={
          <TextInput.Icon
            icon={passwordShown ? 'eye-off' : 'eye'}
            onPress={togglePassword}
          />
        }
      />
      <LoginIcons />

      {/* Register Button */}
      <Buttons
        txt={'Register'}
        styles={styles.custom_button}
        onpress={postApiData}
      />
      <Text style={styles.txt}>
        Already Have an Account?{' '}
        <Text onPress={() => navigation.navigate('Login')} style={styles.txt2}>
          {' '}
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },
  txt2: {
    color: 'blue',
  },
  formContainer: {
    padding: 20,
    marginTop: '5%',
    width: '100%',
  },
  input: {
    marginBottom: '5%',
    width: '100%',
  },
  custom_button: {
    alignSelf: 'center',
    marginTop: '8%',
  },
});

export default Form;
