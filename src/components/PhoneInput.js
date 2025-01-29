import React, { useRef } from 'react';
import PhoneInput from 'react-native-phone-input';

const PhoneInputComponent = ({ onPhoneNumberChange, styl }) => {
  const phoneInputRef = useRef(null);

  const handlePhoneChange = () => {
    const phoneNumber = phoneInputRef.current.getValue();
    onPhoneNumberChange(phoneNumber);
  };

  return (
    <PhoneInput
      ref={phoneInputRef}
      style={styl}
      textStyle={{fontSize:16, color: '#4d4d4d', fontWeight:'500'}}
      initialCountry={'ru'}
      onChangePhoneNumber={handlePhoneChange}
      flagStyle={{display:'none'}}
      textProps={{maxLength:12}}
      
    />
  );
};

export default PhoneInputComponent;
