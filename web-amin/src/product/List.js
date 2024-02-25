import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import swal from 'sweetalert';
import HeaderProduct from '../layout/HeaderProduct';

const List = (props) => {
  const {setUser} = props;
  const [product, setproduct] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await AxiosInstance().get('/products');
        setproduct(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const logOut = () =>{setUser(null)}
  const handleDelete = async (id) => {
    swal({
      title: "Xác nhận?",
      text: "Xác nhận xóa sản phẩm!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (will) => {
        if (will) {
          try {
            await AxiosInstance().delete(`/products/${id}`)
            swal({
              title: "Xóa thành công",
              icon: "success",
            });
            setTimeout(() => {
              window.location.reload()
            }, 2000);
          } catch (error) {
            console.log(error);
            swal({
              title: "Xóa thất bại",
              icon: "warning",
            });
          }
        }
      })
  };

  return (

    <div>
      <HeaderProduct/>
      {/* <a href={logOut} onClick={logOut} class="btn btn-success m-1 ">Đăng Xuất</a> */}
      <div className='container'>
      <div className=' m-4'>
        <div class="col-10  "><h2 className='text-primary'>List Product    <a href={'http://localhost:3000/Add'} class="btn btn-success m-1 ">Add News</a></h2></div>
        <div class="input-group rounded mt-3">
          <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
          <span class="input-group-text border-0" id="search-addon">
            <button>
              <img src="ic_search.png" width={30} height={30} class="fas fa-search"></img>
          </button>
        </span>
      </div>
      <table  class="table table-hover mt-3 ">
        <thead class="table-dark">
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th style={{ textAlign: 'center' }}>Price</th>
            <th style={{ textAlign: 'center' }}>Quantity</th>
            <th style={{ textAlign: 'center' }}>Image</th>
            <th style={{ textAlign: 'center' }}>Option</th>

          </tr>
        </thead>
        <tbody>
          {product.map((item, index) => (
            <tr key={index} className='container'>
              <td >{index + 1}</td>
              <td>{item.name}</td>
              <td style={{ textAlign: 'center' }}>{item.price} $</td>
              <td style={{ textAlign: 'center' }}>{item.quantity}</td>
              <td style={{ textAlign: 'center', }}>
                {/* <img className="mb-3 mt-3" src={item.image} alt="" width={45} height={65}></img> */}
                <img
                  // src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                  src={item.image}
                  style={{ width: '50px', height: '60px', }}
                  class="rounded mx-auto d-block"
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <a href={`/edit/${item._id}`} class="btn btn-success">Edit</a>
                <button href="#" type='btn_Delete' class="btn btn-danger" onClick={() => handleDelete(`${item._id}`)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>


    </div >
  );
};

export default List;
