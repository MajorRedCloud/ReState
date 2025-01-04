import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import icons from '@/constants/icons'
import { useDebouncedCallback } from 'use-debounce'

const Search = () => {

    const pathname = usePathname()
    const params = useLocalSearchParams<{query?: string}>()
    const [query, setQuery] = useState(params.query || '')

    const debouncedSearch = useDebouncedCallback((text:string) => router.setParams({query:text}), 500)

    const handleSearch = (text:string) => {
        setQuery(text)
        debouncedSearch(text)
    }


  return (
    <View className='flex flex-row items-center justify-between w-full px-4 rounded-lg bg-accent-100 border-primary-100 py-1'>
      <View className='flex flex-row items-center'>
        <Image source={icons.search} className='size-5' resizeMode='contain'/>
        <TextInput 
            value={query}
            onChangeText={handleSearch}
            placeholder='Search something...'
            placeholderClassName='flex justify-end items-center text-center'
            className='text-sm ml-2 font-rubik text-black-300 flex flex-1'
        />
        <TouchableOpacity>
            <Image source={icons.filter} className='size-5'/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Search