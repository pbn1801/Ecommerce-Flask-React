from app import db, bcrypt
from flask_restful import Resource
from flask import request, jsonify
from app.models import Product, Category, User, Cart, CartProduct
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import re

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
            new_product_name = request.json['name']

            product_exist = Product.query.filter_by(name=new_product_name).first()

            if product_exist:
                return jsonify({"error": "Tên sản phẩm đã tồn tại! Vui lòng chọn tên khác"})

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

class ProductUpdateDelete(Resource):
    def put(self, product_id):
        product = Product.query.get(product_id)

        product.image = request.json['image']
        product.name = request.json['name']
        product.price = request.json['price']
        product.description = request.json['description']
        product.category_name = request.json['category']

        db.session.commit()

        return jsonify({"message": "Sửa đổi sản phẩm thành công"})

    def delete(self, product_id):
        product = Product.query.get(product_id)

        db.session.delete(product)
        db.session.commit()

        return jsonify({"message": "Xóa sản phẩm thành công"})




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


class SignUp(Resource):
    def post(self):
        name = request.json["name"]
        email = request.json["email"]
        password = request.json["password"]

        email_regex = re.compile(r"^[a-zA-Z]+[0-9]*@gmail\.com$")
        if not email_regex.match(email):
            return jsonify({"error": "Invalid email"}), 400

        user_exists = User.query.filter_by(email=email).first()
        if user_exists:
            return jsonify({"error": "Email already exists"}), 409

        password_hash = bcrypt.generate_password_hash(password)
        new_user = User(email=email, name=name, password=password_hash)
        db.session.add(new_user)
        db.session.commit()

        token = create_access_token(identity=new_user.id)

        return jsonify(token=token)

class SignIn(Resource):
    def post(self):
        email = request.json["email"]
        password = request.json["password"]

        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"error": "Signin failed!"}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Wrong password!"}), 401

        token = create_access_token(identity=user.id)
        return jsonify(token=token)


class UserManager(Resource):
    @jwt_required()
    def get(self):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)

        if not user:
            return jsonify({"error": "User not found"}), 404
        
        return jsonify({"name": user.name, "email": user.email})


class CartManager(Resource):
    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()
        user_cart = Cart.query.filter_by(user_id=user_id).first()

        cart_item = CartProduct.query.filter_by(cart_id=user_cart.id).all()

        cart_data = [{
            "id": item.id,
            "product": {
                "id": item.product.id,
                "image": item.product.image,
                "name": item.product.name,
                "price": item.product.price,
            },
            "quantity": item.quantity,
        } for item in cart_item]

        return jsonify(cart_data)


class AddToCart(Resource):
    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()
        product_id = request.json.get('product_id')
        quantity = request.json.get('quantity', 1)

        # Kiểm tra xem người dùng đã có giỏ hàng chưa
        user_cart = Cart.query.filter_by(user_id=user_id).first()
        if not user_cart:
            user_cart = Cart(user_id=user_id)
            db.session.add(user_cart)
            db.session.commit()

        # Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
        cart_item = CartProduct.query.filter_by(cart_id=user_cart.id, product_id=product_id).first()
        if cart_item:
            cart_item.quantity += 1
        else: 
            cart_item = CartProduct(cart_id=user_cart.id, product_id=product_id, quantity=quantity)
            db.session.add(cart_item)
        db.session.commit()
        
        return jsonify({"message": "Sản phẩm đã được thêm vào giỏ hàng thành công"})




class RemoveCartItem(Resource):
    @jwt_required()
    def delete(self, cart_item_id):
        user_id = get_jwt_identity()
        cart_item = CartProduct.query.get(cart_item_id)
        
        if cart_item is None:
            return jsonify({"error": "Mục giỏ hàng không tồn tại"}), 404

        if cart_item.cart.user_id != user_id:
            return jsonify({"error": "Bạn không có quyền xóa mục giỏ hàng này"}), 403

        db.session.delete(cart_item)
        db.session.commit()
    
        return jsonify({"message": "Sản phẩm đã xóa khỏi giỏ hàng"})
        
        






