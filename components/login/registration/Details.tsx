import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import * as variables from '../../../constants';
import {IStackScreenProps} from '../../../../retaily/navigation/StackScreen';
import {
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {FlatList} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {getClientObjects, userRegister} from '../../../api/api';
import axios from 'axios';

interface Ioktmo {
  name: string;
  code: string;
}

export interface Idata {
  fio: string | undefined;
  email: string | undefined;
  password: string | undefined;
  passwordCheck: string | undefined;
}

const Details: React.FunctionComponent<IStackScreenProps> = props => {
  const {navigation} = props;

  const route = useRoute();
  const {userNumber}: any = route.params;
  const number = 8 + String(userNumber);

  const [checkValidPassword, setCheckValidPassword] =
    React.useState<boolean>(false);
  const [checkValidEmail, setCheckValidEmail] = React.useState<boolean>(false);
  const [checkValidFio, setCheckValidFio] = React.useState<boolean>(false);

  const [isModalVisible, setModalVisible] = React.useState(false);

  const [oktmo, setOktmo] = React.useState<Ioktmo[]>([]);

  const [error, setError] = React.useState<string>();
  const [load, setLoad] = React.useState<boolean>(false);

  const [selectedTown, setSelectedTown] = React.useState('Выберите город');
  const [data, setData] = React.useState<Idata>({
    fio: undefined,
    email: undefined,
    password: undefined,
    passwordCheck: undefined,
  });

  React.useEffect(() => {
    getSpr();
  }, []);

  let getSpr = async () => {
    let oktmo = await getClientObjects('oktmo');
    setOktmo(oktmo.data);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({headerTitle: 'Регистрация'});
  }, [navigation]);

  const setChangeData = (value: any, cmd: string) => {
    let data_copy = {...data};

    switch (cmd) {
      case 'fio':
        data_copy.fio = value;
        break;
      case 'email':
        data_copy.email = value;
        break;
      case 'password':
        data_copy.password = value;
        break;
      case 'passwordCheck':
        data_copy.passwordCheck = value;
        break;
    }

    setData(data_copy);
  };

  const handleCheckFio = (text: string) => {
    let re = /^(?=.*[a-zA-Zа-яА-Я]).{1,}$/;

    setChangeData(text, 'fio');

    if (re.test(text)) {
      setCheckValidFio(false);
    } else {
      setCheckValidFio(true);
    }
  };

  const handleCheckEmail = (text: string) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    setChangeData(text, 'email');

    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
  };

  const handleCheckPassword = (text: string) => {
    let re = /^(?=.*[a-z]).{4,}$/;

    setChangeData(text, 'password');

    if (re.test(text)) {
      setCheckValidPassword(false);
    } else {
      setCheckValidPassword(true);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // const registerUser = () => {
  //   navigation.navigate('Next', {userNumber});
  // };

  const userRegistration = async () => {
    setLoad(true);
    const register = await userRegister(
      number,
      data.password,
      data.fio,
      data.email,
      selectedTown,
    );

    if (register) {
      navigation.navigate('Next', {userNumber});
    } else {
      let error = 'Ошибка регистрации';
      setError(error);
    }
    setLoad(false);
    console.log(register);
  };

  return (
    <ScrollView>
      <DetailsView>
        <DetailsContent>
          <DetailsText>ФИО</DetailsText>
          <DetailsInput
            onChangeText={(text: string) => handleCheckFio(text)}
            value={data.fio}
            maxLength={100}
          />

          {checkValidFio ? (
            <DetailsErrorText>Введите ФИО правильно</DetailsErrorText>
          ) : (
            <DetailsErrorText></DetailsErrorText>
          )}

          <DetailsText>Электронный адрес</DetailsText>
          <DetailsInput
            onChangeText={(text: string) => handleCheckEmail(text)}
            value={data.email}
            maxLength={100}
            spellCheck={false}
            autoCorrect={false}
          />

          {checkValidEmail ? (
            <DetailsErrorText>Введите почту правильно</DetailsErrorText>
          ) : (
            <DetailsErrorText></DetailsErrorText>
          )}

          <DetailsText>
            Город <DetailsImportant>*</DetailsImportant>
          </DetailsText>
          <TouchableOpacity onPress={toggleModal}>
            <DetailsModalButtonOpen>
              <DetailsModalButtonTextOpen>
                {oktmo.find((f: any) => f.code === selectedTown)?.name}
              </DetailsModalButtonTextOpen>
              <Modal
                isVisible={isModalVisible}
                style={{
                  margin: 0,
                  backgroundColor: 'white',
                }}>
                <DetailsModalTownContainer>
                  <DetailsModalText>Выберите город</DetailsModalText>
                  <FlatList
                    data={oktmo}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedTown(item.code);
                          }}
                          onPressIn={toggleModal}>
                          <DetailsModalTownChoose>
                            <DetailsModalSubtext>
                              {item.name}
                              {item.code === selectedTown ? (
                                <View>
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    color={'green'}
                                    style={{
                                      marginLeft: 10,
                                    }}
                                  />
                                </View>
                              ) : null}
                            </DetailsModalSubtext>
                          </DetailsModalTownChoose>
                        </TouchableOpacity>
                      );
                    }}
                  />
                </DetailsModalTownContainer>

                <DetailsModalButtonClose onPress={toggleModal}>
                  <FontAwesomeIcon icon={faArrowLeft} size={21} />
                </DetailsModalButtonClose>
              </Modal>
            </DetailsModalButtonOpen>
          </TouchableOpacity>

          <DetailsLogin>Номер телефона вместо логина</DetailsLogin>
          <DetailsNumber>{number}</DetailsNumber>

          <DetailsText>
            Новый пароль <DetailsImportant>*</DetailsImportant>
          </DetailsText>
          <DetailsInput
            onChangeText={(text: string) => handleCheckPassword(text)}
            value={data.password}
            secureTextEntry={true}
            maxLength={15}
          />

          {checkValidPassword ? (
            <DetailsErrorText>
              Пароль должен быть не менее 4 символов
            </DetailsErrorText>
          ) : (
            <DetailsErrorText></DetailsErrorText>
          )}

          <DetailsText>
            Повторите пароль <DetailsImportant>*</DetailsImportant>
          </DetailsText>
          <DetailsInput
            onChangeText={(text: any) => setChangeData(text, 'passwordCheck')}
            value={data.passwordCheck}
            secureTextEntry={true}
            maxLength={20}
          />

          {data.passwordCheck != data.password ? (
            <DetailsErrorText>Пароли не подходят</DetailsErrorText>
          ) : (
            <DetailsErrorText></DetailsErrorText>
          )}

          {data.password == undefined ||
          data.passwordCheck == undefined ||
          data.fio == undefined ||
          checkValidFio == true ||
          checkValidPassword == true ||
          data.passwordCheck != data.password ? (
            <TouchableOpacity onPress={() => {}}>
              <DetailsSubmitOff>
                <DetailsSubmitText disabled={true}>
                  Подтвердить
                </DetailsSubmitText>
              </DetailsSubmitOff>
            </TouchableOpacity>
          ) : (
            <View>
              {load ? (
                <TouchableOpacity disabled={true}>
                  <DetailsSubmit>
                    <DetailsSubmitText>
                      <ActivityIndicator size="large" color="white" />
                    </DetailsSubmitText>
                  </DetailsSubmit>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => userRegistration()}>
                  <DetailsSubmit>
                    <DetailsSubmitText>Подтвердить</DetailsSubmitText>
                  </DetailsSubmit>
                </TouchableOpacity>
              )}
            </View>
          )}

          <DetailsRegistrationError>{error}</DetailsRegistrationError>
        </DetailsContent>
      </DetailsView>
    </ScrollView>
  );
};

