import { typeOf } from './common.js'

type SortArr = {
  index: number
  value: any
}[]
type OrderBy = 'asc' | 'desc'

function mergeSort(arr: SortArr, orderBy: OrderBy = 'asc'): SortArr {
  if (arr.length < 2) {
    return [...arr]
  }

  function merge(left: SortArr, right: SortArr, orderBy: string): SortArr {
    let result: SortArr = []
    while (left.length > 0 && right.length > 0) {
      let a = left[0].value
      let b = right[0].value
      const typeA = typeOf(a)
      const typeB = typeOf(b)
      const typeSeq = [
        'undefined',
        'null',
        'NaN',
        'Number',
        'String',
        'Boolean',
        'Array',
        'Object'
      ]
      if (typeA !== typeB) {
        a = typeSeq.indexOf(typeA)
        b = typeSeq.indexOf(typeB)
        if (a === -1) {
          a = typeSeq.length
        }
        if (b === -1) {
          b = typeSeq.length
        }
      }
      if (orderBy === 'desc') {
        [a, b] = [b, a]
      }
      if (a <= b) {
        result.push(left.shift()!)
      } else {
        result.push(right.shift()!)
      }
    }
    result = result.concat(left, right)
    return result
  }

  const middle = Math.ceil(arr.length / 2)
  const left = arr.slice(0, middle)
  const right = arr.slice(middle)
  return merge(mergeSort(left, orderBy), mergeSort(right, orderBy), orderBy)
}

export function sort<T>(arr: T[], orderBy: OrderBy = 'asc'): T[] {
  return mergeSort(arr.map((value, index) => ({ index, value })), orderBy).map((x) => x.value)
}

export function sortWithKeys<T>(arr: T[], args: { [k: string]: OrderBy }): T[] {
  function sort(arr: T[], args: [string, OrderBy][]): T[] {
    if (args.length < 2) {
      return [...arr]
    }
    const [key, orderBy] = args.shift()!
    const sortArr = mergeSort(arr.map((x, index) => ({ index, value: x[key] })), orderBy)
    const groups = [[arr[sortArr[0].index]]]
    for (let i = 1; i < sortArr.length; i++) {
      const group = groups[groups.length - 1]
      const el = sortArr[i]
      if (el.value === group[0][key]) {
        group.push(arr[el.index])
      } else {
        groups.push([arr[el.index]])
      }
    }
    const result: T[] = []
    for (let i = 0; i < groups.length; i++) {
      result.push(...sort(groups[i], args))
    }
    return result
  }
  console.log(Object.entries(args))
  return sort(arr, Object.entries(args))
}
