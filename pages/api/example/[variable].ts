import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { variable },
  } = req

  res.end(`Variable: ${variable}`)
};

