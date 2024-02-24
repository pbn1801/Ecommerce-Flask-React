import './style.css';
import ProductItem from '../ProductItem/ProductItem';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Số lượng sản phẩm trên mỗi trang
  const products = [
    {
      "category": "Sách tiếng Việt",
      "description": "Chúng ta đang sống trong một thời đại vội vã, dường như mọi giao tiếp đều ở trên màn hình xanh, và dường như chúng ta thường quên đi những niềm vui giản dị, những ấm áp yêu thương, những cử chỉ chân t...",
      "id": 1,
      "image": "https://salt.tikicdn.com/ts/product/82/82/80/c542073200c6e95d3e89840b2f41ce2e.jpg",
      "name": "101 BÍ KÍP SỐNG SÓT NƠI CÔNG SỞ-Sửa lần 6",
      "price": 138000
    },
    {
      "category": "Sách tư duy ",
      "description": "***Nội dung phiên bản tái bản không có thay đổi so với phiên bản đầu, chỉ thay đổi format và số đăng ký năm theo Luật Xuất Bản ***---------------------------------------Bạn có biết:- Các thủ khoa ...",
      "id": 2,
      "image": "https://salt.tikicdn.com/ts/product/29/c6/6d/64243ee01d5a0786fdb3c3977ec9c63e.jpg",
      "name": "Chó sủa nhầm cây - Tại sao những gì ta biết về thành công có khi lại sai",
      "price": 150000
    },
    {
      "category": "Sách doanh nhân",
      "description": "Sáng Tạo Không Giới Hạn Trong Kinh Doanh “…Đôi khi, thành công phụ thuộc vào một cái gì đó bên trong mỗi chúng ta, không phải là kết quả của việc nhiều tiền bạc, khả năng hô hào hay bằng cấp…” Tác...",
      "id": 3,
      "image": "https://salt.tikicdn.com/ts/product/93/28/53/c6b3299850c4af077f36ed73189620ad.jpg",
      "name": "Sáng Tạo Không Giới Hạn Trong Kinh Doanh\"",
      "price": 96000
    },
    {
      "category": "Sách tiếng Việt",
      "description": "“Vị chua chát của cái nghèo hòa trộn với vị ngọt ngào khi khám phá ra những điều khiến cuộc đời này đáng số một tác phẩm kinh điển của Brazil.”- Booklist“Một cách nhìn cuộc sống gần như hoàn chỉnh t...",
      "id": 4,
      "image": "https://salt.tikicdn.com/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg",
      "name": "Cây Cam Ngọt Của Tôi",
      "price": 108000
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://86yfl7-8080.csb.app/books');
        setProductList(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Tính toán chỉ mục của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

  // Chuyển đến trang tiếp theo
  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  // Chuyển đến trang trước đó
  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="product-container">
      <div className="product-list">
        {products.map((product, index) => (
          <ProductItem key={index} product={product} />
        ))}
      </div>

      <div className="pagination">
        <ul className="product-list__pagination">
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
          {Array.from({ length: Math.ceil(productList.length / productsPerPage) }, (_, i) => (
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
              disabled={currentPage === Math.ceil(productList.length / productsPerPage)}
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