import { StyleSheet, ScrollView } from "react-native";
import Section from "../../components/Section";
import React, { useState, useCallback } from "react";
import { getCategories } from "../../utils/backend/categories";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchCategoris = async () => {
        const data = await getCategories();
        if (data?.docs) {
          setCategories(data.docs);
        }
      };
      fetchCategoris();
    }, [])
  );
  return (
    <ScrollView>
      {categories.map((value, index) => (
        <Section key={value._id} title={value.name} items={value.products} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
