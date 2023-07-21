import * as React from 'react'
import { View } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { WaveIndicator } from 'react-native-indicators';

export default function EventPdfScreen () {
  const [ key, setKey ] = useState([])
  const [isLoading, setIsLoading] = useState(false)

//--------- PDF ДОКУМЕНТ --------- //
  useEffect(()=>{
    setIsLoading(true)
    const config = {
      method: 'get',
      url: `http://95.57.218.120/?apitest.helloAPIWithParams55={"addr":"${globalThis.link}"}`,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }
    axios(config)
     .then(function(responsed){
      const info = responsed.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
      const info1= JSON.parse(info)
      const info2 = JSON.parse(info1.response)
      setKey(info2)
      setIsLoading(false)
    })
     .catch(function (error) {
      console.log(error);
      setIsLoading(false)
    })
  },[])

  if(isLoading) {
    return(
      <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
        <WaveIndicator color="#D64D43"/>
      </View>
    )
  }
  const link = `data:application/pdf;base64,${key}`

  return (
    <PDFReader source={{ base64: link }} withScroll={true} withPinchZoom={true}/>
  )
}