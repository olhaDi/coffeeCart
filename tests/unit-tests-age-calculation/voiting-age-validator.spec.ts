import { test, expect } from '@playwright/test';
import { getVotingMessage } from '../../calculate-age-functions';

for (const age of ['1', '10', '17']) {
  test(`User aged ${age} is not old enough to vote`, async () => {
    const message = getVotingMessage(age);
    expect(message).toBe('Ви не можете голосувати');
  });
}

for (const age of ['18', '19', '30', '80', '99']) {
  test(`User aged ${age} is old enough to vote`, async () => {
    const message = getVotingMessage(age);
    expect(message).toBe('Ви можете голосувати.');
  });
}

test('User entered age is not a number', async () => {
  expect(() => getVotingMessage('abc')).toThrowError('Введіть коректне число');
});

test('User entered age is not an integer', async () => {
  expect(() => getVotingMessage('18.5')).toThrowError('Введіть ціле число');
});