export default Details;

const DetailsView = styled.View`
  background-color: ${variables.COLORS.white};
  height: 800px;
`;

const DetailsText = styled.Text`
  font-size: ${variables.SIZES.h5};
  margin-left: 35px;
`;

const DetailsImportant = styled.Text`
  color: ${variables.COLORS.red};
`;

const DetailsContent = styled.SafeAreaView`
  margin-top: 20px;
`;

const DetailsInput = styled.TextInput`
  height: 50px;
  width: 350px;
  font-size: ${variables.SIZES.h3};
  border-width: 1px;
  background-color: ${variables.COLORS.milky};
  border-color: ${variables.COLORS.milky};
  border-radius: 6px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
`;

const DetailsLogin = styled.Text`
  font-size: ${variables.SIZES.h4};
  margin-top: 40px;
  margin-left: 30px;
`;

const DetailsNumber = styled.Text`
  margin-top: 10px;
  margin-bottom: 30px;
  font-size: ${variables.SIZES.h1};
  color: ${variables.COLORS.black};
  font-weight: ${variables.SIZES.bold};
  margin-left: 30px;
`;

const DetailsSubmit = styled.View`
  background-color: ${variables.COLORS.fifth};
  border-radius: ${variables.SIZES.radius};
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 55px;
`;

const DetailsSubmitOff = styled.View`
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

const DetailsSubmitText = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h4};
`;

const DetailsErrorText = styled.Text`
  color: ${variables.COLORS.red};
  font-size: ${variables.SIZES.h7};
  text-align: center;
`;

const DetailsModalButtonOpen = styled.View`
  background-color: ${variables.COLORS.milky};
  border-radius: ${variables.SIZES.radius};
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 55px;
`;

const DetailsModalButtonTextOpen = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h4};
`;

const DetailsModalText = styled.Text`
  margin-bottom: 4%;
  text-align: center;
  font-size: ${variables.SIZES.h3};
  font-weight: ${variables.SIZES.bold};
  color: ${variables.COLORS.black};
`;

const DetailsModalTownChoose = styled.View`
  font-size: ${variables.SIZES.h3};
  color: ${variables.COLORS.black};
  border-bottom-width: 0.4px;
  border-bottom-color: #8e8e8e;
  padding: 15px 10px;
  margin-left: 10px;
`;

const DetailsModalSubtext = styled.Text`
  font-size: ${variables.SIZES.h4};
  color: ${variables.COLORS.black};
`;

const DetailsModalTownContainer = styled.View`
  width: 100%;
  margin-bottom: 95%;
`;

const DetailsModalButtonClose = styled.TouchableOpacity`
  position: relative;
  bottom: 92.3%;
  left: 5%;
`;

const DetailsRegistrationError = styled.Text`
  margin-top: 20px;
  font-size: ${variables.SIZES.h6};
  color: ${variables.COLORS.red};
  margin-left: auto;
  margin-right: auto;
`;
