import React, { useState, useContext, useEffect } from 'react'
import { StoreContext } from '../data/store'
import { addProduct, getMessage } from '../data/actions'
import labels from '../data/labels'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image, ScrollView } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import RNToast from './rntoast'
import { TextField, FloatingButton, Picker, Button, Colors } from 'react-native-ui-lib'
import dropdown from '../assets/drop-down.png';

const AddProduct = props => {
  const { state, dispatch } = useContext(StoreContext)
  const [name, setName] = useState('')
  const [alias, setAlias] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [trademark, setTrademark] = useState('')
  const [country, setCountry] = useState('')
  const [imageUri, setImageUri] = useState('')
  const [categories] = useState(() => state.categories.map(c => {
    return {
      value: c.id,
      label: c.name
    }
  }))
  const [countries] = useState(() => state.countries.map(c => {
    return {
      value: c.id,
      label: c.name
    }
  }))
  const [isValid, setIsValid] = useState(false)
  useEffect(() => {
    setIsValid(name ? true : false)
  }, [name])
  const openImagePicker = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync()
    setImageUri(pickerResult.uri)
  }
  const handleSubmit = () => {
    try{
      if (state.products.find(p => p.categoryId === category.value && p.country === country.label && p.name === name && p.alias === alias)) {
        throw new Error('duplicateProduct')
      }
      const product = {
        name,
        alias,
        description,
        categoryId: category.value,
        trademark,
        country: country.label,
        sales: 0,
        rating: 0,
        ratingCount: 0,
        isArchived: false
      }
      addProduct(product, imageUri)
      dispatch({type: 'SET_MESSAGE', message: {type: 'm', text: labels.addSuccess}})
      props.navigation.goBack()
    } catch(err) {
			dispatch({type: 'SET_MESSAGE', message: {type: 'e', text: getMessage(props, err)}})
		}
  }
  return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{paddingHorizontal: 10}}>
          <TextField
            floatingPlaceholder
            placeholder={labels.name}
            onChangeText={e => setName(e)}
            floatOnFocus
          />
          <TextField
            floatingPlaceholder
            placeholder={labels.alias}
            onChangeText={e => setAlias(e)}
            floatOnFocus
          />
          <TextField
            floatingPlaceholder
            placeholder={labels.description}
            onChangeText={e => setDescription(e)}
            floatOnFocus
          />
          <TextField
            containerStyle={{marginBottom: 1}}
            floatingPlaceholder
            placeholder={labels.trademark}
            onChangeText={e => setTrademark(e)}
            floatOnFocus
          />
          <Picker
            placeholder={labels.category}
            floatingPlaceholder
            value={category}
            enableModalBlur={false}
            onChange={e => setCategory(e)}
            topBarProps={{title: labels.categories}}
            style={{color: Colors.red20}}
            rightIconSource={dropdown}
            showSearch
            searchPlaceholder={state.search}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.dark50}}
          >
            {categories.map(c => <Picker.Item key={c.value} value={c}/>)}
          </Picker>
          <Picker
            placeholder={labels.country}
            floatingPlaceholder
            value={country}
            enableModalBlur={false}
            onChange={e => setCountry(e)}
            topBarProps={{title: labels.countries}}
            style={{color: Colors.red20}}
            rightIconSource={dropdown}
            showSearch
            searchPlaceholder={state.search}
            searchStyle={{color: Colors.blue30, placeholderTextColor: Colors.dark50}}
          >
            {countries.map(c => <Picker.Item key={c.value} value={c}/>)}
          </Picker>
          <Button onPress={openImagePicker} label="pick an Image" />
          {imageUri ? <Image source={{uri: imageUri}} style={{width: 300, height: 300, resizeMode: 'contain', marginTop: 10}}/> : null}
        </ScrollView>
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
  )
}
export default AddProduct
