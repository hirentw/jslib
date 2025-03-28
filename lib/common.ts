export function typeOf(obj: any): string {
  let result = ''
  if (obj === void 0) {
    result = 'undefined'
  } else if (obj === null) {
    result = 'null'
  } else if (Object.is(obj, NaN)) {
    result = 'NaN'
  } else {
    result = Object.getPrototypeOf(obj).constructor.name
  }
  return result
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function debounce(callback: Function, ms: number): () => Promise<any> {
  let timer = 0
  return function(...args: any[]) {
    clearTimeout(timer)
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(callback.apply(this, args))
      }, ms)
    })
  }
}

export function throttle(callback: Function, ms: number): () => any {
  let timer = 0
  return function(...args: any[]) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      timer = 0
    }, ms)
    return callback.apply(this, args)
  }
}

export function cls(...args: (string | { [k: string]: any })[]): string {
  const classList: string[] = []
  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const type = typeOf(arg)
    if (type === 'String') {
      classList.push(arg as string)
    } else if (type === 'Object') {
      for (let k in (arg as { [k: string]: any })) {
        if (arg[k]) {
          classList.push(k)
        }
      }
    }
  }
  return classList.join(' ')
}
