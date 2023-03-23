export const isNumber = (value: any): value is number => typeof value === 'number';

// string trim
export const trim = (s: string) => {
    return s.replace(/^\s+|\s+$/g,""); 
};

export const isNewline = (s: string) => {
    return /\r|\n/.test(s);
};

// space -> ' '
export const equalizeWhitespace = (s: string) => {
    return trim(s).replace(/\s+/gu, ' ');
};

// multi line comment remove (/* */)
export const removeMultilineComment = (s: string) => {
    return s.replace(/\/\*(.|[\r\n])*?\\*\//gm,'');
};

// comment remove (--)
export const removeComment = (s: string) => {
    return s.replace(/--.*\n/gm,'');
};

// comment all remove (--, /**/)
export const removeAllComment = (s: string) => {
    return removeComment(removeMultilineComment(s));
};

export const millitimeToFormat = (milliTime: number, format :string) => {
    var inDate = new Date(milliTime);
    var z = {
        M: inDate.getMonth() + 1,
        d: inDate.getDate(),
        h: inDate.getHours(),
        m: inDate.getMinutes(),
        s: inDate.getSeconds()
    };
    format = format.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-2)
    });

    return format.replace(/(y+)/g, function(v) {
        return inDate.getFullYear().toString().slice(-v.length)
    });
};

