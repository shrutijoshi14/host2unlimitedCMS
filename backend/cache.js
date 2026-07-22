/**
 * Lightweight In-Memory API Cache
 * No external dependencies needed.
 * Stores API responses with TTL (time-to-live).
 */

const cacheStore = new Map();

/**
 * Get a cached value by key.
 * Returns null if expired or not found.
 */
export function cacheGet(key) {
  const item = cacheStore.get(key);
  if (!item) return null;

  const now = Date.now();
  if (now > item.expiresAt) {
    cacheStore.delete(key);
    return null;
  }
  return item.value;
}

/**
 * Set a value in the cache.
 * @param {string} key - Cache key
 * @param {*} value - Data to cache
 * @param {number} ttlSeconds - Time-to-live in seconds (default: 5 minutes)
 */
export function cacheSet(key, value, ttlSeconds = 300) {
  cacheStore.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000
  });
}

/**
 * Invalidate (delete) a specific cache key or all keys starting with a prefix.
 */
export function cacheInvalidate(keyOrPrefix) {
  for (const key of cacheStore.keys()) {
    if (key === keyOrPrefix || key.startsWith(keyOrPrefix)) {
      cacheStore.delete(key);
    }
  }
}

/**
 * Express middleware factory.
 * Automatically caches GET responses for a given TTL.
 * @param {number} ttlSeconds - Time-to-live in seconds
 */
export function cacheMiddleware(ttlSeconds = 300) {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') return next();

    const key = `${req.originalUrl}`;
    const cached = cacheGet(key);

    if (cached) {
      // Serve from cache
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}`);
      return res.json(cached);
    }

    // Intercept res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      if (res.statusCode === 200) {
        cacheSet(key, data, ttlSeconds);
        res.setHeader('X-Cache', 'MISS');
        res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}`);
      }
      return originalJson(data);
    };

    next();
  };
}

/**
 * Get current cache stats.
 */
export function cacheStats() {
  const now = Date.now();
  let alive = 0;
  let expired = 0;
  for (const [, item] of cacheStore) {
    if (now <= item.expiresAt) alive++;
    else expired++;
  }
  return { total: cacheStore.size, alive, expired };
}
