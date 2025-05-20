import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";

import { Image } from "@/components/image";
import { SafeAreaView } from "@/components/safe-area-view";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

export default function WelcomeScreen() {
	const router = useRouter();
	const { colorScheme } = useColorScheme();
	const appIcon =
		colorScheme === "dark"
			? require("@/assets/icon.png")
			: require("@/assets/icon-dark.png");

	return (
		<SafeAreaView className="flex flex-1 bg-background p-6">
			<View className="flex flex-1 items-center justify-center gap-y-6 web:m-4">
				<Image 
					source={appIcon} 
					className="rounded-xl" 
					style={{ width: 150, height: 150, marginBottom: 20 }}
				/>
				<H1 className="text-center mb-4">Welcome to Doomscroller</H1>
				<Muted className="text-center mb-6 px-4">
					Your endless scrolling companion for when you just can't get enough of the void.
				</Muted>
				<Muted className="text-center px-4">
					Sign in with email or Apple account to sync your content across devices.
				</Muted>
			</View>
			<View className="flex flex-col gap-y-6 web:m-4 mb-8">
				<Button
					size="default"
					variant="default"
					onPress={() => {
						router.push("/onboarding");
					}}
				>
					<Text>Get Started</Text>
				</Button>
				<Button
					size="default"
					variant="secondary"
					onPress={() => {
						router.push("/sign-in");
					}}
				>
					<Text>Sign In</Text>
				</Button>
			</View>
		</SafeAreaView>
	);
}
