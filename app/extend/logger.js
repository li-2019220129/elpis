const log4js = require('log4js');

module.exports = app => {
    let logger;
    if (app.env.isLocal()) {
        logger = console;
    } else {
        // 把日志输出并落地到磁盘（日志落盘）
        log4js.configure({
            appenders: {
                console: { type: 'console' },
                dateFile: {
                    type: 'dateFile',
                    filename: './logs/application.log',
                    pattern: '.yyyy-MM-dd',
                },
            },
            categories: {
                default: { appenders: ['console', 'dateFile'], level: 'trace' },
            },
        });
        logger = log4js.getLogger();
    }
    return logger;
};
