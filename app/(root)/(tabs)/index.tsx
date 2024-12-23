import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center"
    >
      <Text className="text-red-800 font-rubik my-10 text-3xl">Hello there kenobi</Text>
      <Link href={'/sign-in'}>Sign-in</Link>
      <Link href={'/(root)/(tabs)/explore'}>explore</Link>
      <Link href={'/(root)/(tabs)/profile'}>Profile</Link>
      <Link href={'/properties/12345'}>Properties</Link>  

    </View>
  );
}
