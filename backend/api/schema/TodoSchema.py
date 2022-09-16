from ..extensions import ma

class TodoSchema(ma.Schema):
    class Meta:
        fields = ('todo_item','id','order','isCompleted','createdAt',)


todoSchema = TodoSchema()
todosSchema = TodoSchema(many=True)