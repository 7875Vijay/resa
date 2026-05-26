import { Ionicons } from "@expo/vector-icons";
import { Linking, TouchableOpacity, Text } from "react-native";

export default function ChatButton() {

    const handleWhatsAppChat = async () => {
        const phoneNumber = "918830564686";

        const message = "Hello, I am interested in your property";

        const url =
            `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

        try {
            await Linking.openURL(url);
        } catch (error) {
            alert("WhatsApp is not installed");
        }
    };

    return (
        <TouchableOpacity
            onPress={handleWhatsAppChat}
            className="w-full flex-row items-center justify-center gap-2 mt-2 bg-green-400 rounded-xl p-3"
        >
            <Ionicons name="logo-whatsapp" color="#ffffff" size={20} />
            <Text className="text-white font-bold text-md">
                Chat with agent
            </Text>
        </TouchableOpacity>
    );
}