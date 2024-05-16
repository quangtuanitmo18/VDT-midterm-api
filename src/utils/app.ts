export const convertPathtoEncodeHls = (path: string) => {
  let newPath = path.replace(/\\/g, '/')
  newPath = newPath.replace(/:/g, ':')
  return newPath
}
