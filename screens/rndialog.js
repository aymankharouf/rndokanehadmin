import React from 'react'
import { Colors, Text, Dialog, Button, View } from 'react-native-ui-lib'
import labels from '../data/labels'

const RNDialog = props => {
  return (
    <Dialog
      useSafeArea
      bottom
      visible={props.dialogVisible}
      containerStyle={{backgroundColor: Colors.white}}
      onDismiss={() => props.dismissDialog(false)}
    >
      <View>
        <View marginT-20 marginH-20>
          <Text text50>{labels.confirmationTitle}</Text>
          <Text marginT-20>{labels.deleteConfirmation}</Text>
        </View>
        <View margin-20 right row spread>
          <Button text60 label={labels.ok} link onPress={() => props.handleOK()}/>
          <Button text60 label={labels.cancel} link onPress={() => props.dismissDialog(false)}/>
        </View>
      </View>
    </Dialog>
  )
}

export default RNDialog