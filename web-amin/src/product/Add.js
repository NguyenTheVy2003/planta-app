import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import '../product/Add.css';
import swal from 'sweetalert';
import HeaderProduct from '../layout/HeaderProduct';

const Add = (props) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category_id, setCategory_id] = useState('');

    const handleAdd = async () => {

        if (name === '' || price === '' || quantity === '' || description === '') {
            swal({
                title: 'Thêm mới thất bại',
                text: 'Vui lòng nhập đầy đủ thông tin',
                icon: "error",
            });
            return;
        }

        swal({
            title: "Xác nhận?",
            text: "Xác nhận thêm mới sản phẩm!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (will) => {
                if (will) {
                    try {
                        const body = {
                            name, price, quantity, image, description, category_id
                        }
                        const result = await AxiosInstance().post('/products/', body);
                        console.log(result)
                        swal({
                            title: "Thêm mới thành công",
                            icon: "success",
                        });
                        setTimeout(() => {
                            window.location.href = '/'
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

    // danh sách danh mục
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await AxiosInstance().get('/categories');
                setCategories(result);
                setCategory_id(result[0]._id)
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, []);


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
                    <label className="form-label" >Description:</label>
                    <textarea value={description} className='form-control'
                        onChange={(e) => setDescription(e.target.value)} maxLength={100} ></textarea>
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
                <button className='btn btn-primary' type="button" onClick={handleAdd}>Add</button>
            </form>
        </div>
    )
}

export default Add;