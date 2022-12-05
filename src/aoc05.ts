import  { readStringBlock } from './importer';

export function aoc_part1(): any {
    return stapleCrates('9000');
}

export function aoc_part2(): any {
    return stapleCrates('9001');
}

function stapleCrates(staplerType: string): string {
    const input = readStringBlock('./assets/aoc05.txt').map(a => a.split(/\r?\n/));
    const crates = parseCrates(input[0]);
    
    parseRules(input[1]).forEach(rule => {
        const moveContainer = crates[rule[1] - 1].splice(0, rule[0]);
        if (staplerType === '9000') {
            moveContainer.reverse();
        }
        crates[rule[2] - 1].unshift(...moveContainer);
    });

    return crates.map(a => a[0]? a[0] : '').join('');
}

function parseCrates(input: string[]): string[][] {
    const crateCount = parseInt(input.pop()?.split('   ').pop() || '', 10);
    const crates: string[][] = Array(crateCount).fill(null).map(a => []);

    input.map(a => (a + ' ').match(/.{4}/g)?.map(a => a[1])).forEach(row => {
        row?.forEach((crate, crateIndex) => {
            if (crate !== ' ') crates[crateIndex].push(crate);
        });
    });

    return crates;
}

function parseRules(input: string[]): number[][] {
    return input.map(a => a.split(' ').filter(a => !(['move', 'from', 'to'].includes(a))).map(Number));
}