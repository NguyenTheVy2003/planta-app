import { Image, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getPlantPostDetail, getCategory } from '../NewHTTP'

const Detail_PlantaPost = (props) => {
    const { navigation, route: { params: { newsId } } } = props
    const [plantPost, setPlantPostDetail] = useState({})
    const [selectedId, setSelectedId] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getPlantPostDetail(newsId)
                console.log(response);
                setPlantPostDetail(response)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                    <Image style={styles.ic_back} source={require('../../../image/ic_back.png')} />
                </TouchableOpacity>
                <Text style={styles.txt_cayTrong}>CHẬU CÂY TRỒNG</Text>
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
                    plantPost.image && <Image style={styles.img_tau} source={{ uri: plantPost.image }}></Image>
                }


                <View style={styles.container_txt_price}>
                    <Text style={styles.txt_price}>{plantPost.price}.000đ</Text>
                </View>
                <View style={styles.container_txt_price}>
                    <Text style={styles.txt_detail}>Chi tiết sản phẩm</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: '#221F1F' }} />
                    <View style={styles.container_detail_content}>
                        <View style={styles.detail_content}>
                            <Text style={styles.title_content}>Name</Text>
                            <Text style={styles.title_content}>{plantPost.name}</Text>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#ABABAB' }} />
                    </View>

                    <View style={styles.container_detail_content}>
                        <View style={styles.detail_content}>
                            <Text style={styles.title_content}>Xuất xứ</Text>
                            <Text style={styles.title_content}>{plantPost.origin}</Text>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#ABABAB' }} />
                    </View>


                    <View style={styles.container_detail_content}>
                        <View style={styles.detail_content}>
                            <Text style={styles.title_content}>Tình trạng</Text>
                            <Text style={[styles.title_content,styles.title_content2]}>{plantPost.status}</Text>
                        </View>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#ABABAB' }} />
                    </View>
                </View>

            </ScrollView>

        </View>
    )
}

export default Detail_PlantaPost

const styles = StyleSheet.create({
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