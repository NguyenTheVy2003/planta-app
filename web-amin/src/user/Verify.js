import React, { useState , useEffect} from 'react';
import { useParams } from "react-router-dom";
import AxiosInstance from "../helper/AxiosInstance"

const Verify = () => {
    const { id } = useParams();
    const [result, setresult] = useState(null)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await AxiosInstance().post(`/users/verify/${id}`);
                setTimeout(() => {
                    setresult(response.status);
                }, 3000);
             
            } catch (error) {
                console.log(error);
            }
        }
        verifyUser();

    }, [id]);

    if (result === null) return <div>Đang xác thực tài khoản</div>
    if (result === false) return <div>Xác thực tài khoản thất bại</div>
    return <div>Xác thực tài khoản thành công</div>

}
export default Verify;  