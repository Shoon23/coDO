
from flask import Blueprint,request,jsonify
from ..extensions import db
from ..models.UserModel import User
import datetime
from flask_jwt_extended import create_access_token,jwt_required,set_refresh_cookies,create_refresh_token,get_jwt,get_jwt_identity,unset_jwt_cookies


user = Blueprint('user',__name__, url_prefix='/api/user')





@user.post('/register')
def register():
    email = request.json['email']
    password = request.json['password']
    username =request.json['username'] 
    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"error":"User already existing"}),409

    newUser = User(email=email,username=username,password=password)
    db.session.add(newUser)
    db.session.commit()


    token1 = create_access_token(identity=newUser.id)
    token2= create_refresh_token(identity={'id':newUser.id,'username':newUser.username})
    response = jsonify({'access':token1})

    set_refresh_cookies(response,token2,max_age=datetime.timedelta(minutes=1))
    
    return response,201



@user.post('/login')
def login():
    email = request.json['email']

    password = request.json['password']
    username = request.json['username']   


    if not email:
        user = User.query.filter_by(username=username).first()

    elif not username:
        user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error":"Invalid username or password"}), 404

    if user.password != password:
        return jsonify({"error":"wrong password"}), 400 


    token1 = create_access_token(identity=user.id)
    token2= create_refresh_token(identity={'id':user.id,'username':user.username})
    response = jsonify({'access':token1,"usernameAuth":user.username,"emailAuth":user.email})

    set_refresh_cookies(response,token2,max_age=datetime.timedelta(hours=1))
    
    return response,201


@user.get('/logout')
@jwt_required(refresh=True)
def logout():
    response = jsonify({'msg':'successfully log out'})
    unset_jwt_cookies(response=response)

    return response,200


@user.get('/refresh')
@jwt_required(refresh=True,locations=['cookies'])
def refresh_access():
    user = get_jwt_identity()

    toke1 = create_access_token(identity=user.get('id'))
    return jsonify({"access":toke1,'username':user['username']}),201


