from flask import Flask,render_template,request,redirect,jsonify,url_for,send_file,render_template_string,send_from_directory
from models_mobile_repair import *
from datetime import datetime,date,timedelta
from sqlalchemy.exc import IntegrityError
from flask_login import LoginManager,login_user,current_user,login_required,UserMixin,logout_user
from flask_bcrypt import Bcrypt
import os
import base64
import inflect
import pdfkit
from PIL import Image
import task,time

app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///mobile_repair.sqlite3"
app.config['SECRET_KEY']= "SECRETKEYSECRETKEYSECRETKEY121213121312"
db.init_app(app)
login_manager=LoginManager()
login_manager.init_app(app)
app.app_context().push()
bcrypt = Bcrypt(app)
#-----------------------------------------admin---------------------------------------------------------------------------------#


@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)

@app.route("/admin/logout")
@login_required
def user_logout():
    logout_user()
    return redirect(url_for('screen'))


@app.route("/",methods=["GET"])
def screen():
    return render_template('homepage_vue.html')

# @app.route("/admin/registration")
# def adminregistration():
#         return render_template('admin_registration.html')


# @app.route("/admin/registration/sub",methods=["GET","POST"])
# def adminregistrationsubmit():
#     if request.method=='POST':
#         all_values=request.form.to_dict()
#         hashed_password=bcrypt.generate_password_hash(all_values["password"]).decode('utf-8')
#         use=Admin(username=all_values['username'],password=hashed_password)
#         try:
#             db.session.add(use)
#             db.session.commit()
#             return redirect('/')
#         except IntegrityError:
#             return redirect('/')


@app.route("/admin/home/page",methods=["GET","POST"])
@login_required
def admin_home():
    return render_template('admin_vue.html')

@app.route("/admin",methods=["GET","POST"])
def admin():
    if request.method=='POST':
        data=request.get_json()
        user=data.get("user_name")
        password=data.get("password")
        admin_user=Admin.query.filter_by(username=user).first()
        if admin_user==None:
            return jsonify("wrong credentials")
        else:
            if bcrypt.check_password_hash(admin_user.password, password):
                login_user(admin_user)
                return jsonify("successfully logged")
            else:
                return jsonify("wrong credentials")




@app.route("/scroll",methods=["GET"])
def resize():
    directory = 'static/carousel'
    files=os.listdir(directory)
    data={"path":[]}
    for file_name in files:
        file_path = os.path.join(directory, file_name)
        image = Image.open(file_path)
        resized_image = image.resize((900, 400))
        resized_image.save(file_path)
        data['path'].append(file_name)
    return jsonify(data)




@app.route("/product",methods=["GET"])
def product():
    if request.method=='GET':
        prod=Product.query.all()
        dat={"product":[]}
        prod_data=[]
        for i in prod:
            prod_data.append({
                "product_id":i.product_id,
                "product_name":i.product_name,
                "product_quantity":i.product_quantity,
                "product_rate":i.product_rate,
                "product_manufacture":i.product_manufacture,
                "product_expirydate":i.product_expirydate,
                "product_type":i.product_type,
                "product_image":i.product_image,
                "product_description":i.product_description
            })

        dat["product"]=prod_data
        return jsonify(dat)



@app.route("/requests/<int:i>",methods=["GET"])
def requests_viewed(i):
    if request.method=='GET':
        useru=Users.query.filter_by(id=i).first()
        useru.viewed="yes"
        try:
            db.session.commit()
            return jsonify("data successfully edited")

        except:
            return jsonify("error")

@app.route("/undoview/<int:i>",methods=["GET"])
def undo_viewed(i):
    if request.method=='GET':
        useru=Users.query.filter_by(id=i).first()
        useru.viewed="no"
        try:
            db.session.commit()
            return jsonify("data successfully edited")

        except:
            return jsonify("error")



@app.route("/requests",methods=["GET"])
def requests_data():
    if request.method=='GET':
        users=Users.query.all()
        dat={"requests":""}
        requests_data=[]
        dt=date.today()
        for i in users:
            requests_data.append({
                "id":i.id,
                "username":i.username,
                "address":i.address,
                "address2":i.address2,
                "email":i.email,
                "mobile":i.mobile,
                "type":i.type,
                "message":i.message,
                "company":i.company,
                "viewed":i.viewed,
                "date":i.requestdate
            })
        dat["requests"]=requests_data

        return jsonify(dat)

