"use client";

export const useDebounceWithCallback = <T>(initialValue: T, delay: number, cb: (value: T) => void) => {
    let timeout: NodeJS.Timeout;
    return (value = initialValue) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cb(value);
            return value;
        }, delay);
    }
}