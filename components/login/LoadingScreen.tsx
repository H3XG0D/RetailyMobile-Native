import React from 'react';
import {IStackScreenProps} from '../../navigation/StackScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import styled from 'styled-components/native';
import * as variables from './../../constants';

const LoadingScreen: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;
  const [loading, setLoading] = React.useState<boolean>();

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  const readData = async () => {
    const login = await AsyncStorage.getItem('LOGIN');
    const password = await AsyncStorage.getItem('PASSWORD');

    if (login !== null && password !== null) {
      navigation.navigate('Market');
    }
  };

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, [readData()]);

  return (
    <>
      {loading === false ? (
        navigation.navigate('Login')
      ) : (
        <LoadingContent>
          <LoadingLogo>
            <LogoImage source={require('./images/logo.png')} />
          </LoadingLogo>
        </LoadingContent>
      )}
    </>
  );
};

export default LoadingScreen;

const LoadingContent = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${variables.COLORS.primary};
`;

const LoadingLogo = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${variables.COLORS.primary};
  margin-top: 270px;
  height: 210px;
  width: 100%;
`;

const LogoImage = styled.Image`
  width: 180px;
  height: 40px;
`;
