import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Button } from 'react-native-ui-lib'

const SearchButton = (props: any) => {
  return (
    <Button
      style={{margin: 10}}
      link
      onPress={() => props.setSearchVisible(true)}
    >
      <Ionicons name='md-search' style={{fontSize: 24}} />
    </Button>
  )
}

export default SearchButton