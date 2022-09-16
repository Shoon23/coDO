from email.policy import default
from ..extensions import db
from datetime import datetime

class CompletedTodo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    todo_item = db.Column(db.Text,nullable=False)
    createdAt = db.Column(db.String(30), nullable=False)
    completedAt = db.Column(db.String(30), nullable=False,default=datetime.now())
    order = db.Column(db.Integer,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)


    def __repr__(self):
        return '<Todo %r>' % self.id