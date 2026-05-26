import MapView, { Marker, UrlTile } from "react-native-maps";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function FullScreenMap() {
    const { latitude, longitude, title, address } = useLocalSearchParams<{
        latitude: string,
        longitude: string,
        title: string,
        address: string
    }>();

    const region = {
        latitude: Number(latitude),
        longitude: Number(longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <View className="flex-row items-center justify-between gap-2 pb-5 px-5">
                <TouchableOpacity
                    onPress={router.back}
                    className="flex-row items-center justify-start">
                    <Ionicons name="chevron-back-outline" size={25} />
                    <View>
                        <Text
                            className="flex-wrap text-gray-900 font-bold text-sm"
                        >
                            {title}
                        </Text>
                        <View className="flex-row propertys-center justify-center flex-wrap mt-2">
                            <Ionicons name="location-outline" size={18} color="#6B7280" />
                            <Text
                                className="text-gray-500 text-xs"
                                numberOfLines={1}
                            >
                                {address}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => Linking.openURL(`https://www.google.com/maps/?q=${region.latitude},${region.longitude}`)}
                    className="flex-row items-center justify-center bg-gray-900 rounded-full p-2">
                    <Image
                        source={require('@/assets/images/maps.png')}
                        className="w-8 h-8"
                        resizeMode="contain"
                    />
                    <Text className="text-white font-bold text-start">Google Maps</Text>
                </TouchableOpacity>
            </View>
            <MapView
                style={{ flex: 1 }}
                initialRegion={region}
            >
                <UrlTile
                    urlTemplate="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    maximumZ={19}
                />

                <Marker
                    coordinate={region}
                    title={title}
                />
            </MapView>
        </SafeAreaView>
    );
}