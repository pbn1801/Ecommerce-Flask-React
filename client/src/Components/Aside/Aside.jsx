import './style.css';

function Aside() {
    return (
        <>
            <div className="aside col-2">
                <div className="aside__heading d-flex">
                    <a href='/' className="aside__heading-home">Trang chủ</a>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="icon-next">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <a href="/" className="aside__heading-next-content">Nhà sách</a>
                </div>
                <div className="aside__main">
                    <div className="aside__main-products">
                        <h2>Danh mục sản phẩm</h2>
                        <ul className="aside__main-products-list">
                            <li className="aside__main-products-item"><a href="/">English book</a></li>
                            <li className="aside__main-products-item"><a href="/">Sách tiếng việt</a></li>
                            <li className="aside__main-products-item"><a href="/">Văn phòng phẩm</a></li>
                            <li className="aside__main-products-item"><a href="/">Quà lưu niệm</a></li>
                        </ul>
                    </div>
                    <div className="aside__main-vendor">
                        <h2>Nhà cung cấp</h2>
                        <ul className="aside__main-vendor-list">
                            <li className="aside__main-vendor-item">
                                <input type="checkbox" name="" id="item1" />
                                <label htmlFor="item1">Nhà sách Fahasa</label>
                            </li>
                            <li className="aside__main-vendor-item">
                                <input type="checkbox" name="" id="item2" />
                                <label htmlFor="item2">Bamboo Books</label>
                            </li>
                            <li className="aside__main-vendor-item">
                                <input type="checkbox" name="" id="item3" />
                                <label htmlFor="item3">Time Book</label>
                            </li>
                            <li className="aside__main-vendor-item">
                                <input type="checkbox" name="" id="item4" />
                                <label htmlFor="item4">Nhà sách Online</label>
                            </li>
                            <li className="aside__main-vendor-item">
                                <input type="checkbox" name="" id="item5" />
                                <label htmlFor="item5">VBooks</label>
                            </li>
                        </ul>
                    </div>
                    <div className="aside__main-rating">
                        <h2>Đánh giá</h2>
                        <div className="aside__main-rating--detail">
                            <div className="aside__main-rating--listStar">
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="star-gold fa-solid fa-star"></i>
                            </div>
                            <span>Từ 5 sao</span>
                        </div>
                        <div className="aside__main-rating--detail">
                            <div className="aside__main-rating--listStar">
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span>Từ 4 sao</span>
                        </div>
                        <div className="aside__main-rating--detail">
                            <div className="aside__main-rating--listStar">
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="star-gold fa-solid fa-star"></i>
                                <i className="star-gold fa-solid fa-star"></i>                              
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <span>Từ 3 sao</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Aside