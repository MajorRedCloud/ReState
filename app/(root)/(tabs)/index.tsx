import { FeaturedCards, ProfileCards } from "@/components/Cards";
import Filter from "@/components/Filter";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { getLatestProperties, getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/globalProvider";
import seed from "@/lib/seed";
import { useAppwrite } from "@/lib/useAppwrite";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Button, FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

  const { user } = useGlobalContext()
  const params = useLocalSearchParams<{query?:string, filter?:string}>()

  const {data: latestProperties, loading: latestPropertiesLoading} = useAppwrite({
    fn: getLatestProperties
  })

  const {data: properties, loading: propertiesLoading, refetch} = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 8
    },
    skip:true
  })

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!, 
      limit: 8
    })
  }, [params.filter, params.query])

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`)
  }
  

  return (
    <SafeAreaView className="bg-white h-full pb-16">
      <StatusBar barStyle={'dark-content'} animated />

      <FlatList
        data={properties}
        renderItem={({item}) => (<ProfileCards item={item} onPress={() => handleCardPress(item.$id)}/>)}
        keyExtractor={(item => item.name.toString())}
        numColumns={2}
        contentContainerClassName="pb-16"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={propertiesLoading ? (<ActivityIndicator size={'large'} className="mt-5 text-primary-300" />) :  (<NoResults />)}
        ListHeaderComponent={<View className="px-5">
        
          {/* most outer view */}
          <View className="w-full items-center justify-between flex flex-row mt-4">
            
            {/* outer view that contains image and greetings and name*/}
            <View className="flex flex-row items-center justify-between">
              
              {/* inner view containing image */}
              <View className="items-center">
                <Image source={{uri: user?.avatar}} resizeMode="contain" className="size-12 rounded-full"/>
              </View>
  
              {/* inner view containing greetings and profile name */}
              <View className="flex flex-col gap-1 ml-3 pt-1">
                <Text className="text-xs font-rubik-light text-black-200">Good Morning</Text>
                <Text className="text-base text-black-300 font-rubik-semibold">{user?.name}</Text>
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
  

          {latestPropertiesLoading ? (<ActivityIndicator size={'large'} className="text-primary-300" />) : !latestProperties || latestProperties.length===0 ? (<NoResults />) : (
          <FlatList 
            data={latestProperties} 
            renderItem={({item}) => (<FeaturedCards item={item} onPress={() => handleCardPress(item.$id)}/>)}
            keyExtractor={(item => item.name.toString())}
            horizontal  
            showsHorizontalScrollIndicator={false}
            bounces={false}
            ListEmptyComponent={<NoResults />}
            contentContainerClassName="flex gap-5 mt-3"
          />)}
  
          {/* headings for profile cards */}
          <View className="flex flex-row items-center justify-between mt-7">
            <Text className="text-xl font-rubik-bold">Our Recommendations</Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
            </TouchableOpacity>
          </View>
          
          {/* filtering categories */}
          <Filter />
  
          {/* profile cards */}
  
        </View>}
      />
      
    </SafeAreaView>
    
  );
}
