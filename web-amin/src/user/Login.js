import React, { useState } from 'react';
import AxiosInstance from '../helper/AxiosInstance'

const Login = (props) => {
    const { saveUserInfo } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const body = { email, password };
            const result = await AxiosInstance().post('/users/login', body);
            console.log(result);
            if (result.status) {
                saveUserInfo(result.user);
                alert('Đăng nhập thành công')
            }
            else {
                alert('Đăng nhập thất bại')
            }

        } catch (error) {
            console.log(error);
            alert('Đăng nhập thất bại')
        }
    }
    return (
        <div className="row">
            <div className="col-4"></div>
            <form className="col-4">
                <div className="mb-3 mt-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label htmlFor="pwd" class="form-label">Password:</label>
                    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-check mb-3">
                    <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                    </label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Submit</button>
            </form>
            <div className="col-4"></div>
        </div>
    )
}

export default Login;