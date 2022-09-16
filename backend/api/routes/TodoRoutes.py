from flask import Blueprint, request,jsonify
from ..models.ProgressModel import ProgressTodo
from ..models.CompletedTodo import CompletedTodo
from ..models.UserModel import User
from ..extensions import db
from ..schema.TodoSchema import todoSchema,todosSchema
from flask_jwt_extended import jwt_required,get_jwt_identity



todo = Blueprint('todo',__name__,url_prefix='/api/todo')


#create new to do
@todo.post('/new')
@jwt_required()
def create_new_todo():
    todo = request.json['todo']
    todoOrder = request.json['order']


    if not todo:
        return jsonify({"message":"empty todo invalid"})

    userId = get_jwt_identity()

    newTodo = ProgressTodo(todo_item=todo, user_id=userId,order=todoOrder)
    db.session.add(newTodo)
    db.session.commit()
    
    return jsonify(todoSchema.dump(newTodo)),201

#get all todo in progress
@todo.get('/list')
@jwt_required()
def get_all():

    user_id = get_jwt_identity()

    progTodos = ProgressTodo.query.filter_by(user_id=user_id).order_by(ProgressTodo.order.asc()).all()
    compTodos = CompletedTodo.query.filter_by(user_id=user_id).order_by(CompletedTodo.order.asc()).all()
    return jsonify({"progress":todosSchema.dump(progTodos),"completed":todosSchema.dump(compTodos)}),200



@todo.put('/move/<int:todo_id>')
@jwt_required()
def move_todo(todo_id):
    tableId = request.json["tableId"]

    if tableId == "completed" :
        prog = ProgressTodo.query.filter_by(id=todo_id).first()
        comp = CompletedTodo(todo_item=prog.todo_item,createdAt=prog.createdAt,order=prog.order,user_id=prog.user_id)
        db.session.add(comp)
        db.session.delete(prog)
        db.session.commit()
    elif tableId == "progress":
        comp = CompletedTodo.query.filter_by(id=todo_id).first()
        prog = ProgressTodo(todo_item=comp.todo_item,createdAt=comp.createdAt,order=comp.order,user_id=comp.user_id)
        db.session.add(prog)
        db.session.delete(comp)
        db.session.commit()
    return jsonify({"msg":"success"}),200


@todo.put('/switch')
@jwt_required()
def switch_todo():
    todosRequest = request.json['orders']
    tableId = request.json['tableId']
    user_id = get_jwt_identity()

    if tableId =="progress":
        progTodos = ProgressTodo.query.filter_by(user_id=user_id).order_by(ProgressTodo.order.asc()).all()
    elif tableId == "completed":
        progTodos = CompletedTodo.query.filter_by(user_id=user_id).order_by(CompletedTodo.order.asc()).all()


    for i in range((len(todosRequest))):
        
        if todosRequest[i]['order']!=i:
            todosRequest[i]['order'] = i

    for i in range((len(progTodos))):
        if progTodos[i].todo_item!=todosRequest[i]['todo_item']:
            for j in range((len(todosRequest))):
                if progTodos[i].todo_item == todosRequest[j]['todo_item']:
                    progTodos[i].order = todosRequest[j]['order']
                    db.session.commit()
    return jsonify({"msg":"sucess"}),200

@todo.put("/update/<int:todoId>")
@jwt_required()
def update_todo(todoId):
    newTodo =  request.json['todo_item']
    tableId = request.json['tableId']

    if tableId == "progress":
        todo = ProgressTodo.query.filter_by(id=todoId).first()
    elif tableId == "completed":
        todo = CompletedTodo.query.filter_by(id=todoId).first()

    todo.todo_item = newTodo

    db.session.commit()

    return jsonify({"msg":"updated"}),200



#delete todo
@todo.delete('/delete/<int:todo_id>')
@jwt_required()
def delete_todo(todo_id):
    tableId = request.json["tableId"]

    if tableId == "completed":
        todo = CompletedTodo.query.filter_by(id=todo_id).first()
    elif tableId == "progress":
        todo = ProgressTodo.query.filter_by(id=todo_id).first()

    db.session.delete(todo)
    db.session.commit()

    return jsonify({"msg":"successfully deleted"}),200
