import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export function Property() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Property {id}</Text>
        </View>
    );
}

export default Property;