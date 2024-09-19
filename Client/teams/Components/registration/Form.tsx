import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import axios from 'axios';
import LoginIcons from '../LoginIcons';
import Buttons from '../Button';

const Form = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const postApiData = async () => {
    try {
      const data = await axios.post(
        'https://o1kjqrzwxh.sharedwithexpose.com/api/auth/register',
        {
          name: name,
          email: email,
          password: password,
          designation: 'Tech',
        },
      );
      console.log(data.data);
    } catch (error) {
      console.error(error);
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
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  formContainer: {
    padding: 20,
    marginTop: 20,
    width: '100%',
  },
  input: {
    marginBottom: 15,
    width: '100%',
  },
  custom_button: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default Form;
