import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Animated, Dimensions, AppState, SafeAreaView } from 'react-native';
import { PlaceholdersAndVanishInput2 } from '@/components/PlaceHolderAndVanish';
import { Stack } from 'expo-router';

export default function SearchInput(){
  return (
    <Stack.Screen
    options={{
      header: () => {
        return (
          <SafeAreaView>
          <PlaceholdersAndVanishInput2
        placeholders={['Search', 'Find something', 'Type here...']}
        onChange={(text) => console.log(text)}
        onSubmit={() => console.log('Submitted')}
      />
      </SafeAreaView>
        )
      },
      headerBackButtonMenuEnabled: false,
    }}>
    </Stack.Screen>
  );
}
