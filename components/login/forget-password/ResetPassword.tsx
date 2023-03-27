import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {IStackScreenProps} from '../../../../retaily/navigation/StackScreen';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from '../../../constants';
import {useRoute} from '@react-navigation/native';
import {forgotPassword} from '../../../api/api';

const ResetPassword: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  const route = useRoute();
  const {userNumber}: any = route.params;
  const {otpCode}: any = route.params;
  const number = 8 + String(userNumber);

  const [password, setPassword] = React.useState<string>('');
  const [secondPassword, setSecondPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string>();

  const [load, setLoad] = React.useState<boolean>(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Восстановление пароля',
      headerTitleStyle: {fontSize: 22},
    });
  }, [navigation]);

  const passwordForget = async () => {
    setLoad(true);
    const change = await forgotPassword(number, password, otpCode);
    if (change && change.is_verify) {
      navigation.navigate('Login');
    } else {
      setError('Ошибка восстановления пароля');
    }
    console.log(change);
    setLoad(false);
  };

  return (
    <RegisterMain>
      <Register>
        <RegisterLogin>Номер телефона вместо логина:</RegisterLogin>
        <RegisterNumber>{number}</RegisterNumber>

        <RegisterSubtitle>
          Введите пароль <Text style={{color: variables.COLORS.red}}>*</Text>
        </RegisterSubtitle>
        <RegisterContent>
          <TouchableWithoutFeedback>
            <RegisterContainer>
              <RegisterInput
                onChangeText={(password: string) => setPassword(password)}
                value={password}
                placeholder="Введите пароль"
                maxLength={30}
                secureTextEntry={true}
                style={{width: 330}}
              />
            </RegisterContainer>
          </TouchableWithoutFeedback>

          <RegisterSubtitle>
            Введите пароль ещё раз{' '}
            <Text style={{color: variables.COLORS.red}}>*</Text>
          </RegisterSubtitle>
        </RegisterContent>

        <RegisterContent>
          <TouchableWithoutFeedback>
            <RegisterContainer>
              <RegisterInput
                onChangeText={(secondPassword: string) =>
                  setSecondPassword(secondPassword)
                }
                value={secondPassword}
                placeholder="Подтвердить пароль"
                maxLength={30}
                secureTextEntry={true}
                style={{width: 330}}
              />
            </RegisterContainer>
          </TouchableWithoutFeedback>
        </RegisterContent>

        {secondPassword != password ? (
          <RegisterErrorText>Пароли не подходят</RegisterErrorText>
        ) : (
          <RegisterErrorText></RegisterErrorText>
        )}

        {password == '' || secondPassword == '' ? (
          <TouchableOpacity disabled={true}>
            <RegisterSubmitOff>
              <RegisterSubmitText>Подтвердить</RegisterSubmitText>
            </RegisterSubmitOff>
          </TouchableOpacity>
        ) : (
          <View>
            {load ? (
              <TouchableOpacity disabled={true}>
                <RegisterSubmit>
                  <RegisterSubmitText>
                    <ActivityIndicator size="large" color="white" />
                  </RegisterSubmitText>
                </RegisterSubmit>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => passwordForget()}>
                <RegisterSubmit>
                  <RegisterSubmitText>Подтвердить</RegisterSubmitText>
                </RegisterSubmit>
              </TouchableOpacity>
            )}
          </View>
        )}
        <RegisterErrorText
          style={{fontSize: variables.SIZES.h4, marginTop: 50}}>
          {error}
        </RegisterErrorText>
      </Register>
    </RegisterMain>
  );
};

export default ResetPassword;

const RegisterMain = styled.ScrollView`
  background-color: ${variables.COLORS.white};
`;

const Register = styled.View`
  margin-top: 30px;
`;

const RegisterSubtitle = styled.Text`
  font-size: ${variables.SIZES.h5};
  margin-left: 30px;
  margin-bottom: 5px;
`;

const RegisterContent = styled.View`
  gap: 30px;
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

const RegisterSubmit = styled.View`
  background-color: ${variables.COLORS.fifth};
  border-radius: ${variables.SIZES.radius};
  margin-top: 15px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 55px;
`;

const RegisterSubmitOff = styled.View`
  background-color: ${variables.COLORS.gray};
  border-radius: ${variables.SIZES.radius};
  margin-top: 25px;
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
  font-size: ${variables.SIZES.h5};
  margin-top: 15px;
  text-align: center;
`;

const RegisterLogin = styled.Text`
  font-size: ${variables.SIZES.h4};
  margin-left: 30px;
`;

const RegisterNumber = styled.Text`
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: ${variables.SIZES.h1};
  color: ${variables.COLORS.black};
  font-weight: ${variables.SIZES.bold};
  margin-left: 30px;
`;
