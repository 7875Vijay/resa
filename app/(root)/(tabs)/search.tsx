import PropertyCard from '@/components/propertyCard';
import SearchModel from '@/components/searchModel';
import { supabasePublicClient } from '@/lib/supabase';
import { useFilterStore } from '@/store/propertySearchStore';
import { Property } from '@/types/types';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Search() {
  const [results, setResults] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { openFilters } = useLocalSearchParams<{ openFilters?: string }>();

  useEffect(() => {
    if (openFilters === "true") {
      setShowFilters(true);
    }
  }, [openFilters]);

  const {
    search,
    type,
    bedrooms,
    bathrooms,
    minPrice,
    maxPrice,
    setSearch,
    setType,
    setBedrooms,
    setBathrooms,
    setMinPrice,
    setMaxPrice,
  } = useFilterStore();

  const activeFilterCount = [
    type !== null,
    bedrooms !== null,
    bathrooms !== null,
    minPrice !== null,
    maxPrice !== null,
  ].filter(Boolean).length;

  useEffect(() => {
    fetchProperties();
  }, [search, type, bedrooms, bathrooms, minPrice, maxPrice])

  async function fetchProperties() {
    try {
      setIsLoading(true);

      if (search.length > 3 || type || bedrooms || bathrooms || minPrice || maxPrice) {
        var queryResult = supabasePublicClient.from('properties').select('*');

        if (search) {
          queryResult = queryResult.or(`title.ilike.%${search}%,city.ilike.%${search}%`);
        }
        if (activeFilterCount > 0) {

          if (type) {
            queryResult = queryResult.eq("type", type);
          }

          if (bedrooms && bedrooms > 0) {
            queryResult = queryResult.eq("bedrooms", bedrooms);
          }

          if (bathrooms && bathrooms > 0) {
            queryResult = queryResult.eq("bathrooms", bathrooms);
          }

          if (minPrice && maxPrice) {
            queryResult = queryResult.gte("price", minPrice).lte("price", maxPrice);
          }
        }

        const { data: queryData, error } = await queryResult;

        if (error) {
          throw error;
        }

        setResults(queryData ?? [])
      }
      else {
        setResults([]);
      }
    }
    catch (err) {
      alert(`error while searching properties: ${err}`)
    }
    finally {
      setIsLoading(false);
    }
  }

  function formatedPrice(price: number): string {
    let formatedPriceString: string = "";
    if (price >= 10000000) {
      formatedPriceString = (price / 10000000).toFixed(1) + "Cr";
    } else if (price >= 100000) {
      formatedPriceString = (price / 100000).toFixed(1) + "L";
    }
    return formatedPriceString;
  }

  return (
    <SafeAreaView className='px-4 pt-2 flex-1 bg-white'>
      {
        !showFilters ?
          <View>
            <Text className='mx-1 text-2xl font-bold text-gray-900'>Find Property</Text>

            <View className='mx-1 my-5 flex-row gap-3 items-center'>
              <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 gap-3"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06,
                  shadowRadius: 6,
                  elevation: 2,
                }}>

                <Ionicons name="search-outline" size={18} color="#9CA3AF" />
                <TextInput
                  className="flex-1 text-sm text-gray-400"
                  placeholder="Search properties, cities..."
                  placeholderTextColor="#9CA3AF"
                  value={search}
                  onChangeText={setSearch}
                />

                {
                  search ?
                    <TouchableOpacity
                      onPress={() => setSearch("")}
                      className='bg-transparent'
                    >
                      <Ionicons name='close' size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                    : null
                }
              </View>
              <TouchableOpacity
                onPress={() => setShowFilters(true)}
                className={`w-11 h-11 rounded-2xl items-center justify-center ${activeFilterCount > 0 ? "bg-blue-600" : "bg-white"
                  }`}
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <Ionicons name="options-outline" size={20} color={activeFilterCount > 0 ? "#ffffff" : "#9CA3AF"} />
                {
                  activeFilterCount > 0 ?
                    <View className='absolute h-5 w-5 -top-1 -right-1 rounded-full shadow-sm shadow-red-300 bg-red-600 flex-1 items-center justify-center'>
                      <Text className='text-white text-[9px] font-bold'>{activeFilterCount}</Text>
                    </View>
                    : null
                }
              </TouchableOpacity>
            </View>
            <View className='flex-row items-center justify-start gap-3 flex-wrap'>
              {
                type ? (
                  <View className='p-0.5 gap-2 flex-row items-center justify-between rounded-full bg-blue-100 shadow-sm'>
                    <Text className='text-sm text-gray-900 font-bold'>{type}</Text>
                    <TouchableOpacity onPress={() => setType(null)} className='rounded-full  p-1'>
                      <Ionicons name='close' size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                )
                  : null
              }

              {
                bedrooms ? (
                  <View className='p-0.5 gap-2 flex-row items-center justify-between rounded-full bg-blue-100 shadow-sm'>
                    <Ionicons name='bed-outline' size={18} color="#9CA3AF" />
                    <Text className='text-sm text-gray-900 font-bold'>Beds - {bedrooms}</Text>
                    <TouchableOpacity onPress={() => setBedrooms(null)} className='ml-2 rounded-full  p-1'>
                      <Ionicons name='close' size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                )
                  : null
              }

              {
                bathrooms ? (
                  <View className='p-0.5 gap-2 flex-row items-center justify-between rounded-full bg-blue-100 shadow-sm'>
                    <Ionicons name='water-outline' size={18} color="#9CA3AF" />
                    <Text className='text-sm text-gray-900 font-bold'>Baths - {bathrooms}</Text>
                    <TouchableOpacity onPress={() => setBathrooms(null)} className='rounded-full  p-1'>
                      <Ionicons name='close' size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                )
                  : null
              }

              {
                minPrice && maxPrice ? (
                  <View className='p-0.5 gap-2 flex-row items-center justify-between rounded-full bg-blue-100 shadow-sm'>
                    <Ionicons name='pricetag-outline' size={18} color="#9CA3AF" />
                    <Text className='text-sm text-gray-900 font-bold'>Price - {formatedPrice(minPrice)} to {formatedPrice(maxPrice)}</Text>
                    <TouchableOpacity onPress={() => { setMinPrice(null); setMaxPrice(null); }} className='rounded-full  p-1'>
                      <Ionicons name='close' size={18} color="#9CA3AF" />
                    </TouchableOpacity>
                  </View>
                )
                  : null
              }


            </View>
          </View>
          :
          null
      }

      {
        isLoading ?
          <View className='flex items-center justify-center w-full flex-1'>
            <ActivityIndicator size="large" className='items-center justify-center' />
          </View>
          :
          results && results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={
                <>

                  <View className='mb-5 flex-1'>
                    <Text className='font-bold text-xl text-gray-900'>Recomonded</Text>
                  </View>
                </>
              }
              renderItem={
                ({ item }) => <PropertyCard property={item} />
              }
            />
          ) : null
      }

      <SearchModel showFilters={showFilters} setShowFilters={setShowFilters} />
    </SafeAreaView>
  )
}