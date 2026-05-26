import AmenityCard from "@/components/amenityCard";
import ChatButton from "@/components/chatButton";
import MapViewCard from "@/components/mapViewCard";
import useSaveProperty from "@/hooks/useSaveProperty";
import { createClerkSupabaseClient, supabasePublicClient } from "@/lib/supabase";
import { userStore } from "@/store/userStore";
import { Property } from "@/types/types";
import { useAuth, useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageView from "react-native-image-viewing";


export default function PropertyDetails() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const { user } = useUser();
    const { getToken } = useAuth();
    const isAdmin = userStore((state) => state.isAdmin);
    const { width, height } = useWindowDimensions();
    const [isLoading, setIsLoading] = useState(false);
    const [property, setProperty] = useState<Property>();
    const [isSaved, isSaving, toggleSave] = useSaveProperty(id!)
    const [imageIndex, setImageIndex] = useState(0);
    const [toggleReadMore, setToggleReadMore] = useState(false);
    const [shortText, setShortText] = useState("");
    const [visibleImageView, setVisibleImageView] = useState(false);

    if (!id) {
        return;
    }

    useEffect(() => {
        fetchProperty(id)
    }, [id])

    useEffect(() => {
        if (property && property.description) {
            if (property.description.length > 150) {
                const descriptionSlice = property.description.slice(0, 150);
                setShortText(descriptionSlice);
            } else {
                setShortText(property.description);
            }
        }
    }, [property])

    async function fetchProperty(id: string) {
        try {
            setIsLoading(true);
            const { data, error } = await supabasePublicClient
                .from('properties')
                .select('*')
                .eq('id', id)
                .maybeSingle()
            if (data && !error) {
                setProperty(data);
            }
        }
        catch (err) {
            alert(`error while loadig property: ${err}`)
        }
        finally {
            setIsLoading(false);
        }
    }
    const onViewableItemsChanged = ({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setImageIndex(viewableItems[0].index + 1);
        }
    };

    function formatedPrice(price: number): string {
        let formatedPriceString: string = "";
        if (price >= 10000000) {
            formatedPriceString = (price / 10000000).toFixed(1) + "Cr";
        } else if (price >= 100000) {
            formatedPriceString = (price / 100000).toFixed(1) + "L";
        }
        return formatedPriceString;
    }
    const handleReadMore = () => {
        setToggleReadMore(previousState => !previousState);
    }

    const deleteProperty = async () => {
        try {
            setIsLoading(true);
            const supabase = createClerkSupabaseClient(getToken);
            const {data, error } = await supabase
                .from("properties")
                .delete()
                .eq("id", property?.id);

            if (!error) {
                router.back();
            }
            else {
                throw (error.message);
            }
        }
        catch (err) {
            alert(err);
        }
        finally {
            setIsLoading(false);
        }
    }

    const markSold = async () => {
        try {
            setIsLoading(true);
            const supabase = createClerkSupabaseClient(getToken);
            const { error } = await supabase
                .from("properties")
                .update({
                    is_sold: true
                })
                .eq("id", property?.id);

            if (!error) {
                await fetchProperty(id);
                alert("Property marked as sold!");
            }
            else {
                throw (error.message);
            }
        }
        catch (err) {
            alert(err);
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <>
        {
            visibleImageView ? 
            <ImageView
                images={property?.images.map((uri)=>({ uri }))!}
                imageIndex={imageIndex}
                visible={visibleImageView}
                animationType="fade"
                presentationStyle="fullScreen"
                doubleTapToZoomEnabled={true}
                onRequestClose={() => setVisibleImageView(false)}
                />
                :

        
        <View className="flex-1 bg-white">
            {
                isLoading ?
                    <View className='flex items-center justify-center w-full h-full'>
                        <ActivityIndicator size="large" className='items-center justify-center' />
                    </View>
                    :
                    property ?
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View className="relative">
                                <FlatList
                                    data={property?.images}
                                    keyExtractor={(image) => image}
                                    horizontal
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onViewableItemsChanged={onViewableItemsChanged}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={()=>setVisibleImageView((prev)=>!prev)}
                                        >
                                            <Image
                                                source={{ uri: item }}
                                                style={{ width, height: 300 }}
                                                resizeMode="cover"
                                            />
                                        </TouchableOpacity>
                                    )}
                                />

                                {/* BADGE INSIDE SAME RELATIVE CONTAINER */}
                                <View className="absolute bottom-5 right-5 bg-black/50 px-3 py-1 rounded-full">
                                    <Text className="text-white font-medium">
                                        {`${imageIndex}/${property?.images.length}`}
                                    </Text>
                                </View>
                            </View>
                            <SafeAreaView className="flex-row items-center justify-between absolute top-0 right-0 left-0 px-5">
                                <TouchableOpacity
                                    onPress={router.back}
                                    className="flex items-center justify-center bg-white rounded-full p-3">
                                    <Ionicons name="chevron-back-outline" size={25} />
                                </TouchableOpacity>
                                <View className="flex items-center justify-center bg-white rounded-full p-3">
                                    {
                                        isSaving ?
                                            <ActivityIndicator size="small" className='items-center justify-center' />
                                            :
                                            <TouchableOpacity onPress={() => toggleSave()}>
                                                {
                                                    isSaved === true ?
                                                        <Ionicons
                                                            name={"heart"}
                                                            size={25}
                                                            color={"#EF4444"}
                                                        />
                                                        :
                                                        <Ionicons
                                                            name={"heart-outline"}
                                                            size={25}
                                                            color={"#111827"}
                                                        />
                                                }
                                            </TouchableOpacity>
                                    }
                                </View>
                            </SafeAreaView>
                            <View className="flex-1 items-start justify-center mx-5 mt-5">
                                <View className="flex-row items-center justify-start mt-2">
                                    <Text className="text-sm font-bold text-blue-400">{property?.type}</Text>
                                </View>
                                <Text className="text-3xl font-bold text-left mt-5">
                                    {
                                        property?.title
                                    }
                                </Text>
                                <Text className="text-2xl font-bold text-left text-blue-400 mt-2">
                                    {
                                        `₹${formatedPrice(property?.price)}`
                                    }
                                </Text>
                                <View className="bg-blue-400/5 mt-5 flex-row items-center justify-center rounded-3xl p-2">

                                    <AmenityCard icon="bed-outline" value={property.bedrooms} label="Beds" />
                                    <AmenityCard icon="water-outline" value={property.bathrooms} label="Bath" />
                                    <AmenityCard icon="expand-outline" value={`${property.area_sqft} ft²`} label="Area" />
                                    <AmenityCard icon="home-outline" value={property.type} label="Type" />

                                </View>
                                <Text className="font-bold text-gray-900 mt-5">
                                    Description
                                </Text>
                                <View className="flex-1 items-start mt-2">
                                    {
                                        !toggleReadMore ?
                                            <Text className="text-sm text-gray-500">
                                                {
                                                    shortText
                                                }
                                            </Text>
                                            :
                                            <Text className="text-sm text-gray-500">
                                                {
                                                    property.description
                                                }
                                            </Text>
                                    }
                                    <TouchableOpacity onPress={handleReadMore}>
                                        <Text className="font-bold text-blue-400">
                                            {
                                                toggleReadMore ? "Read less" : "Read more"
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <Text className="font-bold text-gray-900 mt-5">
                                    Location
                                </Text>
                                <View className="flex-row propertys-center justify-start mt-2">
                                    <Ionicons name="location-outline" size={18} color="#6B7280" />
                                    <Text
                                        className="text-gray-500 text-sm"
                                        numberOfLines={1}
                                    >
                                        {property.address}, {property.city}
                                    </Text>
                                </View>
                                <View
                                    className="h-96 w-full rounded-2xl overflow-hidden mt-5 mb-5">
                                    <TouchableOpacity
                                        onPress={
                                            () => router.push({
                                                pathname: "/(root)/property/fullScreenMap",
                                                params: {
                                                    latitude: property.latitude,
                                                    longitude: property.longitude,
                                                    title: property.title,
                                                    address: `${property.address} ${property.city}`
                                                }
                                            })
                                        }
                                        className="absolute top-3 right-3 z-10 rounded-xl bg-white p-2 flex-1 items-center justify-center gap-2 px-3"
                                    >
                                        <Ionicons name="expand-outline" color="#252525" size={15} />
                                    </TouchableOpacity>
                                    <MapViewCard
                                        latitude={property.latitude}
                                        longitude={property.longitude}
                                        propertyTitle={property.title}
                                        propertyId={property.id}
                                    />
                                </View>
                                <ChatButton />
                                {
                                    isAdmin ?
                                        <View className="flex-row items-center justify-between w-full gap-2 mt-2 mb-5">
                                            <TouchableOpacity
                                                onPress={deleteProperty}
                                                className="bg-red-500 flex-1 flex-row items-center justify-center p-3 gap-2 rounded-xl">
                                                <Ionicons name="trash-outline" color="#ffffff" size={20} />
                                                <Text className="text-white font-bold text-md">
                                                    Delete
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={markSold}
                                                className="bg-yellow-500 flex-1 flex-row items-center justify-center p-3 gap-2 rounded-xl">
                                                <Ionicons name="checkmark-done-circle-outline" color="#ffffff" size={20} />
                                                <Text className="text-white font-bold text-md">
                                                    Mark sold
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        : null
                                }
                            </View>
                        </ScrollView>
                        :
                        <SafeAreaView className="flex-1 items-center justify-center h-full">
                            <Text className="font-bold text-gray-600">
                                Property not found
                            </Text>
                        </SafeAreaView>
            }
        </View>

        }
        </>
    );
}