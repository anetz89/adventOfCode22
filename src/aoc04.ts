import  { readStringList } from './importer';

export function aoc_part1(): any {
    return read().filter(contain).length;
}

export function aoc_part2(): any {
    return read().filter(overlap).length
}

function read(): number[][][] {
    return readStringList('./assets/aoc04.txt').map(a => a.split(',').map(b => b.split('-').map(Number)));
}

function contain(a: number[][]): boolean {
    return  a[0][0] <= a[1][0] && a[0][1] >= a[1][1] ||
            a[0][0] >= a[1][0] && a[0][1] <= a[1][1];
}

function overlap(a: number[][]): boolean {
    const elf1arr = Array.from({length: a[0][1] - a[0][0] + 1}, (_, index) => index + a[0][0]);
    const elf2arr = Array.from({length: a[1][1] - a[1][0] + 1}, (_, index) => index + a[1][0]);

    return elf1arr.filter(a => elf2arr.includes(a)).length > 0;
}

