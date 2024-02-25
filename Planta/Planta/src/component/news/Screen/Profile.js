import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useContext, useState, useCallback } from 'react'
import UserContext from '../user/UserContext';

const Profile = (props) => {
  const { navigation } = props;
  const { user, setUser } = useContext(UserContext);
  const [email, setemail] = useState('')
  const [fullname, setfullname] = useState('')

  const logOut = () => { setUser(null) }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity >
          <Text style={styles.txt_profile}>Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container_avatar}>
        <View style={styles.avatar}>
          <Image style={{ width: 39, height: 39 }} source={require('../../../image/img_avt.png')} />
        </View>
        <View style = {styles.container_avatar_email}>
          <Text style={styles.txt_name}>{user.name}</Text>
          <Text style = {styles.txt_email}>{user.email}</Text>
        </View>

      </View>
      <View style = {styles.container_title}>
        <View style={styles.title_chung}>
          <Text style = {styles.txt_chung}>Chung</Text>
          <View style = {{width: '100%', height: 1, backgroundColor: '#ABABAB'}}/>
        </View>
        <TouchableOpacity style = {styles.container_txt} 
         onPress={() => navigation.navigate('EditProfile', { name: user.name, email: user.email })}>
        <Text style = {styles.txt}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.container_txt}>
        <Text style = {styles.txt}>Cẩm nang trồng cây</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.container_txt}>
        <Text style = {styles.txt}>Lịch sử giao dịch</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.container_txt}>
        <Text style = {styles.txt}>Q & A</Text>
        </TouchableOpacity>

        <View style={styles.title_chung}>
          <Text style = {styles.txt_chung}>Bảo mật và điều khoản</Text>
          <View style = {{width: '100%', height: 2, backgroundColor: '#ABABAB'}}/>
        </View>

        <TouchableOpacity style = {styles.container_txt}>
        <Text style = {styles.txt}>Điều khoản và điều kiện</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.container_txt}>
        <Text style = {styles.txt}>Chính sách quyền riêng tư</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.container_txt} onPress={logOut}>
        <Text style = {[styles.txt,styles.txt_logOut]}>Đăng xuất</Text>
        </TouchableOpacity>


      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  txt_logOut: {
    color: '#F00',
  },
  txt: {
    color: '#000',
    fontSize: 16,
    fontWeight:'500',
    lineHeight: 22,
    fontStyle: 'normal',
    fontFamily: 'Lato'
  },
  container_txt: {
    display: 'flex',
    gap: 10,
    flexShrink: 0,

    paddingStart: 24,
    paddingEnd: 24,
    alignSelf: 'stretch',

  },
  txt_chung: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    fontStyle: 'normal',
  },
  title_chung: {
    height: 42,
    paddingTop: 15,
    paddingStart: 24,
    paddingEnd: 24,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: '#FFF'
  },
  container_title: {
    display: 'flex',
    paddingTop: 15,
    paddingBottom: 15,
    paddingStart: 24,
    paddingEnd: 24,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 15,
    flexShrink: 0,
    backgroundColor: '#FFF',
  },
  txt_email: {
    fontWeight: '400',
    fontSize:16,
    fontStyle: 'normal',
    lineHeight: 20,
  },
  txt_name: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
    color: '#000',
    fontStyle: 'normal',
  },
  container_avatar_email: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  container_avatar: {
    display: 'flex',
    flexDirection : 'row',
    gap: 26,
    paddingTop: 25,
    paddingBottom: 15,
    paddingStart: 48,
    paddingEnd: 48,
    alignItems: 'center',
  },
  txt_profile: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Lato',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    textTransform: 'uppercase',
  },
  header: {
    paddingTop: 15,
    paddingTop: 26,
    flexDirection: 'row',
    height: 55,
    paddingStart: 24,
    paddingEnd: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF'
  }
})