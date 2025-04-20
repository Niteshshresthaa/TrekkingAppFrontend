import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    SafeAreaView, 
    ImageBackground, 
    StatusBar 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

function LandingScreen({ navigation }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        async function checkLoggedIn() {
            const isLoggedInData = storage.getString('isLoggedIn');
            if (isLoggedInData) {
                setIsLoggedIn(JSON.parse(isLoggedInData));
            }
        }
        checkLoggedIn();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            async function checkLoggedIn() {
                const isLoggedInData = storage.getString('isLoggedIn');
                if (isLoggedInData) {
                    setIsLoggedIn(JSON.parse(isLoggedInData));
                    navigation.navigate('Home');
                }
            }
            checkLoggedIn();
        }, [])
    );

    return (
        <ImageBackground 
            source={require('./assets/landingscreen1.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <StatusBar barStyle="light-content" />
            <View style={styles.overlay}>
                <View style={styles.bottomContainer}>
                    {/* Welcome Text */}
                    <Text style={styles.welcomeText}>
                        Hello, Trekkers! Ready to explore Nepal's lush greenery and hidden gems?
                    </Text>

                    <SafeAreaView style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text style={styles.buttonText}>Register</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
    },
    bottomContainer: {
        paddingHorizontal: 20,
        paddingBottom: 50,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        color: 'white',
        textAlign: 'center',
        marginBottom: 40, // nice space above login
        width: 323,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FFCD70',
        height: 45,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        width: '80%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default LandingScreen;