def mail(data):
    subject = f"New Request Added {data.get('user_name')}_{data.get('type')}_{str(date.today())}"
    print("inside mail")
    message_body = """
            <div class="container mt-4">
                <h2>New Request Details</h2>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Address:</strong> {address}, {address2}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Mobile:</strong> {mobile}</p>
                <p><strong>Type:</strong> {type}</p>
                <p><strong>Message:</strong> {message}</p>
                <p><strong>Company:</strong> {company}</p>
                <p><strong>Request Date:</strong> {requestdate}</p>
            </div>
            """.format(username=data.get("user_name"),
                       address=data.get("house_address1"),
                       address2=data.get("house_address2"),
                       email=data.get("email"),
                       mobile=data.get("mobile"),
                       type=data.get("type"),
                       message=data.get("message"),
                       company=data.get("selectedProduct"),
                       requestdate=date.today()
                       )

    task.send_mail("22dp3000014@ds.study.iitm.ac.in",subject,message_body,[])


def mail_prod(data,details,company_d):
    subject = f"New Request Added {data.get('user_name')}_{data.get('type')}_{str(date.today())}"
    message_body = """
            <div class="container mt-4">
                <h2>New Request Details</h2>
                <p><strong>Username:</strong> {username}</p>
                <p><strong>Address:</strong> {address}, {address2}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Mobile:</strong> {mobile}</p>
                <p><strong>Type:</strong> {type}</p>
                <p><strong>Message:</strong> {message}</p>
                <p><strong>Company:</strong> {company}</p>
                <p><strong>Request Date:</strong> {requestdate}</p>
            </div>
            """.format(username=data.get("user_name"),
                       address=data.get("house_address1"),
                       address2=data.get("house_address2"),
                       email=data.get("email"),
                       mobile=data.get("mobile"),
                       type=data.get("type"),
                       message=details,
                       company=company_d,
                       requestdate=date.today()
                       )

    task.send_mail("22dp3000014@ds.study.iitm.ac.in",subject,message_body,[])



@app.route("/add_details",methods=["POST"])
def add_details():
    if request.method=="POST":
        data=request.get_json()
        new_request=Users(username=data.get("user_name"),
                          address=data.get("house_address1"),
                          address2=data.get("house_address2"),
                          email=data.get("email"),
                          mobile=data.get("mobile"),
                          type=data.get("type"),
                          message=data.get("message"),
                          company=data.get("selectedProduct"),
                          viewed="no",
                          requestdate=date.today()
                          )
        try:
            db.session.add(new_request)
            db.session.commit()
            mail(data)
            print("after mail")
            return jsonify("data successfully added")
        except:
            return jsonify("Error in posting")

@app.route("/add_details/<int:c>",methods=["POST"])
def add_details_mobile(c):
    if request.method=="POST":
        print("productid",c)
        data=request.get_json()
        print(data)
        prod = Product.query.filter_by(product_id=int(c)).first()
        details=f'''id={prod.product_id},
        product_name={prod.product_name},
        product_rate=Rs{float(prod.product_rate)},
        '''
        new_request=Users(username=data.get("user_name"),
                          address=data.get("house_address1"),
                          address2=data.get("house_address2"),
                          email=data.get("email"),
                          mobile=data.get("mobile"),
                          type=data.get("type"),
                          message=details,
                          company=prod.product_manufacture,
                          viewed="no",
                          requestdate=date.today()
                          )
        try:
            db.session.add(new_request)
            db.session.commit()
            mail_prod(data,details,prod.product_manufacture)
            return jsonify("data successfully added")
        except:
            return jsonify("Error in posting")


@app.route("/product_add_details",methods=["POST"])
def product_add_details():
    if request.method=="POST":
        selected_product = request.form['selectedProduct']
        product_name = request.form['product_name']
        product_quantity = request.form['product_quantity']
        product_rate = request.form['product_rate']
        product_manufacture = request.form['product_manufacture']
        product_description=request.form['product_description']
        [a,b,c] = request.form['product_expirydate'].split('-')
        exp_date=date(int(c),int(b),int(a))
        directory="static/product_images"
        if 'file' in request.files:

            file = request.files['file']
            if file:
                file_path = os.path.join(directory, file.filename)
                file.save(file_path)
                image = Image.open(file_path)
                resized_image = image.resize((400, 400))
                resized_image.save(file_path)
                new_product=Product(product_type=request.form['selectedProduct'],product_name =request.form['product_name'],
                                product_quantity=request.form['product_quantity'],product_rate=request.form['product_rate'],
                                product_manufacture=request.form['product_manufacture'],product_expirydate=exp_date,product_image=file.filename,
                                product_description=request.form['product_description']
                                )
        else:
            new_product=Product(product_type=request.form['selectedProduct'],product_name =request.form['product_name'],
                            product_quantity=request.form['product_quantity'],product_rate=request.form['product_rate'],
                            product_description=request.form['product_description'],
                            product_manufacture=request.form['product_manufacture'],product_expirydate=exp_date
                            )
        try:
            db.session.add(new_product)
            db.session.commit()
            return jsonify("data successfully added")
        except:
            return jsonify("Error in posting")

