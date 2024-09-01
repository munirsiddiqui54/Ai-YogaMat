import { View, Text } from 'react-native'
import { StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'

const Profile= () => {
  return (
    <ScrollView style={styles.container}>
      Profile Page
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
      paddingHorizontal: 20,
      borderRadius: 20,
      marginTop:15,
      width: 950,
    }
})
export default Profile