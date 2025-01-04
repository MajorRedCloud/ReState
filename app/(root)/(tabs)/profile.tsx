import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import images from '@/constants/images';
import { settings } from '@/constants/data';
import { useGlobalContext } from '@/lib/globalProvider';
import { logout } from '@/lib/appwrite';

declare type SettingsItemProps = {
  icon: any,
  title: string,
  onPress?: () => void,
  textStyle?: string,
  showArrow?: boolean
}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true} : SettingsItemProps) => (
  <TouchableOpacity onPress={onPress ? onPress : () => {}}
                    className='flex flex-row justify-between items-center py-3 w-full'>
    <View className='flex flex-row gap-3 items-center flex-1'>
      <Image source={icon} resizeMode='contain' className='size-7'/>
      <Text className={`font-rubik-semibold text-black-300 text-lg ${textStyle}`}>{title}</Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className='size-5'/>}

  </TouchableOpacity>
)

const Profile = () => {

  const {user, refetch} = useGlobalContext()
  


  // todo logout
  const handleLogout = async () => {
    const result = await logout()
    if (result){
      Alert.alert('Logged out successfully')
      refetch()
    } else {
      Alert.alert('An error occurred while logging out')
    }
  };

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView showsVerticalScrollIndicator={false}
                  contentContainerClassName='pb-24 px-8'>
          <View className='flex flex-row justify-between items-center my-5'>
            <Text className='text-2xl font-rubik-bold'>Profile</Text>
            <Image source={icons.bell} alt='notifications' resizeMode='contain' className='size-7'/>
          </View>

          <View className='flex flex-row justify-center'>
            <View className='flex flex-col items-center relative'>
              <Image source={{uri: user?.avatar}} alt='avatar' className='size-40 rounded-full'/>
              <TouchableOpacity className='absolute bottom-10 right-2'>
                <Image source={icons.edit} alt='edit' className='size-7'/>
              </TouchableOpacity>
              <Text className='text-2xl font-rubik-bold mt-3'>{user?.name}</Text>
            </View>
          </View>


          <View className='flex flex-col mt-5'>
            <SettingsItem icon={icons.calendar} title='My Bookings' />
            <SettingsItem icon={icons.wallet} title='Payments' />
          </View>

          <View className='border-t flex flex-col mt-5 border-primary-200 pt-3'>
            {settings.slice(2).map((item, index) => (<SettingsItem key={index} icon={item.icon} title={item.title}/>))}
            <SettingsItem icon={icons.logout} title='Logout' textStyle='text-red-500' onPress={handleLogout} showArrow={false} />
          </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile