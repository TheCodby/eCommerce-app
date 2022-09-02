import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import TextInput from "../../components/ui/TextInput";
import { Button, Checkbox, IconButton, HelperText } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { signup } from "../../utils/backend/auth";
import { useDispatch } from "react-redux";
import { login } from "../../utils/backend/auth";
const SignupScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    first_name: { value: "", error: "" },
    last_name: { value: "", error: "" },
    email: { value: "", error: "" },
    password: { value: "", error: "" },
    confirm_password: { value: "", error: "" },
  });
  const [loading, setLoading] = useState(false);
  const [agreeCheckBox, setAgreeCheckBox] = useState(false);

  const dispatch = useDispatch();
  const onSubmit = (e) => {
    if (loading) {
      return;
    }
    requestAnimationFrame(async () => {
      if (inputs?.first_name?.value === "") {
        setInputs((currInputs) => ({
          ...currInputs,
          first_name: {
            value: currInputs.first_name.value,
            error: "Please fill this field",
          },
        }));
        return;
      } else {
        setInputs((currInputs) => ({
          ...currInputs,
          first_name: {
            value: currInputs.first_name.value,
            error: "",
          },
        }));
      }
      if (inputs?.last_name?.value === "") {
        setInputs((currInputs) => ({
          ...currInputs,
          last_name: {
            value: currInputs.last_name.value,
            error: "Please fill this field",
          },
        }));
        return;
      } else {
        setInputs((currInputs) => ({
          ...currInputs,
          last_name: {
            value: currInputs.last_name.value,
            error: "",
          },
        }));
      }
      if (inputs?.email?.value === "") {
        setInputs((currInputs) => ({
          ...currInputs,
          email: {
            value: currInputs.email.value,
            error: "Please fill this field",
          },
        }));
        return;
      } else {
        setInputs((currInputs) => ({
          ...currInputs,
          email: {
            value: currInputs.email.value,
            error: "",
          },
        }));
      }
      if (inputs?.password?.value === "") {
        setInputs((currInputs) => ({
          ...currInputs,
          password: {
            value: currInputs.password.value,
            error: "Please fill this field",
          },
        }));
        return;
      } else {
        setInputs((currInputs) => ({
          ...currInputs,
          password: {
            value: currInputs.password.value,
            error: "",
          },
        }));
      }
      if (inputs?.confirm_password?.value === "") {
        setInputs((currInputs) => ({
          ...currInputs,
          confirm_password: {
            value: currInputs.confirm_password.value,
            error: "Please fill this field",
          },
        }));
        return;
      } else if (inputs?.confirm_password?.value !== inputs?.password?.value) {
        setInputs((currInputs) => ({
          ...currInputs,
          confirm_password: {
            value: currInputs.confirm_password.value,
            error: "Confirm password does not match password field",
          },
        }));
      } else {
        setInputs((currInputs) => ({
          ...currInputs,
          confirm_password: {
            value: currInputs.confirm_password.value,
            error: "",
          },
        }));
      }
      setLoading(true);
      const response = await signup(inputs);
      if (response?.error) {
        setInputs((currInputs) => ({
          ...currInputs,
          email: { value: currInputs.email.value, error: response?.error },
        }));
      } else if (response?.message) {
        setInputs((currInputs) => ({
          ...currInputs,
          email: { value: currInputs.email.value, error: "" },
        }));
        // add token and user data to store
        dispatch(
          login({
            auth: response,
          })
        );
      }
      setLoading(false);
    });
  };
  const showLogin = (e) => {
    if (loading) {
      return;
    }
    requestAnimationFrame(async () => {
      navigation.navigate("LoginScreen");
    });
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image
          source={require("../../../assets/logo.png")}
          style={{
            flex: 0.8,
            height: null,
            resizeMode: "contain",
            width: null,
          }}
        />
        <View style={styles.cardContent}>
          <View style={styles.inputRow}>
            <View style={styles.textInput}>
              <TextInput
                label="First Name"
                value={inputs.first_name.value}
                error={inputs.first_name.error !== ""}
                onChangeText={(text) => {
                  setInputs((currInpus) => ({
                    ...currInpus,
                    first_name: { value: text },
                  }));
                }}
              />
            </View>
          </View>
          <HelperText type="error" visible={inputs.first_name.error !== ""}>
            {inputs.first_name.error}
          </HelperText>
          <View style={styles.inputRow}>
            <View style={styles.textInput}>
              <TextInput
                label="Last Name"
                text={true}
                textContentType="familyName"
                error={inputs.last_name.error !== ""}
                value={inputs.last_name.value}
                onChangeText={(text) => {
                  setInputs((currInpus) => ({
                    ...currInpus,
                    last_name: { value: text },
                  }));
                }}
              />
            </View>
          </View>
          <HelperText type="error" visible={inputs.last_name.error !== ""}>
            {inputs.last_name.error}
          </HelperText>
          <View style={styles.inputRow}>
            <TextInput
              label="Email"
              text={true}
              style={styles.textInput}
              keyboardType="email-address"
              textContentType="emailAddress"
              error={inputs.email.error !== ""}
              value={inputs.email.value}
              onChangeText={(text) => {
                setInputs((currInpus) => ({
                  ...currInpus,
                  email: { value: text },
                }));
              }}
            />
          </View>
          <HelperText type="error" visible={inputs.email.error !== ""}>
            {inputs.email.error}
          </HelperText>
          <View style={styles.inputRow}>
            <TextInput
              label="Password"
              text={true}
              style={styles.textInput}
              textContentType="password"
              autoComplete="password"
              secureTextEntry={true}
              error={inputs.password.error !== ""}
              value={inputs.password.value}
              onChangeText={(text) => {
                setInputs((currInpus) => ({
                  ...currInpus,
                  password: { value: text },
                }));
              }}
            />
          </View>
          <HelperText type="error" visible={inputs.password.error !== ""}>
            {inputs.password.error}
          </HelperText>
          <View style={styles.inputRow}>
            <TextInput
              label="Confirm Password"
              textContentType="password"
              text={true}
              style={styles.textInput}
              secureTextEntry={true}
              error={inputs.confirm_password.error !== ""}
              value={inputs.confirm_password.value}
              onChangeText={(text) => {
                setInputs((currInpus) => ({
                  ...currInpus,
                  confirm_password: { value: text },
                }));
              }}
            />
          </View>
          <HelperText
            type="error"
            visible={inputs.confirm_password.error !== ""}
          >
            {inputs.confirm_password.error}
          </HelperText>
          <View style={[styles.inputRow, { alignItems: "center" }]}>
            <Checkbox
              style={styles.inputRow}
              status={agreeCheckBox ? "checked" : "unchecked"}
              color={Colors.primary[300]}
              uncheckedColor={Colors.primary[300]}
              onPress={() => {
                requestAnimationFrame(() => {
                  setAgreeCheckBox((curr) => !curr);
                });
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_400Regular",
                color: "white",
              }}
            >
              I agree to the privacy policy and terms of use
            </Text>
          </View>
          <View style={[styles.inputRow, { marginTop: 30 }]}>
            <Button
              mode="contained"
              buttonColor={loading ? Colors.primary[400] : Colors.primary[200]}
              contentStyle={{ flexDirection: "row-reverse", padding: 5 }}
              style={{ flex: 1, borderRadius: 25 }}
              labelStyle={{ color: "white", fontSize: 20 }}
              loading={loading}
              onPress={onSubmit}
            >
              Sign up
            </Button>
          </View>
          <View style={[styles.inputRow, { marginTop: 10 }]}>
            <IconButton
              icon={({ size, color }) => (
                <Entypo name="facebook-with-circle" size={30} color="#4267B2" />
              )}
              iconColor="#4267B2"
              onPress={() => console.log("Pressed")}
            />
            <IconButton
              icon={({ size, color }) => (
                <Entypo name="twitter-with-circle" size={30} color="#1DA1F2" />
              )}
              onPress={() => console.log("Pressed")}
            />
            <IconButton
              icon={({ size, color }) => (
                <FontAwesome
                  name="google-plus-circle"
                  size={30}
                  color="#db3236"
                />
              )}
              onPress={() => console.log("Pressed")}
            />
          </View>
          <View style={[styles.inputRow, { marginTop: 10 }]}>
            <Button
              mode="contained"
              buttonColor={Colors.secondary}
              contentStyle={{ flexDirection: "row-reverse", padding: 5 }}
              style={{ flex: 1, borderRadius: 25 }}
              labelStyle={{ color: "white" }}
              onPress={showLogin}
            >
              Do You have an account?
            </Button>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: "#131921",
    justifyContent: "center",
    padding: 30,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cardContent: {
    paddingHorizontal: 0,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    marginHorizontal: 15,
  },
});
