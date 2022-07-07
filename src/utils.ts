export const isNumber = (value: any): value is number => typeof value === 'number';

// string trim
export const trim = (s: string) => {
    return s.replace(/^\s+|\s+$/g,""); 
};

// space -> ' '
export const equalizeWhitespace = (s: string) => {
    return trim(s).replace(/\s+/gu, ' ');
};