@app.route("/product/delete/<int:id>",methods=["GET"])
def product_delete(id):
    if request.method=='GET':
        prod=Product.query.filter_by(product_id=id).first()
        db.session.delete(prod)
        try:
            db.session.commit()
            return jsonify("product successfully deleted")
        except IntegrityError:
            db.session.rollback()
            return jsonify("error")



@app.route("/product_edit_details",methods=["POST"])
def product_edit_details():
    if request.method=="POST":
        prod=Product.query.filter_by(product_id=request.form['id']).first()
        prod.product_type= request.form['selectedProduct']
        prod.product_name=request.form['product_name']
        prod.product_quantity=request.form['product_quantity']
        prod.product_rate=request.form['product_rate']
        prod.product_manufacture=request.form['product_manufacture']
        prod.product_description=request.form['product_description']
        [a,b,c]=request.form["product_expirydate"].split('-')
        exp_date=date(int(a),int(b),int(c))
        prod.product_expirydate=exp_date
        directory = "static/product_images"
        if 'file' in request.files:
            file = request.files['file']
            file_path = os.path.join(directory, file.filename)
            file.save(file_path)
            prod.product_image=file.filename
        try:
            db.session.commit()
            return jsonify("data successfully edited")

        except:
            return jsonify("Error in editing")


def number_words(num):
    integer_part=int(num)
    fractional_part=int((num-integer_part)*100)
    p = inflect.engine()
    integer_words = p.number_to_words(integer_part).title()
    if fractional_part == 0:
        fractional_words = "Zero"
    else:
        fractional_words = p.number_to_words(fractional_part).title()
    amount_words = f"{integer_words} Rupees and {fractional_words} Paise"
    return amount_words

@app.route("/bill",methods=["POST"])
def bill():
    if request.method=="POST":
        data=request.get_json()
        prod_list=data.get('products_list')
        buyer=data.get("buyer_name")
        mobile=data.get("buyer_mobile")
        num=0
        ord=Order.query.order_by(desc(Order.order_number)).first()
        total=0
        if ord==None:
            order_numb=1
        else:
            order_numb=ord.order_number + 1
        for i in prod_list:
            num=num+1
            total+=i['total']
            new_order=Order(order_number=order_numb,order_itemnumber=num,order_productname=i['productname'],order_quantity=i['quantity'],
                            order_price=i['price'],order_gst=i['GST'],order_total=i['total'])
            db.session.add(new_order)
        db.session.commit()
        totu=Total(total_ordernumber=order_numb,total_orderamount=total,total_buyer=buyer,total_date=date.today(),total_buyermobile=mobile)
        db.session.add(totu)
        db.session.commit()
        order_invoice=Order.query.filter_by(order_number=order_numb).all()
        total_invoice=Total.query.filter_by(total_ordernumber=order_numb).first()

        amou=number_words(total_invoice.total_orderamount)
        html_content= render_template("invoice.html",order_invoice=order_invoice,total_invoice=total_invoice,amou=amou)
        options = {
                    'page-size': 'A4',
                    'orientation': 'Portrait',
                    'margin-top': '0mm',
                    'margin-right': '0mm',
                    'margin-bottom': '0mm',
                    'margin-left': '0mm',}
        directory = 'static/Invoice'
        pdf_filename = f"{order_numb}_{buyer}.pdf"
        pdf_path =os.path.join(directory,pdf_filename)
        pdfkit.from_string(html_content,pdf_path, options=options)
        return jsonify({"message": "data successfully added", "pdf_filename": pdf_filename})


@app.route("/download/<string:name>",methods=["GET"])
def send_invoice(name):
    directory = "static/Invoice"
    task.send_mail("22dp3000014@ds.study.iitm.ac.in",name,"Bill Details",["static/Invoice/"+name])
    return send_from_directory(directory, name)




#-------------------------------------------------------------------------------run------------------------------------------------------------------#
if __name__=="__main__":
    app.run(host='0.0.0.0',debug=True)
