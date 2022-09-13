from ..extensions import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(30), unique=True, nullable=False)
    password = db.Column(db.String(30), nullable=False)
    todos = db.relationship('Todo', backref='user', lazy=True,cascade="all, delete-orphan")
    

    def __repr__(self):
        return '<User %r>' % self.id