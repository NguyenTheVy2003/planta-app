import { Image, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getCategory, getNews, getPlanPost } from '../NewHTTP';

const PlantPost = (props) => {

  const [selectedId, setSelectedId] = useState(1);
  const { navigation } = props;
  const [isLoading, setisLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  // const clickNe = () => {
  //   navigation.navigate('NewDetail')
  // }
  // useeffect la gi?
  // hooks để gọi API lấy data
  // chạy ngay sau khi màn hình render
  // 1. chạy ngay sau khi màn hình render
  // và khi có state thay đổi
  useEffect(() => {
    // lấy tin
    const fetchData = async () => {
      try {
        const response = await getPlanPost();
        setNews(response);

        console.log(response);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    fetchData();
  }, [])


  const renderItem = ({ item }) => {
    const { _id, name, price, status, origin, image } = item;
    return (

      <View >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail_PlantaPost', { newsId: _id })
          }}
        >
          <View style={styles.container_title}>
            <Image style={styles.img} source={{ uri: image }} />
            <View style={styles.container_title_content}>
            <Text style={styles.txt_title_name}>{name}</Text>
              {/* <Text style={styles.txt_title_description}>{origin}</Text> */}
              <Text style={styles.txt_title_price}>{price}.000đ</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
        <Image style={styles.ic_back} source={require('../../../image/ic_back.png')} />
        </TouchableOpacity>
        <Text style={styles.txt_cayTrong}>CHẬU CÂY TRỒNG</Text>
        <TouchableOpacity  onPress={() => props.navigation.navigate('Shopping')}>
        <Image style={styles.ic_back} source={require('../../../image/ic_shopping.png')} />
        </TouchableOpacity>
      </View>
          {
            isLoading == true ? (
              <View style={styles.container_isloading}>
                <ActivityIndicator size='large' color='#fff00' />
                <Text>Loading...</Text>
              </View>
            ) : (<FlatList
             
              data={news}
              numColumns={2} 
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={{ justifyContent: 'center', display: 'flex',alignItems: 'flex-start', gap: 15, }} 
            />
            )}

      
    </KeyboardAvoidingView>
  )
}

export default PlantPost

const styles = StyleSheet.create({
  txt_title_name:{
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    fontFamily: 'Lato',
    color: '#221F1F',
  },
  txt_title_description: {
    color: '#7D7B7B',
    fontFamily: 'Lato',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
  },
  txt_title_price: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    fontFamily: 'Lato',
    color: '#007537',

  },

  container_title_content: {
    flexDirection: 'column',
    gap: 4,
    display :'flex',
    alignItems: 'flex-start'
  },
  img: {
    height: 134,
    width: 155,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F6F6F6',
    display:'flex',
    

  },
  container_title: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 4,
    borderRadius: 8,
    display: 'flex',
    paddingBottom: 15,
  },
  conatiner_trending: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  underline: {
    width: '100%',
    height: 2,
    color: '#009245',
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
    paddingBottom: 3,
    alignItems: 'center',
    display: 'flex', gap: 8,
  },
  container_category: {
    display: 'flex',
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 24,
        paddingEnd: 24,
        alignItems: 'center',
        backgroundColor: '#FFF',
        flexDirection: 'column',
        gap: 10,
        justifyContent: 'center'
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
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  container_isloading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
