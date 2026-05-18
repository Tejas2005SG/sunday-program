interface RateLimitEntry {
    count: number;
    lastAttempt: number;
    lockedUntil?: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

export function checkRateLimit(identifier: string): { allowed: boolean; remainingAttempts: number; lockedUntil?: number } {
    const now = Date.now();
    const entry = rateLimitStore.get(identifier);

    if (!entry) {
        rateLimitStore.set(identifier, { count: 1, lastAttempt: now });
        return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
    }

    if (entry.lockedUntil && now < entry.lockedUntil) {
        return { 
            allowed: false, 
            remainingAttempts: 0, 
            lockedUntil: entry.lockedUntil 
        };
    }

    if (now - entry.lastAttempt > WINDOW_MS) {
        rateLimitStore.set(identifier, { count: 1, lastAttempt: now });
        return { allowed: true, remainingAttempts: MAX_ATTEMPTS - 1 };
    }

    if (entry.count >= MAX_ATTEMPTS) {
        entry.lockedUntil = now + LOCKOUT_MS;
        entry.lastAttempt = now;
        rateLimitStore.set(identifier, entry);
        return { 
            allowed: false, 
            remainingAttempts: 0, 
            lockedUntil: entry.lockedUntil 
        };
    }

    entry.count += 1;
    entry.lastAttempt = now;
    rateLimitStore.set(identifier, entry);

    return { 
        allowed: true, 
        remainingAttempts: MAX_ATTEMPTS - entry.count 
    };
}

export function clearRateLimit(identifier: string): void {
    rateLimitStore.delete(identifier);
}

setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
        if (entry.lockedUntil && now > entry.lockedUntil) {
            rateLimitStore.delete(key);
        } else if (now - entry.lastAttempt > WINDOW_MS * 2) {
            rateLimitStore.delete(key);
        }
    }
}, 5 * 60 * 1000);