import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemeManager, Colors, ListItem, Text, FloatingButton, Button } from 'react-native-ui-lib'
import { StoreContext } from '../data/store'
import { FlatList, StyleSheet } from 'react-native'
import labels from '../data/labels'
import { Ionicons } from '@expo/vector-icons'
import RNDialog from './rndialog'
import { deleteCountry } from '../data/actions'
import RNToast from './rntoast'

const Countries = props => {
  const { state, dispatch } = useContext(StoreContext)
  const [dialogVisible, setDialogVisible] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const renderItem = ({ item }) => {
    return (
      <ListItem
        style={{justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: item.id === selectedId ? Colors.dark60 : null}}
        containerStyle={styles.border}
      >
        <ListItem.Part>
          <Text style={{fontSize: 16}}>{item.name}</Text>
        </ListItem.Part>
        <ListItem.Part>
          <Button
            style={{margin: 10}}
            link
            onPress={() => showDialog(item.id)}
          >
            <Ionicons name='ios-close' style={{fontSize: 40, margin: 10, color: 'red'}} />
          </Button>
        </ListItem.Part>
      </ListItem>
    )
  }
  const showDialog = id => {
    setSelectedId(id)
    setDialogVisible(true)
  }
  const handleOK = () => {
    deleteCountry(selectedId)
    dispatch({type: 'SET_MESSAGE', message: {type: 'm', text: labels.deleteSuccess}})
    setDialogVisible(false)
  }
  const dismissDialog = () => {
    setSelectedId('')
    setDialogVisible(false)
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      {state.countries.length === 0 ?
        <Text>{labels.noData}</Text>
      : <FlatList 
          data={state.countries} 
          renderItem={renderItem} 
          keyExtractor={item => item.id}
        />
      }
      <RNDialog dialogVisible={dialogVisible} dismissDialog={dismissDialog} handleOK={handleOK} />
      <FloatingButton
        visible={true}
        button={{
          label: labels.add, 
          onPress: () => props.navigation.navigate('AddCountry'), 
          labelStyle: {fontWeight: '400'}
        }}
      />
      <RNToast />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  border: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: ThemeManager.dividerColor
  }
})

export default Countries