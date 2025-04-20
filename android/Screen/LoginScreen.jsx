import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { MMKV } from 'react-native-mmkv';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fas);
const storage = new MMKV();

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = () => {
    setEmailError('');
    setPasswordError('');
    const userData = {
      emailOrUsername: email,
      password,
    };

    axios.post('http://10.0.2.2:8001/api/users/login', userData)
      .then(res => {
        if (res.data.status === 200) {
          storage.set('token', JSON.stringify(res.data.token));
          storage.set('isLoggedIn', JSON.stringify('isLoggedIn'));
          Alert.alert('Logged In Successfully!!');
          navigation.navigate('Home');
        }
      })
      .catch(err => {
        const errors = err.response?.data?.errors || {};
        if (errors.emailOrUsername) setEmailError(errors.emailOrUsername);
        if (errors.password) setPasswordError(errors.password);
      });
  };

  return (
    <ImageBackground
      source={require('./assets/simple-bg.jpg')} // Use the minimalist image here
      style={StyleSheet.absoluteFillObject}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Welcome Back</Text>

            <View style={styles.inputWrapper}>
              <FontAwesomeIcon icon={["fas", "user"]} style={styles.icon} />
              <TextInput
                placeholder="Email or Username"
                placeholderTextColor="#888"
                style={styles.input}
                onChangeText={text => setEmail(text)}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <View style={[styles.inputWrapper, { marginTop: 15 }]}>
              <FontAwesomeIcon icon={["fas", "lock"]} style={styles.icon} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={true}
                style={styles.input}
                onChangeText={text => setPassword(text)}
              />
            </View>
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  logo: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  icon: {
    color: '#888',
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 5,
    fontSize: 12,
  },
  loginButton: {
    backgroundColor: '#0C8E7E',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
