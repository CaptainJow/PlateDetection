import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeBaseProvider, Center, Image, Heading, Text, HStack, Link } from 'native-base';

import { View, Animated } from 'react-native';
import styles from '../../styles';
const WelcomeScreen = (props) => {
    // const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const navigator = useNavigation();

    useEffect(() => {
        if (user) {
            const timeout = setTimeout(() => navigator.navigate("Home"), 3500);
            return () => clearTimeout(timeout);
        }
    }, [user, navigator]);


    // added spinnig animation
    const spinValue = useRef(new Animated.Value(0)).current;

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(
                spinValue,
                {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true
                }
            )
        );
        spinAnimation.start();

        return () => spinAnimation.stop();
    }, [spinValue]);

    return (
        <>

            <NativeBaseProvider>
                <Center w="100%" h="100%">
                    <Image source={require('../../assets/license-plate.png')} alt="Welcome Plate" size="xl" />
                    {user ?
                        (
                            <>
                                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                                    Welcome Back !!
                                </Heading>
                                <Heading size="xl" fontWeight="900" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                                    {user?.username}
                                </Heading>
                                <View style={styles.container2}>
                                    <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
                                </View>

                            </>
                        ) : (
                            <> 
                                 <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                                    
                                </Heading>
                                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                                    <HStack mt="6" justifyContent="center">
                                        <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                                            already have an account?{" "}
                                        </Text>
                                        <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={() => {
                                            props.navigation.navigate('SignIn');
                                        }} >
                                            SignIn
                                        </Link>
                                    </HStack>
                                </Heading>

                                <HStack  justifyContent="center">
                                    <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                                        Dont have an account?.{" "}
                                    </Text>
                                    <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={() => {
                                        props.navigation.navigate('SignUp');
                                 
                                    }} >
                                        Sign Up
                                    </Link>
                                </HStack>
                            </>

                        )}

                </Center>
            </NativeBaseProvider>


        </>

    );
};

export default WelcomeScreen
