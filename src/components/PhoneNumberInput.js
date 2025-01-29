import React, { useState } from 'react';
import { View, TextInput, Text } from 'react-native';

const PhoneNumberInput = ({onPhoneNumberChange, inputStyle}) => {
  const [phoneNumber, setPhoneNumber] = useState('+7');
  

  const formatPhoneNumber = (input) => {
    // Remove all non-numeric characters from the input
    const numericInput = input.replace(/\D/g, '');

    // Apply the desired format
    let formattedNumber = '+';
    for (let i = 1; i < numericInput.length + 1; i++) {
      formattedNumber += numericInput[i - 1];
      if (i === 1) {
        formattedNumber += ' (';
      } else if (i === 4 && numericInput.length > 4) {
        formattedNumber += ') ';
      } else if ((i === 7 && numericInput.length > 7) || (i === 9 && numericInput.length > 9)) {
        formattedNumber += ' ';
      }
    }

    return formattedNumber.trim();
  };

  const handlePhoneNumberChange = (input) => {
    const formatted = formatPhoneNumber(input);
    // console.log(formatted)

    setPhoneNumber(formatted)
    onPhoneNumberChange(formatted)
  };

  
  return (
    <View>
      <TextInput
        placeholder="+7 (***) *** ** **"
        placeholderTextColor={'grey'}
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        keyboardType='phone-pad'
        maxLength={18}
        style={inputStyle}
      />
    </View>
  );
};

export default PhoneNumberInput;

// import React, { useState, useRef } from 'react';
// import { View, TextInput, Text } from 'react-native';

// const PhoneNumberInput = () => {
//   const phoneNumberRef = useRef(null);
//   const [phoneNumber, setPhoneNumber] = useState('+7');

//   const formatPhoneNumber = (input) => {
//     const numericInput = input.replace(/\D/g, '');
//     let formattedNumber = '+';
//     for (let i = 0; i < numericInput.length; i++) {
//       formattedNumber += numericInput[i];
//       if (i === 0) {
//         formattedNumber += ' (';
//       } else if (i === 3) {
//         formattedNumber += ') ';
//       } else if (i === 6 || i === 8) {
//         formattedNumber += ' ';
//       }
//     }
//     return formattedNumber.trim();
//   };

//   const handlePhoneNumberChange = (input) => {
//     const formatted = formatPhoneNumber(input);
//     setPhoneNumber(formatted);
//     phoneNumberRef.current.setNativeProps({ text: formatted });
//   };

//   return (
//     <View>
//       <Text>Phone Number:</Text>
//       <TextInput
//         ref={phoneNumberRef}
//         placeholder="+7 (705) 607 45 65"
//         value={phoneNumber}
//         onChangeText={handlePhoneNumberChange}
//         keyboardType="numeric"
//       />
//     </View>
//   );
// };

// export default PhoneNumberInput;
