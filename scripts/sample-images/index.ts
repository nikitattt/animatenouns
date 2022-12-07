import { ImageData as NounsImageData, getNounData } from "@nouns/assets";
import {
  ImageData as LilNounsImageData,
  getNounData as getLilNounData,
} from "@lilnounsdao/assets";
import { getNounSeedFromBlockHash as getLilNounSeedFromBlockHash } from "@lilnounsdao/assets";
import { getNounSeedFromBlockHash } from "@nouns/assets";
import { buildSVG } from "@nouns/sdk";
import sharp from "sharp";

var fs = require("fs");

const nounsPalette = NounsImageData.palette;
const lilPalette = LilNounsImageData.palette;

const blockHash =
  "0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01";

async function saveImage(
  collection: string,
  glassesId: number,
  itemId: number,
  image: string
) {
  var dir = `./images/${collection}/${glassesId}`;
  // var dir = `./images/validation/${collection}/${glassesId}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await sharp(Buffer.from(image))
    // .resize(320)
    .png()
    .toFile(`${dir}/${itemId}.png`);
}

async function genNounImage(glassesId: number, itemId: number) {
  const nounId = Math.floor(Math.random() * 1000000 + 1);
  const seed = getNounSeedFromBlockHash(nounId, blockHash);
  seed.glasses = glassesId;

  const { parts, background } = getNounData(seed);
  const svgBinary = buildSVG(parts, nounsPalette, background);

  saveImage("nouns", glassesId, itemId, svgBinary);
}

async function genLilNounImage(glassesId: number, itemId: number) {
  const nounId = Math.floor(Math.random() * 1000000 + 1);
  const seed = getLilNounSeedFromBlockHash(nounId, blockHash);
  seed.glasses = glassesId;

  const { parts, background } = getLilNounData(seed);
  const svgBinary = buildSVG(parts, lilPalette, background);

  saveImage("lil-nouns", glassesId, itemId, svgBinary);
}

async function generateSampleImages(nToGenerate: number) {
  for (let g = 0; g < NounsImageData.images.glasses.length; g++) {
    for (let i = 0; i < nToGenerate; i++) {
      genNounImage(g, i);
    }
  }

  // for (let g = 0; g < LilNounsImageData.images.glasses.length; g++) {
  //   for (let i = 0; i < nToGenerate; i++) {
  //     genLilNounImage(g, i);
  //   }
  // }
}

generateSampleImages(1000);
