## Install

```shell
npm i github:hirentw/jslib#<version>
```

## Usage

```js
import * as _ from 'jslib'

// typeOf
console.log(_.typeOf(''))
console.log(_.typeOf(0))
console.log(_.typeOf([]))
console.log(_.typeOf({}))
console.log(_.typeOf(undefined))
console.log(_.typeOf(null))
console.log(_.typeOf(NaN))

// delay
await _.delay(1000)

// debounce
const debounceFn = _.debounce(() => 'debounce', 1000)
console.log(await debounceFn())

// throttle
const throttleFn = _.throttle(() => 'throttle', 1000)
console.log(throttleFn())

// cls
console.log(_.cls({ 'my-class': true }))

// uid
console.log(_.uid())

// sort
console.log(_.sort([1, 2, 3], 'asc'))
console.log(_.sort([1, 2, 3], 'desc'))

// sortWithKeys
console.log(_.sortWithKeys(
  [
    { id: 1, name: 'a' },
    { id: 2, name: 'b' },
    { id: 3, name: 'c' },
    { id: 4, name: 'c' }
  ],
  { name: 'desc', id: 'asc' }
))

// search
const data = [
  { id: 1, name: 'a', score: 60 },
  { id: 2, name: 'b', score: 80 },
  { id: 3, name: 'c', score: 100 },
  { id: 4, name: 'c', score: 80 }
]
console.log(_.search(data, { name: 'c', score: 80 }))
console.log(_.search(data, { score: { $gt: 90} })) // $eq, $ne, $gt, $gte, $lt, $lte
console.log(_.search(data, { id: { $in: [1, 2] } })) // $in, $nin
console.log(_.search(data, { name: { $regex: /a/ } }))
console.log(_.search(data, { id: { $fn: (v) => v === 1 } }))
console.log(_.search(data, { $not: { id: 1 } }))
console.log(_.search(data, { $and: [{ name: 'c' }, { score: 80 }] })) // $and, $or, $nor
console.log(_.search(data, { name: 'c' }, { skip: 1 }))
console.log(_.search(data, { name: 'c' }, { limit: 1 }))
```
