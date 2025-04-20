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
                   // navigation.navigate('Home');
                }
            }
            checkLoggedIn();
        }, [])
    );

    return (
        <ImageBackground 
            source={require('../../assets/land.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <StatusBar barStyle="light-content" />

            {/* Overlay for readability */}
            <View style={styles.overlay}>
                <Text style={styles.welcomeText}>
                    "Hello, Trekkers! Ready to explore Nepal's lush greenery and hidden gems?"
                </Text>

                <SafeAreaView style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={[styles.button, styles.registerButton]} 
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for contrast
        paddingHorizontal: 20,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: 'white',
        marginBottom: 30,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#FFA500',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 25,
        marginBottom: 15,
        width: '80%',
        alignItems: 'center',
    },
    registerButton: {
        backgroundColor: '#00A676',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default LandingScreen;
