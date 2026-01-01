import dayjs from 'dayjs';
import chalk from 'chalk';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const figlet = require('figlet');
//ESM?
//commonjs?

const users =
[
{name: "Avi", years: 10, months: 3},
{name: "Yosef", years: 25 , months: 6},
{name: "Michael", years: 35, months: 9},
{name: "Eti", years: 0, months: 9},
{name: "Hanne", years: 5, months: 11},
{name: "Noah", years: 15, months: 0}      
];

let currentId = 1;
function makeId() {
  return currentId++;
}

console.log(figlet.textSync('User Birthdays', { horizontalLayout: 'default' }));

users.forEach(user => {
  const birth = dayjs()
    .subtract(user.years, 'year')
    .subtract(user.months, 'month');
  const id = makeId();
  const line = `${chalk.green(user.name)} |
   ${chalk.cyan(birth.format('YYYY-MM-DD'))} | 
   ${chalk.yellow(user.years + ' years, ' + user.months + ' months')} | 
   ${chalk.gray(id+ ' id')}`;
  console.log(line);
});

