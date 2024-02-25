import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNewsDetail, getCategory } from '../NewHTTP'

const Shopping = (props) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Category')}>
                        <Image style={styles.ic_back} source={require('../../../image/ic_back.png')} />
                    </TouchableOpacity>

                    <Text style={styles.txt_cayTrong}>Giỏ Hàng</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Shopping')}>
                        <Image style={styles.ic_back} source={require('../../../image/ic_trash.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container_text}>
                    <Text style = {styles.text_giohang_null}>Giỏ hàng của bạn hiện đang trống</Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Shopping

const styles = StyleSheet.create({
    text_giohang_null: {
        color: '#000',
        fontFamily: 'Lato',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    container_text: {
        display: 'flex',
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart:48,
        paddingEnd: 48,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    txt_cayTrong: {
        color: '#221F1F',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 20,
        textTransform: 'uppercase'
    },
    ic_back: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: 30,
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 24,
        paddingEnd: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 94,
        flexDirection: 'row',
        backgroundColor: '#FFF',
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
    },
})