import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import PropertyCard from '@/components/propertyCard'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '@clerk/expo'
import { Property } from '@/types/types'
import { useFocusEffect } from 'expo-router'
import { supabasePublicClient } from '@/lib/supabase'
import { SavedProperties } from '@/types/savedProperties'
import { Ionicons } from '@expo/vector-icons'

const Saved = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const [savedProperties, setSavedProperties] = useState<SavedProperties[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  //on page is in focus mode
  useFocusEffect(
    // useCallback called when the any property will updated
    useCallback(() => {
      if(!user?.id){
        return;
      }
      fetchSavedProperties();
    }, [])
  );

  useEffect(() => {
    fetchProperties();
  }, [savedProperties])

  async function fetchSavedProperties() {
    try {
      setIsLoading(true);
      const { data: saved, error } = await supabasePublicClient
        .from('saved_properties')
        .select('*')
        .eq('user_clerk_id', user?.id)
        .order("created_at", { ascending: false });
      if (saved && !error) {
        setSavedProperties(saved);
      }
    }
    catch (err) {
      alert(`error while loadig properties: ${err}`)
    }
    finally {
      setIsLoading(false);
    }
  }

  async function fetchProperties() {
    try {
      setProperties([]); //clearr
      setIsLoading(true);
      if (savedProperties) {
        savedProperties.forEach((sp, index) => {
          fetchPropertyDetails(sp);
        });
      }
    }
    catch (err) {
      alert(`error while loadig saved properties: ${err}`)
    }
    finally {
      setIsLoading(false);
    }
  }

  async function fetchPropertyDetails(sp: SavedProperties) {
    const { data: property, error } = await supabasePublicClient
        .from('properties')
        .select('*')
        .eq('id', sp.property_id)
        .maybeSingle();

    if (property && !error) {
        setProperties(prev => [...prev, property]);
    }
}
  return (
    <SafeAreaView className='px-4 py-5 flex-1 bg-white'>
      {
        isLoading ?
          <View className='flex items-center justify-center w-full h-full'>
            <ActivityIndicator size="large" className='items-center justify-center' />
          </View>
          :
          <FlatList
            data={properties}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View className='mx-1 mb-5 flex-1'>
                  <Text className='text-2xl font-bold text-gray-900'>Saved Property</Text>
                  <Text className='text-sm text-gray-400'>{properties.length} saved properties</Text>
                </View>
            }
            ListEmptyComponent={
              <View className='flex-1 items-center justify-center'>
                <View className='w-20 h-20 rounded-full bg-red-50 items-center justify-center mb-4'>
                  <Ionicons name='heart-outline' size={36} color={"#EF4444"}/>
                </View>
                <Text className='text-center font-bold text-xl text-gray-900'>
                  No saved properties
                </Text>
                <Text className='text-center text-sm text-gray-400'>
                  Tap the heart icon of any property to add it here
                </Text>
              </View>
            }
            renderItem={
              ({ item }) => <PropertyCard property={item} />
            }
          />
      }
    </SafeAreaView>
  )
}
export default Saved