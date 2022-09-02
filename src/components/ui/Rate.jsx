import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const Rate = ({ rate }) => {
  const Stars = [];
  for (let index = 0; index < 5; index++) {
    let iconName = "staro";
    if (rate !== 0) {
      iconName = "star";
      rate--;
    }
    Stars.push(
      <AntDesign key={index} name={iconName} size={24} color="#FF9529" />
    );
  }
  return <View style={{ flexDirection: "row" }}>{Stars}</View>;
};

export default Rate;
