import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  ImageBackground
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fab, fas);

function RegisterScreen(props) {
  const navigation = useNavigation();

  const [fullNameError, setFullNameError] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [fullNameValid, setFullNameValid] = useState('');
  const [userNameValid, setUserNameValid] = useState('');
  const [emailValid, setEmailValid] = useState('');
  const [passwordValid, setPasswordValid] = useState('');
  const [confirmPasswordValid, setConfirmPasswordValid] = useState('');

  const [fullName, setFullName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit() {
    const params = JSON.stringify({
      "fullname": fullName,
      "username": userName,
      "email": email,
      "password": password,
    });

    const url = 'http://10.0.2.2:8001/api/users/register';

    if (fullNameValid && userNameValid && emailValid && passwordValid && confirmPasswordValid) {
      Alert.alert('Registering', 'Please wait while we register your account');
      axios.post(url, params, {
        "headers": {
          "content-type": "application/json",
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          const errors = error.response.data.errors;

          if (errors.fullname) {
            setFullNameValid(false);
            setFullNameError(errors.fullname);
          }
          if (errors.username) {
            setUserNameValid(false);
            setUserNameError(errors.username);
          }
          if (errors.email) {
            setEmailValid(false);
            setEmailError(errors.email);
          }
          if (errors.password) {
            setPasswordValid(false);
            setPasswordError(errors.password);
          }
        });
    } else {
      Alert.alert('Validation Error', 'Please ensure all fields are valid before submitting.');
    }
  }

  function handleFullName(e) {
    const fullNameData = e.nativeEvent.text;
    setFullName(fullNameData);
    if (fullNameData.length > 5) {
      setFullNameValid(true);
      setFullNameError('');
    } else {
      setFullNameValid(false);
      setFullNameError('Full name must be at least 6 characters long');
    }
  }

  function handleUserName(e) {
    const userNameData = e.nativeEvent.text;
    setUserName(userNameData);
    if (userNameData.length > 3) {
      setUserNameValid(true);
      setUserNameError('');
    } else {
      setUserNameValid(false);
      setUserNameError('Username must be at least 4 characters long');
    }
  }

  function handleEmail(e) {
    const emailData = e.nativeEvent.text;
    setEmail(emailData);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailData)) {
      setEmailValid(true);
      setEmailError('');
    } else {
      setEmailValid(false);
      setEmailError('Invalid email format');
    }
  }

  function handlePassword(e) {
    const passwordData = e.nativeEvent.text;
    setPassword(passwordData);
    if (passwordData.length >= 6) {
      setPasswordValid(true);
      setPasswordError('');
    } else {
      setPasswordValid(false);
      setPasswordError('Password must be at least 6 characters long');
    }
  }

  function handleConfirmPassword(e) {
    const confirmPasswordData = e.nativeEvent.text;
    setConfirmPassword(confirmPasswordData);
    if (confirmPasswordData === password) {
      setConfirmPasswordValid(true);
      setConfirmPasswordError('');
    } else {
      setConfirmPasswordValid(false);
      setConfirmPasswordError('Passwords do not match');
    }
  }

  function displayAlert() {
    return <FontAwesomeIcon icon={["fas", "exclamation-circle"]} style={{ color: 'red' }} size={20} />;
  }

  function displayValid() {
    return <FontAwesomeIcon icon={["fas", "check-square"]} style={{ color: 'green' }} size={20} />;
  }

  return (
    <ImageBackground
      source={require('./assets/register.jpg')} // Adjust the path to your background image
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        style={styles.mainContainer}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        keyboardShouldPersistTaps={'always'}
      >
        <View style={styles.registerContainer}>
          <Text style={[styles.text_header, { textAlign: 'center' }]}>Register</Text>

          <View style={styles.action}>
            <FontAwesomeIcon icon={["fas", "user"]} style={styles.smallIcon} />
            <TextInput
              placeholder='Fullname'
              style={styles.textInput}
              onChange={e => handleFullName(e)}
            />
            {fullName.length < 1 ? null : fullNameValid ? displayValid() : displayAlert()}
          </View>
          {fullName.length < 1 ? null : fullNameValid ? null : <Text style={styles.text_error}>{fullNameError}</Text>}

          <View style={styles.action}>
            <FontAwesomeIcon icon={["fas", "user-circle"]} style={styles.smallIcon} />
            <TextInput
              placeholder='Username'
              style={styles.textInput}
              onChange={e => handleUserName(e)}
            />
            {userName.length < 1 ? null : userNameValid ? displayValid() : displayAlert()}
          </View>
          {userName.length < 1 ? null : userNameValid ? null : <Text style={styles.text_error}>{userNameError}</Text>}

          <View style={styles.action}>
            <FontAwesomeIcon icon={["fas", "envelope"]} style={styles.smallIcon} />
            <TextInput
              placeholder='Email'
              style={styles.textInput}
              onChange={e => handleEmail(e)}
            />
            {email.length < 1 ? null : emailValid ? displayValid() : displayAlert()}
          </View>
          {email.length < 1 ? null : emailValid ? null : <Text style={styles.text_error}>{emailError}</Text>}

          <View style={styles.action}>
            <FontAwesomeIcon icon={["fas", "lock"]} style={styles.smallIcon} />
            <TextInput
              placeholder='Password'
              style={styles.textInput}
              secureTextEntry={true}
              onChange={e => handlePassword(e)}
            />
            {password.length < 1 ? null : passwordValid ? displayValid() : displayAlert()}
          </View>
          {password.length < 1 ? null : passwordValid ? null : <Text style={styles.text_error}>{passwordError}</Text>}

          <View style={styles.action}>
            <FontAwesomeIcon icon={["fas", "lock"]} style={styles.smallIcon} />
            <TextInput
              placeholder='Confirm Password'
              style={styles.textInput}
              secureTextEntry={true}
              onChange={e => handleConfirmPassword(e)}
            />
            {confirmPassword.length < 1 ? null : confirmPasswordValid ? displayValid() : displayAlert()}
          </View>
          {confirmPassword.length < 1 ? null : confirmPasswordValid ? null : <Text style={styles.text_error}>{confirmPasswordError}</Text>}

        </View>

        <View style={[styles.button, { marginTop: 40 }]}>  {/* Added marginTop to push the button down */}
          <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
            <Text style={styles.textSign}>Register</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,  // Ensure the background image takes up full space
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    backgroundColor: 'transparent',
    marginBottom: 15,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  smallIcon: {
    marginRight: 10,
    fontSize: 24,
  },
  text_error: {
    color: 'red',
    marginLeft: 10,
  },
  action: {
    flexDirection: 'row',
    paddingTop: 14,
    paddingBottom: 3,
    marginVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#420475',
    borderRadius: 50,
  },
  textInput: {
    flex: 1,
    marginTop: -12,
    color: '#05375a',
  },
  registerContainer: {
    backgroundColor: '#fff',
    opacity: 0.85,  // Slight transparency
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 40,  // Adjusted margin to push the button down
    textAlign: 'center',
    margin: 20,
  },
  inBut: {
    width: '70%',
    backgroundColor: 'black',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 50,
  },
});

export default RegisterScreen;
