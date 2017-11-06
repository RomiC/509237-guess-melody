const SERVER_URL = `https://es.dump.academy/guess-melody`;
const USERNAME = `509237`;
const ApiPaths = {
  QUESTIONS: `questions`,
  STATS: `stats`,
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/${ApiPaths.QUESTIONS}`).
        then((res) => {
          return (res.ok) ? res.json() : Promise.reject();
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
