import { getHeroes } from "../helpers/Data";

/**************** See jest-global-mock.js for fetch mock ****************/
beforeEach(() => {
    fetch.resetMocks();
  });

test('getHeroes', () => {
    fetch.mockResponseOnce(JSON.stringify({ id: 1 }));
    const onResponse = jest.fn();
    const onError = jest.fn();

    return getHeroes()
    .then(onResponse)
    .catch(onError)
    .finally(() => {
      expect(onResponse).toHaveBeenCalled();
      expect(onError).not.toHaveBeenCalled();

      expect(onResponse.mock.calls[0][0]).toEqual({ id: 1 });
    });
  });