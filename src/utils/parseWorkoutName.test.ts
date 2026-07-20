import { parseWorkoutName } from './parseWorkoutName';

describe('parseWorkoutName', () => {
  it('Должен вернуть название и подзаголовок тренировки', () => {
    expect(parseWorkoutName('Йога / День 1 / Разминка / Автор')).toEqual({
      title: 'Йога',
      subtitle: 'День 1 / Разминка',
    });

    expect(parseWorkoutName('Йога / Автор')).toEqual({
      title: 'Йога',
      subtitle: null,
    });

    expect(parseWorkoutName('Йога')).toEqual({
      title: 'Йога',
      subtitle: null,
    });

    expect(parseWorkoutName('')).toEqual({
      title: '',
      subtitle: null,
    });

    expect(parseWorkoutName('Йога / День 1 / Разминка')).toEqual({
      title: 'Йога',
      subtitle: null,
    });
  });
});
