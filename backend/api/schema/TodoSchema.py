from ..extensions import ma

class TodoSchema(ma.Schema):
    class Meta:
        fields = ('todo_item','id','order','isCompleted','createdAt',)


todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)