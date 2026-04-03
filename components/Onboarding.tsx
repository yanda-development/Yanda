import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { onboardingSlides, OnboardingSlide } from "../constants/onboardingData";
import { colors, typography, fonts } from "../constants/globalStyles";

const { width, height } = Dimensions.get("window");

interface ProgressDotsProps {
  scrollX: Animated.Value;
  slides: OnboardingSlide[];
  activeDotColor: string;
}

const ProgressDots = ({
  scrollX,
  slides,
  activeDotColor,
}: ProgressDotsProps) => {
  return (
    <View style={styles.newDotsContainer}>
      {slides.map((_, dotIndex) => {
        const dotInputRange = [
          (dotIndex - 1) * width,
          dotIndex * width,
          (dotIndex + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange: dotInputRange,
          outputRange: [width * 0.015, width * 0.075, width * 0.015],
          extrapolate: "clamp",
        });

        const dotOpacity = scrollX.interpolate({
          inputRange: dotInputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={dotIndex}
            style={[
              styles.dot,
              {
                width: dotWidth,
                opacity: dotOpacity,
                backgroundColor: activeDotColor,
              },
            ]}
          />
        );
      })}
    </View>
  );
};

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const backgroundColor = "#0a0f1e";
  const textColor = "#ffffff";
  const buttonColor = colors.accent;
  const buttonTextColor = colors.primary;
  const activeDotColor = colors.accent;

  const handleNext = () => {
    if (currentIndex < onboardingSlides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handleGetStarted = () => {
    onComplete();
  };

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: false,
    },
  );

  const onMomentumScrollEnd = (event: any) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const renderItem = ({
    item,
    index,
  }: {
    item: OnboardingSlide;
    index: number;
  }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: "clamp",
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [height * 0.03, 0, height * 0.03],
      extrapolate: "clamp",
    });

    const ImageComponent = item.image;

    return (
      <View style={[styles.slide, { width }]}>
        <View style={styles.bubbleContainer}>
          <View style={[styles.bubble1, { backgroundColor: colors.accent }]} />
          <View style={[styles.bubble2, { backgroundColor: colors.accent }]} />
          <View style={[styles.bubble3, { backgroundColor: colors.accent }]} />
          <View style={[styles.bubble4, { backgroundColor: colors.accent }]} />
          <View style={[styles.bubble5, { backgroundColor: colors.accent }]} />
          <View style={[styles.bubble6, { backgroundColor: colors.accent }]} />
        </View>

        <Animated.View
          style={[
            styles.illustrationContainer,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          <ImageComponent width="100%" height="100%" />
        </Animated.View>

        <Animated.View
          style={[
            styles.content,
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.textContainer}>
            <Text style={[styles.title, { color: textColor }]}>
              {item.title.toUpperCase()}
            </Text>
            <Text style={[styles.description, { color: textColor }]}>
              {item.description}
            </Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        style={styles.skipButton}
        onPress={handleGetStarted}
        activeOpacity={0.8}
      >
        <Text style={[styles.skipText, { color: textColor }]}>SKIP</Text>
      </TouchableOpacity>

      <Animated.FlatList
        ref={flatListRef}
        data={onboardingSlides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        onScroll={onScroll}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />

      <View style={styles.bottomNavigation}>
        {currentIndex < onboardingSlides.length - 1 ? (
          <>
            <ProgressDots
              scrollX={scrollX}
              slides={onboardingSlides}
              activeDotColor={activeDotColor}
            />

            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: buttonColor }]}
              onPress={handleNext}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.nextButtonText,
                  { color: buttonTextColor, fontFamily: fonts.semiBold },
                ]}
              >
                NEXT
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <ProgressDots
              scrollX={scrollX}
              slides={onboardingSlides}
              activeDotColor={activeDotColor}
            />

            <TouchableOpacity
              style={[styles.nextButton, { backgroundColor: buttonColor }]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.nextButtonText,
                  { color: buttonTextColor, fontFamily: fonts.semiBold },
                ]}
              >
                GET STARTED
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipButton: {
    position: "absolute",
    top: height * 0.06,
    right: width * 0.06,
    zIndex: 10,
    padding: height * 0.01,
  },
  skipText: {
    fontSize: typography.skip.fontSize,
    fontWeight: typography.skip.fontWeight,
    fontFamily: typography.skip.fontFamily,
    letterSpacing: typography.skip.letterSpacing,
    opacity: typography.skip.opacity,
  },
  slide: {
    flex: 1,
    paddingHorizontal: width * 0.06,
  },
  bubbleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
  },
  bubble1: {
    position: "absolute",
    top: height * 0.08,
    left: width * 0.1,
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.125,
    opacity: 0.08,
  },
  bubble2: {
    position: "absolute",
    top: height * 0.15,
    right: width * 0.05,
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    opacity: 0.06,
  },
  bubble3: {
    position: "absolute",
    top: height * 0.5,
    left: width * 0.05,
    width: width * 0.22,
    height: width * 0.22,
    borderRadius: width * 0.11,
    opacity: 0.05,
  },
  bubble4: {
    position: "absolute",
    bottom: height * 0.25,
    right: width * 0.15,
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    opacity: 0.07,
  },
  bubble5: {
    position: "absolute",
    bottom: height * 0.4,
    left: width * 0.2,
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: width * 0.06,
    opacity: 0.06,
  },
  bubble6: {
    position: "absolute",
    top: height * 0.35,
    right: width * 0.25,
    width: width * 0.14,
    height: width * 0.14,
    borderRadius: width * 0.07,
    opacity: 0.07,
  },
  illustrationContainer: {
    width: "100%",
    height: height * 0.55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.16,
    zIndex: 1,
  },
  newDotsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  dot: {
    height: height * 0.005,
    borderRadius: height * 0.0025,
    marginHorizontal: width * 0.01,
  },
  content: {
    height: height * 0.23,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: height * 0.02,
    zIndex: 1,
  },
  textContainer: {
    maxWidth: width * 0.85,
    alignItems: "flex-start",
  },
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    fontFamily: typography.title.fontFamily,
    letterSpacing: typography.title.letterSpacing,
    textAlign: "left",
    marginBottom: height * 0.008,
    lineHeight: typography.title.lineHeight,
  },
  description: {
    fontSize: typography.description.fontSize,
    fontWeight: typography.description.fontWeight,
    fontFamily: typography.description.fontFamily,
    letterSpacing: typography.description.letterSpacing,
    textAlign: "left",
    lineHeight: typography.description.lineHeight,
    opacity: 0.7,
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.06,
    marginBottom: height * 0.04,
    zIndex: 1,
  },
  nextButton: {
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.06,
    borderRadius: width * 0.02,
    alignItems: "center",
    minWidth: width * 0.35,
  },
  nextButtonText: {
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
    letterSpacing: typography.button.letterSpacing,
    textTransform: typography.button.textTransform as any,
  },
});
