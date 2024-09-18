import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getCareAccessories, getNews, getPlanPost} from '../NewHTTP';

const Home = props => {
  const [selectedId, setSelectedId] = useState(1);
  const {navigation} = props;
  const [isLoading, setisLoading] = useState(false);
  const [news, setNews] = useState([]);
  const [plantPost, setPlantPost] = useState([]);
  const [careAccessories, setCareAccessories] = useState([]);

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
    };
    fetchData();
  }, []);

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
    };
    fetchData();
  }, []);

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
    };
    fetchData();
  }, []);

  const renderItem = ({item}) => {
    const {_id, name, price, description, image} = item;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail', {newsId: _id});
          }}>
          <View style={styles.container_title}>
            <Image style={styles.img} source={{uri: image}} />
            <View style={styles.container_title_content}>
              <Text style={styles.txt_title_name}>{name}</Text>
              <Text style={styles.txt_title_description}>{description}</Text>
              <Text style={styles.txt_title_price}>{price}.000đ</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const PlantaProduct = () => {
    return (
      <View>
        <View style={styles.container_txt_category}>
          <Text style={styles.txt_categories_caytrong}>Cây trồng</Text>
        </View>
        {isLoading == true ? (
          <View style={styles.container_isloading}>
            <ActivityIndicator size="large" color="#fff00" />
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={news}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 15,
              paddingStart: 24,
              paddingEnd: 24,
            }}
          />
        )}
        <TouchableOpacity onPress={() => props.navigation.navigate('Category')}>
          <View style={styles.container_xemthem}>
            <Text style={styles.txt_xemthem}>Xem thêm Cây trồng</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemPlantPost = ({item}) => {
    const {_id, name, price, image} = item;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail_PlantaPost', {newsId: _id});
          }}>
          <View style={styles.container_title}>
            <Image style={styles.img} source={{uri: image}} />
            <View style={styles.container_title_content}>
              <Text style={styles.txt_title_name}>{name}</Text>
              {/* <Text style={styles.txt_title_description}>{origin}</Text> */}
              <Text style={styles.txt_title_price}>{price}.000đ</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const PlantPost = () => {
    return (
      <View>
        <View style={styles.container_txt_category}>
          <Text style={styles.txt_categories_caytrong}>Chậu cây trồng</Text>
        </View>
        {isLoading == true ? (
          <View style={styles.container_isloading}>
            <ActivityIndicator size="large" color="#fff00" />
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={plantPost}
            numColumns={2}
            renderItem={renderItemPlantPost}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 15,
              paddingStart: 24,
              paddingEnd: 24,
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PlantPost')}>
          <View style={styles.container_xemthem}>
            <Text style={styles.txt_xemthem}>Xem thêm chậu Cây trồng</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItemCareAccessories = ({item}) => {
    const {_id, name, price, image} = item;
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Detail_CareAccessorie', {newsId: _id});
          }}>
          <View style={styles.container_title}>
            <Image style={styles.img} source={{uri: image}} />
            <View style={styles.container_title_content}>
              <Text style={styles.txt_title_name}>{name}</Text>
              {/* <Text style={styles.txt_title_description}>{origin}</Text> */}
              <Text style={styles.txt_title_price}>{price}.000đ</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const CareAccessories = () => {
    return (
      <View>
        <View style={styles.container_txt_category}>
          <Text style={styles.txt_categories_caytrong}>
            Phụ kiện chăm sóc cây trồng
          </Text>
        </View>
        {isLoading == true ? (
          <View style={styles.container_isloading}>
            <ActivityIndicator size="large" color="#fff00" />
            <Text>Loading...</Text>
          </View>
        ) : (
          <FlatList
            data={careAccessories}
            numColumns={2}
            renderItem={renderItemCareAccessories}
            keyExtractor={item => item._id}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 15,
              paddingStart: 24,
              paddingEnd: 24,
            }}
          />
        )}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('CareAccessorie')}>
          <View style={styles.container_xemthem}>
            <Text style={styles.txt_xemthem}>Xem thêm phụ kiện cây trồng</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false} // thanh cuộn
      >
        <View style={styles.header}>
          <View style={{paddingStart: 25, paddingTop: 31, paddingEnd: 25}}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={styles.txt_planta}>
                Planta - toả sáng không gian nhà bạn
              </Text>
              <View
                style={{
                  paddingTop: 14,
                  paddingStart: 11,
                  paddingBottom: 8,
                  paddingEnd: 13,
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 99999,
                  backgroundColor: '#FFF',
                }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Shopping')}>
                  <Image
                    style={styles.ic_shopping}
                    source={require('../../../image/ic_shopping.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: 153,
                height: 24,
                marginTop: 7,
                flexShrink: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.txt_hangmoi}>Xem hàng mới về</Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('PlantPost')}>
                <Image
                  style={styles.ic_shopping}
                  source={require('../../../image/ic_right.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Image
            style={styles.img_home}
            source={require('../../../image/img_home.png')}
          />
        </View>

        {PlantaProduct()}
        {PlantPost()}

        {CareAccessories()}

        <View style={styles.container_txt_category}>
          <Text style={styles.txt_categories_caytrong}>
            Combo chăm sóc (mới)
          </Text>
        </View>
        <View style={{borderRadius: 8, paddingStart: 24, paddingEnd: 24}}>
          <View style={styles.container_combo}>
            <View style={styles.container_combo_txt}>
              <Text style={styles.txt_combo}>Lemon Balm Grow Kit</Text>
              <Text style={styles.txt_combo2}>
                Gồm: hạt giống Lemon Balm, gói đất hữu cơ, chậu Planta, marker
                đánh dấu...
              </Text>
            </View>
            <Image
              style={styles.img_grow_kit}
              source={require('../../../image/img_grow_kit.png')}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;

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
    width: '100%',
    height: 205,
    flexShrink: 0,
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
    alignItems: 'flex-start',
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
    textTransform: 'uppercase',
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
});

var CATEGORIES = [
  {
    id: 1,
    name: 'Robby',
  },
  {
    id: 2,
    name: 'Wanda',
  },
  {
    id: 3,
    name: 'Derrek',
  },
  {
    id: 4,
    name: 'Eleonora',
  },
  {
    id: 5,
    name: 'Issy',
  },
  {
    id: 6,
    name: 'Herrick',
  },
  {
    id: 7,
    name: 'Erhart',
  },
  {
    id: 8,
    name: 'Stavro',
  },
  {
    id: 9,
    name: 'Giacobo',
  },
  {
    id: 10,
    name: 'Jana',
  },
  {
    id: 11,
    name: 'Constantine',
  },
  {
    id: 12,
    name: 'Nikola',
  },
  {
    id: 13,
    name: 'Nolie',
  },
  {
    id: 14,
    name: 'Jarred',
  },
  {
    id: 15,
    name: 'Baxie',
  },
  {
    id: 16,
    name: 'Mike',
  },
  {
    id: 17,
    name: 'Sutherland',
  },
  {
    id: 18,
    name: 'Charmaine',
  },
  {
    id: 19,
    name: 'Bobbe',
  },
  {
    id: 20,
    name: 'Ferris',
  },
  {
    id: 21,
    name: 'Byrom',
  },
  {
    id: 22,
    name: 'Deeyn',
  },
  {
    id: 23,
    name: 'Nerita',
  },
  {
    id: 24,
    name: 'Sherry',
  },
  {
    id: 25,
    name: 'Chrisy',
  },
  {
    id: 26,
    name: 'Spencer',
  },
  {
    id: 27,
    name: 'Gwenette',
  },
  {
    id: 28,
    name: 'Morty',
  },
  {
    id: 29,
    name: 'Marie',
  },
  {
    id: 30,
    name: 'Udall',
  },
  {
    id: 31,
  },
];
