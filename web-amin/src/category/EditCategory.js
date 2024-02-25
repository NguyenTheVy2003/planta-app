import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../helper/AxiosInstance';
import HeaderCategory from '../layout/HeaderCategory';

const EditCategory = (props) => {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // lấy thông tin chi tiết 1 sản phẩm theo id
    useEffect(() => {
        // lấy id từ url params
        // const id
        const fetchProductById = async () => {
            try {
                const result = await AxiosInstance().get(`/categories/${id}`);
                setName(result.name);
                setDescription(result.description);
            } catch (error) {

            }
        }
        fetchProductById();
    }, []);

    const handleEdit = async () => {
        swal({
            title: "Xác nhận?",
            text: "Xác nhận cập nhật danh mục!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        // name, price, quantity, description, image, category_id
                        const body = {
                            name, description
                        }
                        await AxiosInstance().put('/categories/' + id, body);
                        // console.log(result)
                        swal({
                            title: "Cập nhật thành công!",
                            icon: "success",
                        });
                        setTimeout(() => {
                            // quay về trang chủ
                            window.location.href = '/category';
                        }, 2000);
                    } catch (error) {
                        console.log(error);
                        swal({
                            title: "Cập nhật thất bại!",
                            icon: "error",
                        });
                    }
                }
            })
    }

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
                    <label className="form-label">Description:</label>
                    <textarea value={description} className='form-control'
                        onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>
                <button className='btn btn-primary' type="button" onClick={handleEdit}>Edit</button>
            </form>
        </div>
    )
}
export default EditCategory;