from ..extensions import ma

class UserSchema(ma.Schema):
    class Meta:
        fields = ('public_id','email','password')


user_schema = UserSchema()
users_schema = UserSchema(many=True)