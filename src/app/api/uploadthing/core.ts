import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import { PineconeStore } from 'langchain/vectorstores/pinecone'
import { pinecode } from '@/lib/pinecone'

const f = createUploadthing()

export const ourFileRouter = {
  pdfUploader: f({ pdf: { maxFileSize: '16MB' } })
    .middleware(async ({ req }) => {
      const { getUser } = getKindeServerSession()
      const user = await getUser()

      if (!user || !user.id) throw new Error('Unauthorized')

      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const createFile = await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: `https://utfs.io/f/${file.key}`,
          uploadStatus: 'PROCESSING',
        },
      })

      try {
        const response = await fetch(`https://utfs.io/f/${file.key}`)
        const blob = await response.blob()

        const loader = new PDFLoader(blob)
        const pageLevelDocs = await loader.load()
        const pagesAmt = pageLevelDocs.length

        const indexName = 'expert-pdf'
        const pineconeIndex = pinecode.Index(indexName)

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: process.env.OPENAI_API_KEY,
        })

        await PineconeStore.fromDocuments(pageLevelDocs, embeddings, {
          pineconeIndex,
          namespace: createFile.id,
        })

        await db.file.update({
          data: {
            uploadStatus: 'SUCCESS',
          },
          where: {
            id: createFile.id,
            userId: metadata.userId,
          },
        })
      } catch (error) {
        await db.file.update({
          data: {
            uploadStatus: 'FAILED',
          },
          where: {
            id: createFile.id,
            userId: metadata.userId,
          },
        })
      }
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
