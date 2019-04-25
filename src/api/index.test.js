import { fetchHandler, fetchMovies } from './index';
import { API_URL } from '../utils/constants';

fetch.mockResponse(
    JSON.stringify({}),
    {status: 200}
)

describe('fetchHandler', () => {
    it('should call fetch with url', async () => {
        const testURL = 'testurl'
        await fetchHandler(testURL);
        expect(fetch).toHaveBeenCalledWith(testURL);
    })
})

describe('fetchMovies', () => {
    it('should call fetch with url', async () => {
        await fetchMovies(3);
        expect(fetch).toHaveBeenCalledWith(`${API_URL}3`);
    })
})