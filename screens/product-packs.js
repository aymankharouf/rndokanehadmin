import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeManager, View, Card, Button, Text, FloatingButton, Dialog, ListItem, Colors } from 'react-native-ui-lib'
import { StoreContext } from '../data/store'
import labels from '../data/labels'
import RatingStars from './rating-stars'
import { FlatList, Alert, StyleSheet } from 'react-native'
import { randomColors } from '../data/config'

const ProductPacks = props => {
  const { state } = useContext(StoreContext)
  const [product] = useState(() => state.products.find(p => p.id === props.route.params.id))
  const [packs, setPacks] = useState([])
  const [activePacks, setActivePacks] = useState([])
  const [actionsVisible, setActionsVisible] = useState(false)
  const [actions, setActions] = useState([])
  useEffect(() => {
    setPacks(() => {
      const packs = state.packs.filter(p => p.productId === props.route.params.id)
      return packs.sort((p1, p2) => p2.price - p1.price)
    })
  }, [state.packs, props.route.params.id])
  useEffect(() => {
    setActivePacks(() => packs.filter(p => p.price > 0))
  }, [packs])
  useEffect(() => {
    const actions = [
      {label: labels.details, action: () => props.navigation.navigate('ProductDetails', {id: props.route.params.id})},
      {label: labels.addPack, action: () => props.navigation.navigate('AddPack', {id: props.route.params.id})},
      {label: labels.addOffer, action: () => props.navigation.navigate('AddOffer', {id: props.route.params.id})},
      {label: labels.addBulk, action: () => props.navigation.navigate('AddBulk', {id: props.route.params.id})},
    ]
    if (activePacks.length === 0) {
      actions.push({label: labels.archive, action: () => handleArchive()})
    }
    if (packs.length === 0) {
      actions.push({label: labels.delete, action: () => handleDelete()})
    }
    setActions(actions)
  }, [activePacks, packs])
  useEffect(() => {
    if (product) {
      props.navigation.setOptions({title: `${product.name}${product.alias ? '-' + product.alias : ''}`})
    }
  }, [product])
  const handleDelete = () => {
    Alert.alert(
      labels.confirmationTitle,
      labels.deleteConfirmation,
      [
        {text: labels.yes, onPress: () => {
          deleteProduct(product)
          showMessage(labels.deleteSuccess)
          props.navigation.goBack()
        }},
        {text: labels.cancel, style: 'cancel'},
      ],
      {cancelable: false},
    )
  }
  const handleArchive = () => {
    console.log('archive')
  }
  const renderItem = item => {
    return (
      <ListItem
        activeBackgroundColor={Colors.dark60}
        activeOpacity={0.3}
        containerStyle={styles.border}
        onPress={() => props.navigation.navigate('PackDetails', {id: item.id})}
      >
        <ListItem.Part>
          <Text style={{fontSize: 16, paddingHorizontal: 10}}>{item.name}</Text>
        </ListItem.Part>
      </ListItem>
    )
  }
  const handleAction = actionType => {
    setActionsVisible(false)
    actionType.action()
  }
  let i = 0
  return (
    <SafeAreaView style={{flex: 1}}>
      <Card style={{marginHorizontal: 10}}>
        <Card.Image height={250} imageSource={{uri: product.imageUrl}} />
        <View padding-20>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: 20}}>
              {`${product.name}${product.alias ? '-' + product.alias : ''}`}
            </Text>
            <RatingStars rating={product.rating} count={product.ratingCount} />
          </View>
          <View>
            <Text style={{fontSize: 16}}>
              {product.description}
            </Text>
          </View>
        </View>
      </Card>
      <FlatList 
        data={packs} 
        renderItem={({ item }) => renderItem(item)} 
        keyExtractor={item => item.id}
        style={{margin: 10}}
      />
      <FloatingButton
        visible={true}
        button={{
          label: labels.actions, 
          onPress: () => setActionsVisible(true), 
          labelStyle: {fontWeight: '400'}
        }}
      />
      <Dialog
        useSafeArea
        bottom
        visible={actionsVisible}
        containerStyle={{backgroundColor: 'white'}}
        onDismiss={() => setActionsVisible(false)}
      >
        <View style={{marginTop: 20, marginHorizontal: 20}}>
          {actions.map(s =>
            <Button
              fullWidth
              label={s.label}
              style={{margin: 5, backgroundColor: randomColors[i++]}}
              key={i}
              onPress={() => handleAction(s)}
            />
          )}
        </View>
      </Dialog>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
})

export default ProductPacks
