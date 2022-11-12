import { ImageData as NounsImageData, getRandomNounSeed } from '@nouns/assets';
import { ImageData as LilNounsImageData, getRandomNounSeed as getRandomLilNounSeed } from '@lilnounsdao/assets';
import { useState, useEffect } from 'react';
import { useNounStore } from '../../state/noun';
import { Collections } from '../../utils/types/collections';

interface Trait {
  title: string;
  traitNames: string[];
}

const traitKeyToTitle: Record<string, string> = {
  head: 'Head',
  glasses: 'Glasses',
  body: 'Body',
  accessory: 'Accessory',
  background: 'Background'
};


const parseTraitName = (partName: string): string =>
  capitalizeFirstLetter(partName.substring(partName.indexOf('-') + 1));

const capitalizeFirstLetter = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const TraitsSelect = () => {
  const [traits, setTraits] = useState<Trait[]>();
  const [expanded, setExpanded] = useState(false);
  const [selectIndexes, setSelectIndexes] = useState<Record<string, number>>({});
  const [modSeed, setModSeed] = useState<{ [key: string]: number }>();
  const [initLoad, setInitLoad] = useState<boolean>(true);

  const collection = useNounStore((state) => state.collection)
  const setActiveNoun = useNounStore((state) => state.setActiveNoun)

  const setNounFromTraits = () => {
    let seed
    if (collection === Collections.lilNouns) {
      seed = { ...getRandomLilNounSeed(), ...modSeed };
    } else if (collection === Collections.nouns) {
      seed = { ...getRandomNounSeed(), ...modSeed };
    } else {
      throw Error(`This collection is not supported: ${collection}`)
    }

    setActiveNoun(seed)
  }

  const traitButtonHandler = (trait: Trait, traitIndex: number) => {
    setModSeed(prev => {
      // -1 traitIndex = random
      if (traitIndex < 0) {
        let state = { ...prev };
        delete state[trait.title];
        return state;
      }
      return {
        ...prev,
        [trait.title]: traitIndex,
      };
    });
  };

  useEffect(() => {
    // if (collection === undefined) return

    let imageData
    if (collection === Collections.lilNouns) {
      imageData = LilNounsImageData
    } else if (collection === Collections.nouns) {
      imageData = NounsImageData
    } else {
      throw Error(`This collection is not supported: ${collection}`)
    }

    const traitTitles = ['background', 'body', 'accessory', 'head', 'glasses'];
    const traitNames = [
      ['cool', 'warm'],
      ...Object.values(imageData.images).map(i => {
        return i.map(imageData => imageData.filename);
      }),
    ];
    setTraits(
      traitTitles.map((value, index) => {
        return {
          title: value,
          traitNames: traitNames[index],
        };
      }),
    );

    if (initLoad) {
      setInitLoad(false);
    }
  }, [initLoad, collection]);

  const traitOptions = (trait: Trait) => {
    return Array.from(Array(trait.traitNames.length + 1)).map((_, index) => {
      const traitName = trait.traitNames[index - 1];
      const parsedTitle = index === 0 ? `Random` : parseTraitName(traitName);
      return (
        <option key={index} value={traitName}>
          {parsedTitle}
        </option>
      );
    });
  };

  return (
    <div className="p-2 w-full px-2 bg-teal rounded-2xl">
      <div
        onClick={() => setExpanded(!expanded)}
        className="py-1.5 flex flex-row justify-between items-center cursor-pointer">
        <div className="ml-1 font-medium">Select traits</div>
        <div className="flex flex-row gap-2 items-center mr-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {expanded && <div className="flex flex-col gap-2">
        <div className="w-full bg-opacity-10 rounded-2xl">
          {traits &&
            traits.map((trait, index) => {
              return (
                <div
                  key={index}
                  className="py-1 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <label className="mx-1 text-sm sm:text-base font-medium text-grey" htmlFor={trait.title}>
                    {traitKeyToTitle[trait.title]}
                  </label>
                  <select
                    className="p-1 rounded-lg outline-black w-full sm:w-[15.5rem]"
                    name={trait.title}
                    id={trait.title}
                    value={trait.traitNames[selectIndexes?.[trait.title]] ?? -1}
                    onChange={e => {
                      let index = e.currentTarget.selectedIndex;
                      traitButtonHandler(trait, index - 1); // - 1 to account for 'random'
                      setSelectIndexes({
                        ...selectIndexes,
                        [trait.title]: index - 1,
                      });
                    }}
                  >
                    {traitOptions(trait)}
                  </select>
                </div>
              );
            })}
        </div>
        <div>
          <button
            className="w-full bg-black text-white py-1 px-3 rounded-lg text-sm"
            onClick={setNounFromTraits}
          >
            Animate Noun
          </button>
        </div>
      </div>}
    </div>
  )
}

export default TraitsSelect
