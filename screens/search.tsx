import React from 'react'
import { Colors, TextField, Dialog } from 'react-native-ui-lib'
import labels from '../data/labels'

const Search = (props: any) => {
  return (
    <Dialog
      useSafeArea
      top
      visible={props.searchVisible}
      containerStyle={{backgroundColor: Colors.white, height: 50}}
      onDismiss={() => props.setSearchVisible(false)}
    >
      <TextField
        onChangeText={(e: any) => props.setSearch(e)}
        placeholder={labels.search}
        hideUnderline
        style={{margin: 10, fontSize: 18, paddingHorizontal: 10, height: 26, width: 100, backgroundColor: '#F1F2F2', borderRadius: 4}}
      />
    </Dialog>
  )
}

export default Search