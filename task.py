from httplib2 import Http
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib
from email.mime.application import MIMEApplication


SMTP_SERVER_HOST="smtp.gmail.com"
SMTP_SERVER_PORT=587
SENDER_EMAIL="fayyazhm@gmail.com"
SENDER_PASSWORD="tfyf cnlo xgug leai"


def send_mail(to,subject,message_body,attachment_paths):
    msg=MIMEMultipart()
    msg["To"]=to
    msg["From"]=SENDER_EMAIL
    msg["Subject"]=subject
    print("insidetask")
    msg.attach(MIMEText(message_body,"html"))
    for a in attachment_paths:
        with open(a, "rb") as attachment_file:
            part = MIMEApplication(attachment_file.read(), Name=a)
            msg.attach(part)
    server=smtplib.SMTP(host=SMTP_SERVER_HOST,port=SMTP_SERVER_PORT)
    server.starttls()
    server.login(user=SENDER_EMAIL,password=SENDER_PASSWORD)
    server.send_message(msg)
    server.quit()