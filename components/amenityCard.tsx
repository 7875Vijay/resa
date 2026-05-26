import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface amenityCardProp{
    icon: keyof typeof Ionicons.glyphMap;
    value: string | number;
    label: string;
}
export default function AmenityCard( { icon, value, label } : amenityCardProp){
    return (
        <View className="flex-1 items-center justify-between bg-transparent gap-2">
            <Ionicons name={icon} size={20} color="#2563EB" />
            <Text className="font-bold text-gray-900">
                {
                    value
                }
            </Text>
            <Text className="text-gray-500 text-xs">{label}</Text>
        </View>
    );
}