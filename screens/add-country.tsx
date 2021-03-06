import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextField, FloatingButton } from 'react-native-ui-lib'
import { StoreContext } from '../data/store'
import labels from '../data/labels'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import { addCountry, getMessage } from '../data/actionst'
import RNToast from './rntoast'

const AddCountry = (props: any) => {
  const { state, dispatch } = useContext(StoreContext)
  const [name, setName] = useState('')
  const [isValid, setIsValid] = useState(false)
  useEffect(() => {
    setIsValid(name ? true : false)
  }, [name])
  const handleSubmit = () => {
    try{
      if (state.countries.find(c => c.name === name)) {
        throw new Error('duplicateName')
      }
      addCountry(name)
      dispatch({type: 'SET_MESSAGE', payload: {type: 'm', text: labels.addSuccess}})
      props.navigation.navigate('Home')
    } catch(err) {
      dispatch({type: 'SET_MESSAGE', payload: {type: 'e', text: getMessage(props.route.name, err)}})
		}
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={{flex: 1, margin: 10}}>
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.name}
          onChangeText={(e: string) => setName(e)}
          floatOnFocus
        />
        <FloatingButton
          visible={isValid}
          button={{
            label: labels.submit, 
            onPress: () => handleSubmit(), 
            labelStyle: {fontWeight: '400'}
          }}
        />
        <RNToast />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default AddCountry