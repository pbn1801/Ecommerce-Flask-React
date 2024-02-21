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
CORS(app, supports_credentials=True)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

api = Api(app)
from app.services import ProductManager, CategoryManager
#Tao endpoints.
api.add_resource(ProductManager, '/sanpham')
api.add_resource(CategoryManager, '/loai')

from app import routes

