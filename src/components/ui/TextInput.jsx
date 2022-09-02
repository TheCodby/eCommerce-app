import React from "react";
import { useState } from "react";
import {
  TextInput as PaperTextInput,
  Animated,
  StyleSheet,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
const TextInput = (props) => {
  const [animation] = useState(new Animated.Value(0));
  const fadeIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const fadeOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  const textInputStyle = {
    padding: 5,
    marginVertical: 10,
    flexDirection: "row",
    backgroundColor: props.background && props.background,
    borderBottomWidth: 2,
    borderBottomColor: props.error
      ? Colors.background.danger
      : animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["rgba(211, 211, 211, 0.073)", Colors.primary[500]],
        }),
    ...props.style,
  };
  return (
    <Animated.View style={[textInputStyle]}>
      <View style={{ justifyContent: "center" }}>{props.icon}</View>
      <PaperTextInput
        {...props}
        style={[styles.textInput, { marginStart: props.icon ? 10 : 0 }]}
        placeholder={props.label}
        placeholderTextColor={
          props.error ? Colors.text.danger : "rgba(211, 211, 211, 0.537)"
        }
        onFocus={fadeIn}
        onBlur={fadeOut}
      />
    </Animated.View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    color: "white",
  },
});
