import { KeyboardAvoidingView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

const Planthandbook = (props) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Profile')}>
                        <Image style={styles.ic_back} source={require('../../../image/ic_back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.txt_cayTrong}>Cẩm nang trồng cây</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Shopping')}>
                        <Image style={styles.ic_back} source={require('../../../image/ic_trash.png')} />
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity style={styles.container_items}>
                    <View
                        style={{
                            display: 'flex',
                            width: 77,
                            height: 70,
                            padding: 10,
                            alignItems: 'center',
                            gap: 10,
                            borderRadius: 8,
                            backgroundColor: '#FFF'
                        }}>
                        <Image style={{ height: '100%', width: '100%' }} source={require('../../../image/img_Panse_den.png')} />
                    </View>
                    <View
                        style={{
                            display: 'flex',
                            width: 187,
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            gap: 5,
                            alignSelf: 'stretch'
                        }}>
                        <Text
                            style={{
                                color: '#000',
                                fontFamily: 'Lato',
                                fontSize: 16,
                                fontStyle: 'normal',
                                fontWeight: '500',
                                lineHeight: 22,
                            }}>Panse Đen | Hybrid</Text>
                        <Text
                            style={{
                                color: '#7D7B7B',
                                fontFamily: 'Lato',
                                fontSize: 14,
                                fontStyle: 'normal',
                                fontWeight: '400',
                                lineHeight: 20,
                            }}
                        >Độ khó 3/5 </Text>

                    </View>
                    </TouchableOpacity>
              
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Planthandbook


const styles = StyleSheet.create({
    text_giohang_null: {
        color: '#000',
        fontFamily: 'Lato',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    container_items: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 48,
        paddingEnd: 48,
        alignItems: 'center',
        gap: 15,
        flexDirection: 'row',
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