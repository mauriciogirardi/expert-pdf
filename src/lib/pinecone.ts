import { Pinecone } from '@pinecone-database/pinecone'

export const pinecode = new Pinecone({
  apiKey: process.env.PINECOME_API_KEY || '',
})
