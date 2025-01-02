import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import icons from '@/constants/icons'

const TabIcon = ({focused, icon, title}: {
    focused: boolean,
    icon: any,
    title: string
}) => (
    <View className='flex-1 mt-2 flex flex-col items-center'>
        <Image source={icon} tintColor={focused ? '#8B5DFF' : '#666876'}
                resizeMode='contain'
                className='size-6'/>
        <Text className={`${focused ? 'text-primary-300 font-rubik-semibold' : 'text-black-200 font-rubik-medium'} text-xs w-full mt-1 text-cewnter`}>
            {title}
        </Text>
    </View>

)

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{tabBarShowLabel: false,
                        tabBarStyle: {
                            backgroundColor: 'white',
                            position: 'absolute',
                            borderTopColor: '#0061FF1A',
                            borderTopWidth: 1,
                            minHeight: 60,
                            alignContent: 'center'
                        }
                        
        }}
    >
      <Tabs.Screen 
            name='index'
            options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.home} title='Home' focused={focused}/>
                )
            }}    
        />

        <Tabs.Screen 
            name='explore'
            options={{
                title: 'Explore',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.search} title='Explore' focused={focused}/>
                )
            }}    
        />

        <Tabs.Screen 
            name='profile'
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <TabIcon icon={icons.person} title='Profile' focused={focused}/>
                )
            }}    
        />

      
    </Tabs>
  )
}

export default TabsLayout