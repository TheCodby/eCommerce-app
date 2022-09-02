import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getCartItems, removeProduct } from "../../utils/backend/cart";
import { ActivityIndicator, IconButton, Button } from "react-native-paper";
import { Colors } from "../../constants/Colors";
const CartItem = ({ item, onDelete }) => {
  const handleRemove = () => {};
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        padding: 30,
        margin: 10,
        borderRadius: 25,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "25%" }}>
            <Image
              source={{ uri: item.product[0].image }}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ marginStart: 20 }}>
            <Text style={{ fontSize: 18, fontFamily: "Inter_500Medium" }}>
              {item.product[0].name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Inter_500Medium",
                color: "grey",
              }}
            >
              Quantity: {item.quantity}
            </Text>
          </View>
        </View>
        <IconButton
          size={30}
          icon="delete"
          onPress={onDelete.bind(this, item.product[0]._id)}
        />
      </View>
    </View>
  );
};
const CartScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchCart = async () => {
        setLoading(true);
        const data = await getCartItems();
        if (data) {
          setCartItems(data.results);
        }
        setLoading(false);
      };
      fetchCart();
    }, [])
  );
  const onDelete = (productId) => {
    const fetchCart = async () => {
      setLoading(true);
      await removeProduct(productId);
      const data = await getCartItems();
      if (data) {
        setCartItems(data.results);
      }
      setLoading(false);
    };
    fetchCart();
  };
  const handlePay = () => {
    navigation.navigate("CheckoutScreen");
  };
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (cartItems.length === 0) {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontFamily: "Inter_600SemiBold" }}>
          There is no products in the cart
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartItem item={item} onDelete={onDelete} />}
      />
      <Button
        mode="contained-tonal"
        color={Colors.secondary}
        contentStyle={{ flexDirection: "row-reverse", padding: 5 }}
        style={{
          borderRadius: 25,
          position: "absolute",
          bottom: 10,
          width: "80%",
          alignSelf: "center",
        }}
        labelStyle={{ color: "black", fontSize: 16 }}
        buttonColor="#ffecf1"
        onPress={handlePay}
      >
        Pay
      </Button>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
