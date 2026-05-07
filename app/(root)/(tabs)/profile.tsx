import { useAuth } from '@clerk/expo'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Profile = () => {
  const { isSignedIn, isLoaded, signOut } = useAuth()
  return (
    <View className='flex-1 items-center justify-center'> 
      <Text className='pb-10'>Profile page</Text>
      <TouchableOpacity className='bg-red-400 rounded-xl p-4' onPress={()=>signOut()}><Text className='text-white font-semibold'>Log out</Text></TouchableOpacity>
    </View>
  )
}

export default Profile