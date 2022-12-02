import  { readStringList } from './importer';

export function aoc_part1(): any {
    return calcScore({
        A: {
            X: 4,
            Y: 8,
            Z: 3
        },
        B: {
            X: 1,
            Y: 5,
            Z: 9
        },
        C: {
            X: 7,
            Y: 2,
            Z: 6
        }
    });
}

export function aoc_part2(): number {
    return calcScore({
        A: {
            X: 3,
            Y: 4,
            Z: 8
        },
        B: {
            X: 1,
            Y: 5,
            Z: 9
        },
        C: {
            X: 2,
            Y: 6,
            Z: 7
        }
    });
}

function calcScore(scoreMatrix: any) {
    return readStringList('./assets/aoc02.txt').map(a => a.split(' '))
            .map(a => scoreMatrix[a[0]][a[1]]).reduce((a, b) => a + b);
}