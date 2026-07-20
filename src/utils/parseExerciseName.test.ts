import { parseExerciseName, parseExerciseQuestion } from './parseExerciseName';

describe('parseExerciseName', () => {
  it('Должен вернуть название упражнения без скобок', () => {
    expect(parseExerciseName('Приседания (20 раз)')).toBe('Приседания');
    expect(parseExerciseName('Приседания')).toBe('Приседания');
    expect(parseExerciseName('Планка (30 сек) (сложно)')).toBe('Планка');
    expect(parseExerciseName('(Планка)')).toBe('');
    expect(parseExerciseName('')).toBe('');
  });
});

describe('parseExerciseQuestion', () => {
  it('Должен добавить текст и вернуть название упражнения со строчной буквы', () => {
    expect(parseExerciseQuestion('Приседания (20 раз)')).toBe(
      'Сколько раз вы сделали приседания?',
    );
    expect(parseExerciseQuestion('Приседания')).toBe(
      'Сколько раз вы сделали приседания?',
    );
    expect(parseExerciseQuestion('Планка (30 сек) (сложно)')).toBe(
      'Сколько раз вы сделали планка?',
    );
    expect(parseExerciseQuestion('(Планка)')).toBe('Сколько раз вы сделали ?');
    expect(parseExerciseQuestion('')).toBe('Сколько раз вы сделали ?');
    expect(parseExerciseQuestion('А')).toBe('Сколько раз вы сделали а?');
  });
});
