import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SectionList,
  StatusBar,
} from 'react-native';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../../features/userSlice';
import styles from '../../styles';
import api from "../../API/post";
import { Icon } from 'react-native-elements';

export default function SectionLists(props) {
  const AccessToken = useSelector(selectAccessToken);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  // const handleToggleImage = () => {
  //   setIsImageVisible(!isImageVisible);
  // };

  const header = {
    headers: {
      Authorization: `Bearer ${AccessToken}`,
      'Content-Type': 'multipart/form-data'
    }
  };

  const fetchNewsData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`collections/items?page_size=10&page_index=${page}`, header);
      setTotalCount(response.data.total_count);
      setData(prevData => [...prevData, ...response.data.data]);
      // console.log(response)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsData();
  }, [page]);

  const handleLoadMore = () => {
    if (data.length < totalCount) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleToggleImage = (itemId) => {
    setSelectedItemId(selectedItemId === itemId ? null : itemId);
  };

  return (
    <SafeAreaView >
      {isLoading && <ActivityIndicator size='large' />}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
            <View style={styles.container}>
              <TouchableOpacity onPress={() => handleToggleImage(item.id)} style={styles.button}>
                <Text style={styles.buttonText}>{item.created_at}</Text>
                <Text style={styles.buttonText}>{item.id}</Text>
                <Icon type='font-awesome' name='chevron-down' />
              </TouchableOpacity>
              {selectedItemId === item.id && (
                <>
                  <View style={styles.imagepreviewcontainer}>
                    <Image
                      source={{ uri: `${api.defaults.baseURL}static/predict/${item.image_name}` }} // Replace with your own image source
                      style={styles.imageStyle}
                    />
                  </View>
                  <View style={styles.container}>
                    <View style={styles.numberPlate}>
                      <Text style={styles.numberText}>{item.value}</Text>
                    </View>
                  </View>
                </>
              )}
            </View>
          </>
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}



