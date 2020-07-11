import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import labels from '../data/labels'
import { randomColors } from '../data/config'
import { Button } from 'react-native-ui-lib'

const Settings = (props: any) => {
  const [sections] = useState(() => [
    {id: 0, name: labels.countries, path: 'Countries'},
    {id: 1, name: labels.categories, path: 'Categories'},
    {id: 2, name: labels.locations, path: 'Locations'},
    {id: 3, name: labels.adverts, path: 'Adverts'}
  ])
  let i = 0
  return (
    <SafeAreaView style={{flex: 1}}>
      {sections.map(s => 
        <Button
          fullWidth
          label={s.name}
          style={{margin: 5, backgroundColor: randomColors[i++]}}
          key={i}
          onPress={() => props.navigation.navigate(s.path)}
        />
      )}
    </SafeAreaView>
  )
}

export default Settings
