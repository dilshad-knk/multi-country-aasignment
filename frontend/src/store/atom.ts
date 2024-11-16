import { atom } from 'recoil';

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
  try {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  } catch (error) {
    console.error("Error reading or parsing from localStorage", error);
  }

  onSet(newValue => {
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  });
};

export const userState = atom({
  key: 'userState',
  default: [],
  effects: [localStorageEffect('user')],
});
