import "../global.css";

import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { AuthProvider } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";
import { colors } from "@/constants/colors";
import { useCustomFonts } from "@/config/fonts";

export default function AppLayout() {
	const { colorScheme, setColorScheme } = useColorScheme();
	const { fontsLoaded } = useCustomFonts();
	
	// Force dark mode on app load
	useEffect(() => {
		setColorScheme("dark");
	}, []);

	// Show loading screen while fonts are loading
	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.dark.background }}>
				<ActivityIndicator size="large" color={colors.dark.foreground} />
			</View>
		);
	}

	return (
		<AuthProvider>
			<Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
				<Stack.Screen name="(protected)" />
				<Stack.Screen name="welcome" />
				<Stack.Screen name="onboarding" />
				<Stack.Screen
					name="sign-up"
					options={{
						presentation: "modal",
						headerShown: false,
						gestureEnabled: true,
					}}
				/>
				<Stack.Screen
					name="sign-in"
					options={{
						presentation: "modal",
						headerShown: false,
						gestureEnabled: true,
					}}
				/>
			</Stack>
		</AuthProvider>
	);
}
