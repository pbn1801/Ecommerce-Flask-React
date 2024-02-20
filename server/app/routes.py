from app import app
from flask import request, jsonify
from app.models import User
from app import bcrypt, db


@app.route('/dangky', methods=['POST'])
def dangky():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first()
    if user_exists:
        return jsonify({"error": "Email already exists"}), 409

    password_hash = bcrypt.generate_password_hash(password)
    new_user = User(email=email, name=name, password=password_hash)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "password": new_user.password
    })



    