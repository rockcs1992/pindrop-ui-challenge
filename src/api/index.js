import { API_URL } from '../utils/constants';

const fetchHandler = (url) =>
    fetch(url)
    .then((response) => response.json())
    .catch((error) => new Error(error));

const fetchMovies = (pageNum) => fetchHandler(`${API_URL}${pageNum++}`);

export { fetchMovies, fetchHandler };
