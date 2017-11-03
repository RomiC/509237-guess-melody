const SERVER_URL = `https://es.dump.academy/guess-melody`;

const API_PATHS = {
  QUESTIONS: `questions`,
  STATS: `stats`,
};

const USERNAME = `509237`;

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/${API_PATHS.QUESTIONS}`).
        then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject();
        });
  }

  static loadResults(name = USERNAME) {
    return fetch(`${SERVER_URL}/stats/${name}`).then((res) => res.json());
  }

  static saveResults(data, name = USERNAME) {
    const requestInit = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestInit);
  }
}
