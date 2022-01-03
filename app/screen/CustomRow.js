import React from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteFood} from './redux/actions/food';
import store from './redux/store';

const CustomRow = ({title, keyValue, image_url}) => {
  const dispatch = useDispatch();
  const deleteCurrent = keyValue => dispatch(deleteFood(keyValue));
  console.log('key', keyValue);
  return (
    <View style={styles.rowContainer}>
      <View style={styles.container_text}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteCurrent(keyValue)}>
        <Image source={{uri: image_url}} style={styles.photo} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomRow;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: 'orange',
    padding: 16,
  },
  listText: {
    fontSize: 20,
    color: '#000000',
  },
  profileImg: {
    width: 20,
    height: 20,
  },
  container: {
    flex: 1,
    marginTop: 10,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  photo: {
    width: 30,
    height: 30,
  },
  container_text: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    color: '#000',
  },
});
