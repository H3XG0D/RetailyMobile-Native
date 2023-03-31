import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {faClose} from '@fortawesome/free-solid-svg-icons/faClose';

// @ts-ignore
import styled from 'styled-components/native';

import * as variables from '../../../constants';

const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
const [content, setContent] = React.useState<any>(undefined);

const showModal = () => {
  setModalVisible(!isModalVisible);
};

const ModalComponent = () => {
  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.4}
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          maxHeight: 1100 - 20,
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 15,
          marginTop: 50,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => showModal()}>
            <FontAwesomeIcon
              icon={faClose}
              size={28}
              style={{
                marginLeft: 'auto',
                marginRight: 20,
                marginTop: 15,
              }}></FontAwesomeIcon>
          </TouchableOpacity>
          <Image
            source={{
              uri:
                variables.siteUrl +
                '/api/repo/' +
                (content && content.images?.length > 0
                  ? content.images[0]
                  : undefined),
            }}
            style={{
              width: 330,
              height: 200,
              borderRadius: 15,
              marginTop: 20,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}></Image>
          <MarketBannerView>
            <MarketBannerTitle>
              {content ? content.title : undefined}
            </MarketBannerTitle>
            <MarketBannerSubtitle>
              {content ? content.content : undefined}
            </MarketBannerSubtitle>
          </MarketBannerView>
          <TouchableOpacity>
            <MarketBannerButton>
              <MarketBannerButtonText>Перейти</MarketBannerButtonText>
            </MarketBannerButton>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const MarketBannerView = styled.View`
  padding: 20px 20px;
  margin-left: 10px;
  gap: 10px;
`;

const MarketBannerTitle = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h3};
  font-weight: ${variables.SIZES.bold};
`;

const MarketBannerSubtitle = styled.Text`
  color: ${variables.COLORS.black};
  font-size: ${variables.SIZES.h8};
`;

const MarketBannerButton = styled.View`
  background-color: ${variables.COLORS.tertiary};
  border-radius: ${variables.SIZES.radius};
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 45px;
  margin-top: 5px;
  margin-bottom: 60px;
  margin-left: auto;
  margin-right: auto;
`;

const MarketBannerButtonText = styled.Text`
  color: ${variables.COLORS.white};
  font-size: ${variables.SIZES.h6};
  font-weight: ${variables.SIZES.bold};
`;
