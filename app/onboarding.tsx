import React, { useState } from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";

import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    title: "Intuitive Simplicity",
    description: "Streamline your tasks effortlessly with our easy-to-use platform, ensuring a seamless experience for users at every level.",
    image: require("@/assets/icon.png"),
  },
  {
    title: "Endless Scrolling",
    description: "Dive into a never-ending stream of content designed to keep you engaged and connected to what matters most.",
    image: require("@/assets/icon-dark.png"),
  },
  {
    title: "Dark Mode Perfection",
    description: "Experience the comfort of true black backgrounds, giving your eyes the rest they deserve during extended scrolling sessions.",
    image: require("@/assets/icon.png"),
  },
];

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex(prev => prev + 1);
    } else {
      router.push("/sign-up");
    }
  };

  const handleSkip = () => {
    router.push("/sign-up");
  };

  return (
    <SafeAreaView className="flex flex-1 bg-background">
      <View className="flex-1 items-center justify-center p-6">
        <View className="w-full max-w-sm">
          <View className="flex-row justify-center items-center mb-12">
            {onboardingData.map((_, index) => (
              <View
                key={index}
                className={`h-3 w-3 rounded-full mx-2 ${
                  index === activeIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </View>

          <Image
            source={onboardingData[activeIndex].image}
            className="rounded-2xl"
            style={{ width: 250, height: 250, alignSelf: 'center', marginBottom: 40 }}
          />

          <H1 className="text-center mb-6">{onboardingData[activeIndex].title}</H1>
          <Muted className="text-center mb-12">{onboardingData[activeIndex].description}</Muted>

          <View className="flex-row gap-6 mt-8">
            {activeIndex < onboardingData.length - 1 ? (
              <>
                <Button
                  variant="secondary"
                  onPress={handleSkip}
                  className="flex-1"
                  size="default"
                >
                  <Text>Skip</Text>
                </Button>
                <Button
                  variant="default"
                  onPress={handleNext}
                  className="flex-1"
                  size="default"
                >
                  <Text>Next</Text>
                </Button>
              </>
            ) : (
              <Button
                variant="default"
                onPress={handleNext}
                size="default"
              >
                <Text>Get Started</Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
} 