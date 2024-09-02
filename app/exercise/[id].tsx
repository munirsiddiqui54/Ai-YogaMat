import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Page = () => {
    const {id} = useLocalSearchParams()
  return (
    <View>
      <Text style={{margin:100, fontSize:20}}>Page{id}</Text>
    </View>
  )
}

export default Page