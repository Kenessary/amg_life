import React, {useCallback, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import InputCode, {InputCodeHandler} from 'react-native-input-code';

const Code = () => {
  const inputCode = useRef(null);
  const [code, setCode] = useState('');

  const onChangeCode = useCallback(value => {
    console.log(value);
    setCode(value);
  }, []);

  const onFullFill = useCallback(
    value => {
      console.log(value);

      setTimeout(() => {
        setCode('');
        // inputCode.focus();
      }, 100);
    },
    [inputCode],
  );

  return (
    <SafeAreaView>
      <InputCode
        code={code}
        length={4}
        ref={inputCode}
        onChangeCode={onChangeCode}
        onFullFill={onFullFill}
        passcode
        passcodeChar="*"
        autoFocus
        codeContainerStyle={styles.codeContainerStyle}
        codeContainerCaretStyle={styles.codeContainerCaretStyle}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  codeContainerStyle: {
    borderWidth: 0,
    borderBottomWidth: 2,
  },
  codeContainerCaretStyle: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
});

export default Code;