import { Image, StyleSheet, Text, View, StatusBar, KeyboardAvoidingView, ScrollView, FlatList, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { COLOURS, Items } from '../../database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getCareAccessories, getNews, getPlanPost } from '../NewHTTP';

const Home2 = (props) => {
  const {navigation} = props;
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [news, setNews] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [plantPost, setPlantPost] = useState([]);
  const [careAccessories, setCareAccessories] = useState([]);


  //get called on screen loads
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from DB


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
        const response = await getPlanPost();
        setPlantPost(response);
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
        const response = await getCareAccessories();
        setCareAccessories(response);
        console.log(response);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
    fetchData();
  }, [])

  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];
    for (let index = 0; index < news.length; index++) {
      if (news[index].category == 'product') {
        productList.push(news[index]);
      } else if (news[index].category == 'accessory') {
        accessoryList.push(news[index]);
      }
    }

    setProducts(productList);
    setAccessory(accessoryList);
  };

  //create an product reusable card

  const ProductCard = ({ data }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', { productID: data._id })}
        style={{
          width: '48%',
          marginVertical: 14,
        }}>
        <View
          style={{
            width: '100%',
            height: 100,
            borderRadius: 10,
            backgroundColor: COLOURS.backgroundLight,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          {/* {data.isOff ? (
            <View
              style={{
                position: 'absolute',
                width: '20%',
                height: '24%',
                backgroundColor: COLOURS.green,
                top: 0,
                left: 0,
                borderTopLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.white,
                  fontWeight: 'bold',
                  letterSpacing: 1,
                }}>
                {data.offPercentage}%
              </Text>
            </View>
          ) : null} */}
          <Image
            source={{ uri: data.image }}
            style={{
              width: '80%',
              height: '80%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            color: COLOURS.black,
            fontWeight: '600',
            marginBottom: 2,
          }}>
          {data.name}
        </Text>
        <Text style={{
           fontSize: 14,
        }}> {data.description}</Text>
        {/* {data.category == 'accessory' ? (
          data.isAvailable ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.green,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.green,
                }}>
                Available
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FontAwesome
                name="circle"
                style={{
                  fontSize: 12,
                  marginRight: 6,
                  color: COLOURS.red,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.red,
                }}>
                Unavailable
              </Text>
            </View>
          )
        ) : null} */}
        <Text style={{
           color: '#007537',
           fontSize: 16,
        }}> {data.price}.000đ</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>

        
        {/* <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 10,
            }}>
            Planta Shop &amp; Service
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
            }}>
            Tỏa sáng không gian nhà bạn
            {'\n'}This shop offers both products and services
          </Text>
        </View> */}
          <View style={styles.header}>
          <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}>
          {/* <TouchableOpacity>
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity> */}
        </View>
          <View style={{ paddingStart: 25, paddingEnd: 25, }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text style={styles.txt_planta}>Planta - toả sáng không gian nhà bạn</Text>
              <View style={{
                paddingTop: 14,
                paddingStart: 11,
                paddingBottom: 8,
                paddingEnd: 13,
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 99999,
                backgroundColor: '#FFF'
              }}>
                <TouchableOpacity onPress={() => props.navigation.navigate('MyCart')}>
                  <Image style={styles.ic_shopping} source={require('../../../image/ic_shopping.png')} />
                </TouchableOpacity>

              </View>
            </View>
            <View style={{ width: 153, height: 24, marginTop: 7, flexShrink: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.txt_hangmoi}>Xem hàng mới về</Text>
              <TouchableOpacity onPress={() => props.navigation.navigate('Category')}>
                <Image style={styles.ic_shopping} source={require('../../../image/ic_right.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <Image style={styles.img_home} source={require('../../../image/img_home.png')} />

        </View>
        
        <View
          style={{
            marginTop: 32,
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Cây Trồng
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                41
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {news.map(data => {
              return <ProductCard data={data} key={data._id} />;
            })}
          </View>
        </View>
 

        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Chậu Cây Trồng
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                6
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {plantPost.map(data => {
              return <ProductCard data={data} key={data._id} />;
            })}
          </View>
        </View>

        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
               Phụ kiện
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                6
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {careAccessories.map(data => {
              return <ProductCard data={data} key={data._id} />;
            })}
          </View>
        </View>
  
        <View style={styles.container_txt_category}>
          <Text style={styles.txt_categories_caytrong}>Combo chăm sóc (mới)</Text>
        </View>
        <View style={{ borderRadius: 8, paddingStart: 24, paddingEnd: 24 }}>
          <View style={styles.container_combo}>
            <View style={styles.container_combo_txt}>
              <Text style={styles.txt_combo}>Lemon Balm Grow Kit</Text>
              <Text style={styles.txt_combo2}>Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker đánh dấu...</Text>
            </View>
            <Image style={styles.img_grow_kit} source={require('../../../image/img_grow_kit.png')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};


export default Home2

const styles = StyleSheet.create({
  txt_combo2: {
    color: '#7D7B7B',
    fontFamily: 'Lato',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20,
    height: 62,
    width: 176,
  },
  txt_combo: {
    color: '#221F1F',
    fontFamily: 'Lato',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    width: 155,
  },
  container_combo_txt: {
    display: 'flex',
    paddingTop: 24,
    paddingRight: 17,
    paddingBottom: 24,
    paddingLeft: 24,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
  },
  img_grow_kit: {
    width: 108,
    height: 134,
    flexShrink: 0,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,

  },
  container_combo: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 8,
    backgroundColor: '#F6F6F6',
  },
  txt_xemthem: {
    color: '#221F1F',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
  container_xemthem: {
    display: 'flex',
    paddingStart: 24,
    paddingEnd: 24,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 10,
    marginTop: 15,
  },
  container_txt_category: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginTop: 15,
    gap: 15,
    alignSelf: 'stretch',
    padding: 25,
  },
  img_home: {
    width: '100%', height: 205, flexShrink: 0,

  },
  txt_categories_caytrong: {
    color: '#221F1F',
    fontFamily: 'Lato',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 34,
  },
  txt_title_name: {
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
    display: 'flex',
    alignItems: 'flex-start'
  },
  img: {
    height: 134,
    width: 175,
    borderRadius: 8,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F6F6F6',
    display: 'flex',
  },
  container_title: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 4,
    borderRadius: 8,
    display: 'flex',
    paddingBottom: 15,
    width: '100%',
    height: 217,
  },
  conatiner_trending: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
  ic_shopping: {
    width: 24,
    height: 24,
  },
  txt_hangmoi: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    color: '#007537',
  },
  txt_planta: {
    width: 223,
    height: 77,
    flexShrink: 0,
    color: '#221F1F',
    fontFamily: 'Lato',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 37,
  },
  header: {
    height: 318,
    backgroundColor: '#F6F6F6',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  container_isloading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
})

