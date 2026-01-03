module.exports = app => {
    return {
        isLocal() {
            return process.env._ENV === 'local';
        },
        isBeta() {
            return process.env._ENV === 'beta';
        },
        isProd() {
            return process.env._ENV === 'production';
        },
        get() {
            return process.env._ENV ?? 'local';
        },
    };
};
