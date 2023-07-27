// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const result = blogs.find(blog => blog.likes === maxLikes)

  return maxLikes === undefined
    ? 0
    : { title: result.title, author: result.author, likes: result.likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined

  const uniqueAuthor = (name, index, authors) => {
    return authors.indexOf(name) === index
  }

  const authors = blogs.map(blog => blog.author).filter(uniqueAuthor)
  let array = []
  authors.forEach(item => {
    array.push({ author: item, blogs: 0 })
  })
  blogs.forEach(blog => {
    array.forEach(item => {
      if (item.author === blog.author) {
        item.blogs += 1
      }
    })
  })
  const max = array.reduce((max, item) => max.blogs > item.blogs ? max : item)
  return max
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined

  const uniqueAuthor = (name, index, authors) => {
    return authors.indexOf(name) === index
  }

  const authors = blogs.map(blog => blog.author).filter(uniqueAuthor)
  let array = []
  authors.forEach(item => {
    array.push({ author: item, likes: 0 })
  })
  blogs.forEach(blog => {
    array.forEach(item => {
      if (item.author === blog.author) {
        item.likes += blog.likes
      }
    })
  })
  const max = array.reduce((max, item) => max.likes > item.likes ? max : item)
  return max
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }