import { useState } from 'react';
import { useNounStore } from '../../state/noun';
import { Collections } from '../../utils/types/collections';
import { PNG } from 'pngjs';
import { UploadedNoun } from '../../utils/types/types';
import * as tf from '@tensorflow/tfjs';

const nounModel = '/models/nouns/model.json'
const nounClasses = '/models/nouns/classes.json'

const UploadImage = () => {
    const [expanded, setExpanded] = useState(false);

    const collection = useNounStore((state) => state.collection)
    const setActiveNoun = useNounStore((state) => state.setActiveNoun)

    const detectGlasses = async (image: HTMLCanvasElement, fileType: string) => {
        if (collection === Collections.nouns) {
            const model = await tf.loadGraphModel(nounModel);

            let example = tf.browser.fromPixels(image, 3).cast('float32');
            example = example.reshape([1, example.shape[0], example.shape[1]!, example.shape[2]!]);

            const prediction = await (await model.predict(example) as tf.Tensor).data()
            const class_scores = Array.from(prediction)
            const max_score_id = class_scores.indexOf(Math.max(...class_scores));
            const classes = ["20", "18", "9", "0", "11", "7", "16", "6", "17", "1", "10", "19", "8", "21", "4", "15", "3", "12", "2", "13", "5", "14", "22",];

            const result = Number(classes[max_score_id]);
            console.log(result)

            const dataUrl = image.toDataURL(fileType);

            const uploadedNoun: UploadedNoun = {
                image: dataUrl,
                glasses: result
            }

            setActiveNoun(uploadedNoun)
        } else {
            // TODO: detect glasses

            const dataUrl = image.toDataURL(fileType);

            const uploadedNoun: UploadedNoun = {
                image: dataUrl,
                glasses: 0
            }

            setActiveNoun(uploadedNoun)
        }
    };

    const uploadImage = (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];

            const reader = new FileReader();
            reader.onload = e => {
                if (e?.target?.result) {
                    var img = document.createElement("img");
                    img.onload = function (event) {
                        // TODO: better algo
                        var MAX_WIDTH = 320;
                        var MAX_HEIGHT = 320;

                        var width = img.width;
                        var height = img.height;

                        // Change the resizing logic
                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height = height * (MAX_WIDTH / width);
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width = width * (MAX_HEIGHT / height);
                                height = MAX_HEIGHT;
                            }
                        }

                        var canvas = document.createElement("canvas");
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx?.drawImage(img, 0, 0, width, height);

                        // Show resized image in preview element
                        // var dataurl = canvas.toDataURL(file.type);
                        // console.log(dataurl)
                        detectGlasses(canvas, file.type)
                    }
                    img.src = e.target.result.toString();
                } else { }
            };
            reader.readAsDataURL(file);
        };
    };

    return (
        <div className="p-2 w-full px-2 bg-teal rounded-2xl">
            <div className="flex flex-row justify-between items-center">
                <div className="ml-1 font-medium">Upload Image</div>
                <div className="appearance-none bg-black text-white rounded-lg text-sm">
                    <label className="py-1 px-3 inline-block cursor-pointer">
                        <input
                            className="hidden"
                            type="file"
                            accept="image/png, image/svg, image/jpeg, image/jpg"
                            name="image"
                            onChange={uploadImage}
                        />
                        Select
                    </label>
                </div>
            </div>
        </div >
    )
}

export default UploadImage
