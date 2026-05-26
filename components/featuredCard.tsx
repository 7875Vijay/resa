import { Property } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface featuredCardProp {
    property: Property
}
export default function FeaturedCard({ property }: featuredCardProp) {
    
    return (
        <TouchableOpacity
            className="w-72 mr-4 my-2 rounded-3xl overflow-hidden bg-white"
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.88,
                shadowRadius: 12,
                elevation: 4,
                opacity: property.is_sold ? 0.5 : 1,
            }}
            onPress={() =>
                router.push(`/(root)/property/${property.id}`)
            }>

            {/* Image */}
            <Image
                source={{ uri: property.images[0] }}
                className="w-full h-44"
                resizeMode="cover"
            />

            <View className="absolute top-3 left-2 bg-white/90 rounded-3xl px-2 propertys-center justify-center">
                <Text className="text-sm font-bold text-blue-400">{property.type}</Text>
            </View>
            {
                property.is_sold ? 
                <View className="absolute top-3 right-2 bg-red-500 rounded-3xl px-2 propertys-center justify-center">
                    <Text className="text-sm font-bold text-white">Sold</Text>
                </View>
                : null
            }

            <Text
            className="pt-2 pb-2 px-2 text-gray-900 font-bold text-sm"
            >
                {property.title}
            </Text>

            <View className="pb-2 px-2 flex-row propertys-center justify-start">
                <Ionicons name="location-outline" size={15} color="#6B7280" />
                <Text
                className="text-gray-500 text-xs"
                numberOfLines={1}
                >
                    {property.address}, {property.city}
                </Text>
            </View>

            <View className="pb-2 px-2 flex-row propertys-center justify-between">
                <Text className="font-bold text-blue-400">
                    ₹{formatedPrice(property.price)}
                </Text>
                <View className="flex-row propertys-center justify-between gap-2">
                    <Text className="text-xs propertys-center justify-start" numberOfLines={1}>
                        <Ionicons name="bed-outline" size={15} color="#6B7280" />
                        {property.bedrooms}
                    </Text>
                    <Text className="text-xs propertys-center justify-start" numberOfLines={1}>
                        <Ionicons name="water-outline" size={15} color="#6B7280" />
                        {property.bathrooms}
                    </Text>
                </View>
            </View>
            
        </TouchableOpacity>
    );

    function formatedPrice(price: number): string{
        let formatedPriceString: string = "";
        if(price >= 10000000){
            formatedPriceString = (price/10000000).toFixed(1) + "Cr";
        }else if(price >= 100000){
            formatedPriceString = (price/100000).toFixed(1) + "L";
        }
        return formatedPriceString;
    }
}

