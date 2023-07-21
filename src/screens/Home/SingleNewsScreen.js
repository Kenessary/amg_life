import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, Text, View, ScrollView, StyleSheet} from 'react-native';
import { WaveIndicator } from 'react-native-indicators';
import { ImageSlider } from './ImageSlider';

import LottieView from "lottie-react-native"


import axios, * as others from 'axios';
import Infodep from './Infodep';
import themeContext from '../../cores/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const cheerio = require("cheerio");

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const subTitle = []
const contentTitle = []
const date = []
const pictures_links = []
const paragraph = []
const videos = []

// console.log(videos)

export default function SingleNewsScreen ()  {

  const theme = useContext(themeContext)

  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Load the user's preference from AsyncStorage
    loadDarkModePreference();
  }, []);

  const loadDarkModePreference = async () => {
    try {
      const preference = await AsyncStorage.getItem('darkMode');
      if (preference !== null) {
        setIsDarkMode(JSON.parse(preference));
      }
    } catch (error) {
      console.log('Error loading dark mode preference:', error);
    }
  };

  const [ isLoading, setIsLoading ] = useState(false)
  const [subtitle, setSubtitle] = useState('')
  const [newtitle, setNewTitle] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newPictures, setNewPictures] = useState('')
  const [vd, setVd] = useState('')



  async function getGenre(){
    try{
        setIsLoading(true)
        subTitle.splice(0,subTitle.length)
        contentTitle.splice(0,contentTitle.length)
        date.splice(0,date.length)
        pictures_links.splice(0,pictures_links.length)
        paragraph.splice(0,paragraph.length)
        videos.splice(0,videos.length)
        const response = await axios.get(`http://www.cnpc-amg.kz/${globalThis.link_new}`)
  
        const $ = cheerio.load(response.data)

        const stitle = $('#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > b > span')
        stitle.each(function(){
            srt = $(this).text()
            subTitle.push(srt)
            setSubtitle(subTitle)
        })

        const title = $('#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > p.content_title')
        title.each(function(){
            titw = $(this).text()
            contentTitle.push(titw)
            setNewTitle(contentTitle)
        })

        const dates = $('#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > p.right')
        dates.each(function(){
            day = $(this).text()
            date.push(day)
            setNewDate(date)
        })
        
        const pictr = $('#content > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(2) > div > img')
        pictr.each(function(){
            src = $(this).attr('src')
            pictures_links.push({src})
        })
        const pictures = $('center > img')
        pictures.each(function(){
            src = $(this).attr('src')
            pictures_links.push({src})
            setNewPictures(pictures_links)
            
        })

        const par = $('p')
        par.each(function(){
            prt = $(this).text()
            paragraph.push({prt})  
        })

        const mp4 = $('source')
        mp4.each(function(){
            mp = $(this).attr('src')
            videos.push({mp})
            // setVd(videos)
        })

        // console.log(videos)

        paragraph.splice(0,1)
        paragraph.splice(0,1)
        paragraph.splice(0,1)
        paragraph.splice(0,1)
        paragraph.splice(paragraph.length-1,1)

        setIsLoading(false)
    }
    catch(error){
        console.error(error)
    }

}

useEffect(()=>{
  
  getGenre()
},[])



if(isLoading) {
  return(
    <View style={{flex: 1, justifyContent:'center', alignItems: 'center', backgroundColor: isDarkMode === true ? '#262C38':''}}>
    <WaveIndicator color={theme.loading}/>
  </View>
  )
}

  const isVideo = [] 

  for (let i=0; i < videos.length; i++){
    // <Infodep link_video={videos[i].mp4}/>
    isVideo.push(
      <Infodep key={i} link_video={videos[i].mp}/>
    )
  }

  const newParagraph = []

  for (let i=0; i< paragraph.length; i++){
    newParagraph.push(
      <View key={i} style={{width: windowWidth-30, marginTop: 10}}>
        <Text style={{fontSize: 15, fontWeight:'400', textAlign:'justify', letterSpacing:-0.2, color: theme.color}}>  {paragraph[i].prt}</Text>
      </View>
    )
  }

  return (
    <View style={{width:"100%", alignItems:'center', backgroundColor: theme.background}}>
      <ScrollView >
        
      <View style={{width:windowWidth}}>

    {videos.length === 0 ?  <ImageSlider images ={pictures_links.map((links)=>'http://www.cnpc-amg.kz/'+ links.src)} /> : isVideo }

         
      </View>
      <View style={{marginTop:10, width: "100%"}}>
        <View style={{alignItems:'center'}}>
        <View style={{width: windowWidth-30}}>
          <Text style={{fontSize: 16, fontWeight:'500', color:'#D64D43'}}>{subtitle}</Text>
        </View>
        <View style={{width: windowWidth-30, marginTop: 10}}>
          <Text style={{fontSize: 17, fontWeight:'600', textAlign:'left', color:'#0A7699'}}>{newtitle}</Text>
        </View>

        <View style={{width: windowWidth-30, marginTop: 5}}>
          <Text style={{fontSize: 14, fontWeight:'500', textAlign:'right', color: theme.color}}>{newDate}</Text>
        </View>
          {newParagraph}
          <View style={{width: windowWidth-30, marginTop: 10}}/>
        </View>

      </View>
      </ScrollView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    flex: 1, 
    justifyContent:'center', 
    alignItems: 'center', 
    width:'100%',
    height:"100%"
  },

})



