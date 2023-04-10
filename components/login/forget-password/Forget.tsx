import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';

import * as variables from '../../../constants';
import {getSMS, loginCheck} from '../../../api/api';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  RetailyRootStackParams,
  RetailyStackParams,
  RootStackParams,
} from '../../../src/config/routes';

const Forget = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetailyRootStackParams>>();

  const [number, onChangeText] = React.useState<any>('');
  const [load, setLoad] = React.useState<boolean>(false);
  const [numberError, setNumberError] = React.useState<any>('');
  const [userNumber, setUserNumber] = React.useState<any>();
  const [sms, setSms] = React.useState<any>();
  const [disable, setDisable] = React.useState<boolean>(true);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Восстановление пароля',
      headerTitleStyle: {fontSize: 22},
    });
  }, [navigation]);

  const forgotUser = async () => {
    setLoad(true);
    const userNumber = number
      .replace(' ', '')
      .replace('-', '')
      .replace('-', '')
      .replace('(', '')
      .replace(')', '');
    const realNumber = 8 + String(userNumber);
    setUserNumber(userNumber);

    const smsGet = async () => {
      let sms = await getSMS(userNumber, 'phone');
      setSms(sms);
      console.log(sms);
    };
    if (number.length < 15) {
      setNumberError('Полностью впишите свой номер');
    } else {
      let result = await loginCheck(realNumber);
      if (result) {
        setNumberError('Этого номера не существует!');
      } else {
        setDisable(false);
        setNumberError(true);
        navigation.navigate('ForgetCode', {userNumber});
        smsGet();
      }
    }
    setLoad(false);
  };

  const validateNumberElements = (number: string) => {
    let i = '(';
    if (!number.includes('(')) {
      number = '(' + number;
    }
    if (!number.includes(')') && number.length > 4) {
      let strBefore = number.slice(0, 4);
      let strAfter = number.slice(4);
      number = strBefore + ')' + strAfter;
    }
    if (!number.includes(' ') && number.length > 5) {
      let strBefore = number.slice(0, 5);
      let strAfter = number.slice(5);
      number = strBefore + ' ' + strAfter;
    }
    if (!number.includes('-') && number.length > 9) {
      let strBefore = number.slice(0, 9);
      let strAfter = number.slice(9);
      number = strBefore + '-' + strAfter;
    }
    if (number.length > 12 && (number.match(/-/g) || []).length < 2) {
      let strBefore = number.slice(0, 12);
      let strAfter = number.slice(12);
      number = strBefore + '-' + strAfter;
    }
    onChangeText(number);
  };

  return (
    <RegisterMain>
      <Register>
        <RegisterSubtitle>
          Телефон <Text style={{color: variables.COLORS.red}}>*</Text>
        </RegisterSubtitle>

        <TouchableWithoutFeedback>
          <RegisterContainer>
            <RegisterNumber>8 </RegisterNumber>
            <RegisterInput
              onChangeText={(number: string) => validateNumberElements(number)}
              value={number}
              placeholder="999-999-99-99"
              keyboardType="numeric"
              maxLength={15}
              numberOfLines={15}
              style={{width: 330}}
            />
          </RegisterContainer>
        </TouchableWithoutFeedback>
        <RegisterErrorText>{numberError}</RegisterErrorText>

        <TouchableOpacity
          onPress={() => {
            forgotUser();
          }}>
          <RegisterSubmit>
            {load ? (
              <RegisterSubmitText disabled={true}>
                {<ActivityIndicator size="large" color="white" />}
              </RegisterSubmitText>
            ) : (
              <RegisterSubmitText>Подтвердить</RegisterSubmitText>
            )}
          </RegisterSubmit>
        </TouchableOpacity>
      </Register>
    </RegisterMain>
  );
};

export default Forget;

const RegisterMain = styled.ScrollView`
  background-color: ${variables.COLORS.white};
`;

const Register = styled.View`
  margin-top: 30px;
`;

const RegisterSubtitle = styled.Text`
  font-size: ${variables.SIZES.h5};
  margin-left: 30px;
`;

const RegisterNumber = styled.Text`
  font-size: ${variables.SIZES.h4};
  margin-left: 15px;
  color: ${variables.COLORS.black};
  margin-bottom: 1px;
`;

const RegisterContainer = styled.SafeAreaView`
  flex-direction: row;
  border-radius: 10px;
  width: 350px;
  height: 50px;
  margin-left: auto;
  margin-right: auto;
  background-color: ${variables.COLORS.milky};
  align-items: center;
`;

const RegisterInput = styled.TextInput`
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
  font-size: ${variables.SIZES.h4};
`;

const RegisterInfo = styled.Text`
  margin-left: 30px;
  margin-top: 5px;
  line-height: 18px;
  font-size: ${variables.SIZES.h6};
  width: 300px;
`;

const RegisterSubmit = styled.View`
  background-color: ${variables.COLORS.fifth};
  border-radius: ${variables.SIZES.radius};
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 55px;
`;

const RegisterSubmitText = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h4};
`;

const RegisterErrorText = styled.Text`
  color: ${variables.COLORS.red};
  font-size: 12px;
  margin-top: 3px;
  margin-left: 20px;
`;
