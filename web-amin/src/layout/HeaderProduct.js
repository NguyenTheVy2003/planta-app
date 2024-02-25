import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
const HeaderProduct = (props) => {
  return (
    <header>
  
    <div class="p-3 text-center bg-white border-bottom">
      <div class="container">
        <div class="row gy-3">
         
          <div class="col-lg-2 col-sm-4 col-4">
            <a href="https://mdbootstrap.com/" target="_blank" class="float-start">
              <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height="35" />
            </a>
          </div>
        
          <div class="order-lg-last col-lg-5 col-sm-8 col-8">
            <div class="d-flex float-end">
              <a href="http://localhost:3000/Category" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i class="fas fa-user-alt m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Category</p> </a>
              <a href="https://github.com/mdbootstrap/bootstrap-material-design" class="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i class="fas fa-heart m-1 me-md-2"></i><p class="d-none d-md-block mb-0">Wishlist</p> </a>
              <a href="https://github.com/mdbootstrap/bootstrap-material-design" class="border rounded py-1 px-3 nav-link d-flex align-items-center" target="_blank"> <i class="fas fa-shopping-cart m-1 me-md-2"></i><p class="d-none d-md-block mb-0">My cart</p> </a>
            </div>
          </div>
        
          <div class="col-lg-5 col-md-12 col-12">
           {/* <div class="input-group float-center">
              <div class="form-outline">
                <input type="search" id="form1" class="form-control" />
                <label class="form-label" for="form1">Search</label>
              </div>
              <button type="button" class="btn btn-primary shadow-0">
                <i class="fas fa-search"></i>
              </button>
            </div>  */}
          </div>
         
        </div>
      </div>
    </div>
 
    <div class="bg-primary">
      <div class="container py-4">
      
        <nav class="d-flex">
          <h6 class="mb-0">
            <a href="http://localhost:3000/" class="text-white-50">Product</a>
            <span class="text-white-50 mx-2">  </span>
            <a href="" class="text-white-50">Library</a>
            <span class="text-white-50 mx-2">  </span>
            <a href="" class="text-white"><u>Data</u></a>
          </h6>
        </nav>
       
      </div>
    </div>
    
  </header>
  )
}

export default HeaderProduct