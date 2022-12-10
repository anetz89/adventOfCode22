import  { readStringList } from './importer';

export function aoc_part1(): any {
    const input = readStringList('./assets/aoc10.txt').map(a => a.split(' '));

    let cycle = 0;
    let value = 1;
    let result = 0;

    input.forEach(command => {
        if (isRelevantCycle(++cycle)) {
            result += cycle * value;
        }
        if (command.length === 2) {
            if (isRelevantCycle(++cycle)) {
                result += cycle * value;
            }
            value += parseInt(command[1], 10);
        }
    });

    return result;
}

export function aoc_part2(): any {
    const input = readStringList('./assets/aoc10.txt').map(a => a.split(' '));

    let cycle = 0;
    let value = 1;
    let row: string[] = [];

    input.forEach(command => {
        setField(++cycle, value, row);
        if (command.length === 2) {
            setField(++cycle, value, row);
            value += parseInt(command[1], 10);
        }
    });
    print(row);

    return '^';
}

function setField(cycle: number, value: number, row: string[]): void {
    const position = (cycle - 1) % 40;
    if (position === 0) print(row);
    isActiveField(value, position)? row.push('#') : row.push(' ');
}

function print(row: string[]): void {
    console.log(row.join(''));
    row.length = 0;
}

function isRelevantCycle(cycle: number): boolean {
    return cycle === 20 || (cycle - 20) % 40 === 0;
}

function isActiveField(value: number, position: number): boolean {
    return value - 1 === position || value === position || value + 1 === position;
}

