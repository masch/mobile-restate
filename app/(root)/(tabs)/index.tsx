import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="my-10 font-rubik-bold text-3xl">Welcome to ReState</Text>

      <Link href="/sign-in">Sign In</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/properties/1">Property</Link>
    </View>
  );
}



/*

import { Text, View } from 'react-native';

export function SignIn() {
    return (
        <View>
            <Text>Sign In</Text>
        </View>
    );
}

export default SignIn;
*/