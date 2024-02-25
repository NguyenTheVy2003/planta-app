import { Image, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getNewsDetail, getCategory } from '../NewHTTP'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Detail_Product = (props) => {
    const { navigation, route: { params: { newsId } } } = props
    const [newsDetail, setNewsDetail] = useState({})

    const fetchData = async () => {
        try {
            const response = await getNewsDetail(newsId)
            setNewsDetail(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const unsubcribe = navigation.addListener('focus', () => {
            fetchData();
        })
        return unsubcribe;
    }, [navigation])

    const addToCart = async (id) => {
        let itemArray = await AsyncStorage.getItem('cartItem');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItem', JSON.stringify(array));
                ToastAndroid.show('Item Added Successfully to cart', ToastAndroid.SHORT);
                navigation.navigate('Shopping')
                console.log(array);

            } catch (error) {
                return error
            }

        }
        else {
            let array = [];
            array.push(id);
            try {
                await AsyncStorage.setItem('cartItem', JSON.stringify(array));
                ToastAndroid.show('Item Added Successfully to cart', ToastAndroid.SHORT);
                navigation.navigate('Shopping')
            } catch (error) {
                return error
            }
        }

    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                    <Image style={styles.ic_back} source={require('../../../image/ic_back.png')} />
                </TouchableOpacity>
                <Text style={styles.txt_cayTrong}>{newsDetail.name}</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('Shopping')}>
                    <Image style={styles.ic_back} source={require('../../../image/ic_shopping.png')} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ marginTop: 16 }}
                horizontal={false} // chiều
                showsHorizontalScrollIndicator={false} // thanh cuộn
                showsVerticalScrollIndicator={false} // thanh cuộn
            >
                {
                    newsDetail.image && <Image style={styles.img_tau} source={{ uri: newsDetail.image }}></Image>
                }

                {/* <View style={styles.container_category}>
                    <View style={styles.container_category_list}>
                        <ScrollView
                            horizontal={true} // chiều
                            showsHorizontalScrollIndicator={false} // thanh cuộn
                            showsVerticalScrollIndicator={false} // thanh cuộn
                        >
                            {
                                categories.map((item, index) => {
                                    return (
                                        <TouchableOpacity onPress={() => {
                                            setSelectedId(item._id)
                                        }}
                                            style={styles.item} key={index}>
                                            <Text>{item.name}</Text>
                                            <View
                                                style={item._id.toString() == selectedId.toString() ?
                                                    styles.underline : undefined}></View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View> */}
                <View style={styles.container_txt_price}>
                    <Text style={styles.txt_price}>{newsDetail.price}.000đ</Text>
                </View>
                <View style={styles.container_txt_price}>
                    <Text style={styles.txt_detail}>Chi tiết sản phẩm</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#221F1F' }} />
                    <View style={styles.container_detail_content}>
                        <View style={styles.detail_content}>
                            <Text style={styles.title_content}>Tên</Text>
                            <Text style={styles.title_content}>{newsDetail.name}</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#ABABAB' }} />
                    </View>

                    <View style={styles.container_detail_content}>
                        <View style={styles.detail_content}>
                            <Text style={styles.title_content}>Miêu tả</Text>
                            <Text style={styles.title_content}>{newsDetail.description}</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#ABABAB' }} />
                    </View>

                    <View style={styles.container_detail_content}>
                        <View style={styles.detail_content}>
                            <Text style={styles.title_content}>Tình trạng</Text>

                            <Text style={[styles.title_content, styles.title_content2]}>Còn {newsDetail.quantity} sp</Text>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#ABABAB' }} />
                    </View>



                </View>


            </ScrollView>
            <View style={styles.container_cart}>
                {/* <View style={styles.container_cart_products}>
                    <View style={styles.container_cart_products_quantity}>
                        <Text style={styles.txt_cart}>Đã chọn <Text>0</Text> sản phẩm</Text>
                        <View style={styles.container_cart_products_quantity_click}>
                         
                                <TouchableOpacity>
                                    <Image style={styles.ic_minus} source={require('../../../image/ic_minus.png')} />
                                </TouchableOpacity>
                          
                           
                                <Text style={{ fontSize: 16 }}>{'0'}</Text>
                            
                                <TouchableOpacity>
                                    <Image style={styles.ic_minus} source={require('../../../image/ic_plus.png')} />
                                </TouchableOpacity>
                           

                        </View>
                    </View>

                    <View style={styles.container_cart_products_price}>
                        <Text style={styles.txt_cart}>Tạm tính</Text>
                        <View>
                            <Text style={styles.txt_cart_price}>0đ</Text>
                        </View>

                    </View>
                </View> */}
                <TouchableOpacity style={styles.btn_buy}
                    onPress={() => (newsDetail.isAvailable ? addToCart(newsDetail.id) : null)}>
                    <Text style={styles.txt_buy}>{newsDetail.isAvailable ? 'Add to cart' : 'Not Available'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Detail_Product

const styles = StyleSheet.create({
    txt_cart_price: {
        textAlign: 'right',
        color: '#000',
        fontFamily: 'Lato',
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 34,
    },
    txt_cart: {
        fontSize: 14,
        fontWeight: '400',
        fontStyle: 'normal',
        lineHeight: 20,
        color: '#000'
    },
    txt_buy: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 20,
        textTransform: 'uppercase',
    },
    btn_buy: {
        display: 'flex',
        height: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 100,
        paddingEnd: 100,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        alignSelf: 'stretch',
        backgroundColor: '#007537',
        borderRadius: 8,
    },
    ic_minus: {
        display: 'flex',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_cart_products_quantity_click: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },
    container_cart_products_quantity: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1,

    },
    container_cart_products_price: {
        display: 'flex',
        width: '50%',

        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    container_cart_products: {
        display: 'flex',
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 2,
        paddingEnd: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'stretch',
        backgroundColor: '#FFF',
        height: 82,
        width: '100%',
    },
    container_cart: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 15,
        paddingStart: 24,
        paddingEnd: 24,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    title_content2: {
        color: '#007537'
    },
    detail_content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch'
    },

    container_detail_content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
        marginTop: 4,
        alignSelf: 'stretch'
    },
    txt_price: {
        color: '#007537',
        fontFamily: 'Lato',
        fontSize: 24,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 34,
    },
    container_txt_price: {
        display: 'flex',
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 48,
        paddingEnd: 48,
        gap: 10,
        alignSelf: 'stretch'
    },
    underline: {
        width: '100%',
        height: 2,
        backgroundColor: '#009245',
    },
    item: {
        height: 34,
        display: 'flex',
        gap: 10,
        paddingTop: 4,
        paddingBottom: 4,
        paddingStart: 8,
        paddingEnd: 8,
        alignItems: 'flex-start',
        margin: 10,
        borderRadius: 4,
        // backgroundColor: 'red',
    },
    container_category_list: {
        display: 'flex',
        width: 326,
        paddingTop: 3,

        alignItems: 'center',
        display: 'flex', gap: 8,
    },
    container_category: {
        display: 'flex',
        paddingTop: 15,
        paddingStart: 24,
        paddingEnd: 24,
        alignItems: 'center',
        backgroundColor: '#FFF',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'center'
    },
    txt_detail: {
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 22,
        fontFamily: 'Lato',
        color: '#221F1F',

    },
    container_coment_like: {
        flexDirection: 'row',
        marginStart: 8,
    },
    container_coment: {
        width: '100%',
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title_content: {
        fontFamily: 'Lato',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20,

    },
    container_img_title: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
        marginTop: 16,
    },
    img_title2: {
        fontSize: 24,
        lineHeight: 36,
        color: '#000',
        width: Dimensions.get('window').width - 30
    },
    img_title: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: '400',
        letterSpacing: 0.12,
        lineHeight: 21,
        color: '#4E4B66',
        width: 380,
        width: Dimensions.get('window').width - 25
    },
    img_tau: {

        height: 270,


        flexShrink: 0,
    },
    bbc_button_following: {
        fontSize: 12,
        fontStyle: 'normal',
        fontWeight: '800',
        letterSpacing: 0.12,
        color: '#fff'
    },
    bbc_button: {
        paddingStart: 12,
        paddingEnd: 11,
        paddingTop: 5,
        width: 80,
        height: 30,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#1877F2',
        borderRadius: 6,
    },
    bbc_title2: {
        fontSize: 16,
        fontWeight: '800',
        lineHeight: 24,
        color: '#000'
    },

    bbc_title: {
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 21,
        letterSpacing: 0.12,
        color: '#4E4B66'

    },
    container_bbc_title: {
        flexDirection: 'row'

    },
    container_bbc: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    bbc_icon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_back: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },

    txt_cayTrong: {
        color: '#221F1F',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 14,
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
        justifyContent: 'space-around',
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