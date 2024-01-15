import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Dimensions, ScrollView, TextInput, Pressable, ActivityIndicator,KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { searchNews } from '../NewHTTP'
import { getNews } from '../NewHTTP'

const Explore = (props) => {

  const { navigation } = props
  const [dataNe, setdataNe] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [searchText, setsearchText] = useState("")

  const onSearch = async (searchText) => {
    setisLoading(true)
    try {
      const response = await searchNews(searchText);

      // lấy dữ liệu thành công
      setdataNe(response);
      setisLoading(false)
      console.log(response);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // lấy tin
    const fetchData = async () => {
      try {
        const response = await getNews();
        console.log(response)
        // lấy dữ liệu thành công
        setdataNe(response);
        setisLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])


  let timeOut = null;
  const countDownSearch = (searchText) => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      onSearch(searchText);
    }, 2000)
  }

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
              <Text style={styles.txt_title_name}>{price}.000đ</Text>
              <Text style={[styles.txt_title_name,styles.txt_title_price]}>{quantity}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      
        <View>
          <View style={styles.header}>
            <TouchableOpacity>
              <Image style={styles.ic_back} source={require('../../../image/ic_back.png')} />
            </TouchableOpacity>


            <TouchableOpacity >
              <Text style={styles.txt_search}>TÌM KIẾM</Text>
            </TouchableOpacity>
            {/* <TextInput placeholder='Search...' style={styles.input_search}
          onChangeText={(text) => countDownSearch(text)}>
        </TextInput> */}
            <Image style={styles.ic_back} source={require('../../../image/ic_back.png')} />
          </View>
          <View style={styles.container_input_search}>
            <View style={styles.input_search}>
              <View style={{ width: '100%', height: 1.5 }} />
              <View style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', flexDirection: 'row' }}>

                <TextInput
                  style={{ display: 'flex', alignItems: 'center', gap: 2 }}
                  onChangeText={(text) => countDownSearch(text)}
                  placeholder='Search'
                />
                <View></View>
                <TouchableOpacity onPress={onSearch}>
                  <Image style={styles.ic_back} source={require('../../../image/ic_search.png')} />
                </TouchableOpacity>
              </View>
              <View style={{ width: 279, height: 1.5, backgroundColor: '#221F1F' }} />
            </View>
          </View>
          <View style={styles.container_last_search_list}>
            <Text style={styles.txt_last_search_title}>Tìm kiếm gần đây</Text>
            <View style={styles.last_search_list}>
              <View style={styles.last_search_item}>
                <Image style={{ width: 20, height: 20 }} source={require('../../../image/ic_clock.png')} />
                <Text style={styles.txt_last_search}>Spider Plant </Text>
                <Image style={{ width: 10, height: 10 }} source={require('../../../image/ic_X.png')} />
              </View>
            </View>
          </View>
        </View>
     
      {
        isLoading == true ? (
          <View style={styles.container_isloading}>
            <ActivityIndicator size='large' color='#fff00' />
            <Text>Loading...</Text>
          </View>
        ) : (<FlatList
          showsHorizontalScrollIndicator={false} // thanh cuộn
          showsVerticalScrollIndicator={false} // thanh cuộn
          style = {{marginTop: 15}}
          data={dataNe}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
        )}
    </KeyboardAvoidingView>
  )
}

export default Explore

const styles = StyleSheet.create({
  container_isloading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt_title_price: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  txt_title_name: {
    color: '#000',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
  container_title_content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    alignSelf: 'stretch'
  },
  img: {
    width: 77,
    flexShrink: 0,
    alignSelf: 'stretch',
    borderRadius: 8,
    backgroundColor: '#F6F6F6'
  },
  container_title: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 15,
    paddingBottom: 15,
    paddingStart: 48,
    paddingEnd: 48,
    gap: 15,
    flexShrink: 0,
  },
  txt_last_search: {
    color: '#221F1F',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    width: '100%'
  },
  last_search_item: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  last_search_list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 19,
    alignSelf: 'stretch',

  },
  txt_last_search_title: {
    color: '#000',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
  },
  container_last_search_list: {
    width: 374,
    paddingTop: 40,
    display: 'flex',
    paddingStart: 48,
    paddingEnd: 48,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 19,
  },

  input_search: {
    display: 'flex',

    paddingStart: 24,
    paddingEnd: 24,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },

  container_input_search: {
    display: 'flex',

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  txt_search: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  ic_back: {
    width: 24,
    height: 24,
  },
  header: {
    paddingTop: 26,
    flexDirection: 'row',
    height: 55,
    paddingStart: 24,
    paddingEnd: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0,
  },
  container: {

    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
})