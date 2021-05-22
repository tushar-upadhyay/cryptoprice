import { atom } from 'jotai'
let tokens = localStorage.getItem('tokens')
const tokensAtom = atom(tokens?JSON.parse(tokens):[]);
export default tokensAtom;