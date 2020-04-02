import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, TextField, Button, Spacings, Keyboard } from 'react-native-ui-lib'
import { StoreContext } from '../data/store'

const AddCountry = props => {
  const { state } = useContext(StoreContext)
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    if (error) {
      showError(error)
      setError('')
    }
  }, [error])
  const handleSubmit = () => {
    try{
      if (state.countries.includes(name)) {
        throw new Error('duplicateName')
      }
      addCountry(name)
      showMessage(labels.addSuccess)
      props.navigation.goBack()
    } catch(err) {
			setError(getMessage(props, err))
		}
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <TextField
        text70
        containerStyle={{marginBottom: INPUT_SPACING}}
        floatingPlaceholder
        placeholder="FloatingPlaceholder"
        onChangeText={e => console.log('ee == ', e)}
        floatOnFocus
      />    
    </SafeAreaView>
  )
}

export default AddCountry