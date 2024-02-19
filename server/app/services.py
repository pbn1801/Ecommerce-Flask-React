# from flask_restful import Resource
# from flask import request, jsonify
# from models import Product, db
# from flask_cors import CORS, cross_origin
from flask_restful import Resource
from flask import request, jsonify
from app.models import Product
from flask_cors import CORS, cross_origin

class ProductManager(Resource):
    # @cross_origin
    def get(self):
        try:
            # Lấy tất cả sản phẩm từ database
            products = Product.query.all()
            # Trả về danh sách sản phẩm dưới dạng JSON và trả về response
            return jsonify({"products": [{"id": product.id, "image": product.image, "name": product.name, 
                    "price": product.price, "description": product.description} 
                    for product in products]})
        except Exception as e:
            return jsonify({"error": str(e)})
