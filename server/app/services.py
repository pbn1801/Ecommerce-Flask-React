from app import db
from flask_restful import Resource
from flask import request, jsonify
from app.models import Product, Category, User
from flask_cors import CORS, cross_origin

class ProductManager(Resource):
    # @cross_origin
    def get(self):
        try:
            # Lấy tất cả sản phẩm từ database
            products = Product.query.all()
            # Trả về danh sách sản phẩm dưới dạng JSON và trả về response
            return jsonify({"products": [{"id": product.id, "image": product.image, "name": product.name, 
                    "price": product.price, "description": product.description, "category": product.category_name} 
                    for product in products]})
        except Exception as e:
            return jsonify({"error": str(e)})

    def post(self):
        try:
            new_product = Product(
                image = request.json['image'],
                name = request.json['name'],
                price = request.json['price'],
                description = request.json['description'],
                category_name = request.json['category_name']
            )

            db.session.add(new_product)
            db.session.commit()

            return ({
                "id": new_product.id,
                "image": new_product.image,
                "name": new_product.name,
                "price": new_product.price,
                "description": new_product.description,
                "category_name": new_product.category_name
            })
        except Exception as e:
            return jsonify({"error": str(e)})


class CategoryManager(Resource):
    def get(self):
        try:
            categorys = Category.query.all()

            return jsonify({
                "categorys": [
                    {
                        "id": category.id,
                        "name": category.name
                    }
                    for category in categorys
                ]
            })
        except Exception as e:
            return jsonify({"error": str(e)})


    def post(self):
        try:
            new_category = Category(
               name = request.json["name"]
            )

            db.session.add(new_category)
            db.session.commit()

            return ({
                "id": new_category.id,
                "name": new_category.name,
            })
        
        except Exception as e:
            return jsonify({"error": str(e)})





