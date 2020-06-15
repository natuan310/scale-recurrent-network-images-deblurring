from __future__ import print_function
import os
from flask import Flask, render_template, request, jsonify
from flask import send_from_directory
import numpy as np
import pandas as pd
from PIL import Image
import cv2
from matplotlib import pyplot as plt
import shutil
import re
import base64
import uuid
import tensorflow as tf
import run_srn
import argparse
from models import srn_model

app = Flask(__name__)

dir_path = os.path.dirname(os.path.realpath(__file__))
# Define directory
ROOT_DIR = os.getcwd()
TEMPLATES_DIR = os.path.join(ROOT_DIR, "templates")
STATIC_DIR = os.path.join(ROOT_DIR, "static")
IMAGES_DIR = os.path.join(STATIC_DIR, "images")
GALLERY_DIR = os.path.join(IMAGES_DIR, "gallery")
UPLOAD_DIR = os.path.join(STATIC_DIR, "uploads")
CROPPED_DIR = os.path.join(UPLOAD_DIR, "cropped")
RESULT_DIR = os.path.join(UPLOAD_DIR, "results")
FINISH_DIR = os.path.join(UPLOAD_DIR, 'finish')

CKPT_DIR = os.path.join(ROOT_DIR, 'checkpoints')
print(ROOT_DIR)

IMG_HEIGHT = 256
IMG_WIDTH = 256



# def parse_image(imgData):
#     img_str = re.search(b"base64,(.*)", imgData).group(1)
#     img_decode = base64.decodebytes(img_str)
#     filename = "{}.jpg".format(uuid.uuid4().hex)
#     with open(os.path.join(CROPPED_DIR, filename), "wb") as f:
#         f.write(img_decode)
#     return filename, load_and_preprocess_image(img_decode)

def parse_image(imgData):
    img_str = re.search(b"base64,(.*)", imgData).group(1)
    img_decode = base64.decodebytes(img_str)
    
    filename = "{}.png".format(uuid.uuid4().hex)
    if not os.path.exists(UPLOAD_DIR):
        os.makedirs(UPLOAD_DIR)
        os.makedirs(CROPPED_DIR)    
        os.makedirs(RESULT_DIR)
        os.makedirs(FINISH_DIR)
    with open(os.path.join(CROPPED_DIR, filename), "wb") as f:
        f.write(img_decode)

    return filename

def def_res(filename):
    img = cv2.imread(os.path.join(CROPPED_DIR, filename))
    w, h, c = img.shape
    _long = max(w, h) + 16 - (max(w, h) % 16)
    return _long, _long * 2 / 3

# home page
@app.route("/")
def home():
    return render_template("index.html", image_path=None, result_path=None)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    # Preprocess the upload image
    img_raw = data["data-uri"].encode()
    filename = parse_image(img_raw)
    _long, _short = def_res(filename)
    # result = generator(image)
#     generator.predict(768, 1024, CROPPED_DIR, RESULT_DIR, filename)
    cmd_line = f'''python run_srn.py --input_path={CROPPED_DIR} --output_path={RESULT_DIR} --height={_short} --width={_long}'''
    print(cmd_line)
    os.system(cmd_line)
    # tf.keras.preprocessing.image.save_img(os.path.join(RESULT_DIR, filename), result[0])
    shutil.move(os.path.join(CROPPED_DIR, filename), FINISH_DIR)
    print(os.path.join(RESULT_DIR, filename))
    return jsonify({"file_name": filename})


@app.route("/deBlur/", methods=["POST", "GET"])
def upload_file():
    if request.method == "GET":
        return render_template("index.html")
    else:
        file = request.files["image"]
        upload_image_path = os.path.join(UPLOAD_DIR, file.filename)
        # print(upload_image_path)
        file.save(upload_image_path)

    return render_template("index.html")


@app.route("/deBlur/<filename>")
def send_file(filename):
    return send_from_directory(UPLOAD_DIR, filename)


if __name__ == "__main__":
    app.debug = True
    app.run(debug=True)
    app.debug = True