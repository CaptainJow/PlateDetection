import React,{useState , useEffect} from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Pressable,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
  View,
} from "native-base";
global.__reanimatedWorkletInit = () => {};

// import SignIn from "../Authentication/SignIn";
import Home from "./Home";
import SectionLists from "../Lists/SectionList";
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';
import {selectUser , logout} from "../../features/userSlice"

const Drawer = createDrawerNavigator();

const getIcon = (screenName) => {
  switch (screenName) {
    case "PlateDetect":
      return "camera";
    case "SignIn":
        return "login";
    case "SignUp":
        return "account-plus-outline";
    case "List":
        return "format-list-bulleted";
    default:
      return undefined;
  }
};



function CustomDrawerContent(props) {
  const user = useSelector(selectUser);
  dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user ) {
      props.navigation.navigate('SignIn');
    }
  }, [user]);
  
  return (
    <View style={{ flex: 1, justifyContent: 'space-between' }}>
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          {user ? (
          <>
            <Text bold color="gray.700">
            {user?.username}
            </Text>
            <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
              {user?.email}
            </Text>
          </>  
          ) : (
            <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
              No user found
            </Text>
          )}
        </Box>
        <VStack divider={<Divider />} space="10" flex={1}>
          <VStack
            space="3"
            flex={1}
          >
            {props.state.routeNames.map((name, index) => (
              <Pressable
                key={index}
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(220, 220, 230, 1)"
                    : "transparent"
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }}
                style={name === "SignIn" ? { display: 'none' } : null}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? "indigo.500" : "gray.500"
                    }
                    size="5"
                    as={<MaterialCommunityIcons name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "indigo.500" : "gray.700"
                    }
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
          <VStack space="3">
            <Pressable
              px="5"
              py="3"
              rounded="md"
              onPress={handleLogout}
            >
              <HStack space="7" alignItems="center">
                <Icon
                  color="gray.500"
                  size="5"
                  as={<MaterialCommunityIcons name={getIcon("SignIn")} />}
                />
                <Text fontWeight="500" color="gray.700">
                  Logout
                </Text>
              </HStack>
            </Pressable>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  </View>
  
  

  );
}
export default function DrawerSlide() {
  return (
    <Box  flex={1}>
   <Drawer.Navigator
      initialRouteName="PlateDetect"
      screenOptions={({ navigation }) => ({
        headerLeft: props => <MaterialCommunityIcons name="menu" onPress={navigation.toggleDrawer} style={{ fontSize: 30, margin: 7 }}
         />,
         headerTitleAlign: "center",
      })}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="PlateDetect" component={Home} />
      <Drawer.Screen name="List" component={SectionLists} />
      {/* <Drawer.Screen name="SignIn" component={SignIn}  options={{ title: '' , headerShown: false}}/> */}
      {/* <Drawer.Screen name="SignUp" component={SignUp} options={{ title: '', headerShown: false }} /> */}
    </Drawer.Navigator>
  </Box>
  );
}
