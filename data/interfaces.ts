import firebase from './firebase'

export interface iLabel {
    [key: string]: string
}
export interface iError {
  code: string,
  message: string
}
export interface iCategory {
  id: string,
  name: string
}
export interface iLocation {

}
export interface iCountry {
  id: string,
  name: string
}
export interface iStore {

}
export interface iBasketPack {
  packId: string,
  orderId: string
}
export interface iBasket {
  storeId: string,
  packs: iBasketPack[]
}
export interface iReturnBasket {
  type: string,
  packs: iBasketPack[]
}
export interface iUser {

}
export interface iPurchase {

}
export interface iOrder {
  basket: iBasketPack[]
}
export interface iStockTrans {

}
export interface iProduct {
  id: string,
  categoryId: string,
  country: string,
  name: string,
  description: string,
  alias: string,
  trademark: string,
  sales: number,
  rating: number,
  ratingCount: number,
  isArchived: boolean,
  imageUrl?: string,
  categoryInfo?: iCategory
}
export interface iPack {
  id: string,
  name: string,
  productId: string,
  price: number
}
export interface iPasswordRequest {

}
export interface iCustomer {

}
export interface iSpending {

}
export interface iMonthlyTrans {

}
export interface iPackPrice {

}
export interface iLog {

}
export interface iAdvert {

}
export interface iNotification {

}
export interface iAlarm {

}
export interface iRating {

}
export interface iInvitation {

}
export interface iStorePayment {

}
export interface iState {
  categories: iCategory[],
  locations: iLocation[],
  countries: iCountry[],
  stores: iStore[],
  basket?: iBasket,
  users: iUser[],
  purchases: iPurchase[],
  archivedPurchases?: iPurchase[],
  orders: iOrder[],
  archivedOrders?: iOrder[],
  stockTrans: iStockTrans[],
  archivedStockTrans?: iStockTrans[],
  products: iProduct[],
  archivedProducts?: iProduct[],
  packs: iPack[],
  archivedPacks?: iPack[],
  passwordRequests: iPasswordRequest[],
  customers: iCustomer[],
  spendings: iSpending[],
  orderBasket?: iBasketPack[],
  returnBasket?: iReturnBasket,
  monthlyTrans: iMonthlyTrans[],
  packPrices: iPackPrice[]
  logs: iLog[],
  adverts: iAdvert[],
  notifications: iNotification[],
  alarms: iAlarm[],
  ratings: iRating[],
  invitations: iInvitation[],
  storePayments: iStorePayment[],
  message?: string,
  categoriesStatus?: string,
  productsStatus?: string
}

export interface iState2 {
  user?: firebase.User,
  categories: iCategory[],
  countries: iCountry[],
  products: iProduct[],
  packs: iPack[],
  packPrices: iPackPrice[],
  productsStatus?: string,
  passwordRequests: iPasswordRequest[],
  message?: string,
  adverts: iAdvert[],
}

export interface iAction {
  type: string,
  payload?: any
}

export interface iContext {
  state: iState2,
  dispatch: React.Dispatch<iAction>
}