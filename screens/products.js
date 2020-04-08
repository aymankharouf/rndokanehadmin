import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import { AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Text, FloatingButton, Dialog, LoaderScreen, Button, View } from 'react-native-ui-lib'
import { FlatList, StyleSheet } from 'react-native'
import labels from '../data/labels'
import RNToast from './rntoast'
import Search from './search'
import { StoreContext } from '../data/store'
import { productOfText, getCategoryName } from '../data/actions'
import { randomColors } from '../data/config'
import SearchButton from './search-button'

const Products = props => {
  const { state } = useContext(StoreContext)
  const [actionsVisible, setActionsVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [search, setSearch] = useState('')
  const [category] = useState(() => state.categories.find(c => c.id === props.route.params?.id))
  const [products, setProducts] = useState([])
  const [shownProducts, setShownProducts] = useState([])
  const [showAllVisible, setShowAllVisible] = useState(false)
  const [actions] = useState(() => [
    {label: labels.add, action: () => props.navigation.navigate('AddProduct')},
  ])
  useEffect(() => {
    setProducts(() => {
      let products = state.products.filter(p => props.route.params?.id === '-1' ? !state.packs.find(pa => pa.productId === p.id) || state.packs.filter(pa => pa.productId === p.id).length === state.packs.filter(pa => pa.productId === p.id && pa.price === 0).length : !props.route.params?.id || p.categoryId === props.route.params?.id)
      products = products.map(p => {
        const categoryInfo = state.categories.find(c => c.id === p.categoryId)
        return {
          ...p,
          categoryInfo
        }
      })
      return products.sort((p1, p2) => p1.categoryId === p2.categoryId ? (p1.name > p2.name ? 1 : -1) : (p1.categoryInfo.name > p2.categoryInfo.name ? 1 : -1))
    })
  }, [state.products, state.categories, state.packs, props.route.params?.id])
  useEffect(() => 
    props.navigation.setOptions({headerRight: () => <SearchButton setSearchVisible={setSearchVisible} />})
  , [])
  useEffect(() => {
    if (category) {
      props.navigation.setOptions({title: category.name})
    }
  }, [category])
  useEffect(() => {
    if (search) {
      setShownProducts(() => products.filter(p => p.name.includes(search)))
      setShowAllVisible(true)
    } else {
      setShownProducts(products)
      setShowAllVisible(false)
    }
  }, [search, products])
  const renderItem = item => {
    const animationProps = AnimatableManager.presets.fadeInRight;
    const imageAnimationProps = AnimatableManager.getRandomDelay();
    return (
      <Animatable.View {...animationProps}>
        <ListItem
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          height={80}
          containerStyle={styles.border}
          style={{alignItems: 'center'}}
          onPress={() => props.navigation.navigate('ProductPacks', {id: item.id})}
        >
          <ListItem.Part>
            <Animatable.Image
              source={{uri: item.imageUrl}}
              style={styles.image}
              {...imageAnimationProps}
            />
          </ListItem.Part>
          <ListItem.Part style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 14}}>{item.name}</Text>
            {item.alias ? <Text style={{fontSize: 12, color: 'red'}}>{item.alias}</Text> : null}
            <Text style={{fontSize: 12, color: 'blue'}}>{getCategoryName(item.categoryInfo, state.categories)}</Text>
            <Text style={{fontSize: 12, color: 'green'}}>{productOfText(item.trademark, item.country)}</Text>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    )
  }
  const handleAction = actionType => {
    setActionsVisible(false)
    actionType.action()
  }
  let i = 0
  if (!state.productsStatus) return <LoaderScreen color={Colors.blue30} overlay />
  return (
    <SafeAreaView style={{flex: 1}}>
      {showAllVisible ? <View style={{alignItems: 'center'}}><Button outline size={Button.sizes.xSmall} style={{width: '50%', marginBottom: 5}} label={labels.showAll} onPress={() => setSearch('')} /></View>: null}
      {products.length === 0 ?
        <Text>{labels.noData}</Text>
      : <FlatList 
          data={shownProducts} 
          renderItem={({ item }) => renderItem(item)} 
          keyExtractor={item => item.id}
        />
      }
      <FloatingButton
        visible={true}
        button={{
          label: labels.actions, 
          onPress: () => setActionsVisible(true), 
          labelStyle: {fontWeight: '400'}
        }}
      />
      <RNToast />
      <Search searchVisible={searchVisible} setSearchVisible={setSearchVisible} setSearch={setSearch} />
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
  image: {
    width: 60,
    height: 60,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
})

export default Products