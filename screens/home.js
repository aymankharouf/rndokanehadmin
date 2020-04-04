import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Colors } from 'react-native-ui-lib'
import labels from '../data/labels'
import { randomColors } from '../data/config'

const Home = props => {
  const [mainPages] = useState(() => [
    {id: 0, name: labels.orders, path: 'Orders'},
    {id: 1, name: labels.stores, path: 'Stores'},
    {id: 2, name: labels.products, path: 'Products'},
    {id: 3, name: labels.purchases, path: 'Purchases'},
    {id: 4, name: labels.customers, path: 'Customers'},
    {id: 5, name: labels.stock, path: 'Stock'},
    {id: 6, name: labels.spendings, path: 'Spendings'},
    {id: 7, name: labels.notifications, path: 'Notifications'},
  ])
  return (
    <SafeAreaView style={{flex:1}}>
      {mainPages.map(s =>
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

export default Home