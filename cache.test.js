const cache = require('./cache');

function addToTheCache(id, fileName, content) {
    return cache.setCache(id, fileName, content);
}

describe('cache : ', () => {
    test('setCache() returns content', () => {
        const myContent = 'itsacolddayinthesun';
        const result = cache.setCache('taylor', 'hawkins', myContent);
        expect(result).toBe(myContent);
    });

    test('resetCache() clears content', () => {
        addToTheCache('freddy', 'mercury', 'wearethechampions');
        cache.resetCache()
        const result = cache.searchCache('freddy', 'mercury');
        expect(result).toBeFalsy();
    });

    test('searchCache returns content', () => {
        cache.resetCache();
        addToTheCache('nile', 'rogers', 'lefreeq');
        const result = cache.searchCache('nile', 'rogers');
        expect(result).toContain('lefreeq');
    });

    test('setCache() adds multiple files to same id', () => {
        cache.resetCache();
        addToTheCache('james', 'hetfield', 'sadbuttrue');
        addToTheCache('james', 'taylor', 'fireandrain');
        const result = cache.searchCache('james', 'hetfield');
        expect(result).toContain('sadbuttrue');
    });

    test('searchCache returns null if not found', () => {
        cache.resetCache();
        const result = cache.searchCache('george', 'harrison');
        expect(result).toBeNull();
    });
});