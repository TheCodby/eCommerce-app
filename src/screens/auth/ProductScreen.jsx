import { Image, StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Button, FAB, IconButton } from "react-native-paper";
import { Colors } from "../../constants/Colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect } from "react";
import { getProduct } from "../../utils/backend/products";
import { useSelector } from "react-redux";
import { toggleFavorite } from "../../utils/favorites";
import { addToCart } from "../../utils/backend/cart";
const ProductScreen = ({ route }) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const favorites = useSelector((state) => state.favorites);

  const onChangeQuantity = (text) => {
    if (parseInt(text) > 0) {
      setQuantity(parseInt(text));
    }
  };
  useEffect(() => {
    async function fetchProduct() {
      const data = await getProduct(route.params.product._id);
      setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, []);
  useEffect(() => {
    let element = favorites.find((element) => {
      return element?._id === product._id;
    });
    if (element) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites, product]);

  const handleFavorite = () => {
    toggleFavorite(product);
  };
  const handleAddToCart = () => {
    async function postProductToCart() {
      setAddToCartLoading(true);
      await addToCart(product._id, quantity);
      setAddToCartLoading(false);
    }
    postProductToCart();
  };
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <View>
          <Image
            source={{ uri: product.image }}
            style={{ height: "80%", resizeMode: "contain" }}
          />
        </View>
        <KeyboardAwareScrollView
          style={{
            backgroundColor: "#fff",
            borderRadius: 25,
            padding: 10,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 25, fontFamily: "Inter_700Bold" }}>
                  {product.price}$
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "white",
                  borderWidth: 1,
                  borderColor: "#f6f6f6",
                }}
              >
                <FAB
                  icon="minus"
                  color="black"
                  mode="flat"
                  style={{ backgroundColor: "#f0f0f0", borderRadius: 0 }}
                  onPress={() => {
                    if (quantity > 1) {
                      setQuantity((currQuantity) => {
                        return currQuantity - 1;
                      });
                    }
                  }}
                />
                <TextInput
                  value={quantity.toString()}
                  keyboardType="numeric"
                  onChangeText={onChangeQuantity}
                  style={{
                    fontSize: 30,
                    fontFamily: "Inter_400Regular",
                    paddingHorizontal: 20,
                  }}
                />
                <FAB
                  icon="plus"
                  color="black"
                  mode="flat"
                  style={{ backgroundColor: "#f0f0f0", borderRadius: 0 }}
                  onPress={() =>
                    setQuantity((currQuantity) => currQuantity + 1)
                  }
                />
              </View>
            </View>
            <View style={styles.row}>
              <Button
                mode="contained-tonal"
                color={Colors.secondary}
                contentStyle={{ flexDirection: "row-reverse", padding: 5 }}
                style={{ borderRadius: 25, flex: 1 }}
                labelStyle={{ color: "black", fontSize: 16 }}
                onPress={handleAddToCart}
                buttonColor="#ffecf1"
                loading={addToCartLoading}
                disabled={addToCartLoading}
              >
                {addToCartLoading ? "Adding" : "Add To Cart"}
              </Button>
              <IconButton
                mode="contained"
                size={30}
                icon="heart"
                selected={isFavorite}
                containerColor="#ffecf1"
                iconColor={isFavorite ? "#ffb3bf" : "#ffffff"}
                onPress={handleFavorite}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    margin: 5,
  },
});
