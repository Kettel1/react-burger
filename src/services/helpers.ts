import moment from "moment";

export function debounce(func: any, wait?:number, immediate?:string) {
    let timeout:any;

    return function executedFunction(this:any) {
        const context = this;
        const args: any = arguments;

        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };

        const callNow = immediate && !timeout;

        clearTimeout(timeout);

        timeout = setTimeout(later, wait);

        if (callNow) func.apply(context, args);
    };
}


export function setCookie(name:string, value?:any, props?:any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name:string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name:string): void {
    setCookie(name, null, { expires: -1 });
}


export const getTimeFromTimestamp = (orderTimeISO: string): string => {

    const orderDay = moment(orderTimeISO).format('DD')
    const orderTime = moment(orderTimeISO).format('HH:mm')
    const todayDay = moment().format('DD')

    const yesterdayMessageFromOrder = moment(orderTimeISO).fromNow();

    if (orderDay === todayDay) {
        return `сегодня, ${orderTime}`
    } else if (yesterdayMessageFromOrder === 'день назад') {
        return `вчера, ${orderTime}`;
    } else {
        return `${yesterdayMessageFromOrder}, ${orderTime}`
    }
};
