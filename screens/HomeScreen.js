import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';

export default class HomeScreen extends Component{
  constructor(){
    super();
    this.state = {
      text:'',
      word:'',
      isSearchPressed:false,
      definition:'',
      lexicalCategory:''
    }
  }

  getWord = (word)=>{
    var searchKeyWord = word.toLowerCase().trim();
    var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyWord + ".json";
    return fetch(url)
    .then((data)=>{
      if(data.status===200){
        return data.json();
      }
      else{
        return null;
      }
    })
    .then((response)=>{
      var responseObject = response;

      if(responseObject){
        var wordData = responseObject.definitions[0];
        var description = wordData.description;
        var lexicalCategory = wordData.wordtype;
        //console.log(description);
        //console.log(lexicalCategory);
        this.setState({word:this.state.text, definition:description, lexicalCategory:lexicalCategory});
      }
      else{
        this.setState({word:this.state.text, definition: "Not Found", lexicalCategory: "Not Found"});
      }
    })
  }

  render(){
    return(
      <View style = {styles.container}>
        {/*Header for the App*/}
        <Header
          backgroundColor = {'#111111'}
          centerComponent = {{
            text: 'English Dictionary',
            style: {color: '#ffffff', fontSize:20}
          }}/>

        {/*Top text*/}
        <Text style = {styles.topText}>Type a word</Text>
        {/*The Input box so that users can type in the word that they want to search for*/}
        <TextInput 
          style = {styles.inputBox}
          placeholder = 'Examples: Astonish, Love'
          onChangeText = {(text) => {
            this.setState({text:text});
          }}
          value = {this.state.text}/>

        {/*Touchable Opacity (Button) to press once the word has been typed*/}
        <TouchableOpacity style={styles.searchButton}
          onPress = {()=>{
            this.setState({isSearchPressed:true});
            this.getWord(this.state.text);
          }}>
          <Text style = {styles.buttonText}>Search</Text>
        </TouchableOpacity>
        
        <View>{this.state.isSearchPressed?
          <View>
            <Text style = {styles.textDisplay}>Word:</Text>
            <Text
              style = {styles.definition_word_lexical_style}>{this.state.word.toUpperCase()}
            </Text>

            <Text style = {styles.textDisplay}>Definition:</Text>
            <Text
              style = {styles.definition_word_lexical_style}>{this.state.definition}
            </Text>

            <Text style = {styles.textDisplay}>Lexical Category:</Text> 
            <Text
              style = {styles.definition_word_lexical_style}>{this.state.lexicalCategory}
            </Text>
          </View>
          :
          <View>
            <Text></Text>
            <Text></Text>
          </View>}
        </View>
      </View>
      );
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#eeeeee'
  },
  topText:{
    fontSize:22,
    alignSelf:'center',
    margin:10
  },
  inputBox:{
    borderWidth: 1,
    borderColor: '#777777',
    padding: 0,
    height:40,
    width:'50%',
    alignSelf:'center',
    margin: 20,
    backgroundColor:'#ffffff'
  },
  buttonText:{
    fontSize:22,
    textAlign:'center',
    color: '#ffffff'
  },
  searchButton:{
    textAlign:'center',
    backgroundColor:'#111111',
    margin:20,
    width:100,
    height:35,
    borderWidth:1,
    borderRadius:7,
    alignSelf:'center',
    alignContent:'center',
    alignItems:'center'
  },
  textDisplay:{
    fontSize:18,
    marginLeft:30,
    marginTop:5,
    marginBottom:5,
    color:'#000'
  },
  definition_word_lexical_style:{
    fontSize:15,
    marginLeft:40,
    marginRight:30,
    marginTop:5,
    marginBottom:5,
    color:'#111'
  }
});