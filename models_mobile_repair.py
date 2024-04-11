from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum,Time,exc,DATE,desc,and_,LargeBinary
from flask_login import LoginManager,login_user,current_user,login_required,UserMixin
from flask import Flask,render_template,request,redirect,jsonify,url_for,send_file

db=SQLAlchemy()
app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///mobile_repair.sqlite3"
app.config['SECRET_KEY']= "SECRETKEYSECRETKEYSECRETKEY121213121312"
db.init_app(app)
login_manager=LoginManager()
login_manager.init_app(app)
app.app_context().push()


class Users(db.Model,UserMixin):
    id=db.Column(db.Integer(),autoincrement=True, primary_key=True)
    username=db.Column(db.String())
    address=db.Column(db.String())
    address2=db.Column(db.String())
    email=db.Column(db.String())
    mobile=db.Column(db.Integer())
    type=db.Column(db.String())
    message=db.Column(db.String())
    company=db.Column(db.String())
    viewed=db.Column(db.String())
    requestdate=db.Column(db.Date())

class Admin(db.Model,UserMixin):
    id=db.Column(db.Integer(),autoincrement=True, primary_key=True)
    username=db.Column(db.String(),unique=True)
    password=db.Column(db.String(),nullable=False)

class Product(db.Model):
    product_id=db.Column(db.Integer(),autoincrement=True, primary_key=True)
    product_type=db.Column(Enum('screen','mobile','battery','others'),nullable=False,)
    product_name=db.Column(db.String(),nullable=False,unique=True)
    product_quantity=db.Column(db.Integer(),nullable=False)
    product_rate=db.Column(db.Integer(),nullable=False)
    product_manufacture=db.Column(db.String(),nullable=False)
    product_description=db.Column(db.String())
    product_expirydate=db.Column(db.Date(),nullable=False)
    product_image=db.Column(db.String())


class Order(db.Model):
    order_number=db.Column(db.Integer(),primary_key=True)
    order_itemnumber=db.Column(db.Integer(),primary_key=True)
    order_productname=db.Column(db.String(),nullable=False)
    order_quantity=db.Column(db.Integer(),nullable=False)
    order_price=db.Column(db.Integer(),nullable=False)
    order_gst=db.Column(db.Integer(),nullable=False)
    order_total=db.Column(db.Integer(),nullable=False)

class Total(db.Model):
    total_ordernumber=db.Column(db.Integer(),primary_key=True)
    total_orderamount=db.Column(db.Integer())
    total_buyer=db.Column(db.String(),nullable=False)
    total_buyermobile=db.Column(db.Integer(),nullable=False)
    total_date=db.Column(db.Date(),nullable=False)

db.create_all()