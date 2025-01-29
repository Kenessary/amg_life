import axios from "axios";
import qs from "qs"
import moment from 'moment'
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native'




const idUnique = moment().format(`YYYYMMDDhhmmss`)

export function sendFormOngdu(
  skvazhina, 
  param1, 
  param2, 
  param3, 
  param4,
  sendiin,
  statusruch,
  ruchzamernach,
  ruchzamerkon,
  nachzamerneft, 
  konzamerneft,
  neft,
  nachzamergaz, 
  konzamergaz,
  gaz,
  primechanie,
  id,
  statusOngdu,
 setIsLoadingForSave,
 setSaved,
 backtolist
){
  setIsLoadingForSave(true)
  const data = qs.stringify({
    'skvazhina': skvazhina,
    'param1': param1,
    'param2': param2,
    'param3': param3,
    'param4': param4,
    'sendiin': sendiin,
    'statusruch': statusruch,
    'ruchzamernach': ruchzamernach,
    'ruchzamerkon': ruchzamerkon,
    'nachzamerneft': nachzamerneft,
    'konzamerneft': konzamerneft,
    'neft': neft,
    'nachzamergaz': nachzamergaz,
    'konzamergaz': konzamergaz,
    'gaz': gaz,
    'primechanie': primechanie,
    'id': id ,
    'status': statusOngdu
  });
  const config = {
    method: 'post',
    url: 'http://95.57.218.120/?index',
    headers: { 
      'Authorization': 'Basic OTgwNjI0MzUxNDc2OjIyMjI=', 
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data : data
  };
  axios(config)
    .then(async function(response){
    let user = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
    let parsed = JSON.parse(user)

    if(parsed.statussave === 'Документ сохранен' || parsed.statussave === 'Сохранение обновлено'){
      globalThis.setIsToggle(false)
      Alert.alert(
        parsed.statussave,
        'Чтобы посмотреть сохраненные нажмите "Продолжить"',
        [
          {
            text: 'Продолжить',
            onPress: () => {backtolist();},
          },
        ]
      );
    }

    if(parsed.status === 'Документ отправлен'){
      globalThis.setIsToggle(true)
      Alert.alert(
        parsed.status,
        'Чтобы посмотреть отправленные нажмите "Продолжить"',
        [
          {
            text: 'Продолжить',
            onPress: () => {backtolist();},
          },
        ]
      );
    }



      setSaved(parsed)

      setIsLoadingForSave(false)
    })
    .catch(function(error){
        console.log(error)
        setIsLoadingForSave(false)
    }) 
}

export function getListOngdu(iin, setIsLoading, setSavedDocs, setSendedDocs){
  setIsLoading(true)
  const config = {
    method:'get',
    url: `http://95.57.218.120/?apitest.helloAPIWithParams24={"iin":"${iin}"}`,
    headers: {  }
  }
  axios(config)
  .then(function(response){
    let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
    let parse_first = JSON.parse(info)
    let parse_second = parse_first.response
    let parse_third = JSON.parse(parse_second)
  
    const saved = parse_third.filter(item => item.statusotpravki === "Сохранено")


    const send = parse_third.filter(item => item.statusotpravki === "Отправлено")
    setSavedDocs(saved)
    setSendedDocs(send)
    // setAll(parse_third)
  
    setIsLoading(false)
  })
    .catch(function (error) {
    console.log(error);
    setIsLoading(false)
  })
}


export function getOneOngdu(id, setIsLoadingForOne, setOneDocument, setIsFull1, setStatusRuchApi, inputs, setInputs, setStatusRuch, setStartDate, setEndDate, setValue, setOneDocId){
  setIsLoadingForOne(true)
  const config = {
    method:'get',
    url: `http://95.57.218.120/?apitest.helloAPIWithParams25={"id":"${id}"}`,
    headers: {  }
  }
  axios(config)
  .then(function(response){
    let info = response.data.replace(/<[^>]*>/g, '').replace(/-->/g, '')
    let parse_first = JSON.parse(info)
    let parse_second = parse_first.response
    let parse_third = JSON.parse(parse_second)
    // console.log(parse_third)
    if(
        parse_third[0].ruchzamernach !== '' && 
        parse_third[0].ruchzamerkon !== '' &&
        parse_third[0].ruchzamer1 !== '' &&
        parse_third[0].ruchzamer2 !== '' &&
        parse_third[0].ruchzamer4 !== '' &&
        parse_third[0].ruchzamer5 !== '' 
      ){
        setIsFull1(true)
      } else {
        setIsFull1(false)
      }

      const inputsMain = {
        ...inputs, 
        parameter1: globalThis.isOneDoc === true && parse_third[0].param1 !== '' ? parse_third[0].param1 : '',
        parameter2: globalThis.isOneDoc === true && parse_third[0].param2 !== ''? parse_third[0].param2 : '',
        parameter3: globalThis.isOneDoc === true && parse_third[0].param3 !== '' ? parse_third[0].param3 : '',
        parameter4: globalThis.isOneDoc === true && parse_third[0].param4 !== '' ? parse_third[0].param4 : '',
        attention: globalThis.isOneDoc === true && parse_third[0].primechanie !== '' ? parse_third[0].primechanie : '', 
        startOil: globalThis.isOneDoc === true && parse_third[0].ruchzamer1 !== '' ? parse_third[0].ruchzamer1 : '',
        endOil: globalThis.isOneDoc === true && parse_third[0].ruchzamer2 !== '' ? parse_third[0].ruchzamer2 : '',
        startGaz: globalThis.isOneDoc === true && parse_third[0].ruchzamer4 !== '' ? parse_third[0].ruchzamer4 : '',
        endGaz: globalThis.isOneDoc === true && parse_third[0].ruchzamer5 !== '' ? parse_third[0].ruchzamer5 : '',
      }

      const dateNach = (parse_third[0].ruchzamernach).split(' ')
      const dateKon =  (parse_third[0].ruchzamerkon).split(' ') 

      setInputs(inputsMain)
      setOneDocId(parse_third[0].id)
      setValue(parse_third[0].skvazhina)
      setStatusRuch(globalThis.isOneDoc === true && parse_third !== '' ?  parse_third[0].statusruch : false)
      setStartDate(globalThis.isOneDoc === true && parse_third !== '' && parse_third[0].ruchzamernach !== '' ?  dateNach[1] : '')
      setEndDate(globalThis.isOneDoc === true && parse_third !== '' && parse_third[0].ruchzamerkon !== '' ?  dateKon[1] : '')



    setStatusRuchApi(parse_third[0].statusruch)
    setOneDocument(parse_third)
    // console.log(parse_third)
    setIsLoadingForOne(false)
  })
    .catch(function (error) {
    console.log(error);
    setIsLoadingForOne(false)
  })
}



export const OneDoc = (setIsOneDoc) => {
  setIsOneDoc(false)
}