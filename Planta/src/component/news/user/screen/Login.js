import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View ,KeyboardAvoidingView,ScrollView, ToastAndroid} from 'react-native'
import React, { useState, useContext } from 'react'
import { login } from '../UserHTTP'
import UserContext from '../UserContext'

const Login = (props) => {
    const { navigation } = props;
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')


    const handleLogin = async () => {
        try {
            const result = await login(email, password);
            // luu token vao storage
            // luu thong tin user
            setUser(result.user);
            console.log(result)
        } catch (error) {
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
            console.log(error)
            throw error
        }
    }

    const { setUser } = useContext(UserContext);


    return (
        <KeyboardAvoidingView style={styles.container}>
        <ScrollView
            showsVerticalScrollIndicator={false} // thanh cuộn
        >
        <View>
            <Image style={styles.img} source={require('../../../../image/img_planta.png')} />
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
                    onChangeText={setemail}>
                    {/* <Text style={styles.txt_email}>Email</Text> */}
                </TextInput>
                <View style={{ width: '100%', height: 1.5, backgroundColor: '#ABABAB' }} />
                <View />

            </View>
            <View style={styles.container_input}>
                <View style={{ width: '100%', height: 1.5 }} />
                <TextInput
                    placeholder="Nhập password"
                    value={password}
                    onChangeText={setpassword}>
                    {/* <Text style={styles.txt_email}>Password</Text> */}
                </TextInput>
                <View style={{ width: '100%', height: 1.5, backgroundColor: '#ABABAB' }} />
                <View />

            </View>
            <View style={{ paddingTop: 20, paddingStart: 48, paddingEnd: 48, }}>
                <TouchableOpacity style={styles.btn}  onPress={handleLogin}>
                    <Text style={styles.txt_btn}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container_chua_phai}>
                <Text style={styles.txt_chua_phai_bay_gio} onPress={() => props.navigation.navigate('Register')} >Chưa có tài khoản? </Text>
            </View>

        </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
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
        backgroundColor: '#7D7B7B',
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
        width: 375,
        height: 92,
        paddingTop: 15,
        paddingBottom: 15,
        paddingStart: 48,
        paddingEnd: 48,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
    },
    ic_planta: {
        width: 129,
        height: 58,
        flexShrink: 0,
    },
    img: {
        width: '100%',
        height: 391,
    },
    container: {
        // justifyContent: 'center',
        // alignItems: 'center'

        width: '100%',
        height: '100%',
        backgroundColor: '#FFF' 

    },
})