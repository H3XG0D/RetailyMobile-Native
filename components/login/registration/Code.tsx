import React, {useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

import * as variables from '../../../constants';
import {IStackScreenProps} from '../../../../retaily/navigation/StackScreen';
import {getPhoneVerify, getSMS} from '../../../api/api';

const Code: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  const route = useRoute();
  const {userNumber}: any = route.params;
  const number = 8 + String(userNumber);

  React.useLayoutEffect(() => {
    navigation.setOptions({headerTitle: 'Подтверждение'});
  }, [navigation]);

  const firstInput = useRef<any>();
  const secondInput = useRef<any>();
  const thirdInput = useRef<any>();
  const fourthInput = useRef<any>();

  const [otp, setOtp] = useState<any>({1: '', 2: '', 3: '', 4: ''});
  const [load, setLoad] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [sms, setSms] = React.useState<any>();

  const [counter, setCounter] = React.useState<number>(100);
  const [change, setChange] = React.useState<boolean>(false);

  React.useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const smsGet = async () => {
    let sms = await getSMS(userNumber, 'phone');
    setSms(sms);
    setCounter(100);
  };

  const registerCode = async () => {
    setLoad(true);
    let result = await getPhoneVerify(
      userNumber,
      otp['1'] + otp['2'] + otp['3'] + otp['4'],
      'phone',
    );
    console.log(result);
    if (result && result.is_verify) {
      navigation.navigate('Details', {userNumber});
    } else {
      const err = 'Вы ввели неправильный код';
      setError(err);
    }
    setLoad(false);
  };

  const handleKeyDown = (e: any, cmd: string) => {
    if (e.nativeEvent.key === 'Backspace') {
      switch (cmd) {
        case '2':
          otp[cmd] === '' ? firstInput.current.focus() : null;
          break;
        case '3':
          otp[cmd] === '' ? secondInput.current.focus() : null;
          break;
        case '4':
          otp[cmd] === '' ? thirdInput.current.focus() : null;
          break;
      }
    }
  };

  return (
    <CodeContainer>
      <CodeSubtitle>
        Пожалуйста введите код который отправлен на номер:{' '}
        <CodeNumber>{number}</CodeNumber>
      </CodeSubtitle>

      <CodeContent>
        <CodeBox>
          <CodeInput
            style={{paddingHorizontal: 18, paddingVertical: 10}}
            keyboardType="number-pad"
            maxLength={1}
            ref={firstInput}
            onChangeText={(text: any) => {
              setOtp({...otp, 1: text});
              text && secondInput.current.focus();
            }}
          />
        </CodeBox>

        <CodeBox>
          <CodeInput
            style={{paddingHorizontal: 18, paddingVertical: 10}}
            keyboardType="number-pad"
            maxLength={1}
            ref={secondInput}
            onKeyPress={(e: any) => handleKeyDown(e, '2')}
            onChangeText={(text: any) => {
              setOtp({...otp, 2: text});
              text ? thirdInput.current.focus() : firstInput.current.focus();
            }}
          />
        </CodeBox>

        <CodeBox>
          <CodeInput
            style={{paddingHorizontal: 18, paddingVertical: 10}}
            keyboardType="number-pad"
            maxLength={1}
            ref={thirdInput}
            onKeyPress={(e: any) => handleKeyDown(e, '3')}
            onChangeText={(text: any) => {
              setOtp({...otp, 3: text});
              text ? fourthInput.current.focus() : secondInput.current.focus();
            }}
          />
        </CodeBox>

        <CodeBox>
          <CodeInput
            style={{paddingHorizontal: 18, paddingVertical: 10}}
            keyboardType="number-pad"
            maxLength={1}
            ref={fourthInput}
            onKeyPress={(e: any) => handleKeyDown(e, '4')}
            onChangeText={(text: any) => {
              setOtp({...otp, 4: text});
              !text && thirdInput.current.focus();
            }}
          />
        </CodeBox>
      </CodeContent>

      {counter == 0 ? (
        <TouchableOpacity onPress={smsGet}>
          <CodeResend>Отправить код</CodeResend>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity disabled={true}>
          <CodeResendTimer>Переотправить код через: {counter}</CodeResendTimer>
        </TouchableOpacity>
      )}

      <CodeSubmitErrorCode>{error}</CodeSubmitErrorCode>

      {otp['1'] == '' || otp['2'] == '' || otp['3'] == '' || otp['4'] == '' ? (
        <TouchableOpacity disabled={true}>
          <CodeSubmitOff>
            <CodeSubmitText>Продолжить</CodeSubmitText>
          </CodeSubmitOff>
        </TouchableOpacity>
      ) : (
        <View>
          {load ? (
            <TouchableOpacity disabled={true}>
              <CodeSubmit>
                <CodeSubmitText>
                  <ActivityIndicator size="large" color="white" />
                </CodeSubmitText>
              </CodeSubmit>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => registerCode()}>
              <CodeSubmit>
                <CodeSubmitText>Продолжить</CodeSubmitText>
              </CodeSubmit>
            </TouchableOpacity>
          )}
        </View>
      )}
    </CodeContainer>
  );
};

export default Code;

const CodeContainer = styled.View`
  border-radius: 20px;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20%;
`;

const CodeSubtitle = styled.Text`
  font-size: ${variables.SIZES.h4};
  color: ${variables.COLORS.black};
  font-weight: ${variables.SIZES.font};
  margin-top: 6px;
  text-align: center;
  width: 300px;
`;

const CodeNumber = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h3};
  font-weight: ${variables.SIZES.bold};
`;

const CodeContent = styled.View`
  margin-top: 50px;
  gap: 30px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  flex-direction: row;
`;

const CodeBox = styled.View`
  border-radius: 3px;
  border-color: ${variables.COLORS.gray};
  border-width: 1px;
`;

const CodeInput = styled.TextInput`
  font-size: 30px;
  background-color: #fbfbfe;
  color: ${variables.COLORS.black};
  font-weight: ${variables.SIZES.bold};
  text-align: center;
`;

const CodeResendTimer = styled.Text`
  padding-top: 6%;
  font-size: ${variables.SIZES.h7};
`;

const CodeResend = styled.Text`
  padding-top: 6%;
  font-size: ${variables.SIZES.h7};
  text-decoration: underline;
`;

const CodeSubmit = styled.View`
  background-color: ${variables.COLORS.fifth};
  border-radius: ${variables.SIZES.radius};
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 55px;
`;

const CodeSubmitOff = styled.View`
  background-color: ${variables.COLORS.gray};
  border-radius: ${variables.SIZES.radius};
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 55px;
`;

const CodeSubmitText = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h4};
`;

const CodeSubmitErrorCode = styled.Text`
  font-size: ${variables.SIZES.h6};
  color: ${variables.COLORS.red};
  margin-top: 15px;
`;
