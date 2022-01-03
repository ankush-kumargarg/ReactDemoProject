import React from 'react';
import {
  StyleSheet,
  FlatList,
  Image,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
//import { ListItem } from 'react-native-elements/dist/list/ListItem';
//import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ListItem, Icon } from 'react-native-elements'
import { useDispatch,useSelector } from 'react-redux';
import { deleteFood } from './redux/actions/food';
import store from './redux/store'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CustomRow from './CustomRow'



const CustomListview = ({ itemList }) => {
  console.log("ItemList",itemList);
  return(<View style={styles.container}>
      <FlatList
        data={itemList}
        renderItem={({ item }) => <CustomRow
        title={item.name}
        keyValue={item.keyValue}
        image_url={item.photo}
        />}
      />
  </View>
);
}

class FoodList extends React.Component {

  

  /*const dispatch = useDispatch();

  const deleteCurrent = (key) => dispatch(deleteFood(key))

  const foods = useSelector(state => state.foodReducer.foodList);

  console.log("foods",foods);*/
  
  render(){
    return (
      <View style={styles.listContainer}>
      <CustomListview
          itemList={this.props.foodList}
       />
     </View>
    );
  }
}

function mapStatesToProps(state){
  console.log("state",state);
  return{
    foodList:state.foodReducer.foodList
  }
}

function mapDispatchToProps(dispatch){
  return(bindActionCreators({
    deleteFromArray: (key) => {deleteFood(key)}
}, dispatch))
}

export default connect(mapStatesToProps,mapDispatchToProps)(FoodList)

const styles = StyleSheet.create({
  listContainer: {
    flex:1,
    backgroundColor: 'orange',
    padding: 16
  },
  listText: {
    fontSize: 20,
    color:"#000000"
  },
  profileImg:{
    width:20,
    height:20
  },
  container: {
    flex: 1,
    marginTop:10
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    marginLeft:16,
    marginRight:16,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
    elevation: 2,
  },
  photo:{
    width:30,
    height:30,
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
