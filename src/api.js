export const fetchEpisodes = (page) => {
  return fetch(`https://rickandmortyapi.com/api/episode?page=${page}`)
}
