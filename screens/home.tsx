import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-ui-lib'
import labels from '../data/labels'
import { randomColors } from '../data/config'
import { StoreContext } from '../data/store'

const Home = (props: any) => {
  const { state } = React.useContext(StoreContext)
  const [mainPages] = useState(() => [
    {name: labels.orders, path: 'Orders'},
    {name: labels.stores, path: 'Stores'},
    {name: labels.products, path: 'Products'},
    {name: labels.purchases, path: 'Purchases'},
    {name: labels.customers, path: 'Customers'},
    {name: labels.stock, path: 'Stock'},
    {name: labels.spendings, path: 'Spendings'},
    {name: labels.notifications, path: 'Notifications'},
  ])
  let i = 0
  return (
    <SafeAreaView style={{flex: 1}}>
      {mainPages.map(s =>
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

export default Home