import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/globalProvider'
import { Redirect } from 'expo-router'

const SignIn = () => {

  const {refetch, loading, isLoggedIn} = useGlobalContext()

  if(!loading && isLoggedIn) {
    return <Redirect href='/' />
  }

  const handleLoginWithGoogle = async () => {
    console.log("logging in with google")
    const result = await login()

    if (result) {
      refetch()
    }
    else {
      Alert.alert("Error", "An error occurred while trying to login")
    }
  }

  return (
    <SafeAreaView className='flex flex-1 bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <Image 
          source={images.onboarding}
          className='w-full h-4/6'
          resizeMode='contain'
        />
        <View className='items-center justify-center py-2 px-10'>
          <Text className='text-center font-rubik-medium text-black-200 text-xl'>WELCOME TO RESTATE</Text>

          <Text className='text-center font-rubik-bold text-black-300 text-3xl my-3'>
            Lets get you closer to {''}
            <Text className="text-primary-300">
               Your Dream Home
            </Text>
          </Text>

          <Text className='text-xl font-rubik mt-7 text-black-200 text-center'>
            Login to restate with Google
          </Text>

          <TouchableOpacity
          // todo replace onPress with google login function
            onPress={handleLoginWithGoogle}
            className='bg-white shadow-lg shadow-zinc-300 rounded-full w-full py-4 mt-5 items-center flex-row justify-center'
          >
            <Image 
              source={icons.google}
              alt='google icon'
              className='h-5 w-5 mr-3 items-center'
              resizeMode='contain'
            />
            <Text className='font-semibold text-lg '>Login With Google</Text>

          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn