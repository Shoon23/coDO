from datetime import timedelta

class Configuration(object):
    SQLALCHEMY_DATABASE_URI = 'sqlite:///test.db'
    SECRET_KEY = "e9f15df526785625896483a4ecd4c01f"
    SECRET_KEY = "e9f15df526785625896483a4ecd4c01f"
    JWT_SECRET_KEY = "4255d7313575598fad413b8be6d2d9cd"
    JWT_COOKIE_SECURE = False
    JWT_TOKEN_LOCATION = ['cookies','headers','json']
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=5)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=7)