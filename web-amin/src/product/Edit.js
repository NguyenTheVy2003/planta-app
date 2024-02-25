import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
import AxiosInstance from '../helper/AxiosInstance';
import HeaderProduct from '../layout/HeaderProduct';

const Edit = (props) => {

    const { id } = useParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category_id, setCategory_id] = useState('');

    // xử lý hình ảnh
    const [previewImage, setPreviewImage] = useState('');
    const handleImage = async (e) => {
        // hiển thị hình ảnh lên giao diện
        const file = e.target.files[0];
        setPreviewImage(URL.createObjectURL(file));

        // upload ảnh lên server
        const formData = new FormData();
        formData.append('image', file);
        const result = await AxiosInstance('multipart/form-data')
            .post('/upload-file', formData);
        setImage(result.path);
    }

    // danh sách danh mục
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await AxiosInstance().get('/categories');
                setCategories(result);
                setCategory_id(result[0]._id);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, []);

    // lấy thông tin chi tiết 1 sản phẩm theo id
    useEffect(() => {
        // lấy id từ url params
        // const id
        const fetchProductById = async () => {
            try {
                const result = await AxiosInstance().get(`/products/${id}`);
                setName(result.name);
                setPrice(result.price);
                setQuantity(result.quantity);
                setPreviewImage(result.image);
                setDescription(result.description);
                setCategory_id(result.category_id);
            } catch (error) {

            }
        }
        fetchProductById();
    }, []);

    const handleEdit = async () => {
        swal({
            title: "Xác nhận?",
            text: "Xác nhận cập nhật sản phẩm!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        // name, price, quantity, description, image, category_id
                        const body = {
                            name, price, quantity, image, description, category_id
                        }
                        const result = await AxiosInstance().put('/products/' + id, body);
                        // console.log(result)
                        swal({
                            title: "Cập nhật thành công!",
                            icon: "success",
                        });
                        setTimeout(() => {
                            // quay về trang chủ
                            window.location.href = '/';
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
           <HeaderProduct/>
            <form className='container'>
                <div className="mb-3 mt-3">
                    <label className="form-label">Name:</label>
                    <input type="text" value={name} className='form-control'
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Price:</label>
                    <input type="number" value={price} className='form-control'
                        onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Quantity:</label>
                    <input type="number" value={quantity} className='form-control'
                        onChange={(e) => setQuantity(e.target.value)} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Image:</label>
                    <input type="file" className='form-control'
                        onChange={(e) => handleImage(e)} />
                    <img className="mb-3 mt-3" src={previewImage} alt="" width={200} />
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Description:</label>
                    <textarea value={description} className='form-control'
                        onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>
                <div className="mb-3 mt-3">
                    <label className="form-label">Category:</label>
                    <select value={category_id} className='form-control'
                        onChange={(e) => setCategory_id(e.target.value)} >
                        {
                            categories.map((item, index) =>
                                <option key={index} value={item._id}>{item.name}</option>
                            )
                        }
                    </select>
                </div>
                <button className='btn btn-primary' type="button" onClick={handleEdit}>Edit</button>
            </form>
        </div>
    )
}

export default Edit;