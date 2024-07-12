const mixinDecorator = (target: Array<object> | object) => {
    return (sourceClass: any) => {
        const mergeMethods = (_source: any, _target: any) => {
            for (let key in _target) {
                if (_target.hasOwnProperty(key) && _source.hasOwnProperty(key)) {
                    console.error(`${key}属性已存在`)
                } else if (_target.hasOwnProperty(key)) {
                    _source[key] = _target[key]
                }
            }
        }

        if (Array.isArray(target)) {
            target.forEach((item) => {
                mergeMethods(sourceClass.prototype, item)
            })
        } else {
            mergeMethods(sourceClass.prototype, target)
        }
    }
}

export default mixinDecorator
