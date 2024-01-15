import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createSlice, configureStore } from '@reduxjs/toolkit'


const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    }
  }
})


const DemoRedux = () => {      

    return (
        <View style={{ padding: 24 }}>
            <Text>{0}</Text>
            <TouchableOpacity
                style={{
                    backgroundColor: 'red',
                    height: '30%',
                    borderRadius: 6,
                    marginBottom: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Text style={{ textAlign: 'center', }}>Deposit $10</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    backgroundColor: 'blue',
                    height: '30%',
                    borderRadius: 6,
                    marginBottom: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <Text>withdraw</Text>
            </TouchableOpacity>
        </View>
    )
}



export default DemoRedux
export const { incremented, decremented } = counterSlice.actions

const store = configureStore({
    reducer: counterSlice.reducer
  })
  
  // Can still subscribe to the store
  store.subscribe(() => console.log(store.getState()))
  
  // Still pass action objects to `dispatch`, but they're created for us
  store.dispatch(incremented('naptien'))
  // {value: 1}
  store.dispatch(incremented('trutien'))
  // {value: 2}
  store.dispatch(decremented())
  // {value: 1}


const styles = StyleSheet.create({})