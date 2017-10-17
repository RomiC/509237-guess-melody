import musicData from './music-data';

const INIT_NOTES = 3;
const INIT_TIME = 300;

const initialState = {
  level: `level-welcome`,
  notesLeft: INIT_NOTES,
  timeLeft: INIT_TIME,
  statistics: [],
  answers: [],

  get timeSpend() {
    return INIT_TIME - this.timeLeft;
  },

  get minutesLeft() {
    return Math.floor(this.timeLeft / 60);
  },

  get secondsLeft() {
    return this.timeLeft - this.minutesLeft * 60;
  },

  get minutesSpend() {
    return Math.floor(this.timeSpend / 60);
  },

  get secondsSpend() {
    return this.timeSpend - this.minutesSpend * 60;
  }
};

const levelTypes = {
  LEVEL_WELCOME: `levelWelcome`,
  LEVEL_ARTIST: `levelArtist`,
  LEVEL_GENRE: `levelGenre`,
  LEVEL_RESULT: `levelResult`
};

const levels = {
  'level-welcome': {
    type: levelTypes.LEVEL_WELCOME,
    title: ``,
    answers: [],
    destination: `level-1`
  },
  'level-1': {
    type: levelTypes.LEVEL_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: {
      'answer-1':
      {
        isCorrect: true,
        track: musicData[0]
      },
      'answer-2':
      {
        isCorrect: false,
        track: musicData[1]
      },
      'answer-3':
      {
        isCorrect: false,
        track: musicData[2]
      }},
    destination: `level-2`
  },

  'level-2': {
    type: levelTypes.LEVEL_GENRE,
    title: `Выберите инди-рок треки`,
    answers: {
      'answer-1':
        {
          isCorrect: true,
          track: musicData[0]
        },
      'answer-2':
        {
          isCorrect: false,
          track: musicData[1]
        },
      'answer-3':
        {
          isCorrect: false,
          track: musicData[2]
        },
      'answer-4':
        {
          isCorrect: false,
          track: musicData[3]
        }},
    destination: `level-3`
  },

  'level-3': {
    type: levelTypes.LEVEL_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: {
      'answer-1':
        {
          isCorrect: true,
          track: musicData[0]
        },
      'answer-2':
        {
          isCorrect: false,
          track: musicData[1]
        },
      'answer-3':
        {
          isCorrect: false,
          track: musicData[2]
        }},
    destination: `level-4`
  },

  'level-4': {
    type: levelTypes.LEVEL_GENRE,
    title: `Выберите инди-рок треки`,
    answers: {
      'answer-1':
        {
          isCorrect: true,
          track: musicData[0]
        },
      'answer-2':
        {
          isCorrect: false,
          track: musicData[1]
        },
      'answer-3':
        {
          isCorrect: false,
          track: musicData[2]
        },
      'answer-4':
        {
          isCorrect: false,
          track: musicData[3]
        }},
    destination: `level-5`
  },

  'level-5': {
    type: levelTypes.LEVEL_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: {
      'answer-1':
        {
          isCorrect: true,
          track: musicData[0]
        },
      'answer-2':
        {
          isCorrect: false,
          track: musicData[1]
        },
      'answer-3':
        {
          isCorrect: false,
          track: musicData[2]
        }},
    destination: `level-6`
  },

  'level-6': {
    type: levelTypes.LEVEL_GENRE,
    title: `Выберите инди-рок треки`,
    answers: {
      'answer-1':
        {
          isCorrect: true,
          track: musicData[0]
        },
      'answer-2':
        {
          isCorrect: false,
          track: musicData[1]
        },
      'answer-3':
        {
          isCorrect: false,
          track: musicData[2]
        },
      'answer-4':
        {
          isCorrect: false,
          track: musicData[3]
        }},
    destination: `level-7`
  },

  'level-7': {
    type: levelTypes.LEVEL_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: {
      'answer-1':
        {
          isCorrect: true,
          track: musicData[0]
        },
      'answer-2':
        {
          isCorrect: false,
          track: musicData[1]
        },
      'answer-3':
        {
          isCorrect: false,
          track: musicData[2]
        }},
    destination: `level-8`
  },

  'level-8': {
    type: levelTypes.LEVEL_GENRE,
    title: `Выберите инди-рок треки`,
    answers: {
      'answer-1':
        {
          isCorrect: true,
          track: musicData[0]
        },
      'answer-2':
        {
          isCorrect: false,
          track: musicData[1]
        },
      'answer-3':
        {
          isCorrect: false,
          track: musicData[2]
        },
      'answer-4':
        {
          isCorrect: false,
          track: musicData[3]
        }},
    destination: `level-9`
  },

  'level-9': {
    type: levelTypes.LEVEL_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: {
      'answer-1':
        {
          isCorrect: true,
          track: musicData[0]
        },
      'answer-2':
        {
          isCorrect: false,
          track: musicData[1]
        },
      'answer-3':
        {
          isCorrect: false,
          track: musicData[2]
        }},
    destination: `level-10`
  },

  'level-10': {
    type: levelTypes.LEVEL_GENRE,
    title: `Выберите инди-рок треки`,
    answers: {
      'answer-1':
        {
          isCorrect: true,
          track: musicData[0]
        },
      'answer-2':
        {
          isCorrect: false,
          track: musicData[1]
        },
      'answer-3':
        {
          isCorrect: false,
          track: musicData[2]
        },
      'answer-4':
        {
          isCorrect: false,
          track: musicData[3]
        }},
    destination: `level-result`
  },

  'level-result': {
    type: levelTypes.LEVEL_RESULT,
    title: ``,
    answers: [],
    destination: `level-welcome`
  },
};


export {initialState, levels, levelTypes};
