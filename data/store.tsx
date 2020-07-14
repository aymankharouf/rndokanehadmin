import React from 'react'
import Reducer from './reducer'
import firebase from './firebase'
import { iState, iContext, iCategory, iPack, iPackPrice, iPasswordRequest, iAdvert, iLocation, iCountry, iProduct, iOrder, iUser, iNotification, iAlarm, iRating, iInvitation, iCustomer, iStore, iStorePayment, iPurchase, iStockTrans, iSpending, iMonthlyTrans, iLog } from './interfaces'

export const StoreContext = React.createContext({} as iContext)

const Store = (props: any) => {
  const initState: iState = {
    categories: [],
    countries: [],
    products: [],
    packs: [],
    packPrices: [],
    passwordRequests: [],
    adverts: [],
    orders: [],
    users: [],
    notifications: [],
    alarms: [],
    ratings: [],
    invitations: [],
    customers: [],
    stores: [],
    storePayments: [],
    purchases: [],
    stockTrans: [],
    spendings: [],
    monthlyTrans: [],
    logs: []
  }
  const [state, dispatch] = React.useReducer(Reducer, initState)
  
  React.useEffect(() => {
    firebase.database().ref('categories').on('value', docs => {
      let categories: iCategory[] = []
      docs.forEach(doc => {
        categories.push({...doc.val(), id:doc.key})
      })
      dispatch({type: 'SET_CATEGORIES', payload: categories})
    })
    firebase.database().ref('packs').on('value', docs => {
      let packs: iPack[] = []
      docs.forEach(doc => {
        packs.push({...doc.val(), id:doc.key})
      })
      dispatch({type: 'SET_PACKS', payload: packs})
    })
    firebase.database().ref('pack-prices').on('value', docs => {
      let packPrices: iPackPrice[] = []
      docs.forEach(doc => {
        packPrices.push({...doc.val(), id:doc.key})
      })
      dispatch({type: 'SET_PACK_PRICES', payload: packPrices})
    })
    firebase.database().ref('password-requests').on('value', docs => {
      let passwordRequests: iPasswordRequest[] = []
      docs.forEach(doc => {
        passwordRequests.push({...doc.val(), id:doc.key})
      })
      dispatch({type: 'SET_PASSWORD_REQUESTS', payload: passwordRequests})
    })
    firebase.database().ref('adverts').on('value', docs => {
      let adverts: iAdvert[] = []
      docs.forEach(doc => {
        adverts.push({...doc.val(), id:doc.key})
      })
      dispatch({type: 'SET_ADVERTS', payload: adverts})
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user){
        dispatch({type: 'LOGIN', payload: user})
        firebase.database().ref('locations').on('value', docs => {
          let locations: iLocation[] = []
          docs.forEach(doc => {
            locations.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_LOCATIONS', payload: locations})
        })
        firebase.database().ref('countries').on('value', docs => {
          let countries: iCountry[] = []
          docs.forEach(doc => {
            countries.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_COUNTRIES', payload: countries})
        })
        firebase.database().ref('products').on('value', docs => {
          let products: iProduct[] = []
          docs.forEach(doc => {
            products.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_PRODUCTS', payload: products})
        })
        firebase.database().ref('orders').on('value', docs => {
          let orders: iOrder[] = []
          docs.forEach(doc => {
            orders.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_ORDERS', payload: orders})
        })
        firebase.database().ref('users').on('value', docs => {
          let users: iUser[] = []
          docs.forEach(doc => {
            users.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_USERS', payload: users})
        })
        firebase.database().ref('notifications').on('value', docs => {
          let notifications: iNotification[] = []
          docs.forEach(doc => {
            notifications.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_NOTIFICATIONS', payload: notifications})
        })
        firebase.database().ref('alarms').on('value', docs => {
          let alarms: iAlarm[] = []
          docs.forEach(doc => {
            alarms.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_ALARMS', payload: alarms})
        })
        firebase.database().ref('ratings').on('value', docs => {
          let ratings: iRating[] = []
          docs.forEach(doc => {
            ratings.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_RATINGS', payload: ratings})
        })
        firebase.database().ref('invitations').on('value', docs => {
          let invitations: iInvitation[] = []
          docs.forEach(doc => {
            invitations.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_INVITATIONS', payload: invitations})
        })
        firebase.database().ref('customers').on('value', docs => {
          let customers: iCustomer[] = []
          docs.forEach(doc => {
            customers.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_CUSTOMERS', payload: customers})
        })
        firebase.database().ref('stores').on('value', docs => {
          let stores: iStore[] = []
          docs.forEach(doc => {
            stores.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_STORES', payload: stores})
        })
        firebase.database().ref('store-payments').on('value', docs => {
          let storePayments: iStorePayment[] = []
          docs.forEach(doc => {
            storePayments.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_STORE_PAYMENTS', payload: storePayments})
        })
        firebase.database().ref('purchases').on('value', docs => {
          let purchases: iPurchase[] = []
          docs.forEach(doc => {
            purchases.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_PURCHASES', payload: purchases})
        })
        firebase.database().ref('stock-trans').on('value', docs => {
          let stockTrans: iStockTrans[] = []
          docs.forEach(doc => {
            stockTrans.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_STOCK_TRANS', payload: stockTrans})
        })
        firebase.database().ref('spendings').on('value', docs => {
          let spendings: iSpending[] = []
          docs.forEach(doc => {
            spendings.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_SPENDINGS', payload: spendings})
        })
        firebase.database().ref('monthly-trans').on('value', docs => {
          let monthlyTrans: iMonthlyTrans[] = []
          docs.forEach(doc => {
            monthlyTrans.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_MONTHLY_TRANS', payload: monthlyTrans})
        })
        firebase.database().ref('logs').on('value', docs => {
          let logs: iLog[] = []
          docs.forEach(doc => {
            logs.push({...doc.val(), id:doc.key})
          })
          dispatch({type: 'SET_LOGS', payload: logs})
        })
      } else {
        dispatch({type: 'LOGOUT'})
      }
    })
  }, [])
  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}
 
export default Store

