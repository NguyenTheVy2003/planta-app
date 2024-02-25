import React, { useState } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import swal from 'sweetalert';
import HeaderCategory from '../layout/HeaderCategory';


const AddCategory = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleAdd = async () => {

        if (name === '' || description === '') {
            swal({
                title: 'Thêm mới thất bại',
                text: 'Vui lòng nhập đầy đủ thông tin',
                icon: "error",
            });
            return;
        }

        swal({
            title: "Xác nhận?",
            text: "Xác nhận thêm mới danh mục!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        const body = {
                            name, description
                        }
                        const result = await AxiosInstance().post('/Categories/', body);
                        console.log(result)
                        swal({
                            title: "Thêm mới thành công",
                            icon: "success",
                        });
                        setTimeout(() => {
                            window.location.href = '/Category'
                        }, 2000);

                    } catch (error) {
                        console.log(error);
                        swal({
                            title: "Thêm mới thất bại",
                            icon: "warning",
                        });
                    }

                }
            });

    }

    // xử lý hình ảnh

    return (
        <div>
           <HeaderCategory/>
            <form className='container'>
                <div className="mb-3 mt-3">
                    <label className="form-label">Name:</label>
                    <input type="text" value={name} className='form-control'
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label" >Description:</label>
                    <textarea value={description} className='form-control'
                        onChange={(e) => setDescription(e.target.value)} maxLength={100} ></textarea>
                </div>
                <button className='btn btn-primary' type="button" onClick={handleAdd}>Add</button>
            </form>
        </div>
    )
}

export default AddCategory;