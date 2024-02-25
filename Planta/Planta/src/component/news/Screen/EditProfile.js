import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import { useContext, useState, useCallback } from 'react'
import UserContext from '../user/UserContext';

const EditProfile = (props) => {
    const { navigation } = props;
    const { user, setUser } = useContext(UserContext);
    const [email, setemail] = useState('')
    const [name, setname] = useState('')
    const [address, setaddress] = useState('')
    const [phone, setphone] = useState('')

    function EditProfile() {
        email = setUser.email
        name = setUser.name
        address = setUser.address
        phone = setUser.phone
    }



    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView>

                <View style={styles.header}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
                        <Image style={styles.ic_back} source={require('../../../image/ic_back.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Text style={styles.txt_profile}>Chỉnh sửa thông tin</Text>
                    </TouchableOpacity>
                    <View >

                    </View>
                </View>
                <View style={styles.container_edit_profile}>
                    <Text style={{
                        fontFamily: 'Lato',
                        color: '#221F1F',
                        fontSize: 16,
                        fontWeight: '400',
                        fontStyle: 'normal',
                        lineHeight: 20,
                        alignSelf: 'stretch',

                    }}>Thông tin sẽ được lưu cho lần mua kế tiếp.
                        Bấm vào thông tin chi tiết để chỉnh sửa.</Text>
                    <View style={styles.container_edt}>
                        <View style={{ width: '100%' }}>
                            <TextInput style={{
                                fontFamily: 'Lato',
                                fontSize: 14,
                                fontWeight: '400',
                                lineHeight: 20,
                                color: '#7D7B7B'
                            }}
                                onChangeText={setname}
                            >{user.name}</TextInput>
                            <View style={{ height: 1, backgroundColor: '#ABABAB' }} />
                        </View>
                    </View>
                    <View style={styles.container_edt}>
                        <View style={{ width: '100%' }}>
                            <TextInput style={{
                                fontFamily: 'Lato',
                                fontSize: 14,
                                fontWeight: '400',
                                lineHeight: 20,
                                color: '#7D7B7B',
                            }}
                                onChangeText={setemail}
                            >{user.email}</TextInput>
                            <View style={{ height: 1, backgroundColor: '#ABABAB' }} />
                        </View>
                    </View>
                    <View style={styles.container_edt}>
                        <View style={{ width: '100%' }}>
                            <TextInput style={{
                                fontFamily: 'Lato',
                                fontSize: 14,
                                fontWeight: '400',
                                lineHeight: 20,
                                color: '#7D7B7B',
                            }}
                                onChangeText={setaddress}>{user.address}</TextInput>
                            <View style={{ height: 1, backgroundColor: '#ABABAB' }} />
                        </View>
                    </View>
                    <View style={styles.container_edt}>
                        <View style={{ width: '100%' }}>
                            <TextInput style={{
                                fontFamily: 'Lato',
                                fontSize: 14,
                                fontWeight: '400',
                                lineHeight: 20,
                                color: '#7D7B7B',
                            }}
                            
                                onChangeText={setphone}>{user.phone} </TextInput>
                            <View style={{ height: 1, backgroundColor: '#ABABAB' }} />
                        </View>
                    </View>
                </View>




            </ScrollView>
            <View style={styles.container_btn}>
                <TouchableOpacity style={{
                    display: 'flex',
                    width: 327,
                    height: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingStart: 100,
                    paddingEnd: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                    borderRadius: 8,
                    backgroundColor: '#007537'
                }} onPress={EditProfile}>
                    <Text style={{
                        color: '#FFF',
                        textAlign: 'center',
                        fontFamily: 'Lato',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        textTransform: 'uppercase'
                    }}>Lưu thông tin</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>


    )

}




export default EditProfile

const styles = StyleSheet.create({
    ic_back: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container_btn: {
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 24,
        paddingEnd: 24,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    container_edt: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 4,
        alignSelf: 'stretch'
    },
    container_edit_profile: {
        display: 'flex',
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 48,
        paddingEnd: 48,
        flexDirection: 'column',
        justifyContent: 'center',

        alignItems: 'center',
        gap: 15,

    },
    txt_profile: {
        color: '#000',

        fontFamily: 'Lato',
        fontSize: 14,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF'
    }
})