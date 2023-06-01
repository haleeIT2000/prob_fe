export const API_ROOT = 'http://127.0.0.1:8001'
export const TIME_OUT = 10000

export default {
    API_ROOT,
    TIME_OUT,
    STAFF: {
        LIST: '/user',
        UPDATE: '/user/:id',
    },
    AUTH: {
        LOGIN: '/auth/login',
        REFRESH: '/auth/refresh',
        LOGOUT: '/auth/logout',
        CHANGE_PASSWORD: '/auth/change-password',
        RESET_PASSWORD: '/auth/reset-password',
        SEND_MAIL: '/auth/send-mail-reset-password',
    },
    DEPARTMENT: {
        LIST: '/department',
        UPDATE: '/department/:id',
    },
    TOPIC: {
        LIST: '/topic',
        UPDATE: '/topic/:id',
    },
    ARTICLE: {
        LIST: '/article',
        UPDATE: '/article/:id',
    },
    BOOKS: {
        LIST: '/book',
        UPDATE: '/book/:id',
    },
    INVENTIONS: {
        LIST: '/invention',
        UPDATE: '/invention/:id',
    },
    SCIENTIFIC: {
        LIST: '/scientific',
        UPDATE: '/scientific/:id',
    },
    EDUCATION: {
        LIST: '/education',
        UPDATE: '/education/:id',
    },
    COMPILATION: {
        LIST: '/compilation',
        UPDATE: '/compilation/:id',
    },
    // luận án
    THESIS: {
        LIST: '/thesis',
        UPDATE: '/thesis/:id',
    },
    CLASS: {
        LIST: '/class',
        DASHBOARD: '/class/dashboard',
        UPDATE: '/class/:id',
    },
    SUBJECT: {
        LIST: '/subject',
        UPDATE: '/subject/:id',
    },
    EXAM: {
        LIST: '/exam',
        UPDATE: '/exam/:id',
    },
    ROOM: {
        LIST: '/room',
        UPDATE: '/room/:id',
    },
    MARK: {
        LIST: '/mark',
        UPDATE: '/mark/:id',
    },
    YEAR: {
        LIST: '/year',
        UPDATE: '/year/:id',
    },
    FILE: {
        EXPORT: '/export/user/:id',
        IMPORT: '/import/import',
    }
};