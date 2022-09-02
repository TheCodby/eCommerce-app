import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../constants/Colors";
import { StatusBar } from "react-native";
import { Button } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
const slides = [
  {
    id: "1",
    image: require("../../../assets/screens/welcome/1.png"),
    title: "Best Digital Solution",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "2",
    image: require("../../../assets/screens/welcome/2.png"),
    title: "Achieve Your Goals",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: "3",
    image: require("../../../assets/screens/welcome/3.png"),
    title: "Increase Your Value",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const Slide = ({ slideData }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={slideData.image}
        style={{ height: "75%", width, resizeMode: "contain" }}
      />
      <View>
        <Text style={styles.title}>{slideData.title}</Text>
        <Text style={styles.subtitle}>{slideData.subtitle}</Text>
      </View>
    </View>
  );
};
const OnboardingScreens = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef();
  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    } else if (nextSlideIndex === slides.length) {
      navigation.navigate("SignupScreen");
    }
  };
  const goToPreviousSlide = () => {
    const previousSlideIndex = currentSlideIndex - 1;
    if (previousSlideIndex >= 0) {
      const offset = previousSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(previousSlideIndex);
    }
  };
  return (
    <SafeAreaView style={styles.rootContainer}>
      <FlatList
        ref={ref}
        showsHorizontalScrollIndicator={false}
        data={slides}
        contentContainerStyle={{ height: height * 0.75 }}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        horizontal
        pagingEnabled
        renderItem={({ item }) => <Slide slideData={item} />}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: "white",
                width: 5,
                height: 5,
                borderRadius: 100,
              },
            ]}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <View>
          {currentSlideIndex != 0 && (
            <Button
              icon={({ size, color }) => (
                <Entypo
                  name="arrow-with-circle-left"
                  color={color}
                  size={size}
                />
              )}
              textColor={Colors.primary[200]}
              mode="text"
              onPress={goToPreviousSlide}
            >
              Back
            </Button>
          )}
        </View>
        <View>
          <Button
            icon={({ size, color }) => (
              <Entypo
                name="arrow-with-circle-right"
                color={color}
                size={size}
              />
            )}
            mode="text"
            textColor={Colors.primary[200]}
            contentStyle={{ flexDirection: "row-reverse" }}
            onPress={goToNextSlide}
          >
            {currentSlideIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreens;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.background.secondary[500],
  },
  title: {
    fontFamily: "Inter_700Bold",
    color: Colors.text.light,
    textAlign: "center",
    fontSize: 22,
    marginVertical: 20,
    color: Colors.primary[200],
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    color: Colors.text.light,
    textAlign: "center",
    fontSize: 13,
    maxWidth: "80%",
  },
  indicator: {
    width: 5,
    height: 5,
    backgroundColor: "grey",
    marginHorizontal: 3,
    borderRadius: 2,
  },
});
