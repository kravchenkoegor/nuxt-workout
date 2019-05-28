module.exports = {
  getExercises(req, res) {
    res.json({
      muscleGroups: [
        'Ноги',
        'Спина',
        'Грудь',
        'Плечи',
        // 'Трицепс',
        // 'Бицепс',
        'Пресс',
        // 'Кардио'
      ],
      exercises: [
        {
          muscleGroup: 'Ноги',
          title: 'Приседания со штангой',
          slug: 'barbell-squat'
        },
        {
          muscleGroup: 'Ноги',
          title: 'Приседания в тренажере Смита',
          slug: 'smith-machine-squat'
        },
        {
          muscleGroup: 'Ноги',
          title: 'Жим ногами',
          slug: 'leg-press'
        },
        {
          muscleGroup: 'Спина',
          title: 'Тяга блока к груди',
          slug: 'wide-grip-lat-pull-down'
        },
        {
          muscleGroup: 'Спина',
          title: 'Тяга штанги в наклоне',
          slug: 'bent-over-row'
        },
        {
          muscleGroup: 'Спина',
          title: 'Тяга гантелей в наклоне',
          slug: 'bent-over-dumbbell-row'
        },
        {
          muscleGroup: 'Грудь',
          title: 'Жим штанги лежа',
          slug: 'bench-press'
        },
        {
          muscleGroup: 'Грудь',
          title: 'Жим штанги лежа в тренажере Смита',
          slug: 'smith-machine-bench-press'
        },
        {
          muscleGroup: 'Грудь',
          title: 'Жим штанги на скамье с наклоном вверх',
          slug: 'incline-bench-press'
        },
        {
          muscleGroup: 'Грудь',
          title: 'Жим штанги на скамье с наклоном вверх в тренажере Смита',
          slug: 'incline-smith-machine-bench-press'
        },
        {
          muscleGroup: 'Грудь',
          title: 'Жим гантелей лежа',
          slug: 'dumbbell-bench-press'
        },
        {
          muscleGroup: 'Грудь',
          title: 'Жим гантелей на скамье с наклоном вверх',
          slug: 'incline-dumbbell-bench-press'
        },
        {
          muscleGroup: 'Плечи',
          title: 'Армейский жим стоя',
          slug: 'military-press'
        },
        {
          muscleGroup: 'Плечи',
          title: 'Жим гантелей стоя',
          slug: 'standing-dumbbell-press'
        },
        {
          muscleGroup: 'Пресс',
          title: 'Подъем туловища',
          slug: 'ab-crunch'
        }
      ]
    });
  }
}
