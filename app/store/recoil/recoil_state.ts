import { atom, selector } from 'recoil';
import recoilStateKeys from "~/store/recoil/recoil_state_keys";

const textStateAtom = atom({
  key: recoilStateKeys.textState,
  default: ''
});

const charCountStateSelector = selector({
  key: 'charCountState',
  get: ({ get }) => {
    const text = get(textStateAtom);
    return text.length;
  }
});

export {
  textStateAtom,
  charCountStateSelector
};
