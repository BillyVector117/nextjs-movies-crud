// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import dbConnect from "../../../lib/dbConnect";
import Movie from "../../../models/Movie";
export default async function handler(req, res) {
  await dbConnect() // Connect to DB
  // Ask for fetch METHOD
  const { method } = req
  switch (method) {
      // UPDATE api/movie/:idMovie 
      case 'PUT':
        try {
          console.log('params', req.query.idMovie)
          const movie = await Movie.findByIdAndUpdate(req.query.idMovie,{$set: req.body}, { new: true })
          return res.status(201).json({ success: true, movie })
        } catch (error) {
          return res.status(400).json({ success: false, error })
        }
    default:
      return res.status(500).json({ success: false, error: "Server fail" })
  }
  // res.status(200).json({ name: 'John Doe' })
}
