import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    // get the promp that has the given id
    const prompt = await Prompt.findById(params.id).populate('creator')

    if (!prompt) return new Response('Prompt not found', {status: 404})

    return new Response(JSON.stringify(prompt), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 })
  }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json()

  try {
    await connectToDB()

    // get the prompt with the given id
    const existingPrompt = await Prompt.findById(params.id)

    if (!existingPrompt) return new Response('Prompt not found', {status: 404})

    // updata prompt and tag
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    // save updated prompt to DB
    await existingPrompt.save()

    return new Response(JSON.stringify(existingPrompt), { status: 200 })
  } catch (err) {
    return new Response('Failed to update prompt', { status: 500 })
  }
}

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()

    // find prompt with the given id and delete it
    await Prompt.findByIdAndDelete(params.id)

    return new Response('Prompt deleted successfully', { status: 200 })
  } catch (err) {
    return new Response('Failed to delete prompt', { status: 500 })
  }
}