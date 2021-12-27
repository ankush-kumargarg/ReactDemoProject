import React, { Component } from 'react';
import { Button, View ,StyleSheet,Text,TextInput,FlatList,Image,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const CustomRow = ({ title, description, image_url }) => (
  <View style={styles.rowContainer}>
      <Image source={{ uri: image_url }} style={styles.photo} />
      <View style={styles.container_text}>
          <Text style={styles.title}>
              {title}
          </Text>
          <Text style={styles.description}>
              {description}
          </Text>
      </View>

  </View>
);

const CustomListview = ({ itemList }) => (
  <View style={styles.container}>
      <FlatList
        data={itemList}
        renderItem={({ item }) => <CustomRow
        title={item.title}
        description={item.description}
        image_url={item.image_url}
        />}
      />
  </View>
);

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      selectedTab:'Value', flagAll:true,flagPitching:false,flagHittinf:false,flagFielding:false,
      alldataList:[{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"}],
      pitchingDataList:[{title:"Pitchingtitle",description:"Pitchingdescription",image_url:"https://en.wikipedia.org/wiki/Pitcher#/media/File:Noah_Syndergaard_(20697486276).jpg"},{title:"Pitchingtitle",description:"Pitchingdescription",image_url:"https://en.wikipedia.org/wiki/Pitcher#/media/File:Noah_Syndergaard_(20697486276).jpg"},{title:"Pitchingtitle",description:"Pitchingdescription",image_url:"https://en.wikipedia.org/wiki/Pitcher#/media/File:Noah_Syndergaard_(20697486276).jpg"},{title:"Pitchingtitle",description:"Pitchingdescription",image_url:"https://en.wikipedia.org/wiki/Pitcher#/media/File:Noah_Syndergaard_(20697486276).jpg"},{title:"Pitchingtitle",description:"Pitchingdescription",image_url:"https://en.wikipedia.org/wiki/Pitcher#/media/File:Noah_Syndergaard_(20697486276).jpg"},{title:"Pitchingtitle",description:"Pitchingdescription",image_url:"https://en.wikipedia.org/wiki/Pitcher#/media/File:Noah_Syndergaard_(20697486276).jpg"},{title:"Pitchingtitle",description:"Pitchingdescription",image_url:"https://en.wikipedia.org/wiki/Pitcher#/media/File:Noah_Syndergaard_(20697486276).jpg"},{title:"Pitchingtitle",description:"Pitchingdescription",image_url:"https://en.wikipedia.org/wiki/Pitcher#/media/File:Noah_Syndergaard_(20697486276).jpg"}],
      hittingDataList:[{title:"Hittingtitle",description:"Hittingdescription",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"}],
      fieldingDataList:[{title:"Fieldingtitle",description:"Fieldingdescription",image_url:"https://www.gstatic.com/webp/gallery3/1.png"},{title:"title",description:"description",image_url:"https://www.gstatic.com/webp/gallery3/1.png"},{title:"title",description:"description",image_url:"https://www.gstatic.com/webp/gallery3/1.png"},{title:"title",description:"description",image_url:"https://www.gstatic.com/webp/gallery3/1.png"},{title:"title",description:"description",image_url:"https://www.gstatic.com/webp/gallery3/1.png"},{title:"title",description:"description",image_url:"https://www.gstatic.com/webp/gallery3/1.png"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"},{title:"title",description:"description",image_url:"https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"}]
    }
  }
   onClick = (button) => {
    switch(button){
      case 1:
        this.setState({flagAll:true})
        this.setState({flagHittinf:false})
        this.setState({flagPitching:false})
        this.setState({flagFielding:false})
       break;
      case 2:
        this.setState({flagAll:false})
        this.setState({flagHittinf:false})
        this.setState({flagPitching:true})
        this.setState({flagFielding:false})
        break;
      case 3:
        this.setState({flagAll:false})
        this.setState({flagHittinf:true})
        this.setState({flagPitching:false})
        this.setState({flagFielding:false})
        break;
      case 4:
        this.setState({flagAll:false})
        this.setState({flagHittinf:false})
        this.setState({flagPitching:false})
        this.setState({flagFielding:true})
        break;
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <View>
        <ScrollView style={styles.scrollStyle} horizontal={true} showsHorizontalScrollIndicator={false}>
        <Text onPress={()=>this.onClick(1)} style={this.state.flagAll==true ? styles.selectedscrollItemStyle : styles.unSelectedscrollItemStyle}>All</Text>
        <Text onPress={()=>this.onClick(2)} style={this.state.flagPitching==true ? styles.selectedscrollItemStyle : styles.unSelectedscrollItemStyle}>Pitching</Text>
        <Text onPress={()=>this.onClick(3)} style={this.state.flagHittinf==true ? styles.selectedscrollItemStyle : styles.unSelectedscrollItemStyle}>Hitting</Text>
        <Text onPress={()=>this.onClick(4)} style={this.state.flagFielding==true ? styles.selectedscrollItemStyle : styles.unSelectedscrollItemStyle}>Fielding</Text>
       </ScrollView>
      </View>
      <View style={[styles.container]}>
      <CustomListview
        itemList={this.state.flagAll==true ? this.state.alldataList : this.state.flagPitching==true ? this.state.pitchingDataList: this.state.flagHittinf==true ? this.state.hittingDataList : this.state.fieldingDataList}
     />
      </View>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:10
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  scrollStyle:{
    backgroundColor: '#fff',
    marginTop:30,
    marginStart:20,
    marginEnd:20
  },
  redGreen:{
    color:"#00ff00"
  },
  bigRed:{
    color:'#FF0000',
    fontSize:50,
    textAlign:'center',
    marginTop:30
  },
  blackTextView:{
    color:'#000000',
    fontSize:20,
    marginTop:20,
    marginStart:20
  },
  inputFiledStyle:{
    height: 50,
    backgroundColor: 'azure', 
    fontSize: 20,
    marginStart:20,
    marginEnd:20,
    padding:5,
    paddingStart:10,
    borderRadius:10,
    borderColor:'green',
    borderWidth:2
  },
  buttonStyle:{
    height: 50,
    fontSize: 20,
    marginStart:100,
    marginEnd:100,
    padding:5,
    textAlign:'center',
    color:'#000000',
    marginTop:100,
    borderRadius:10,
    backgroundColor:'red'
  },
  selectedscrollItemStyle:{
    alignSelf:'baseline',
    fontSize:15,
    borderRadius:20,
    paddingLeft:30,
    paddingRight:30,
    paddingTop:5,
    marginRight:20,
    borderWidth:1,
    borderColor:'#000000',
    paddingBottom:5,
    color:"#000000",
    backgroundColor:"#e28743", 
    borderColor:"#e28743",
    color:"#ffffff"
  },
  unSelectedscrollItemStyle:{
    alignSelf:'baseline',
    fontSize:15,
    borderRadius:20,
    paddingLeft:30,
    paddingRight:30,
    paddingTop:5,
    marginRight:20,
    borderWidth:1,
    borderColor:'#000000',
    paddingBottom:5,
    color:"#000000"
  },
  photo: {
    height: 50,
    width: 50,
},
container_text: {
  flex: 1,
  flexDirection: 'column',
  marginLeft: 12,
  justifyContent: 'center',
},
description: {
  fontSize: 11,
  fontStyle: 'italic',
},
title: {
  fontSize: 16,
  color: '#000',
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

});