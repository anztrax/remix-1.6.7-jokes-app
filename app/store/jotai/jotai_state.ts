import { atom } from 'jotai';

const countAtom = atom(0);
const countryAtom = atom('Japan');
const citiesAtom = atom(['Tokyo', "Kyoto", 'Osaka']);
const mangaAtom = atom({
  'Dragon Ball': 1994,
  'One Piece': 1997,
  'Naruto': 1999
});

const doubledCountAtom = atom((get) => get(countAtom) * 2);

const count2 = atom(2)
const count3 = atom(3)
const sumOfCountAtom = atom((get) => get(doubledCountAtom) + get(count2) + get(count3));

const atomsCounts = [doubledCountAtom, count2, count3];
const sumOfCountAtom2 = atom((get) => atomsCounts.map(get).reduce((acc, count) => acc + count));

/**
 * derived async atoms
 */
const urlAtom = atom('https://json.host.com');
const fetchUrlAtom = atom(async (get) => {
  const response = await fetch(get(urlAtom));
  return await response.json();
});

/**
 * decrement atom
 */
const decrementCountAtom = atom(
  (get) => get(countAtom),
  (get, set, _arg) => set(countAtom, get(countAtom) - 1)
);

/**
 * write only atom
 */
const multiplyCountAtom = atom(
  (get) => get(countAtom),
  (get, set, by) => {
    console.log('by : ',by);
    set(countAtom, get(countAtom) * by)
  }
);

export {
  countAtom,
  sumOfCountAtom,
  sumOfCountAtom2,
  doubledCountAtom,
  countryAtom,
  citiesAtom,
  mangaAtom,

  /**
   * async atom
   */
  fetchUrlAtom,

  /**
   * writeable atom
   */
  decrementCountAtom,
  multiplyCountAtom
}
