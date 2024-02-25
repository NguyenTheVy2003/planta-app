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
        <div class="row">
            <div class="col-4"></div>
            <form class="col-4">
                <div class="mb-3 mt-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email" name="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="pwd" class="form-label">Password:</label>
                    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div class="form-check mb-3">
                    <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" name="remember" /> Remember me
                    </label>
                </div>
                <button type="submit" class="btn btn-primary" onClick={handleLogin}>Submit</button>
            </form>
            <div class="col-4"></div>
        </div>
    )
}

export default Login;