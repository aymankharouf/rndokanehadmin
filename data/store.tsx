import React from 'react'
import Reducer from './reducer'
import firebase from './firebase'
import { iState2, iContext, iCategory, iPack, iPackPrice, iPasswordRequest, iAdvert, iLocation, iCountry, iProduct } from './interfaces'

export const StoreContext = React.createContext({} as iContext)

const Store = (props: any) => {
  const initState: iState2 = {
    categories: [],
    countries: [],
    products: [],
    packs: [],
    packPrices: [],
    passwordRequests: [],
    adverts: []
  }
  const [state, dispatch] = React.useReducer(Reducer, initState)
  React.useEffect(() => {
    const startTime = new Date()
    firebase.database().ref('categories').on('value', docs => {
      let categories: iCategory[] = []
      docs.forEach(doc => {
        categories.push({...doc.val(), id:doc.key})
      })
      dispatch({type: 'SET_CATEGORIES', payload: categories})
    })
    firebase.database().ref('packs').on('value', docs => {
      let packs: iPack[] = []
      let packPrices: iPackPrice[] = []
      docs.forEach(doc => {
        packs.push({...doc.val(), id: doc.key})
        if (doc.val().prices) {
          doc.val().prices.forEach((p: iPackPrice) => {
            packPrices.push({...p, packId: doc.key})
          })
        }
      })
      dispatch({type: 'SET_PACKS', payload: packs})
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
      }
    })

    /*firebase.auth().onAuthStateChanged(user => {
      setUser(user)
      if (user){
        const unsubscribeLocations = firebase.firestore().collection('lookups').doc('l').onSnapshot(doc => {
          dispatch({type: 'SET_LOCATIONS', locations: doc.data().values})
        }, err => {
          unsubscribeLocations()
        })  
        const unsubscribeCountries = firebase.firestore().collection('lookups').doc('c').onSnapshot(doc => {
          dispatch({type: 'SET_COUNTRIES', countries: doc.data().values})
        }, err => {
          unsubscribeCountries()
        })
        const unsubscribeProducts = firebase.firestore().collection('products').where('isArchived', '==', false).onSnapshot(docs => {
          let products = []
          docs.forEach(doc => {
            products.push({...doc.data(), id: doc.id})
          })
          dispatch({type: 'SET_PRODUCTS', products})
        }, err => {
          unsubscribeProducts()
        })    
        const unsubscribeOrders = firebase.firestore().collection('orders').where('isArchived', '==', false).onSnapshot(docs => {
          let orders = []
          docs.forEach(doc => {
            orders.push({...doc.data(), id:doc.id})
          })
          dispatch({type: 'SET_ORDERS', orders})
        }, err => {
          unsubscribeOrders()
        })  
        const unsubscribeUsers = firebase.firestore().collection('users').onSnapshot(docs => {
          let users = []
          let notifications = []
          let alarms = []
          let ratings = []
          let invitations = []
          docs.forEach(doc => {
            users.push({...doc.data(), id:doc.id})
            if (doc.data().notifications) {
              doc.data().notifications.forEach(n => {
                notifications.push({...n, userId: doc.id})
              })
            }
            if (doc.data().alarms) {
              doc.data().alarms.forEach(a => {
                alarms.push({...a, userId: doc.id})
              })
            }
            if (doc.data().ratings) {
              doc.data().ratings.forEach(r => {
                ratings.push({...r, userId: doc.id})
              })
            }
            if (doc.data().friends) {
              doc.data().friends.forEach(f => {
                invitations.push({...f, userId: doc.id})
              })
            }
          })
          dispatch({type: 'SET_USERS', users})
          dispatch({type: 'SET_NOTIFICATIONS', notifications})
          dispatch({type: 'SET_ALARMS', alarms})
          dispatch({type: 'SET_RATINGS', ratings})
          dispatch({type: 'SET_INVITATIONS', invitations})
        }, err => {
          unsubscribeUsers()
        })  
        const unsubscribeCustomers = firebase.firestore().collection('customers').onSnapshot(docs => {
          let customers = []
          docs.forEach(doc => {
            customers.push({...doc.data(), id:doc.id})
          })
          dispatch({type: 'SET_CUSTOMERS', customers})
        }, err => {
          unsubscribeCustomers()
        })  
        const unsubscribeStores = firebase.firestore().collection('stores').onSnapshot(docs => {
          let stores = []
          let storePayments = []
          docs.forEach(doc => {
            stores.push({...doc.data(), id:doc.id})
            if (doc.data().payments) {
              doc.data().payments.forEach(p => {
                storePayments.push({...p, storeId: doc.id, storeInfo: doc.data()})
              })
            }
          })
          dispatch({type: 'SET_STORES', stores})
          dispatch({type: 'SET_STORE_PAYMENTS', storePayments})
        }, err => {
          unsubscribeStores()
        })  
        const unsubscribePurchases = firebase.firestore().collection('purchases').where('isArchived', '==', false).onSnapshot(docs => {
          let purchases = []
          docs.forEach(doc => {
            purchases.push({...doc.data(), id:doc.id})
          })
          dispatch({type: 'SET_PURCHASES', purchases})
        }, err => {
          unsubscribePurchases()
        })  
        const unsubscribeStockTrans = firebase.firestore().collection('stock-trans').where('isArchived', '==', false).onSnapshot(docs => {
          let stockTrans = []
          docs.forEach(doc => {
            stockTrans.push({...doc.data(), id:doc.id})
          })
          dispatch({type: 'SET_STOCK_TRANS', stockTrans})
        }, err => {
          unsubscribeStockTrans()
        })  
        const unsubscribeSpendings = firebase.firestore().collection('spendings').onSnapshot(docs => {
          let spendings = []
          docs.forEach(doc => {
            spendings.push({...doc.data(), id:doc.id})
          })
          dispatch({type: 'SET_SPENDINGS', spendings})
        }, err => {
          unsubscribeSpendings()
        })  
        const unsubscribeMonthlyTrans = firebase.firestore().collection('monthly-trans').onSnapshot(docs => {
          let monthlyTrans = []
          docs.forEach(doc => {
            monthlyTrans.push({...doc.data(), id:doc.id})
          })
          dispatch({type: 'SET_MONTHLY_TRANS', monthlyTrans})
        }, err => {
          unsubscribeMonthlyTrans()
        })  
        const unsubscribeLogs = firebase.firestore().collection('logs').onSnapshot(docs => {
          let logs = []
          docs.forEach(doc => {
            logs.push({...doc.data(), id:doc.id})
          })
          dispatch({type: 'SET_LOGS', logs})
        }, err => {
          unsubscribeLogs()
        })  
      }
    })*/
  }, [])
  return (
    <StoreContext.Provider value={{state, dispatch}}>
      {props.children}
    </StoreContext.Provider>
  )
}
 
export default Store

