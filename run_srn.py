from __future__ import print_function
import os
import argparse
import tensorflow as tf
# import models.model_gray as model
# import models.model_color as model
import models.srn_model as model

tf.compat.v1.disable_eager_execution()

ROOT_DIR = os.getcwd()
STATIC = os.path.join(ROOT_DIR, "static")
UPLOAD = os.path.join(STATIC, "uploads")
CROPPED = os.path.join(UPLOAD, "cropped")
RESULT = os.path.join(UPLOAD, "results")


def parse_args():
    parser = argparse.ArgumentParser(description='deblur arguments')
    parser.add_argument('--phase', type=str, default='test', help='determine whether train or test')
    parser.add_argument('--datalist', type=str, default=os.path.join(ROOT_DIR, 'datalist_gopro.txt'), help='training datalist')
    parser.add_argument('--model', type=str, default='color', help='model type: [lstm | gray | color]')
    parser.add_argument('--batch_size', help='training batch size', type=int, default=16)
    parser.add_argument('--epoch', help='training epoch number', type=int, default=4000)
    parser.add_argument('--lr', type=float, default=1e-4, dest='learning_rate', help='initial learning rate')
    parser.add_argument('--gpu', dest='gpu_id', type=str, default='0', help='use gpu or cpu')
    parser.add_argument('--height', type=int, default=720,
                        help='height for the tensorflow placeholder, should be multiples of 16')
    parser.add_argument('--width', type=int, default=1280,
                        help='width for the tensorflow placeholder, should be multiple of 16 for 3 scales')
    parser.add_argument('--input_path', type=str, default=CROPPED,
                        help='input path for testing images')
    parser.add_argument('--output_path', type=str, default=RESULT,
                        help='output path for testing images')
    args = parser.parse_args()
    return args


def main(_):
    args = parse_args()

    # set gpu/cpu mode
    if int(args.gpu_id) > 0:
        os.environ['CUDA_VISIBLE_DEVICES'] = args.gpu_id
    else:
        os.environ['CUDA_VISIBLE_DEVICES'] = ''

    # set up deblur models
    deblur = model.DEBLUR(args)
    if args.phase == 'test':
        deblur.test(args.height, args.width, args.input_path, args.output_path)
    elif args.phase == 'train':
        deblur.train()
    else:
        print('phase should be set to either test or train')


if __name__ == '__main__':
    tf.compat.v1.app.run()