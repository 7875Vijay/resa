import useSaveProperty from "@/hooks/useSaveProperty";
import { Property } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
interface PropertyCardProp {
    property: Property,
}
export default function PropertyCard({ property}: PropertyCardProp) {
    const [isSaved, isSaving, toggleSave] = useSaveProperty(property.id);
    return (
        <TouchableOpacity
            className="mx-1 mb-2 flex-row p-1 items-start justify-between gap-2 rounded-3xl bg-white"
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

            <Image
                source={
                    property?.images?.[0]
                        ? { uri: property.images[0] }
                        : require('../assets/images/resalogo.png')
                }
                className="w-24 h-32 rounded-l-3xl"
                resizeMode="cover"
            />

            <View className="flex-1 items-start justify-between gap-2">
                <Text className="text-gray-900 font-bold">{property.title}</Text>
                <View className="pb-2 flex-row propertys-center justify-start">
                    <Ionicons name="location-outline" size={15} color="#6B7280" />
                    <Text
                        className="text-gray-500 text-xs"
                        numberOfLines={1}
                    >
                        {property.address}, {property.city}
                    </Text>
                </View>
                

                <View className="pb-2 px-2 flex-row propertys-center items-center justify-between gap-4">
                    <Text className="font-bold text-blue-400">
                        ₹{formatedPrice(property.price)}
                    </Text>
                    <View className="flex-row propertys-center justify-between gap-2">
                        <Text className="text-xs propertys-center justify-start" numberOfLines={1}>
                            <Ionicons name="bed-outline" size={15} color="#6B7280" />
                            {property.bedrooms}
                        </Text>

                        <Text className="text-xs propertys-center justify-start" numberOfLines={1}>
                            <Ionicons name="expand-outline" size={15} color="#6B7280" />
                            {property.area_sqft}
                        </Text>
                    </View>
                </View>

            </View>
            {
                isSaving ? 
                    <ActivityIndicator size="large" className='items-center justify-center' />
                :
                <TouchableOpacity onPress={()=>toggleSave()} className="flex items-center justify-center bg-white rounded-full p-3">
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

        </TouchableOpacity>
    );

    function formatedPrice(price: number): string {
        let formatedPriceString: string = "";
        if (price >= 10000000) {
            formatedPriceString = (price / 10000000).toFixed(1) + "Cr";
        } else if (price >= 100000) {
            formatedPriceString = (price / 100000).toFixed(1) + "L";
        }
        return formatedPriceString;
    }
}