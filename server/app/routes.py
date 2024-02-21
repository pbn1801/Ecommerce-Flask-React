from app import app
from flask import request, jsonify, session
from app.models import User
from app import bcrypt, db, jwt
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import re

@app.route('/dangky', methods=['POST'])
def dangky():
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


@app.route('/dangnhap', methods=['POST'])
def dangnhap():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Signin failed!"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Wrong password!"}), 401

    token = create_access_token(identity=user.id)
    return jsonify(token=token)

    # return jsonify({
    #     "id": user.id,
    #     "email": user.email
    # })


@app.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({"name": user.name, "email": user.email})


    