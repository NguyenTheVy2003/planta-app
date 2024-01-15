import AxiosInstance from "../../../helper/AxiosInstance";
export const login = async (email, password) => {
    try {
        const url = '/users/login'
        const body = {
            email: email,
            password: password,
        }
        return await AxiosInstance().post(url,body);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const register = async (email, password,name,role) => {
    try {
        const url = '/users/register'
        const body = {
            email: email,
            password: password,
            name: name,
            role: role,
        }
        return await AxiosInstance().post(url,body);
    } catch (error) {
        console.log(error)
        throw error;
    }
}

export const fogotPass = async (email) => {
    try {
        const url = '/users/forgot-password'
        const body = {
            email: email,
        }
        return await AxiosInstance().post(url,body);
    } catch (error) {
        console.log(error)
        throw error;
    }
}
