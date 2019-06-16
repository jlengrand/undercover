import uuid from 'uuid/v1';

const fs = require('fs');

const challenges = JSON.parse(fs.readFileSync('./newChallenges.json', 'utf8'));
challenges.forEach(challenge => {
  challenge.id = uuid();
});

console.log(challenges);
fs.writeFileSync('./challenges.json', JSON.stringify(challenges), 'utf-8');
