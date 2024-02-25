import { Image, StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView,Alert, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { register } from '../UserHTTP';

const Register = (props) => {
    const { navigation } = props;
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [role, setRole] = useState('')



    const handleRegister = async () => {
        try {
            const result = await register(email, password, name, role);
            console.log(result)
            Alert.alert('Success', 'Register Success, please login')
            navigation.navigate('Login');
            return result.user
        } catch (error) {
            console.log(error)
            ToastAndroid.show('Đăng Ký Thất Bại!',
                ToastAndroid.SHORT);
        }
    }
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false} // thanh cuộn
            >
                <View>
                    <View style={styles.header_signUp}>
                        <Image style={styles.ic_planta} source={require('../../../../image/ic_planta.png')} />
                    </View>
                    <View style={styles.container_txt}>
                        <Text style={styles.txt_planta}>
                            Mua sắm và trải nghiệm sản phẩm cây trồng cùng phụ kiện độc đáo duy nhất tại Việt Nam
                        </Text>
                    </View>
                    <View style={styles.container_input}>
                        <View style={{ width: '100%', height: 1.5 }} />
                        <TextInput
                            placeholder="Nhập email"
                            value={email}
                            onChangeText={(text => { setEmail(text) })} >

                        </TextInput>
                        <View style={{ width: '100%', height: 1.5, backgroundColor: '#221F1F' }} />
                        <View />
                    </View>
                    <View style={styles.container_input}>
                        <View style={{ width: '100%', height: 1.5 }} />
                        <TextInput
                            secureTextEntry={true}
                            placeholder="Nhập password"
                            value={password}
                            onChangeText={(text => { setPassword(text) })} />
                        <Image style={styles.eyeIcon} source={require('../../../../image/ic_eye.png')} />

                        <View style={{ width: '100%', height: 1.5, backgroundColor: '#221F1F' }} />
                        <View />

                    </View>
                    <View style={styles.container_input}>
                        <View style={{ width: '100%', height: 1.5 }} />
                        <TextInput
                            placeholder="Nhập họ tên"
                            value={name}
                            onChangeText={(text => { setName(text) })} >

                        </TextInput>
                        <View style={{ width: '100%', height: 1.5, backgroundColor: '#ABABAB' }} />
                        <View />
                    </View>
                    <View style={{ paddingTop: 41, paddingStart: 48, paddingEnd: 48, }}>
                        <TouchableOpacity style={styles.btn} onPress={handleRegister}>
                            <Text style={styles.txt_btn}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.container_chua_phai}>
                        <Text style={styles.txt_chua_phai_bay_gio} onPress={() => props.navigation.navigate('Login')} >Tôi đã có tài khoản</Text>
                    </View>


                </View>
            </ScrollView>
            <View style={styles.container_footer}>
                <Text style={styles.txt_footer}>Bằng việc đăng ký, bạn đồng ý với</Text>
                <Text style={styles.txt_footer_2}>Điều khoản <Text style={styles.txt_footer}>và</Text> Chính sách bảo mật<Text style={styles.txt_footer}> chúng tôi.</Text></Text>
            </View>
        </KeyboardAvoidingView>

    )
}

export default Register

const styles = StyleSheet.create({
    eyeIcon: {
        position: 'absolute',
        right: 45,
        top: 20,
        width: 30,
        height: 30,
    },
    txt_footer_2: {
        lineHeight: 26,
        textDecorationLine: 'underline',
        color: '#007537',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center',

    },
    txt_footer: {
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 14,
        fontStyle: 'normal',
        lineHeight: 20,
        textDecorationLine: 'none',
    },
    container_footer: {
        paddingStart: 48,
        paddingEnd: 48,
        marginBottom: 50,
        height: 44,
        paddingEnd: 48,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
    },
    container_chua_phai: {
        display: 'flex',
        paddingTop: 11,
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
    },
    txt_chua_phai_bay_gio: {
        color: '#000',
        height: 30,
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 20,
        textDecorationLine: 'underline',
    },
    txt_btn: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 22,
        width: 150,
        height: 22,
    },
    btn: {
        display: 'flex',
        width: 297,
        height: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingStart: 100,
        paddingEnd: 100,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
        borderRadius: 8,
        backgroundColor: '#221F1F',
    },
    txt_email: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        color: '#ABABAB',
        fontFamily: 'Lato',
        fontSize: 16,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 20,

    },
    container_input: {
        borderRadius: 8,
        paddingTop: 20,
        display: 'flex',
        paddingStart: 48,
        paddingEnd: 48,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexShrink: 0,
    },
    container_txt: {
        display: 'flex',
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 48,
        paddingEnd: 48,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,

    },
    txt_planta: {
        color: '#000',
        width: 279,
        height: 52,
        textAlign: 'center',
        fontFamily: 'Lato',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
        lineHeight: 26,
    },
    header_signUp: {

        height: 120,
        paddingTop: 27,
        paddingBottom: 27,
        paddingStart: 24,
        paddingEnd: 24,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
    },
    ic_planta: {
        width: 129,
        height: 58,
        flexShrink: 0,
    },
    container: {
        // justifyContent: 'center',
        // alignItems: 'center'

        width: '100%',
        height: '100%',

    },
})