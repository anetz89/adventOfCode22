import  { readStringList } from './importer';

export function aoc_part1(): any {
    const input = readStringList('./assets/aoc03.txt');

    return input.map(a => [a.slice(0, a.length / 2), a.slice(a.length / 2)])
         .map(a => findCommonLetters(a[0], a[1])[0])
         .map(char2value)
         .reduce((a, b) => a + b);
}

export function aoc_part2(): any {
    const input = readStringList('./assets/aoc03.txt');

    return input
        .map(trippleLetter).filter(a => a !== '')
        .map(char2value)
        .reduce((a, b) => a + b)
}

function trippleLetter(a: string, i: number, input: string[]) {
    return (i % 3 === 2) ? findCommonLetters(a, input[i - 1], input [i - 2])[0] : '';
}

function findCommonLetters(a: string, b: string, c?: string): string[] {
    if (c) { return findCommonLetters(findCommonLetters(a, b).join(), c); }

    return a.split('').filter(a => b.includes(a));
}

function char2value(c: string): number {
    return (c === c.toUpperCase())? c.charCodeAt(0) - 38 : c.charCodeAt(0) - 96;
}