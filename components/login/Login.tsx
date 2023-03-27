import React, {useEffect} from 'react';

import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {IStackScreenProps} from '../../navigation/StackScreen';
import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// @ts-ignore
import styled from 'styled-components/native';
// IMPORT CSS LIBRARY
import * as variables from './../../constants';
import {loginRegister} from '../../api/api';

// * Async Storage for user session
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginPage: React.FunctionComponent<IStackScreenProps> = props => {
  const [text, onChangeText] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [token, setToken] = React.useState<any>(null);

  const [error, setError] = React.useState<string | boolean>();
  const [loadError, setLoadError] = React.useState<boolean>();
  const [load, setLoad] = React.useState<boolean>(false);
  const [data, setData] = React.useState<boolean>(false);

  const [modelId, setModelId] = React.useState<string>();

  const {navigation} = props;

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  const detectModel = () => {
    // let brand = DeviceInfo.getBrand();
    // let buildNumber = DeviceInfo.getBuildNumber();
    // let bundleId = DeviceInfo.getBuildId();
    // let deviceId = DeviceInfo.getDeviceId();

    let model = DeviceInfo.getModel();
    setModelId(model);
  };

  const loginCheck = async () => {
    setLoad(true);
    const register = await loginRegister(text, password, Platform.OS, modelId);

    if (!loadError && !register) {
      setError('Ошибка авторизации');
    } else {
      await AsyncStorage.setItem('KEY', text);
      navigation.navigate('Market');
    }
    setLoad(false);
  };

  const readData = async () => {
    const value = await AsyncStorage.getItem('KEY');
    if (value !== null) {
      navigation.navigate('Market');
    } else {
      console.log(value);
    }
  };

  readData();

  return (
    <View>
      {/*<LoginLoadingContent>*/}
      {/*  <LoginLoadingLogo>*/}
      {/*    <LogoImage source={require('./images/logo.png')} />*/}
      {/*  </LoginLoadingLogo>*/}
      {/*  <LoginLoadingScreen>*/}
      {/*  </LoginLoadingScreen>*/}
      {/*</LoginLoadingContent>*/}
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
              readData();
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

const LoginLoadingScreen = styled.View`
  display: none;
`;

const LoginLoadingContent = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${variables.COLORS.primary};
`;

const LoginLoadingLogo = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${variables.COLORS.primary};
  margin-top: 200px;
  height: 210px;
  width: 100%;
`;

export default LoginPage;
