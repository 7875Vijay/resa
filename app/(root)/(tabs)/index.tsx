import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/expo'

const HomeScreen = () => {
  const { isSignedIn, isLoaded, signOut } = useAuth();
  // signOut();
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen