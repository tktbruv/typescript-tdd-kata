import { FizzuBuzzu } from '../fizzBuzz'; 

describe('FizzBuzzTest', () => {

    it('An argument of 1 should return 1', () => {
        expect(FizzuBuzzu.fizzBuzz(1)).toBe('1');
    });

    it('An argument of 2 should return 2', () => {
        expect(FizzuBuzzu.fizzBuzz(2)).toBe('2');
    });

    it('An argument of 3 should return Fizz', () => {
        expect(FizzuBuzzu.fizzBuzz(3)).toBe('Fizz');
    });

    it('An argument of 6 should return 6', () => {
        expect(FizzuBuzzu.fizzBuzz(6)).toBe('Fizz');
    });

    it('An argument of 5 should return Buzz', () => {
        expect(FizzuBuzzu.fizzBuzz(5)).toBe('Buzz');
    });

    it('An argument of 10 should return Buzz', () => {
        expect(FizzuBuzzu.fizzBuzz(10)).toBe('Buzz');
    });

    it('An argument of 15 should return FizzBuzz', () => {
        expect(FizzuBuzzu.fizzBuzz(15)).toBe('FizzBuzz');
    });

    it('An argument of 30 should return FizzBuzz', () => {
        expect(FizzuBuzzu.fizzBuzz(30)).toBe('FizzBuzz');
    });

    // If the number is a multiple of 3 or contains 3
    it('An argument of 13 should return Fizz', () => {
        expect(FizzuBuzzu.fizzBuzz(13)).toBe('Fizz');
    });

    // If the number is a multiple of 5 or contains 5
    it('An argument of 59 should return Buzz', () => {
        expect(FizzuBuzzu.fizzBuzz(59)).toBe('Buzz');
    });

    // If the number is a multiple of 3 and 5 or contains 3 and 5
    it('An argument of 53 should return FizzBuzz', () => {
        expect(FizzuBuzzu.fizzBuzz(53)).toBe('FizzBuzz');
    });
});