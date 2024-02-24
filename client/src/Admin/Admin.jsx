import './style.css';
import { useState, useEffect, useNavigate } from 'react';
import axios from 'axios';

function Admin() {
    const [products, setProducts] = useState([]);
    const [id, setId] = useState();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(""); 
    const [category, setCategory] = useState("");
    const [isChanged, setIsChanged] = useState(false);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [isEditFormVisible, setIsEditFormVisible] = useState(false);

    // const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/sanpham');
                setProducts(response.data.products);
            } catch(error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchData();
    }, [isChanged]);

    const handleClickBgForm = () => {
        setIsAddFormVisible(false);
        setIsEditFormVisible(false);
    }

    const handleAddProductClick = () => {
        setIsAddFormVisible(true); 
    }

    const handleEdit = (id) => {
        setIsEditFormVisible(true);
        const selectedProduct = products.find(product => product.id === id);
        setId(selectedProduct.id);
        setName(selectedProduct.name);
        setCategory(selectedProduct.category);
        setImage(selectedProduct.image);
        setDescription(selectedProduct.description);
        setPrice(selectedProduct.price);
    }

    const handleSaveEdit = () => {
        setIsEditFormVisible(false);
        setIsChanged(!isChanged);
        axios.put(`http://127.0.0.1:5000/sanpham/${id}`, {
            name: name,
            image: image,
            price: price,
            description: description,
            category: category,
            id: id
        })
        .then(respone => {
            alert("Sửa thành công");
            
        })
        .catch(error => {
            console.log(error);
        });
    }

    const handleAdd = () => {
        setIsAddFormVisible(false);
        setIsChanged(!isChanged);
        axios.post('http://127.0.0.1:5000/sanpham', {
            name: name,
            price: price,
            description: description,
            image: image,
            category: category
        })
        .then(respone => {
            alert("Thêm mới thành công")
            
        })
        .catch(error => {
            console.log(error);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:5000/sanpham/${id}`)
            .then(respone => { alert("Xóa thành công"); })
            .catch((error) => { console.log(error); })
    };

    return (
        <>
            <div className="admin">
                <h1>Product Manager</h1>
                <button className="addprod" onClick={handleAddProductClick}>Add Product</button>
                <table className="admin-table">
                    <thead className='col-head'>
                        <tr>
                            <th className='col-head-id'>ID</th>
                            <th className='col-head-img'>Hình ảnh</th>
                            <th className='col-head-title'>Tên</th>
                            <th className='col-head-price'>Giá</th>
                            <th className='col-head-category'>Loại</th>
                            <th className='col-head-desc'>Mô tả</th>
                            <th className='col-head-act'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className='col-body'>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className='col-body-id'>{product.id}</td>
                                <td className='col-body-img'><img src={product.image} alt={product.name} /></td>
                                <td className='col-body-title'>{product.name}</td>
                                <td className='col-body-price'>{product.price}</td>
                                <td className="col-body-category">{product.category}</td>
                                <td className='col-body-desc'>{product.description}</td>
                                <td className='col-body-act'>
                                    <button className='btn-repair' onClick={() => handleEdit(product.id)}>Sửa</button>
                                    <button className='btn-delete' onClick={() => handleDelete(product.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Modal */}
                {isAddFormVisible && (
                    <div className="bg-form" onClick={handleClickBgForm}>
                        <form className='add-product-form' onClick={(e) => e.stopPropagation()}>
                            <h3>Thêm sản phẩm</h3>
                            <div className="form-group">
                                <label htmlFor="image">Hình ảnh:</label>
                                <input type="text" id="image" name="image" className="form-control" placeholder="URL hình ảnh" onChange={(e) => setImage(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Tên sản phẩm:</label>
                                <input type="text" id="name" name="name" className="form-control" placeholder="Tên sản phẩm" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Giá:</label>
                                <input type="text" id="price" name="price" className="form-control" placeholder="Giá sản phẩm" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Loại:</label>
                                {/* <input type="text" id="category" name="category" className="form-control" placeholder="Loại sản phẩm" onChange={(e) => setCategory(e.target.value)} /> */}
                                <select id="category" name="category" className="form-control" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Chọn loại sản phẩm</option>
                                    <option value="Sách tiếng Việt">Sách tiếng Việt</option>
                                    <option value="Sách doanh nhân">Sách doanh nhân</option>
                                    <option value="Sách tư duy">Sách tư duy</option>
                                    <option value="Sách kỹ năng làm việc">Sách kỹ năng làm việc</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Mô tả:</label>
                                <textarea id="description" name="description" className="form-control description" placeholder="Mô tả sản phẩm" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleAdd}>Thêm sản phẩm</button>
                            <button className="close" onClick={handleClickBgForm}>Đóng</button>
                        </form>
                    </div>
                )}
                {isEditFormVisible && (
                    <div className="bg-form" onClick={handleClickBgForm}>
                        <form className='edit-product-form' onClick={(e) => e.stopPropagation()}>
                            <h3>Sửa sản phẩm</h3>
                            <div className="form-group">
                                <label htmlFor="image">Hình ảnh:</label>
                                <input type="text" id="image" name="image" className="form-control" placeholder="URL hình ảnh" value={image} onChange={(e) => setImage(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Tên sản phẩm:</label>
                                <input type="text" id="name" name="name" className="form-control" placeholder="Tên sản phẩm" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Giá:</label>
                                <input type="text" id="price" name="price" className="form-control" placeholder="Giá sản phẩm" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="category">Loại:</label>
                                {/* <input type="text" id="category" name="category" className="form-control" placeholder="Loại sản phẩm" value={category} onChange={(e) => setCategory(e.target.value)} /> */}
                                <select id="category" name="category" className="form-control" onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Chọn loại sản phẩm</option>
                                    <option value="Sách tiếng Việt">Sách tiếng Việt</option>
                                    <option value="Sách doanh nhân">Sách doanh nhân</option>
                                    <option value="Sách tư duy">Sách tư duy</option>
                                    <option value="Sách kỹ năng làm việc">Sách kỹ năng làm việc</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Mô tả:</label>
                                <textarea id="description" name="description" className="form-control description" placeholder="Mô tả sản phẩm" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSaveEdit}>Sửa sản phẩm</button>
                            <button className="close" onClick={handleClickBgForm}>Đóng</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default Admin;
