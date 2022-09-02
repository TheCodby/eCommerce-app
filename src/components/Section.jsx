import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { Colors } from "../constants/Colors";
import ProductCard from "./ProductCard";

const Section = ({ title, items }) => {
  return (
    <View style={{ paddingHorizontal: 20, marginVertical: 10 }}>
      <Text style={{ fontFamily: "Inter_700Bold", fontSize: 18 }}>
        {title}{" "}
        <Text style={{ fontSize: 12, color: Colors.text.danger }}>
          See More
        </Text>
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
};

export default Section;

const styles = StyleSheet.create({});
