import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

interface iProps {
  rating: number,
  count: number
}
const RatingStars = (props: iProps) => {
  const [stars] = useState(() => {
    const rating_round = Math.round(props.rating / .5 ) * .5
    const rating_int = Math.trunc(rating_round)
    const rating_fraction = rating_round - rating_int
    let color
    switch(rating_int){
      case 1:
      case 2:
        color = 'red'
        break
      case 4:
      case 5:
        color = 'green'
        break
      default:
        color = 'blue'
    }
    let stars = []
    let i = 0
    while (++i <= rating_int) {
      stars.push(<Ionicons key={i} name="md-star" style={{fontSize: 24, color}} />)
    }
    if (rating_fraction > 0) {
      stars.unshift(<Ionicons key={i} name="md-star-half" style={{fontSize: 24, color}} />)
      i++
    }
    while (i++ <= 5) {
      stars.unshift(<Ionicons key={i} name="md-star-outline" style={{fontSize: 24, color}} />)
    }
    return stars
  })
  return(
    <View style={{flexDirection: 'row'}}>
      <Text>{props.count > 0 ? '(' + props.count + ')' : null}</Text>{stars}
    </View>
  )
}

export default RatingStars