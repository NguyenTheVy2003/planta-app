import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import AxiosInstance from "../helper/AxiosInstance"

const ResetPassword = (props) => {
    const { token } = useParams();
    const [password, setpassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [success, setsuccess] = useState('');

    useEffect(() => {
        const check = async () => {
            const result = await AxiosInstance().post('/users/check-token-reset-password', { token });
            console.log('result: ', result);
            setsuccess(result.status)
        }
        check();
    }, [token])

    if (success === false) {
        return (<div>link không hợp lệ</div>)
    } else {
        return (
            <div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" className="form-control" placeholder="Nhập Password" value={password} onChange={(e) => setpassword(e.target.value)} />
                </div>
                <div class="form-group">
                    <label >Forgot Password</label>
                    <input type="password" className="form-control" placeholder="Nhập lại Password" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
                </div>
                <button type="submit" class="btn btn-primary">Đổi mật khẩu</button>

            </div>
        )
    }

}

export default ResetPassword;