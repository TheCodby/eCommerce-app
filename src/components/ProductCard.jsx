import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { IconButton, MD3Colors, TouchableRipple } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../reducers/favorites";
import { useState } from "react";
import { useEffect } from "react";
import { toggleFavorite } from "../utils/favorites";

const ProductCard = ({ product, style = {} }) => {
  const navigator = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  useEffect(() => {
    let element = favorites.find((element) => {
      return element?._id === product._id;
    });
    if (element) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favorites]);
  const handleFavorite = () => {
    toggleFavorite(product);
  };
  return (
    <TouchableRipple
      onPress={() =>
        requestAnimationFrame(() => {
          navigator.navigate("ProductScreen", { product: product });
        })
      }
      rippleColor="rgba(0, 0, 0, .32)"
      borderless
      style={[styles.outerCard, style]}
    >
      <View>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.description}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 22,
                fontFamily: "Inter_700Bold",
                color: "#313131",
              }}
            >
              {product.name}
            </Text>
          </View>
          <View>
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
      </View>
    </TouchableRipple>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  outerCard: {
    backgroundColor: "white",
    borderRadius: 24,
    marginVertical: 8,
    marginHorizontal: 12,
    width: 300,
  },
  productImage: {
    height: 250,
    resizeMode: "contain",
  },
  description: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  price: {
    marginTop: 10,
    flexDirection: "row",
  },
});
