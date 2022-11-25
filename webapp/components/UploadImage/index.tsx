import { useState } from 'react';
import { useNounStore } from '../../state/noun';
import { Collections } from '../../utils/types/collections';
import { PNG } from 'pngjs';
import { UploadedNoun } from '../../utils/types/types';

const UploadImage = () => {
    const [expanded, setExpanded] = useState(false);

    const collection = useNounStore((state) => state.collection)
    const setActiveNoun = useNounStore((state) => state.setActiveNoun)

    const detectGlasses = (image: Buffer) => {
        if (collection === Collections.nouns) {
            // TODO: detect glasses

            const uploadedNoun: UploadedNoun = {
                image: image,
                glasses: 0
            }

            setActiveNoun(uploadedNoun)
        } else {
            // TODO: detect glasses

            const uploadedNoun: UploadedNoun = {
                image: image,
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
                    const buffer = Buffer.from(e.target.result.toString(), "binary");
                    const png = PNG.sync.read(buffer);
                    if (png.width !== png.height) {
                        throw new Error('Image must be rectangular');
                    }

                    const filename = file.name?.replace('.png', '') || 'custom';

                    // TODO: resize image

                    detectGlasses(buffer)
                } else { }
            };
            reader.readAsBinaryString(file);
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
