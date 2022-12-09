import  { readStringList } from './importer';

export function aoc_part1(): any {
    return moveIt(readStringList('./assets/aoc09.txt'), {
        fields: new Set<string>(),
        rope: [[0, 0], [0, 0]]
    });
}

export function aoc_part2(): any {
    return moveIt(readStringList('./assets/aoc09.txt'), {
        fields: new Set<string>(),
        rope: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    });
}

function moveIt(input: string[], situation: any): number {
    input.forEach(rule => situation = applyRule(situation, rule.split(' ')));

    return situation.fields.size;
}

function applyRule(situation: any, rules: string[]): any {
    for(let i = 0; i < parseInt(rules[1], 10); i += 1) {
        situation.rope.forEach((_: number[], index: number) => step(situation, index, rules[0]))
        situation.fields.add(situation.rope[situation.rope.length - 1][0] + ',' + situation.rope[situation.rope.length - 1][1]);
    }
    return situation;
}

function step(situation: any, index: number, move: string): any {
    if (index >= situation.rope.length - 1) return;

    if (index === 0) {
        switch(move) {
            case 'U': situation.rope[index][0] = situation.rope[index][0] + 1; break;
            case 'R': situation.rope[index][1] = situation.rope[index][1] + 1; break;
            case 'D': situation.rope[index][0] = situation.rope[index][0] - 1; break;
            case 'L': situation.rope[index][1] = situation.rope[index][1] - 1; break;
        }
    }

    if (situation.rope[index][0] - situation.rope[index + 1][0] === 2) {
        situation.rope[index + 1][0] = situation.rope[index + 1][0] + 1;
        
        if(situation.rope[index][1] - situation.rope[index + 1][1] > 0) {
            situation.rope[index + 1][1] += 1;
        } else if(situation.rope[index][1] - situation.rope[index + 1][1] < 0) {
            situation.rope[index + 1][1] -= 1;
        }
    }

    if (situation.rope[index][1] - situation.rope[index + 1][1] === 2) {
        situation.rope[index + 1][1] +=  1;

        if(situation.rope[index][0] - situation.rope[index + 1][0] > 0) {
            situation.rope[index + 1][0] += 1;
        } else if(situation.rope[index][0] - situation.rope[index + 1][0] < 0) {
            situation.rope[index + 1][0] -= 1;
        }
    }
    
    if (situation.rope[index + 1][0] - situation.rope[index][0] === 2) {
        situation.rope[index + 1][0] = situation.rope[index + 1][0] - 1;

        if(situation.rope[index][1] - situation.rope[index + 1][1] > 0) {
            situation.rope[index + 1][1] += 1;
        } else if(situation.rope[index][1] - situation.rope[index + 1][1] < 0) {
            situation.rope[index + 1][1] -= 1;
        }
    }

    if (situation.rope[index + 1][1] - situation.rope[index][1] === 2) {
        situation.rope[index + 1][1] = situation.rope[index + 1][1] - 1;

        if(situation.rope[index][0] - situation.rope[index + 1][0] > 0) {
            situation.rope[index + 1][0] += 1;
        } else if(situation.rope[index][0] - situation.rope[index + 1][0] < 0) {
            situation.rope[index + 1][0] -= 1;
        }
    }

    return situation;
}