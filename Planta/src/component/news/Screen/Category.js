import { Image, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getCategory, getNews } from '../NewHTTP';

const Category = (props) => {

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
        const response = await getNews();
        setNews(response);

        console.log(response);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    // lấy tin
    const fetchData = async () => {
      try {
        const response = await getCategory();
        setCategories(response);

        console.log(response);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    fetchData();
  }, [])


  const renderItem = ({ item }) => {
    const { _id, name, price, quantity, description, image } = item;
    return (

      <View >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail', { newsId: _id })
          }}
        >
          <View style={styles.container_title}>
            <Image style={styles.img} source={{ uri: image }} />
            <View style={styles.container_title_content}>
            <Text style={styles.txt_title_name}>{name}</Text>
              <Text style={styles.txt_title_description}>{description}</Text>
              <Text style={styles.txt_title_price}>{price}</Text>
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
        <Text style={styles.txt_cayTrong}>CÂY TRỒNG</Text>
        <TouchableOpacity  onPress={() => props.navigation.navigate('Shopping')}>
        <Image style={styles.ic_back} source={require('../../../image/ic_shopping.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.container_category}>
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

export default Category

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

var CATEGORIES = [{
  "id": 1,
  "name": "Robby"
}, {
  "id": 2,
  "name": "Wanda"
}, {
  "id": 3,
  "name": "Derrek"
}, {
  "id": 4,
  "name": "Eleonora"
}, {
  "id": 5,
  "name": "Issy"
}, {
  "id": 6,
  "name": "Herrick"
}, {
  "id": 7,
  "name": "Erhart"
}, {
  "id": 8,
  "name": "Stavro"
}, {
  "id": 9,
  "name": "Giacobo"
}, {
  "id": 10,
  "name": "Jana"
}, {
  "id": 11,
  "name": "Constantine"
}, {
  "id": 12,
  "name": "Nikola"
}, {
  "id": 13,
  "name": "Nolie"
}, {
  "id": 14,
  "name": "Jarred"
}, {
  "id": 15,
  "name": "Baxie"
}, {
  "id": 16,
  "name": "Mike"
}, {
  "id": 17,
  "name": "Sutherland"
}, {
  "id": 18,
  "name": "Charmaine"
}, {
  "id": 19,
  "name": "Bobbe"
}, {
  "id": 20,
  "name": "Ferris"
}, {
  "id": 21,
  "name": "Byrom"
}, {
  "id": 22,
  "name": "Deeyn"
}, {
  "id": 23,
  "name": "Nerita"
}, {
  "id": 24,
  "name": "Sherry"
}, {
  "id": 25,
  "name": "Chrisy"
}, {
  "id": 26,
  "name": "Spencer"
}, {
  "id": 27,
  "name": "Gwenette"
}, {
  "id": 28,
  "name": "Morty"
}, {
  "id": 29,
  "name": "Marie"
}, {
  "id": 30,
  "name": "Udall"
}, {
  "id": 31,

}]