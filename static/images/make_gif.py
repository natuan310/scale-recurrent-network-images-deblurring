from PIL import Image
import os
IMG_DIR = os.path.join(os.getcwd(),'flask',
                        'static', 'images', 'gif_cover')
print(os.listdir(IMG_DIR))

img_lst = [Image.open(os.path.join(IMG_DIR, im)) for im in os.listdir(IMG_DIR)]

img_lst[0].save('gif_cover.gif', save_all=True, append_images=img_lst)