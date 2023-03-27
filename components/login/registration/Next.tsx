import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import * as variables from "../../../../retaily/constants";
import { IStackScreenProps } from "../../../../retaily/navigation/StackScreen";
import { TouchableOpacity, ScrollView } from "react-native";
// @ts-ignore
import styled from "styled-components/native";

const Next: React.FunctionComponent<IStackScreenProps> = props => {
  const { navigation } = props;
  const route = useRoute();
  const { userNumber }: any = route.params;
  const number = 8 + String(userNumber);

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "TEST" });
  }, [navigation]);

  return (
    <ScrollView>

    </ScrollView>
  );
};

export default Next;
