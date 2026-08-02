import { parseExerciseQuestion } from './parseExerciseName';

describe('parseExerciseQuestion', () => {
  it('Должен добавить текст и вернуть название упражнения со строчной буквы', () => {
    expect(parseExerciseQuestion('Приседания (20 раз)')).toBe(
      'Сколько раз вы сделали приседания (20 раз)?',
    );
    expect(parseExerciseQuestion('Приседания')).toBe(
      'Сколько раз вы сделали приседания?',
    );
    expect(parseExerciseQuestion('Планка (30 сек) (сложно)')).toBe(
      'Сколько раз вы сделали планка (30 сек) (сложно)?',
    );
    expect(parseExerciseQuestion('(Планка)')).toBe(
      'Сколько раз вы сделали (Планка)?',
    );
    expect(parseExerciseQuestion('')).toBe('Сколько раз вы сделали ?');
    expect(parseExerciseQuestion('А')).toBe('Сколько раз вы сделали а?');
  });
});
