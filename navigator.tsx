import React from 'react'
import { NavigationContainer, Link } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Image } from 'react-native'
import labels from './data/labels'
import Home from './screens/home'
import Login from './screens/login'
import Basket from './screens/basket'
import Register from './screens/register'
import PasswordRequest from './screens/password-request'
import Settings from './screens/settings'
import Countries from './screens/countries'
import AddCountry from './screens/add-country'
import Locations from './screens/locations'
import AddLocation from './screens/add-location'
import Products from './screens/products'
import AddProduct from './screens/add-product'
import ProductPacks from './screens/product-packs'
import ProductDetails from './screens/product-details'
import AddPack from './screens/add-pack'
import { Ionicons } from '@expo/vector-icons'
import { Button, Text } from 'react-native-ui-lib'
import { StoreContext } from './data/store'
import Logout from './screens/logout'

const LogoTitle = (props: any) => {
  return (
    <Image
      style={{width: 130}}
      source={require('./assets/dokaneh_logo.png')}
    />
  )
}
const BackButton = (props: any) => {
  return (
    <Button
      style={{margin: 10}}
      link
      onPress={() => props.navigation.navigate('Home')}
    >
      <Ionicons name='md-arrow-forward' style={{fontSize: 24}} />
    </Button>
  )
}
const MenuButton = (props: any) => {
  return (
    <Button
      style={{margin: 10}}
      link
      onPress={() => props.navigation.openDrawer()}
    >
      <Ionicons name='md-menu' style={{fontSize: 24}} />
    </Button>
  )
}
const HomeStack = createStackNavigator()
const HomeStackScreen = (props: any) => {
    return (
    <HomeStack.Navigator 
      screenOptions={{...TransitionPresets.SlideFromRightIOS}}
    >
      <HomeStack.Screen 
        name="Home"
        component={Home}
        options={{ 
          headerTitle: props => <LogoTitle {...props} />,
          headerTitleAlign: "center",
          headerLeft: () => <MenuButton {...props} />,
        }}
      />
      <HomeStack.Screen name='Basket' component={Basket} options={{title: labels.basket}} />
      <HomeStack.Screen name='Products' component={Products} options={{title: labels.products}} />
      <HomeStack.Screen name='AddProduct' component={AddProduct} options={{title: labels.addProduct}} />
      <HomeStack.Screen name='ProductPacks' component={ProductPacks} options={{title: labels.productPacks}} />
      <HomeStack.Screen name='ProductDetails' component={ProductDetails} options={{title: labels.productDetails}} />
      <HomeStack.Screen name='AddPack' component={AddPack} options={{title: labels.addPack}} />
      <HomeStack.Screen name='PackDetails' component={AddPack} options={{title: labels.addPack}} />
    </HomeStack.Navigator>  
  )
}

const LoginStack = createStackNavigator()
const LoginStackScreen = (props: any) => {
  return (
    <LoginStack.Navigator
      screenOptions={{...TransitionPresets.SlideFromRightIOS}}
    >
      <LoginStack.Screen 
        name="Login" 
        component={Login} 
        options={{ 
          headerLeft: () => <BackButton {...props} />,
        }}
      />
      <LoginStack.Screen name='Register' component={Register} />
      <LoginStack.Screen name='PasswordRequest' component={PasswordRequest} />
    </LoginStack.Navigator>  
  )
}

const SettingsStack = createStackNavigator()
const SettingsStackScreen = (props: any) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{...TransitionPresets.SlideFromRightIOS}}
    >
      <SettingsStack.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          title: labels.settings,
          headerLeft: () => <BackButton {...props} />,
        }}
      />
      <SettingsStack.Screen name='Countries' component={Countries} options={{title: labels.countries}} />
      <SettingsStack.Screen name='AddCountry' component={AddCountry} options={{title: labels.addCountry}} />
      <SettingsStack.Screen name='Locations' component={Locations} options={{title: labels.locations}} />
      <SettingsStack.Screen name='AddLocation' component={AddLocation} options={{title: labels.addLocation}} />
    </SettingsStack.Navigator>  
  )
}

const Drawer = createDrawerNavigator()
const Navigator = () => {
  const { state } = React.useContext(StoreContext)
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen 
          name="Home"
          component={HomeStackScreen}
          options={{
            title: labels.home,
          }}
        />
        {state.user ? 
          <Drawer.Screen 
            name="Logout"
            component={Logout}
            options={{
              title: labels.logout,
            }}
          />
        : <Drawer.Screen 
            name="Login"
            component={LoginStackScreen}
            options={{
              title: labels.login,
            }}
          />
        }
        {state.user && 
          <Drawer.Screen 
            name="Settings"
            component={SettingsStackScreen}
            options={{
              title: labels.settings,
            }}
          />
        }
      </Drawer.Navigator>
    </NavigationContainer>

  )
}

export default Navigator