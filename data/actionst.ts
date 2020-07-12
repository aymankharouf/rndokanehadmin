import firebase from './firebase'
import labels from './labels'
import { iError, iProduct, iCategory } from './interfaces'

export const getMessage = (screen: string, error: iError) => {
    const errorCode = error.code ? error.code.replace(/-|\//g, '_') : error.message
    if (!labels[errorCode]) {
      const logRef = firebase.database().ref('logs').push()
      logRef.set({
        userId: firebase.auth().currentUser?.uid,
        error: error.code,
        screen,
        time: new Date()
      })
    }
    return labels[errorCode] || labels['unknownError']
  }

  export const addCountry = (name: string) => {
    const countryRef = firebase.database().ref('countries').push()
    countryRef.set({name})
  }

  export const deleteCountry = (id: string) => {
    firebase.database().ref('countries/' + id).remove()
  }
  
  export const addProduct = async (product: iProduct, imageUri: string) => {
    let imageUrl = ''
    if (imageUri) {
      const response = await fetch(imageUri)
      const imageFile = await response.blob()
      const fileData = await firebase.storage().ref().child('products/' + Math.random().toString()).put(imageFile)
      imageUrl = await firebase.storage().ref().child(fileData.metadata.fullPath).getDownloadURL()
    }
    product['imageUrl'] = imageUrl
    const productRef = firebase.database().ref('products').push()
    productRef.set(product)
  }

  export const deleteProduct = async (product: iProduct) => {
    if (product.imageUrl) {
      try{
        await firebase.storage().ref().child('products/' + product.id + '.jpg').delete()
      } catch {
        await firebase.storage().ref().child('products/' + product.id + '.jpeg').delete()
      }  
    }
    firebase.firestore().collection('products').doc(product.id).delete()
  }

  export const productOfText = (trademark: string, country: string) => {
    return trademark ? `${labels.productFrom} ${trademark}-${country}` : `${labels.productOf} ${country}`
  }
  
  export const getCategoryName = (category?: iCategory) => {
    // if (category.parentId === '0') {
    //   return category.name
    // } else {
    //   const categoryParent = categories.find(c => c.id === category.parentId)
    //   return getCategoryName(categoryParent, categories) + '-' + category.name
    // }
    return category?.name || ''
  }

  export const login = (email: string, password: string) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  }
  
  export const logout = () => {
    firebase.auth().signOut()
  }