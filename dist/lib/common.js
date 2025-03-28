export function typeOf(obj) {
    let result = '';
    if (obj === void 0) {
        result = 'undefined';
    }
    else if (obj === null) {
        result = 'null';
    }
    else if (Object.is(obj, NaN)) {
        result = 'NaN';
    }
    else {
        result = Object.getPrototypeOf(obj).constructor.name;
    }
    return result;
}
export function delay(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
export function debounce(callback, ms) {
    let timer = 0;
    return function (...args) {
        clearTimeout(timer);
        return new Promise((resolve) => {
            timer = setTimeout(() => {
                resolve(callback.apply(this, args));
            }, ms);
        });
    };
}
export function throttle(callback, ms) {
    let timer = 0;
    return function (...args) {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            timer = 0;
        }, ms);
        return callback.apply(this, args);
    };
}
export function cls(...args) {
    const classList = [];
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const type = typeOf(arg);
        if (type === 'String') {
            classList.push(arg);
        }
        else if (type === 'Object') {
            for (let k in arg) {
                if (arg[k]) {
                    classList.push(k);
                }
            }
        }
    }
    return classList.join(' ');
}
