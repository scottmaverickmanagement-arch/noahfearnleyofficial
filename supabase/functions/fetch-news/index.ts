
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const consoleLog = (msg: string) => console.log(`[fetch-news] ${msg}`)
const consoleError = (msg: string) => console.error(`[fetch-news] ${msg}`)

Deno.serve(async (req) => {
    try {
        const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY')
        if (!NEWS_API_KEY) {
            consoleError('Missing NEWS_API_KEY environment variable')
            return new Response(JSON.stringify({ error: 'Missing configuration' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const supabaseUrl = Deno.env.get('SUPABASE_URL')
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        if (!supabaseUrl || !supabaseKey) {
            consoleError('Missing Supabase configuration')
            return new Response(JSON.stringify({ error: 'Server configuration error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const supabase = createClient(supabaseUrl, supabaseKey)

        // Fetch news from GNews
        // q=Noah Fearnley OR "Noah Fearnley"
        const query = encodeURIComponent('"Noah Fearnley"')
        const url = `https://gnews.io/api/v4/search?q=${query}&lang=en&max=5&apikey=${NEWS_API_KEY}`

        consoleLog(`Fetching news from: ${url.replace(NEWS_API_KEY, 'HIDDEN')}`)

        const res = await fetch(url)
        if (!res.ok) {
            const errorText = await res.text()
            consoleError(`News API Error: ${res.status} - ${errorText}`)
            return new Response(JSON.stringify({ error: `News API failed: ${res.status}` }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        const data = await res.json()
        const articles = data.articles || []

        consoleLog(`Found ${articles.length} articles`)

        if (articles.length === 0) {
            return new Response(JSON.stringify({ message: 'No new articles found' }), {
                headers: { 'Content-Type': 'application/json' },
            })
        }

        let insertedCount = 0;

        for (const article of articles) {
            // Map GNews format to our schema
            const newsItem = {
                title: article.title,
                url: article.url,
                source: article.source.name,
                excerpt: article.description,
                image_url: article.image,
                published_at: article.publishedAt
            }

            const { error } = await supabase
                .from('news_articles')
                .upsert(newsItem, { onConflict: 'url', ignoreDuplicates: true }) // Using upsert with ignoreDuplicates to avoid errors on existing

            if (error) {
                consoleError(`Error inserting article ${article.title}: ${error.message}`)
            } else {
                insertedCount++
            }
        }

        consoleLog(`Inserted ${insertedCount} new articles`)

        return new Response(
            JSON.stringify({
                message: `Processed ${articles.length} articles, inserted ${insertedCount} new ones`,
                articles: articles.map((a: { title: string }) => a.title)
            }),
            {
                headers: { 'Content-Type': 'application/json' },
            },
        )
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        consoleError(`Unhandled error: ${errorMessage}`)
        return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
})
