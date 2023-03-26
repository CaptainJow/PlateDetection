import React , {useEffect , useRef , useState} from 'react'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Text, Heading, VStack, FormControl, Input, Button, Link,HStack, Center, NativeBaseProvider } from "native-base";
import {useDispatch ,useSelector} from 'react-redux';
import{login ,selectUser} from '../../features/userSlice'
import { useNavigation } from '@react-navigation/native';
import api from "../../API/post"
import styles from '../../styles';
import { View , Animated } from 'react-native';
import isEmailValidator from 'validator/lib/isEmail';


const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required')
    .test("is-valid", (message) => `${message.path} is invalid`, (value) => value ? isEmailValidator(value) : new Yup.ValidationError("Invalid value")),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
  });
  

const header = {
    headers: {
      'Content-Type': 'application/json'
    }
  };


export default function SignIn(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const user = useSelector(selectUser);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage,setErrorMessage] = useState("")

    initialValues={ email: '', password: '' }

    useEffect(() => {
        if (user) {
            props.navigation.navigate('Home');
        }
      }, [user]);



      const handleSubmit = (values) => {
        setIsLoading(true);
        // console.log('Submitting values: ', values);
        const Email = values.email.toLowerCase();
        const password = values.password;
        api.post('login', {
          email: Email,
          password: password
        }, header)
          .then((response) => {
            // console.log(response);
            if (response.data && response.data.access_token) {
              dispatch(login({
                user: response.data.user,
                accessToken: response.data.access_token,
                refreshToken: response.data.refresh_token,
              }));
              navigation.navigate('Home');
              setIsLoading(false);
            } else {
              console.error(response);
              setIsLoading(false);
            }
          })
          .catch((error) => {
            if (error.response) {
              // console.error(error.response.status);
              // console.error(error.response.data);
              setErrorMessage(error.response.data.message);
            } else if (error) {
              // console.error(error);
              setErrorMessage('Something went wrong.');
            } else {
              // console.error( error);
              setErrorMessage('Something went wrong.');
            }
            setIsLoading(false);
          });
      };
      


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
    {isLoading ? ( 
    
      <View style={styles.container}>
          <Animated.View style={[styles.spinner, { transform: [{ rotate: spin }] }]} />
      </View> ):(

        <NativeBaseProvider>
          <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => { 
              handleSubmit(values)
              resetForm();
          }}
          >

          {({ handleChange, handleBlur, handleSubmit, values ,errors,touched ,resetForm}) => (
              <Center w="100%" h="100%">
              <Box safeArea p="2" py="8" w="90%" maxW="290">
                  <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{ color: "warmGray.50" }}>
                  Sign In
                  </Heading>

                 {errorMessage ? (
                  
                    <View style={styles.error}>
                          <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
     
                 ):   
                              
                 (<Heading mt="1" _dark={{ color: "warmGray.200" }} color="coolGray.600" fontWeight="medium" size="xs"></Heading>)}

                  <VStack space={3} mt="5">

                  <FormControl isInvalid={touched.email && errors.email}>
                      <FormControl.Label>Email</FormControl.Label>
                      <Input type="email" onChangeText={handleChange('email')} onBlur={handleBlur('email')} value={values.email} />
                      {touched.email && errors.email && <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>}
                  </FormControl>
                  

                  <FormControl isInvalid={touched.password && errors.password}>
                      <FormControl.Label>Password</FormControl.Label>
                      <Input type="password" onChangeText={handleChange('password')} onBlur={handleBlur('password')} value={values.password} />
                      {touched.password && errors.password && <FormControl.ErrorMessage>{errors.password}</FormControl.ErrorMessage>}
                  </FormControl>

                  <Button mt="2" colorScheme="indigo" onPress={handleSubmit} disabled={isLoading} >
                      Sign In
                  </Button>

                  <HStack mt="6" justifyContent="center">
                      <Text fontSize="sm" color="coolGray.600" _dark={{ color: "warmGray.200" }}>
                        Dont have an account?{" "}
                      </Text>
                      <Link _text={{ color: "indigo.500", fontWeight: "medium", fontSize: "sm" }} onPress={() => {
                        
                          resetForm();
                          props.navigation.navigate('SignUp');
                          setErrorMessage("")
                          }} disabled={isLoading}>
                      Sign Up
                      </Link>
                  </HStack>
                  </VStack>
              </Box>
              </Center>
          )}
          </Formik>
      </NativeBaseProvider>
      )}
  </>
  )
}