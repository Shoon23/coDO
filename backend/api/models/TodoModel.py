from ..extensions import db
from datetime import datetime

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    todo_item = db.Column(db.Text,nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    createdAt = db.Column(db.String(30), nullable=False, default=datetime.now())
    isCompleted = db.Column(db.Boolean, default=False, nullable=False)
    order = db.Column(db.Integer,nullable=False,unique=True)
    
    def __repr__(self):
        return '<Todo %r>' % self.id