import { FeaturedCards, ProfileCards } from "@/components/Cards";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { Link } from "expo-router";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full pb-16">
      <StatusBar barStyle={'dark-content'} animated />
      <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
        
        {/* most outer view */}
        <View className="w-full items-center justify-between flex flex-row mt-4">
          
          {/* outer view that contains image and greetings and name*/}
          <View className="flex flex-row items-center justify-between">
            
            {/* inner view containing image */}
            <View className="items-center">
              <Image source={images.avatar} resizeMode="contain" className="size-12 rounded-full"/>
            </View>

            {/* inner view containing greetings and profile name */}
            <View className="flex flex-col gap-1 ml-3 pt-1">
              <Text className="text-xs font-rubik-light text-black-200">Good Morning</Text>
              <Text className="text-base text-black-300 font-rubik-semibold">Profile Name</Text>
            </View>
          </View>

          {/* notification icon */}
          <Image source={icons.bell} resizeMode="contain" className="size-6 mr-3"/>
        </View>

        {/* search bar */}
        <View className="w-full flex items-center my-5">
          <Search />
        </View>

        {/* headings for featured cards */}
        <View className="flex flex-row items-center justify-between mt-1">
          <Text className="text-xl font-rubik-bold">Featured</Text>
          <TouchableOpacity>
            <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Cards */}
        <View className="flex flex-row gap-5 mt-5">
          <FeaturedCards />
          <FeaturedCards />
        </View>

        {/* headings for profile cards */}
        <View className="flex flex-row items-center justify-between mt-7">
          <Text className="text-xl font-rubik-bold">Our Recommendations</Text>
          <TouchableOpacity>
            <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
          </TouchableOpacity>
        </View>

        {/* profile cards */}
        <View className="flex flex-row gap-5 mt-5">
          <ProfileCards />
          <ProfileCards />

        </View>


      </ScrollView>
    </SafeAreaView>
    
  );
}
