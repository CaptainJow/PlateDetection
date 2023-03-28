import { NativeBaseProvider, Text, Center } from "native-base";
import { View, Alert, Image, Text as Text_1, TouchableOpacity, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import styles from "../../styles";
import { useSelector } from 'react-redux';
import { selectAccessToken, selectUser, logout } from "../../features/userSlice";
import api from "../../API/post";
import uuid from 'uuid-random';
import jwtDecode from 'jwt-decode';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import mime from 'react-native-mime-types';

export default function Home(props) {

  const [cameraPermissionInformation, requestPermission] = ImagePicker.useCameraPermissions();
  const [pickedImage, setPickedImage] = useState()
  const [fileName, setFileName] = useState("")
  const [textlist, setTextList] = useState([])
  const [sentImage, setSentImage] = useState(false);
  const AccessToken = useSelector(selectAccessToken);
  const user = useSelector(selectUser);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responded, setResponded] = useState(false);
  const [error, setError] = useState(false);

  // Check if the token is expired
  const expirationTime = AccessToken ? jwtDecode(AccessToken).exp : null;
  const isTokenExpired = expirationTime ? Date.now() >= expirationTime * 1000 : false;


  const handleToggleImage = () => {
    setIsImageVisible(!isImageVisible);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (isTokenExpired) {
      handleLogout();
    }
  }, [expirationTime]);

  async function verifyPermission() {
    if (cameraPermissionInformation.status === ImagePicker.PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === ImagePicker.PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient permission!',
        'You need to grant camera access to use this app'
      );
      return false
    }
    return true;
  }

  async function camerapressHandler() {
    const hasPermission = await verifyPermission()
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5
    });
    // console.log(image)
    // console.log(image.assets)
    setPickedImage(image.assets)
  }

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result

    if (!result.canceled) {
      setPickedImage(result.assets);
      //  console.log(result.assets)
    } else {
      alert('You did not select any image.');
    }

  }

  let imagePreview = <Text_1 style={styles.previewText}>No image added yet</Text_1>

  if (pickedImage) {
    imagePreview = <Image source={{ uri: pickedImage[0].uri }} style={styles.imageStyle} />
  }


  //API stuff here
  const header = {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
      'content-type': 'multipart/form-data'
    }
  };




  const handleSubmit = async () => {
    setIsLoading(true);
    setSentImage(true);
    var bodyFormData = new FormData();
    const fileExtension = pickedImage[0].uri.split('.').pop();
    const fileName = pickedImage[0].fileName ?? `${uuid()}.${fileExtension}`;
    bodyFormData.append('image_name', {
      uri: pickedImage[0].uri,
      type: mime.lookup(pickedImage[0].uri),
      name: fileName
    });
    try {
      const response = await api.post('api/object_detection_text', bodyFormData, header);
      console.log(response);
      setFileName(response.data.filename);
      setTextList(response.data.text_list);
      setError(false)
      setResponded(true);
  
    } catch (error) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
        setResponded(true);
        setError(true)
        // setErrorMessage(error.response.data.message);
      } else if (error) {
        console.error(error);
        // setErrorMessage('Something went wrong.');
      } else {
        console.error(error);
        // setErrorMessage('Something went wrong.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const imageSource = `${api.defaults.baseURL}static/predict/${fileName}`;

  return (
    // <><Text>hello</Text></>

    <>
      <ScrollView>
        <View>
          <View style={styles.imagepreviewcontainer}>
            {imagePreview}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.buttonBlack} >
              <Text style={styles.textWhite} onPress={showImagePicker}>select image</Text>
            </Pressable>
            <Pressable style={styles.buttonBlack} >
              <Text style={styles.textWhite} onPress={camerapressHandler}>open camera</Text>
            </Pressable>
            {/* <Button title='open camera' onPress={camerapressHandler} /> */}
          </View>
          <View style={{ marginTop: 15 }}>
            <View style={styles.buttonContainer}>
              <Pressable style={styles.buttonBlack} >
                <Text style={styles.textWhite} onPress={handleSubmit}>submit</Text>
              </Pressable>
            </View>
          </View>
          {sentImage ? (
            <>
              {isLoading && <ActivityIndicator size='large' />}

              {responded && (
                <>
                  {error ? (
                    <>
                      <View style={styles.container}>
                        <View style={styles.errorContainer}>
                          <Text style={styles.errorText}>no number plate was detected in the sent image</Text>
                          {/* <Icon type='font-awesome' name='exclamation-circle' /> */}
                        </View>
                      </View>
                    </>
                  ) :
                    <>
                      <View style={styles.container}>
                        <TouchableOpacity onPress={handleToggleImage} style={styles.button}>
                          <Text style={styles.buttonText}>Display result</Text>
                          <MaterialCommunityIcons name="arrow-down-drop-circle" size={24} color="black" />
                        </TouchableOpacity>
                        {isImageVisible && (
                          <>
                            <View style={styles.imagepreviewcontainer}>
                              <Image
                                source={{ uri: imageSource }} // Replace with your own image source
                                style={styles.imageStyle}
                              />
                            </View>
                            <View style={styles.container}>
                              {textlist.map((text, index) => (
                                <View key={index} style={styles.numberPlate}>
                                  <Text style={styles.numberText}>{text}</Text>
                                </View>
                              ))}
                            </View>
                          </>
                        )}
                      </View>
                    </>
                  }
                </>
              )}
            </>
          ) : <></>}

        </View>
        <NativeBaseProvider>
          <Center w="100%" p="5" >
            <Text color="coolGray.600" noOfLines={5} >
              hello to the PlateDetect App in this app ,
              in order to detect the number plate of your image and potentially read it for you , you will need upload the image in (png,jpg,jpeg) formats only.
            </Text>
          </Center>
          <Center w="100%" p="5" >

          </Center>
        </NativeBaseProvider>
      </ScrollView>

    </>

  );
}

