import React from 'react';

import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Platform} from 'react-native';

// @ts-ignore
import styled from 'styled-components/native';
// IMPORT CSS LIBRARY
import * as variables from '../../constants';
import {auth} from '../../api/api';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../src/config/routes';

const LoginPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [text, onChangeText] = React.useState<string>('');
  const [password, onChangePassword] = React.useState<string>('');

  const [error, setError] = React.useState<string | boolean>();
  const [loadError, setLoadError] = React.useState<boolean>();
  const [load, setLoad] = React.useState<boolean>(false);

  const loginCheck = async () => {
    setLoad(true);
    const register: any = await auth.login(text, password);

    if (!loadError && !register) {
      setError('Ошибка авторизации');
    } else {
      navigation.navigate('Market');
    }
    setLoad(false);
  };

  return (
    <View>
      <Logo>
        <LogoImage source={require('./images/logo.png')} />
      </Logo>
      <LoginHeader>
        <LoginTitle>Вход</LoginTitle>
        <LoginSubtitle>Введите логин или номер телефона</LoginSubtitle>
      </LoginHeader>

      <Login>
        <LoginInput
          onChangeText={onChangeText}
          value={text}
          placeholder="Введите логин"></LoginInput>

        <LoginInput
          onChangeText={onChangePassword}
          value={password}
          placeholder="Пароль"
          secureTextEntry={true}></LoginInput>

        <LoginForgetPassword onPress={() => navigation.navigate('Forget')}>
          Забыли пароль?
        </LoginForgetPassword>

        {load ? (
          <TouchableOpacity style={{marginTop: 10}} disabled={true}>
            <LoginSignIn>
              <LoginSignInText>
                <ActivityIndicator size="large" color="white" />
              </LoginSignInText>
            </LoginSignIn>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              loginCheck();
            }}
            style={{marginTop: 10}}>
            <LoginSignIn>
              <LoginSignInText>Войти</LoginSignInText>
            </LoginSignIn>
          </TouchableOpacity>
        )}

        <LoginSignUpView>
          <LoginSignUpText>
            Нет аккаунта?{' '}
            <LoginSignUp onPress={() => navigation.navigate('Registration')}>
              Зарегистрироваться
            </LoginSignUp>
          </LoginSignUpText>
        </LoginSignUpView>
        {loadError ? null : <LoginErrorText>{error}</LoginErrorText>}
      </Login>
    </View>
  );
};

const Logo = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${variables.COLORS.primary};
  height: 210px;
  width: 100%;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const LogoImage = styled.Image`
  width: 120px;
  height: 26px;
`;

const Login = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginHeader = styled.View`
  display: flex;
  flex-direction: column;
  margin-left: 65px;
  margin-top: 30px;
`;

const LoginTitle = styled.Text`
  font-size: ${variables.SIZES.h2};
  color: ${variables.COLORS.black};
  font-weight: 600;
  padding-bottom: 20px;
`;

const LoginSubtitle = styled.Text`
  font-size: ${variables.SIZES.font};
  color: ${variables.COLORS.gray};
`;

const LoginInput = styled.TextInput`
  background-color: ${variables.COLORS.milky};
  border-radius: ${variables.SIZES.radius};
  width: 260px;
  height: 45px;
  margin-top: ${variables.SIZES.top};
  padding: 10px;
`;

const LoginForgetPassword = styled.Text`
  color: ${variables.COLORS.secondary};
  font-weight: ${variables.SIZES.bold};
  margin-top: ${variables.SIZES.top};
  text-decoration: underline;
`;

const LoginSignIn = styled.View`
  background-color: ${variables.COLORS.tertiary};
  border-radius: ${variables.SIZES.radius};
  margin-top: ${variables.SIZES.top};
  align-items: center;
  justify-content: center;
  width: 260px;
  height: 45px;
`;

const LoginSignInText = styled.Text`
  color: ${variables.COLORS.white};
  font-weight: ${variables.SIZES.bold};
`;

const LoginSignUpView = styled.View`
  margin-top: 30px;
`;

const LoginSignUpText = styled.Text`
  font-size: ${variables.SIZES.font};
  color: ${variables.COLORS.black};
`;

const LoginSignUp = styled.Text`
  color: ${variables.COLORS.secondary};
  font-weight: ${variables.SIZES.bold};
  text-decoration: underline;
`;

const LoginErrorText = styled.Text`
  margin-top: 30px;
  font-size: ${variables.SIZES.h6};
  color: ${variables.COLORS.red};
  margin-left: auto;
  margin-right: auto;
`;

export default LoginPage;
