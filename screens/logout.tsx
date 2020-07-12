import React from 'react'
import { logout } from '../data/actionst'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native'

const Logout = (props: any) => {
  React.useEffect(() => {
    logout()
    props.navigation.goBack()
  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>PackDetails</Text>
    </SafeAreaView>  )
}

export default Logout