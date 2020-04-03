import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import labels from '../data/labels'
import { randomColors } from '../data/config'
import { Button, Colors } from 'react-native-ui-lib'

const Settings = props => {
  const [sections] = useState(() => [
    {id: 0, name: labels.countries, path: 'Countries'},
    {id: 1, name: labels.categories, path: 'Categories'},
    {id: 2, name: labels.locations, path: 'Locations'},
    {id: 3, name: labels.adverts, path: 'Adverts'}
  ])
  return (
    <SafeAreaView style={{flex: 1}}>
      {sections.map(s => 
        <Button
          fullWidth
          label={s.name}
          margin-10
          backgroundColor={Colors[`${randomColors[s.id].background}10`]}
          key={s.id}
          onPress={() => props.navigation.navigate(s.path)}
        />
      )}
    </SafeAreaView>
  )
}

export default Settings
