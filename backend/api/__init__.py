from datetime import timedelta
from flask import Flask
from .extensions import db, ma,cors,jwt,migrate
from .routes.UserRoutes import user
from .routes.TodoRoutes import todo


def create_app():

    app = Flask(__name__)
    db.init_app(app)
    ma.init_app(app)
    cors.init_app(app,supports_credentials=True,origins='http://localhost:3000')
    jwt.init_app(app)
    migrate.init_app(app,db)


    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = "super-secret"
    app.config["JWT_COOKIE_SECURE"] = False
    app.config["JWT_TOKEN_LOCATION"] = ['cookies','headers','json']
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(seconds=15)
    

    app.register_blueprint(user)
    app.register_blueprint(todo)


    return app


