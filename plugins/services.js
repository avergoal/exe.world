// Deep clone
export const deepClone = (data) => {
  let out = {}
  for(let e in data) {
    if(data[e] instanceof Object) {
      out[e] = deepClone(data[e])
      continue
    }
    out[e] = data[e]
  }
  return out
}

export default ({}, inject) => {
  inject('deepClone', deepClone)
}