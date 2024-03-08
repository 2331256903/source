// flat 可以将一个数组的维度降低
const arr = [1, 2, 3, [5, 6]]
console.log(arr.flat()) // [1, 2, 3, 4, 5, 6]

const arr2 = [1, 2, 3, 4, [5, 6, 7, [8, 9]]]
console.log(arr2.flat()) // [1, 2, 3, 4, 5, 6, 7, [8, 9]]
console.log(arr2.flat(2)) // 参数表示深度, 此处为维度降低2度 [1, 2, 3, 4, 5, 6, 7, 8, 9]

// 同理 flatMap 用于降低Map的维度
const arr3 = [1, 2, 3, 4]
const result = arr3.map(i => [i * 10]) // 复杂结构, 此时返回数组 [[10], [20], [30], [40]]
const result2 = arr3.flatMap(i => [i * 10]) // flatMap 相当于 flat 与 map 的结合 是结果直接变成一味

console.log(result)