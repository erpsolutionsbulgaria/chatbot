import { eventsContextMap } from '../constants.js';
export function findVal(object, key) {
    let value = 'NULL';
    Object.keys(object).some(function (k) {
        if (object[k] !== undefined && object[k] !== null && typeof object[k] === 'object' && !Array.isArray(object[k])) {
            value = findVal(object[k], key);
            return value !== 'NULL';
        }
        if (k === key) {
            value = object[k];
            return true;
        }
        return false;
    });
    return value;
}
export const extractEventFromContexts = (contextData) => {
    for (const elem of contextData) {
        if (elem.lifespanCount !== undefined) {
            const arr = elem.name.split('/');
            const context = arr[arr.length - 1];
            switch (context) {
                case eventsContextMap.HWAR: return 'HWAR';
                case eventsContextMap.HDIR: return 'HDIR';
                case eventsContextMap.ILMR: return 'ILMR';
                case eventsContextMap.MRII: return 'MRII';
                case eventsContextMap.RC: return 'RC';
                case eventsContextMap.WIMR: return 'WIMR';
                case eventsContextMap.WISMO: return 'WISMO';
            }
        }
    }
    return '';
};
export function getEventFromContexts(contextsArray) {
    for (const obj of contextsArray) {
        for (const context of Object.values(eventsContextMap)) {
            if (obj.name.includes(context)) {
                return context.toUpperCase();
            }
        }
    }
    return '';
}
