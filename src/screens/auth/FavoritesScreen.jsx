import { StyleSheet, FlatList, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";

const FavoritesScreen = () => {
  const favorites = useSelector((state) => state.favorites);
  if (favorites.length === 0) {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontFamily: "Inter_600SemiBold" }}>
          There is no favorites
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={favorites}
      keyExtractor={(_, index) => index}
      numColumns={2}
      renderItem={({ item }) => (
        <ProductCard style={{ flex: 1 }} product={item} />
      )}
    />
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({});
