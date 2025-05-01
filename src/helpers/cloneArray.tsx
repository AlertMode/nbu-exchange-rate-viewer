export function cloneArray(arr: any[]): any[] | Error {
  if (arr.length > 0) {
    let result = []
    for (const el of arr) result.push(el)
    return result
  } else {
    return new Error('Empty array(s)!')
  }
}
