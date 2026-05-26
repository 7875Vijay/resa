import { useAuth, useUser } from '@clerk/expo'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from "expo-image-picker"
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const profileitemlist = [
  {
    icon: "heart-outline",
    label: "Saved properties",
    navigationbtn: () => {
      router.push('/(root)/(tabs)/saved');
    }
  },
  {
    icon: "notifications-outline",
    label: "Notifications",
    navigationbtn: () => { }
  },
  {
    icon: "settings-outline",
    label: "Settings",
    navigationbtn: () => { }
  },
  {
    icon: "help-circle-outline",
    label: "Help and support",
    navigationbtn: () => { }
  },
]
const Profile = () => {
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleUpdateProfileImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library to update your profile picture."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
        base64: true,
      });

      if (result.canceled) return;

      setIsLoading(true);

      const base64Image = result.assets[0].base64;
      const uri = result.assets[0].uri;
      const filename = uri.split("/").pop() || "profile.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const mimeType = match ? `image/${match[1]}` : "image/jpeg";
      const dataUrl = `data:${mimeType};base64,${base64Image}`;

      await user?.setProfileImage({ file: dataUrl });

      Alert.alert("Success", "Profile picture updated successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error);
      Alert.alert(
        "Error",
        "Failed to update profile picture. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <SafeAreaView className='bg-white flex-1 items-center py-20'>
      <View className='relative'>
        {/* <Ionicons size={10} name="person-circle-outline" color="#68aae8"/> */}
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 100, height: 100 }}
          className='rounded-full mb-4'
          resizeMode="cover"
        />
        <View className='absolute bottom-5 right-0 bg-blue-600 rounded-full items-center justify-center p-2'>
          <TouchableOpacity
            onPress={() => { handleUpdateProfileImage() }}
          >
            {isLoading ? <ActivityIndicator size="small" color='#ffffff' /> : <Ionicons name="camera" color="#ffffff" size={20} />}
          </TouchableOpacity>
        </View>
      </View>

      <Text className='text-xl font-bold text-center text-gray-900'>
        {
          `${user?.firstName} ${user?.lastName}`
        }
      </Text>
      <Text className='text-sm text-center text-gray-400'>
        {
          `${user?.emailAddresses}`
        }
      </Text>

      <FlatList
        data={profileitemlist}
        keyExtractor={item => item.icon}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        // ListHeaderComponent={
        //     <View className='mx-1 mb-5 flex-1'>
        //       <Text className='text-2xl font-bold text-gray-900'>Saved Property</Text>
        //       <Text className='text-sm text-gray-400'>{properties.length} saved properties</Text>
        //     </View>
        // }
        // ListEmptyComponent={
        //   <View className='flex-1 items-center justify-center'>
        //     <View className='w-20 h-20 rounded-full bg-red-50 items-center justify-center mb-4'>
        //       <Ionicons name='heart-outline' size={36} color={"#EF4444"}/>
        //     </View>
        //     <Text className='text-center font-bold text-xl text-gray-900'>
        //       No saved properties
        //     </Text>
        //     <Text className='text-center text-sm text-gray-400'>
        //       Tap the heart icon of any property to add it here
        //     </Text>
        //   </View>
        // }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={item.navigationbtn}
            className="w-full flex-row items-center justify-between bg-gray-50 px-5 py-5 rounded-2xl"
          >

            <View className="flex-row items-center gap-4">
              <Ionicons
                name={item.icon as any}
                size={22}
                color="#6B7280"
              />

              <Text className="text-gray-800 font-medium text-base">
                {item.label}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#D1D5DB"
            />
          </TouchableOpacity>
        )}
      />

    </SafeAreaView>
  )
}

export default Profile