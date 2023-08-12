export default function (req, res, next) {
  const paths = ['/carbonless']

  if (paths.includes(req.originalUrl)) {
    res.spa = false
  } else {
    res.spa = true
  }

  next()
}
