import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable';
import { AnimatableManager, ThemeManager, Colors, BorderRadiuses, ListItem, Text, FloatingButton } from 'react-native-ui-lib'; //eslint-disable-line
import { FlatList, StyleSheet } from 'react-native'
import labels from '../data/labels'
import RNToast from './rntoast'
import { StoreContext } from '../data/store'

const Products = props => {
  const { state, dispatch } = useContext(StoreContext)
  const renderItem = ({ item }) => {
    const animationProps = AnimatableManager.presets.fadeInRight;
    const imageAnimationProps = AnimatableManager.getRandomDelay();

    return (
      <Animatable.View {...animationProps}>
        <ListItem
          activeBackgroundColor={Colors.dark60}
          activeOpacity={0.3}
          containerStyle={styles.border}
        >
          <ListItem.Part>
            <Animatable.Image
              source={{uri: item.imageUrl}}
              style={styles.image}
              {...imageAnimationProps}
            />
          </ListItem.Part>
          <ListItem.Part>
            <Text style={{fontSize: 16}}>{item.name}</Text>
          </ListItem.Part>
        </ListItem>
      </Animatable.View>
    )
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      {state.products.length === 0 ?
        <Text>{labels.noData}</Text>
      : <FlatList 
          data={state.products} 
          renderItem={renderItem} 
          keyExtractor={item => item.id}
        />
      }
      <FloatingButton
        visible={true}
        button={{
          label: labels.add, 
          onPress: () => props.navigation.navigate('AddProduct'), 
          labelStyle: {fontWeight: '400'}
        }}
      />
      <RNToast />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 54,
    height: 54,
    borderRadius: BorderRadiuses.br20,
    marginHorizontal: 14,
  },
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor,
  },
})

export default Products