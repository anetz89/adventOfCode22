import  { readStringList } from './importer';

export function aoc_part1(): any {
    const input = readStringList('./assets/aoc08.txt').map(a => a.split('').map(Number));
    
    return input.map((row, rowIdx) => row.filter((col, colIdx) => canSeeEdge(input, rowIdx, colIdx)).length).reduce((a, b) => a + b);
}

export function aoc_part2(): any {
    const input = readStringList('./assets/aoc08.txt').map(a => a.split('').map(Number));

    return input.map((row, rowIdx) => row.map((col, colIdx) => sightScore(input, rowIdx, colIdx))).flat().sort((a: number, b: number) => a - b).pop();
}

function canSeeEdge(input: any, row: number, col: number): boolean {
    return canSeeTop(input, row, col) || canSeeRight(input, row, col) || canSeeBottom(input, row, col) || canSeeLeft(input, row, col);
}

function canSeeTop(input: any, row: number, col: number): boolean {
    for(let i = row - 1; i >= 0; i -= 1) {
        if (input[i][col] >= input[row][col]) return false;
    }
    return true;
}

function canSeeRight(input: any, row: number, col: number): boolean {
    for(let i = col + 1; i <= input[0].length; i += 1) {
        if (input[row][i] >= input[row][col]) return false;
    }
    return true;
}

function canSeeBottom(input: any, row: number, col: number): boolean {
    for(let i = row + 1; i < input.length; i += 1) {
        if (input[i][col] >= input[row][col]) return false;
    }
    return true;
}

function canSeeLeft(input: any, row: number, col: number): boolean {
    for(let i = col - 1; i >= 0; i -= 1) {
        if (input[row][i] >= input[row][col]) return false;
    }
    return true;
}

function sightScore(input: any, row: number, col: number): number {
    return sightTop(input, row, col) * sightRight(input, row, col) * sightBottom(input, row, col) * sightLeft(input, row, col);
}

function sightTop(input: any, row: number, col: number): number {
    for(let i = row - 1; i >= 0; i -= 1) {
        if (input[i][col] >= input[row][col]) return row - i;
    }
    return row;
}

function sightRight(input: any, row: number, col: number): number {
    for(let i = col + 1; i <= input[0].length; i += 1) {
        if (input[row][i] >= input[row][col]) return i - col;
    }
    return input[0].length - col - 1;
}

function sightBottom(input: any, row: number, col: number): number {
    for(let i = row + 1; i < input.length; i += 1) {
        if (input[i][col] >= input[row][col]) return i - row;
    }
    return input.length - row - 1;
}

function sightLeft(input: any, row: number, col: number): number {
    for(let i = col - 1; i >= 0; i -= 1) {
        if (input[row][i] >= input[row][col]) return col - i;
    }
    return col;
}
