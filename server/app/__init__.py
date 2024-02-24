from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:123456@localhost/ecommercedb?charset=utf8mb4' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = '08b17fd417c3f6b3be60285f'
CORS(app,  resources={r"/*": {"origins": "*"}}, supports_credentials=True)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

api = Api(app)
from app.services import ProductManager, CategoryManager, SignUp, SignIn, UserManager, AddToCart, RemoveCartItem, CartManager, ProductUpdateDelete
#Tao endpoints.
api.add_resource(ProductManager, '/sanpham')
api.add_resource(ProductUpdateDelete, '/sanpham/<int:product_id>')
api.add_resource(CategoryManager, '/loai')
api.add_resource(SignUp, '/dangky')
api.add_resource(SignIn, '/dangnhap')
api.add_resource(UserManager, '/user')
api.add_resource(CartManager, '/giohang')
api.add_resource(AddToCart, '/themsanpham')
api.add_resource(RemoveCartItem, '/remove_cart_item/<int:cart_item_id>')

# from app import routes

