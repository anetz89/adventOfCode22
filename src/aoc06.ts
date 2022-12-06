import  { read } from './importer';

export function aoc_part1(): any {
    return searchStart(read('./assets/aoc06.txt').split(''), 0, 4);
}

export function aoc_part2(): any {
    return searchStart(read('./assets/aoc06.txt').split(''), 0, 14);
}

function searchStart(list: string[], index: number, amount: number): number {
    return isDistinct(list.slice(index, index + amount))? index + amount : searchStart(list, index + 1, amount);
}

function isDistinct(list: string[]): boolean {
    return new Set(list).size === list.length;
}