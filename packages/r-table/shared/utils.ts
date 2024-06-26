// 空函数
export const noop = () => {}

export function isUndef(v: any) {
    return v === undefined || v === null
}

export function isDef(v: any) {
    return v !== undefined && v !== null
}

// 是否基础/原始数据类型对象
export function isPrimitive(value: any) {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'symbol' ||
        typeof value === 'boolean'
    )
}

// 是否对象
export function isObject(obj: any) {
    return obj !== null && typeof obj === 'object'
}
