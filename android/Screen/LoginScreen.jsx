const {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    StyleSheet
  } = require('react-native');
  import { useNavigation } from '@react-navigation/native';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  import styles from './assets/styles';
  import { MMKV } from 'react-native-mmkv';
  
  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import { fab } from '@fortawesome/free-brands-svg-icons'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { fas } from '@fortawesome/free-solid-svg-icons'
  library.add(fab, fas)
  
  // import {log} from 'react-native-reanimated';
  const storage = new MMKV();
  
  function LoginScreen(props) {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    function handleSubmit() {
      setEmailError('');
      setPasswordError('');
      const userData = {
        emailOrUsername: email,
        password,
      };
  
      axios.post('http://10.0.2.2:8001/api/users/login', userData).then(res => {
        if (res.data.status == 200) {
          storage.set('token', JSON.stringify(res.data.token));
          storage.set('isLoggedIn', JSON.stringify('isLoggedIn'));
          Alert.alert('Logged In Successfully!!');
        //   navigation.navigate('Home');
        }
      })
        .catch(err => {
          console.log(err.response.data);
          const errors = err.response.data.errors;
          if (errors.emailOrUsername) {
            setEmailError(errors.emailOrUsername);
          }
          if (errors.password) {
            setPasswordError(errors.password);
          }
        });
    }
  
    return (
      <ScrollView style={styles.mainContainer}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
        keyboardShouldPersistTaps={'always'}>
        <View style={{ backgroundColor: 'white' }}>
          <View style={styles.loginContainer}>
            <Text style={[styles.text_header, { textAlign: 'center' }]}>Login !!!</Text>
  
            <View style={styles.action}>
              <FontAwesomeIcon icon={["fas", "user-circle"]} style={styles.smallIcon} />
              <TextInput
                placeholder='Email or Username'
                style={styles.textInput}
                onChange={e => setEmail(e.nativeEvent.text)}
              />
            </View>
            {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
  
            <View style={styles.action}>
              <FontAwesomeIcon icon={["fas", "lock"]} style={styles.smallIcon} />
              <TextInput
                placeholder='Password'
                secureTextEntry={true}
                style={styles.textInput}
                onChange={e => setPassword(e.nativeEvent.text)}
              />
            </View>
          </View>
  
          <View style={styles.button}>
            <TouchableOpacity style={styles.inBut} onPress={() => handleSubmit()}>
              <View>
                <Text style={styles.textSign}>Log in</Text>
              </View>
            </TouchableOpacity>
          </View>
  
        </View>
      </ScrollView>
    );
  }
  
  
  
  export default LoginScreen;