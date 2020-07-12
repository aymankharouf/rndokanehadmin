import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StoreContext } from '../data/store'
import { login, logout, getMessage } from '../data/actionst'
import labels from '../data/labels'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'
import RNToast from './rntoast'
import { TextField, FloatingButton } from 'react-native-ui-lib'

const Login = (props: any) => {
  const { state, dispatch } = React.useContext(StoreContext)
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [isValid, setIsValid] = React.useState(false)
  React.useEffect(() => {
    if (state.user) {
      logout()
      props.navigation.goBack()
    }
  }, [])
  React.useEffect(() => {
    setIsValid(email && password ? true : false)
  }, [email, password])
  const handleSubmit = async () => {
    try{
      await login(email, password)
      dispatch({type: 'SET_MESSAGE', payload: {type: 'm', text: labels.loginSuccess}})
      props.navigation.goBack()
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
          placeholder={labels.email}
          onChangeText={(e: string) => setEmail(e)}
          floatOnFocus
        />
        <TextField
          containerStyle={{marginBottom: 1}}
          floatingPlaceholder
          placeholder={labels.password}
          onChangeText={(e: string) => setPassword(e)}
          floatOnFocus
        />
        <FloatingButton
          visible={isValid}
          button={{
            label: labels.login, 
            onPress: () => handleSubmit(), 
            labelStyle: {fontWeight: '400'}
          }}
        />
        <RNToast />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

export default Login