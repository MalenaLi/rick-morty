const functions = require('../controller/index');

test('get all pages of character resource', async () => {
    await expect(functions.getPages('characters')).resolves.toBe(undefined);
    await expect(functions.getPages('character')).resolves.toBe(42);
});
test('get array in promise', async () => {
    await expect(functions.getPromises('character')).resolves.toBeInstanceOf(Array);
});
test('get dict in charCounter', () => {
    return functions.charCounter().then(data => {
        expect(data).toHaveProperty('exercise_name');
        expect(data).not.toHaveProperty('location');
    });
});