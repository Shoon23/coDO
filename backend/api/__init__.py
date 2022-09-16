from datetime import timedelta
from .config import Configuration
from flask import Flask
from .extensions import db, ma,cors,jwt,migrate,bcrypt
from .routes.UserRoutes import user
from .routes.TodoRoutes import todo


def create_app():

    app = Flask(__name__)
    db.init_app(app)
    ma.init_app(app)
    cors.init_app(app,supports_credentials=True,origins='http://localhost:3000')
    jwt.init_app(app)
    migrate.init_app(app,db)
    bcrypt.init_app(app)

    app.config.from_object(Configuration)
    
    app.register_blueprint(user)
    app.register_blueprint(todo)


    return app


