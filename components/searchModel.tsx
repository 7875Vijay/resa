import { useFilterStore } from "@/store/propertySearchStore";
import { propertyTypes } from "@/types/propertyTypes";
//import propertySearchStoreType  from "@/types/propertySearchStoreType";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

interface SearchModelProps {
    showFilters: boolean
    setShowFilters: (value: boolean) => void
}

const TYPE_LIST: propertyTypes[] = [null, "apartment", "house", "villa", "studio"];

const BEDROOM_COUNTS = [null, 1, 2, 3, 4, 5];

const BATHROOM_COUNTS = [null, 1, 2, 3, 4, 5];

const PRICE_PRESETS = [
    { label: "Under ₹50L", min: null, max: 5000000 },
    { label: "₹50L – ₹1Cr", min: 5000000, max: 10000000 },
    { label: "₹1Cr – ₹2Cr", min: 10000000, max: 20000000 },
    { label: "Above ₹2Cr", min: 20000000, max: null },
];

export default function SearchModel({ showFilters, setShowFilters }: SearchModelProps) {
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
        setResetSearch,
    } = useFilterStore();


    const [chooseMinPrice, setChooseMinPrice] = useState<number | null>();
    const [chooseMaxPrice, setChooseMaxPrice] = useState<number | null>();

    useEffect(() => {
        setChooseMinPrice(minPrice);
        setChooseMaxPrice(maxPrice);
    }, [type, bedrooms, bathrooms, minPrice, maxPrice]);

    function applyFilters(){
        setMinPrice(chooseMinPrice!);
        setMaxPrice(chooseMaxPrice!);
        setShowFilters(!showFilters);
    }
    return (
        <Modal
            animationType="slide"
            visible={showFilters}
            presentationStyle="fullScreen"
            onRequestClose={() => setShowFilters(!showFilters)}
        >
            <ScrollView className="flex-1 py-5  px-5 rounded-t-3xl bg-gray-100">
                <View className="flex-row flex-wrap w-full  items-center justify-between">
                    <TouchableOpacity
                        onPress={() => setResetSearch()}
                        className="rounded-2xl bg-white p-2">
                        <Ionicons name='refresh-outline' size={20} color="#9CA3AF" />
                    </TouchableOpacity>

                    <Text className="text-gray-900 text-xl font-bold">Filters</Text>
                    <TouchableOpacity
                        onPress={() => setShowFilters(!showFilters)}
                        className="rounded-2xl bg-white p-2"
                    >
                        <Ionicons name='close' size={20} color="#9CA3AF" />

                    </TouchableOpacity>

                </View>
                <View className="px-5 pt-6 flex-1">
                    {/* select types */}
                    <Text className="text-gray-900 my-5 text-lg font-bold">Property Type</Text>
                    <View className="flex-row items-center justify-start gap-3">
                        {
                            TYPE_LIST.map((propertytype, index) => (
                                <TouchableOpacity
                                    onPress={() => setType(propertytype)}
                                    key={String(propertytype) + index} className={`rounded-xl shadow-sm p-3 ${propertytype === type ? "bg-blue-600" : "bg-white"}`}>
                                    <Text className={`${propertytype === type ? "text-white" : "text-gray-400"}`}>{propertytype === null ? "All" : propertytype}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    {/* bedrooms */}
                    <Text className="text-gray-900 my-5 text-lg font-bold">Bedrooms</Text>
                    <View className="flex-row items-center justify-start gap-3">
                        {
                            BEDROOM_COUNTS.map((bedroom, index) => (
                                <TouchableOpacity
                                    onPress={() => setBedrooms(bedroom)}
                                    key={String(bedroom) + index} className={`rounded-xl shadow-sm p-3 ${bedroom === bedrooms ? "bg-blue-600" : "bg-white"}`}>
                                    <Text className={`${bedroom === bedrooms ? "text-white" : "text-gray-400"}`}>{bedroom === null ? "All" : bedroom}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    {/* bathrooms */}
                    <Text className="text-gray-900 my-5 text-lg font-bold">Bathrooms</Text>
                    <View className="flex-row items-center justify-start gap-3">
                        {
                            BATHROOM_COUNTS.map((bathroom, index) => (
                                <TouchableOpacity
                                    onPress={() => setBathrooms(bathroom)}
                                    key={String(bathroom) + index} className={`rounded-xl shadow-sm p-3 ${bathroom === bathrooms ? "bg-blue-600" : "bg-white"}`}>
                                    <Text className={`${bathroom === bathrooms ? "text-white" : "text-gray-400"}`}>{bathroom === null ? "All" : bathroom}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    {/* minPrice and maxPrice */}
                    <Text className="text-gray-900 my-5 text-lg font-bold">Price Range</Text>
                    <View className="flex-row items-center justify-start">
                        <View className="flex-1 items-start w-full">
                            <Text className="text-gray-900 text-start text-sm"> Min Price </Text>
                            <TextInput
                                className="text-sm border border-gray-300 rounded-xl text-gray-400 mt-5 p-4"
                                placeholder="₹ Min Price"
                                placeholderTextColor="#9CA3AF"
                                value={chooseMinPrice?.toString() || ""}
                                onChangeText={(text) => setChooseMinPrice(text ? Number(text) : null)}
                                keyboardType="numeric"
                            />
                        </View>
                        <View className="flex-1 items-start w-full">
                            <Text className="text-gray-900  text-start text-sm"> Max Price </Text>
                            <TextInput
                                className="text-sm border border-gray-300 rounded-xl text-gray-400 mt-5 p-4"
                                placeholder="₹ Max Price"
                                placeholderTextColor="#9CA3AF"
                                value={chooseMaxPrice?.toString() || ""}
                                onChangeText={(text) => setChooseMaxPrice(text ? Number(text) : null)}
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    {/* preseted price */}
                    <View className="flex-row flex-wrap items-center justify-start mt-5 gap-3">
                        {
                            PRICE_PRESETS.map((preset) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setChooseMinPrice(preset.min);
                                        setChooseMaxPrice(preset.max);
                                    }}
                                    key={preset.min} className={`rounded-xl shadow-sm p-3 ${chooseMinPrice === preset.min && chooseMaxPrice === preset.max ? "bg-blue-600" : "bg-white"}`}>
                                    <Text className={`${chooseMinPrice === preset.min && chooseMaxPrice === preset.max ? "text-white" : "text-gray-400"}`}>{preset.label}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>

                    {/* apply button */}
                    <TouchableOpacity 
                    onPress={()=>applyFilters()}
                    className="w-full rounded-xl bg-blue-600 p-3 shadow-sm my-10 flex-1 items-center justify-center">
                        <Text className="text-white font-bold">Apply</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </Modal>
    );
}