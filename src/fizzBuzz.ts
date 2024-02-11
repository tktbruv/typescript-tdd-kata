export class FizzuBuzzu {
    public static fizzBuzz(n: number): string {

        //if n is a multiple of 3 and 5, or contains 3 and 5, return FizzBuzz
        if (n % 3 === 0 && n % 5 === 0 || n.toString().includes('3') && n.toString().includes('5')) {
            return 'FizzBuzz';
        }
        //if n is a multiple of 3, or contains 3, return Fizz
        if (n % 3 === 0 || n.toString().includes('3')) {
            return 'Fizz';
        }
        //if n is a multiple of 5, or contains 5, return Buzz
        if (n % 5 === 0 || n.toString().includes('5')) {
            return 'Buzz';
        }
        //if n is not a multiple of 3 or 5, or doesn't contain 3 or 5, return n
        return n.toString();
    }
} 