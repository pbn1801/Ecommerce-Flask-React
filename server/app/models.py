# from flask_sqlalchemy import SQLAlchemy
from app import db


# db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(60), nullable=False)
    carts = db.relationship('Cart', back_populates='user', uselist=False)


class Product(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    image = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Integer(), default=0)
    description = db.Column(db.String(1024))
    category = db.relationship('Category', back_populates='products')
    category_name = db.Column(db.String(100), db.ForeignKey('category.name'))
    carts = db.relationship('CartProduct', back_populates='product', cascade='all, delete-orphan')


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    products = db.relationship('Product', back_populates='category')


class Cart(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='carts')
    products = db.relationship('CartProduct', back_populates='cart', cascade='all, delete-orphan')



class CartProduct(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    cart_id = db.Column(db.Integer(), db.ForeignKey('cart.id'), nullable=False)
    cart = db.relationship('Cart', back_populates='products')
    product_id = db.Column(db.Integer(), db.ForeignKey('product.id'), nullable=False)
    product = db.relationship('Product', back_populates='carts')
    quantity = db.Column(db.Integer, default=0)

