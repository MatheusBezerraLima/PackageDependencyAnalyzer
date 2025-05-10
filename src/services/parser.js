import fs from 'fs';
import * as path from 'path'


const filePackage = fs.readFileSync('./package.json', 'utf-8');

console.log(filePackage);
