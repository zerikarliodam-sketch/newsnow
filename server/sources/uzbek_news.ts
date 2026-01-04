
import { defineSource, myFetch } from "../utils" // Shunday qoldiring yoki @/server/utils sinab ko'ring
import { load } from "cheerio"

// ... qolgan o'zbekcha saytlar kodi
const kunUz = defineSource(async () => {
  const url = "https://kun.uz/uz/news/rss"
  const response = await myFetch(url) as any
  const $ = load(response, { xmlMode: true })
  const news: any[] = []

  $("item").each((_, el) => {
    const $el = $(el)
    const title = $el.find("title").text().trim()
    const link = $el.find("link").text().trim()
    const pubDate = $el.find("pubDate").text()

    if (title && link) {
      news.push({
        url: link,
        title: title,
        id: link,
        extra: {
          date: new Date(pubDate).getTime(),
        },
      })
    }
  })
  return news
})

const daryoUz = defineSource(async () => {
  const url = "https://daryo.uz/feed/"
  const response = await myFetch(url) as any
  const $ = load(response, { xmlMode: true })
  const news: any[] = []

  $("item").each((_, el) => {
    const $el = $(el)
    const title = $el.find("title").text().trim()
    const link = $el.find("link").text().trim()
    const pubDate = $el.find("pubDate").text()

    if (title && link) {
      news.push({
        url: link,
        title: title,
        id: link,
        extra: {
          date: new Date(pubDate).getTime(),
        },
      })
    }
  })
  return news
})

export default {
  "kun-uz": kunUz,
  "daryo-uz": daryoUz,
}