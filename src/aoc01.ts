import  { readStringBlock } from './importer';

export function aoc_part1(): number { return getCaloryArray().slice(-1)[0]; }
export function aoc_part2(): number { return getCaloryArray().slice(-3).reduce((a, b) => a + b); }

function getCaloryArray(): number[] {
    return (readStringBlock('./assets/aoc01.txt') as any[])
            .map((a) => a.split(/\r?\n/).map((a:string) => parseInt(a, 10))
            .reduce((a: string, b: string) => a + b))
            .sort((a, b) => a - b);
}
