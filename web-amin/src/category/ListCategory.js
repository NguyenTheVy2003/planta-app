import React, { useState, useEffect } from 'react';
import AxiosInstance from '../helper/AxiosInstance';
import swal from 'sweetalert';
import HeaderCategory from './HeaderCategory';

const ListCategory = (props) => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await AxiosInstance().get(`/categories`);
        setCategory(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    swal({
      title: "Xác nhận?",
      text: "Xác nhận xóa danh mục!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then(async (will) => {
        if (will) {
          try {
            await AxiosInstance().delete(`/categories/${id}`)
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
              title: "Xóa không thành công",
              text: "Không thể xóa danh mục do đã có sản phẩm!",
              icon: "error",
            });
          }
        }
      })
  };

  return (
    <div>
      <HeaderCategory />
      <div>
        <div className='container py-3'>
          <div className="row">
            <div className="col-10"><h2 className='text-primary'>Danh mục hoa   <a href={'http://localhost:3000/category/add'} className="btn btn-success m-1 ">Add News</a></h2></div>
            <div className="input-group rounded">
              <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
              <span className="input-group-text border-0" id="search-addon">
                <button>
                  <img src="ic_search.png" width={30} height={30} className="fas fa-search"></img>
                </button>
              </span>
            </div>
          </div>
          <table className="table table-striped  mt-3">
            <thead className="table-dark">
              <tr>
                <th scope="col">STT</th>
                <th scope="col" >Name</th>
                <th scope="col" style={{ textAlign: 'revert' }}>Option</th>

              </tr>
            </thead>
            <tbody>
              {category.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <th>{item.name}</th>
                  <th style={{ textAlign: 'center' }}>
                    <a href={`/category/edit/${item._id}`} className="btn btn-success" role="button">Edit</a>
                    <button href="#" type='btn_Delete' className="btn btn-danger" onClick={() => handleDelete(`${item._id}`)}>Delete</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
