const originalConsole = { ...console };

const getTimestamp = () => {
    return new Date().toISOString();
};

// Override console methods
console.log = (...args) => {
    originalConsole.log(`[${getTimestamp()}]`, ...args);
};

console.error = (...args) => {
    originalConsole.error(`[${getTimestamp()}]`, ...args);
};

console.warn = (...args) => {
    originalConsole.warn(`[${getTimestamp()}]`, ...args);
};

console.info = (...args) => {
    originalConsole.info(`[${getTimestamp()}]`, ...args);
};

console.debug = (...args) => {
    originalConsole.debug(`[${getTimestamp()}]`, ...args);
}; 