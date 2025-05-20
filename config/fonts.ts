import { useFonts } from 'expo-font';

export function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    'Geist-Regular': require('../assets/fonts/Geist-Regular.ttf'),
    'Geist-Medium': require('../assets/fonts/Geist-Medium.ttf'),
    'Geist-Bold': require('../assets/fonts/Geist-Bold.ttf'),
    'Brenly-Regular': require('../assets/fonts/Brenly-Regular.otf'),
  });

  return { fontsLoaded };
}

// Font family names to use in styles
export const fontFamily = {
  geistRegular: 'Geist-Regular',
  geistMedium: 'Geist-Medium',
  geistBold: 'Geist-Bold',
  brenlyRegular: 'Brenly-Regular',
}; 