import MapView, { Marker, UrlTile } from "react-native-maps";
import { View } from "react-native";

interface mapViewCardProp {
    latitude: number;
    longitude: number;
    propertyTitle: string;
    propertyId: string;
}

export default function MapViewCard({
    latitude,
    longitude,
    propertyTitle,
}: mapViewCardProp) {

    const region = {
        latitude: Number(latitude),
        longitude: Number(longitude),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    };

    return (
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
                title={propertyTitle}
            />
        </MapView>
    );
}