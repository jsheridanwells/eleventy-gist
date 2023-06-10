module.exports = (function () {
    let _cacheObj = {};
    const setCache = (id, fileName, content) => {
        if (!_cacheObj[id]) {
            _cacheObj[id] = {};
        }
        _cacheObj[id][fileName] = content;
        return _cacheObj[id][fileName];
    };

    const searchCache = (id, fileName) => {
        if (!_cacheObj[id])
            return null;
        if (!_cacheObj[id][fileName])
            return null;
        return _cacheObj[id][fileName];
    };

    const resetCache = () => {
        _cacheObj = {};
    };

    return {
        setCache,
        searchCache,
        resetCache
    }
})();