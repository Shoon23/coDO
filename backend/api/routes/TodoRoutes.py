from flask import Blueprint, request,jsonify
from ..models.TodoModel import Todo
from ..models.UserModel import User
from ..extensions import db
from ..schema.TodoSchema import todo_schema,todos_schema
from flask_jwt_extended import jwt_required,get_jwt_identity,create_access_token



todo = Blueprint('todo',__name__,url_prefix='/api/todo')


#create new to do
@todo.post('/new')
@jwt_required()
def create_new_todo():
    todo = request.json['todo']
    todoOrder = request.json['order']


    if not todo:
        return jsonify({"message":"empty todo invalid"})

    user_id = get_jwt_identity()

    newTodo = Todo(todo_item=todo, user_id=user_id,order=todoOrder)
    db.session.add(newTodo)
    db.session.commit()
    
    return jsonify(todo_schema.dump(newTodo)),201

#get all todo
@todo.get('/list')
@jwt_required()
def get_all():

    user_id = get_jwt_identity()

    todos = Todo.query.filter_by(user_id=user_id).order_by(Todo.order.asc()).all()

    return jsonify(todos_schema.dump(todos)),200



#update todo
@todo.put('/update/<int:todo_id>')
@jwt_required()
def update_todo(todo_id):

    newTodo = request.json['todo_item']
    todoStatus = request.json['isCompleted']
    todo = Todo.query.filter_by(id=todo_id).first()

    if not todo:
        return jsonify({"error":"Not found"}),404

    if newTodo:
       todo.todo_item = newTodo
    if todoStatus or todoStatus == 0:
        todo.isCompleted = todoStatus

    db.session.commit()
    return jsonify(todo_schema.dump(todo)),200


#delete todo
@todo.delete('/delete/<int:todo_id>')
@jwt_required()
def delete_all_todo(todo_id):

    todo = Todo.query.filter_by(id=todo_id).first()
    
    db.session.delete(todo)
    db.session.commit()

    return jsonify({"msg":"successfully deleted"}),200

#delete all todo
@todo.delete('/delete/all/<string:email>')
@jwt_required()
def delete_todo(email):

    user = User.query.filter_by(email=email).first()
    user_todo = user.todos
    db.session.delete(user_todo)
    db.session.commit()


    return jsonify({"msg":"successfully deleted"}),200