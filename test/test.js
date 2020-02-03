import {guessRandom} from '../src/guess.js'
import { expect } from 'chai';


describe('guessRandom', () => {
    it('random function does not return same val three times' , () => {
        const resultOne = guessRandom(1);
        const resultTwo = guessRandom(1);
        const resultThree = guessRandom(1);

        const oneAndTwoAreSame = resultOne['target'] === resultTwo['target'];
        const twoAndThreeAreSame = resultTwo['target'] === resultThree['target'];
        const threeAndOneAreSame = resultThree['target'] === resultOne['target'];
        expect(!oneAndTwoAreSame || !twoAndThreeAreSame || !threeAndOneAreSame);
    });

});
