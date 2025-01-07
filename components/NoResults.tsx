import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResults = () => {
  return (
    <View className='flex items-center my-5'>
      <Image source={images.noResult} className='w-11\12 h-80' resizeMode='contain'/>
      <Text className='text-black-300 text-2xl font-rubik-bold mt-5'>No Result </Text>
      <Text className='text-base text-black-300 mt-2'>We Could Not find any results.</Text>
    </View>
  )
}

export default NoResults