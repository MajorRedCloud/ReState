import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'

export const FeaturedCards = ({onPress} : {onPress?: () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress} className='flex flex-col items-start w-60 h-80 relative mt-3'>
        <Image source={images.japan} className='size-full rounded-2xl' />
        <Image source={images.cardGradient} className='size-full rounded-2xl absolute bottom-0'/>

        <View className='flex flex-row items-center justify-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5' >
            <Image source={icons.star} className='size-4'/>
            <Text className='text-base ml-1 font-extrabold text-primary-300'>4.5</Text>
        </View>

        <View className='flex flex-col items-start absolute bottom-5 inset-x-5 gap-2'>
            <Text className='text-xl font-rubik-extrabold text-white' numberOfLines={1}>Modern Appartment</Text>
            <Text className='text-base font-rubik text-white'>22W Sector 61, Mumbai</Text>

            <View className='flex flex-row items-center justify-between w-full'>
                <Text className='text-xl font-rubik-extrabold text-white'>₹25,000</Text>
                <Image source={icons.heart} className='size-5'/>
            </View>
        
        </View>
    </TouchableOpacity>
  )
}

export const ProfileCards = ({onPress}: {onPress?: () => {}}) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex flex-1 w-full mt-4 px-3 py-4 rounded-lg bg-white shadow-lg shadow-black-100/70 relative'>
            <View className='flex flex-row items-center bg-white/90 px-2 p-1 rounded-full absolute top-5 right-5 z-50' >
            <Image source={icons.star} className='size-2.5'/>
            <Text className='text-xs ml-0.5 font-extrabold text-primary-300'>4.5</Text>
        </View>

        <Image source={images.newYork} className='w-full h-40 rounded-lg'/>

        <View className='flex flex-col mt-2'>
            <Text className='text-base font-rubik-bold text-black-300' numberOfLines={1}>Cozy Studio</Text>
            <Text className='text-xs font-rubik text-black-200'>78F Sector 20, Delhi</Text>

            <View className='flex flex-row items-center justify-between mt-2'>
                <Text className='text-base font-rubik-bold text-primary-300'>₹25,000</Text>
                <Image source={icons.heart} className='w-5 h-5 mr-2 ' tintColor={'#191d31'}/>
            </View>
        </View>
        </TouchableOpacity>
    )
}
