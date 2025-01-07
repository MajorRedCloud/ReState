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

export default function Explore() {

  const params = useLocalSearchParams<{query?:string, filter?:string}>()

  const {data: properties, loading: propertiesLoading, refetch} = useAppwrite({
    fn: getProperties,
    params: {
      filter: params.filter!,
      query: params.query!,
      limit: 20
    },
    skip:true
  })

  useEffect(() => {
    refetch({
      filter: params.filter!,
      query: params.query!, 
      limit: 20
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
        ListHeaderComponent={

          <View className="px-5 mt-4">
            <View className="flex flex-row items-center justify-between mb-5">
              <TouchableOpacity onPress={() => router.back()} className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                <Image source={icons.backArrow} className="size-5 "/>
              </TouchableOpacity>

              <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">
                Search for your Ideal Home
              </Text>

              <Image source={icons.bell} className="w-6 h-6 mr-1"/>

            </View>
            <Search />

            <View className="mt-5">
              <Filter />
              <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                Found {properties?.length} results
              </Text>
            </View>
          </View>
        }
      />
      
    </SafeAreaView>
    
  );
}
