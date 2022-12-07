import { hasOwnProperty } from 'tslint/lib/utils';
import  { readNumberList, readStringList, readStringBlock } from './importer';

export function aoc_part1(): any {
    return getFolderSizes()
        .filter((a: number) => a < 100000)
        .reduce((a: number, b: number) => a + b);
}

export function aoc_part2(): any {
    const folderSizes: number[] = getFolderSizes().sort((a, b) => a - b);
    const required = folderSizes[folderSizes.length - 1] - 40000000;

    return folderSizes.map(a => a - required).filter(a => a > 0)[0] + required;
}

function getFolderSizes(): number[] {
    const input = readStringList('./assets/aoc07.txt');
    const folders: any = {};
    let currFolderName: string[] = [];

    input.forEach((a, index) => {
        switch(a) {
            case '$ cd ..': currFolderName.pop(); return;
            case '$ ls': 
                currFolderName.push(input[index - 1].split(' ')[2]);
                folders[currFolderName.join('/')] = [];
                return;
            default: if (!a.startsWith('$ cd')) folders[currFolderName.join('/')].push(a.split(' '));
        }
    });

    return Object.keys(folders).map((key: string) => calcFolderSize(folders, key));

}

function calcFolderSize(folders: any, folderName: string): number {
    return folders[folderName].map((a: string[]): number => {
        return (a[0] === 'dir')? calcFolderSize(folders, folderName + '/' + a[1]) : parseInt(a[0], 10);
    }).reduce((a: number, b: number) => a + b);
}

