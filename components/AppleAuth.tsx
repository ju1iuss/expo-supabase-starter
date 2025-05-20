import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Alert, ActivityIndicator } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { fontFamily } from '@/config/fonts';
import { useAuth } from '@/context/supabase-provider';

export default function AppleAuth() {
  const [loading, setLoading] = useState(false);
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState(false);
  const { signInWithApple } = useAuth();

  useEffect(() => {
    // Check if Apple authentication is available on this device
    async function checkAvailability() {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setIsAppleAuthAvailable(isAvailable);
    }
    
    checkAvailability();
  }, []);

  // Apple Sign In is only available on iOS and must be supported on the device
  if (Platform.OS !== 'ios' || !isAppleAuthAvailable) {
    return null;
  }

  function handleAppleAuthError(error: any) {
    // Handle specific Apple authentication errors
    if (error.code === 'ERR_REQUEST_CANCELED') {
      // User canceled sign-in, no need to show error
      console.log('User canceled Apple sign-in');
      return;
    }
    
    // Map authentication errors to user-friendly messages
    let errorMessage = 'An error occurred during Apple sign-in';
    
    switch (error.code) {
      case 'ERR_INVALID_RESPONSE':
        errorMessage = 'Invalid response from Apple. Please try again.';
        break;
      case 'ERR_INVALID_OPERATION':
        errorMessage = 'This Apple ID is not available for sign-in.';
        break;  
      case 'ERR_APPLE_AUTHENTICATION_UNAVAILABLE':
        errorMessage = 'Apple authentication is not available on this device.';
        break;
      case 'ERR_AUTHORIZATION_REQUEST_FAILED':
        errorMessage = 'Authorization request to Apple failed. Please try again later.';
        break;
      default:
        // Use error message from the error object if available
        errorMessage = error.message || errorMessage;
    }
    
    console.error('Error during Apple sign-in:', error);
    Alert.alert('Sign In Error', errorMessage);
  }

  async function handleAppleSignIn() {
    try {
      setLoading(true);
      
      // Request Apple authentication
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      // Got an Apple authentication credential - now use the context method
      if (credential.identityToken) {
        try {
          await signInWithApple(credential.identityToken);
        } catch (supabaseError: any) {
          // Handle Supabase authentication errors
          const errorMessage = supabaseError.message || 'Failed to authenticate with the server';
          Alert.alert('Authentication Error', errorMessage);
        }
      } else {
        throw new Error('No identity token provided from Apple');
      }
    } catch (error: any) {
      handleAppleAuthError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={[styles.loadingContainer, styles.button]}>
          <ActivityIndicator size="small" color="#FFFFFF" />
        </View>
      ) : (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={50}
          style={styles.button}
          onPress={handleAppleSignIn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
  },
  button: {
    width: '100%',
    height: 60,
  },
  loadingContainer: {
    backgroundColor: '#000000',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 