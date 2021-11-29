// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import readline from 'readline'

const readFile = async () => {
  const raw_data = []
  
  const reader = readline.createInterface({
    input: fs.createReadStream('data/blogdata.txt'),
    crlfDelay: Infinity
  })
  
  for await (const line of reader) {
    raw_data.push(line.split('\t'))
  }

  const data = {
    words: raw_data[0].length - 1,
    blogs: [ ]
  }

  for await (const [i, row] of raw_data.entries()) {
    if (i == 0) continue

    const blog = { }

    for await (const [i, key] of raw_data[0].entries()) {
        blog[key] = row[i]
    }

    data.blogs.push(blog)
  }

  return data
}

export default async function handler(req, res) {
  const {
    body: { },
    method,
  } = req

  if (method === 'GET') {
    res.status(200).json(await readFile())
  }
}

