import React from 'react'
import { Colors, Text, Dialog, Button, View } from 'react-native-ui-lib'
import labels from '../data/labels'
import { StyleSheet } from 'react-native'

const RNDialog = props => {
  return (
    <Dialog
      useSafeArea
      bottom
      visible={props.dialogVisible}
      containerStyle={{backgroundColor: Colors.white}}
      onDismiss={() => props.dismissDialog(false)}
    >
      <View style={{marginTop: 20, marginHorizontal: 20}}>
        <Text style={{fontSize: 24}}>{labels.confirmationTitle}</Text>
        <Text style={{fontSize: 16, marginTop: 10}}>{labels.deleteConfirmation}</Text>
      </View>
      <View style={styles.view}>
        <Button text60 label={labels.ok} link onPress={() => props.handleOK()}/>
        <Button text60 label={labels.cancel} link onPress={() => props.dismissDialog(false)}/>
      </View>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  view: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
export default RNDialog