import './style.css';
import ProductItem from '../ProductItem/ProductItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList({ searchTerm}) {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Số lượng sản phẩm trên mỗi trang

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/sanpham');
        setProductList(response.data.products); // Lấy mảng sản phẩm từ thuộc tính products
        // console.log(response.data.products)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  // console.log(typeof productList);
  
  
  // Lọc danh sách sản phẩm dựa trên giá trị nhập vào từ ô tìm kiếm
  // const filteredProducts = productList && productList.products ? Object.values(productList.products).filter(product =>
  //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
  // ) : [];
  // console.log(filteredProducts);
  const filteredProducts = productList.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính toán chỉ mục của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // Kiểm tra xem productList có tồn tại và không rỗng trước khi sử dụng thuộc tính length
  // const currentProducts = Array.isArray(productList) ? productList.slice(indexOfFirstProduct, indexOfLastProduct) : [];
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  console.log(productList);

  // Chuyển đến trang tiếp theo
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Chuyển đến trang trước đó
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="product-container col-12">
      <div className="product-list">
        <div className="row">
          {currentProducts && currentProducts.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </div>
      </div>

      <div className="pagination">
        <ul className="product-list__pagination d-flex">
          <li className="pagination-item">
            <button
              className="pagination-item__link"
              disabled={currentPage === 1}
              onClick={prevPage}
            >
              <i className="pagination-item__icon fa-solid fa-angle-left"></i>
            </button>
          </li>
          {/* Hiển thị số trang */}
          {productList && Array.from({ length: Math.ceil(productList.length / productsPerPage) }, (_, i) => (
            <li key={i} className={`pagination-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button
                className="pagination-item__link"
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <li className="pagination-item">
            <button
              className="pagination-item__link"
              disabled={currentPage === Math.ceil((productList && productList.length) / productsPerPage)}
              onClick={nextPage}
            >
              <i className="pagination-item__icon fa-solid fa-angle-right"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProductList;
