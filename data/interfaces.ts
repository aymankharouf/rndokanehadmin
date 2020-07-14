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
  productName?: string,
  productAlias?: string,
  packName?: string,
  imageUrl?: string,
  orderId?: string,
  cost?: number,
  actual?: number,
  price?: number,
  quantity?: number,
  weight?: number,
  requested?: number,
  isOffer?: boolean,
  exceedPriceType?: string,
  isDivided?: boolean,
  closeExpired?: boolean,
  refPackId?: string,
  refPackQuantity?: number
}
export interface iBasket {
  storeId: string,
  packs: iBasketPack[]
}
export interface iReturnBasket {
  type: string,
  storeId: string,
  purchaseId: string,
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
export interface iMessage {
  type: string,
  text: string
}

export interface iState {
  user?: firebase.User,
  categories: iCategory[],
  countries: iCountry[],
  products: iProduct[],
  basket?: iBasket,
  orderBasket?: iBasketPack[],
  returnBasket?: iReturnBasket,
  packs: iPack[],
  packPrices: iPackPrice[],
  productsStatus?: string,
  passwordRequests: iPasswordRequest[],
  message?: iMessage,
  adverts: iAdvert[],
  orders: iOrder[],
  users: iUser[],
  notifications: iNotification[],
  alarms: iAlarm[],
  ratings: iRating[],
  invitations: iInvitation[],
  customers: iCustomer[],
  stores: iStore[],
  storePayments: iStorePayment[],
  purchases: iPurchase[],
  stockTrans: iStockTrans[],
  spendings: iSpending[],
  monthlyTrans: iMonthlyTrans[],
  logs: iLog[]
}

export interface iAction {
  type: string,
  payload?: any
}

export interface iContext {
  state: iState,
  dispatch: React.Dispatch<iAction>
}