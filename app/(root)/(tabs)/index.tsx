import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth, useUser } from '@clerk/expo'
import { supabasePublicClient } from '@/lib/supabase'
import { Property } from '@/types/types'
import { router, useFocusEffect } from 'expo-router'
import PropertyCard from '@/components/propertyCard'
import { Ionicons } from '@expo/vector-icons'
import FeaturedCard from '@/components/featuredCard'
import useSaveProperty from '@/hooks/useSaveProperty'

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [featuredProperties, setFeaturedProperties] = useState<Property[]>([]);
  const [recomondedProperties, setRecomondedProperties] = useState<Property[]>([]);
  //on page is in focus mode
  useFocusEffect(
    // useCallback called when the any property will updated
    useCallback(() => {
      fetchProperties();
    }, [])
  );

  async function fetchProperties() {
    try {
      setIsLoading(true);
      const { data: featured } = await supabasePublicClient
        .from('properties')
        .select('*')
        .eq('is_featured', true)
        .order("created_at", { ascending: false });

      const { data: recomonded } = await supabasePublicClient
        .from('properties')
        .select('*')
        .eq('is_featured', false)
        .order("created_at", { ascending: false });

      setFeaturedProperties(featured ?? []);
      setRecomondedProperties(recomonded ?? []);
    }
    catch (err) {
      alert(`error while loadig properties: ${err}`)
    }
    finally {
      setIsLoading(false);
    }
  }
  // signOut();
  return (
    <SafeAreaView className='px-4 pt-2 flex-1 bg-white'>
      {
        isLoading ?
          <View className='flex items-center justify-center w-full h-full'>
            <ActivityIndicator size="large" className='items-center justify-center' />
          </View>
          :
          <FlatList
            data={recomondedProperties}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <>
                {/* Header */}
                <View className='flex-row items-center justify-between'>
                  <Image source={require("@/assets/images/resalogo.png")}
                    className='w-20 h-14 mb-8'
                    resizeMode='contain'
                  />
                  <View className='text-right'>
                    <Text className='font-normal text-gray-900'>Good morning 👋</Text>
                    <Text className='text-right font-bold'>{user?.firstName}</Text>
                  </View>
                </View>

                {/* Search */}
                <TouchableOpacity
                  onPress={() => router.push("/(root)/(tabs)/search")}
                  className="mx-1 px-4 py-2 gap-3 flex-1 rounded-2xl flex-row items-center bg-white"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.06,
                    shadowRadius: 6,
                    elevation: 2,
                  }}>
                  <Ionicons name="search-outline" size={18} color="#9CA3AF" />
                  <Text className='text-sm text-gray-400 flex-1'>Search properties, cities...</Text>
                  <TouchableOpacity
                    onPress={() =>
                      router.push("/(root)/(tabs)/search?openFilters=true")
                    }
                    className='rounded-xl h-8 w-8 items-center justify-center bg-blue-600'>
                    <Ionicons name="options-outline" size={15} color="white" />
                  </TouchableOpacity>
                </TouchableOpacity>

                {/* Featured */}
                <View className='mx-1 mb-5 flex-1'>
                  <Text className='font-bold text-xl text-gray-900'>Featured</Text>
                  {
                    isLoading ?
                      <View className='flex items-center justify-center w-full'>
                        <ActivityIndicator className='h-100 w-100 items-center justify-center' />
                      </View>
                      :
                      <FlatList
                        data={featuredProperties}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        keyExtractor={(item) => item.id}
                        renderItem={
                          ({ item }) => <FeaturedCard property={item} />
                        }
                      />
                  }
                </View>
                <View className='mx-1 mb-5 flex-1'>
                  <Text className='font-bold text-xl text-gray-900'>Recomonded</Text>
                </View>
              </>
            }
            renderItem={
              ({ item }) => <PropertyCard property={item} />
            }
          />
      }
    </SafeAreaView>
  )
}

export default HomeScreen