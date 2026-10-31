// Fetches the latest uploads at build time from YouTube's public RSS feeds (no API key).
// - Main channel feed: latest 15 uploads (videos, shorts and live streams).
// - Live-streams feed (playlist UULV...): used to filter live streams out.
// Feeds are retried, as they sometimes return 404/500. If the main feed still
// fails, returns [] and logs a warning so the deploy still succeeds.

export const YOUTUBE_CHANNEL_ID = 'UCjmFVvSmeVJp_RzzPChusFg'; // RamblingGeekUK

const FEED = 'https://www.youtube.com/feeds/videos.xml';
const CHANNEL_FEED = `${FEED}?channel_id=${YOUTUBE_CHANNEL_ID}`;
const LIVE_FEED = `${FEED}?playlist_id=UULV${YOUTUBE_CHANNEL_ID.slice(2)}`;

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
}

const decode = (s: string) =>
  s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');

const tag = (xml: string, name: string) => {
  const m = xml.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`));
  return m ? decode(m[1].trim()) : '';
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchEntries(url: string): Promise<string[]> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return (await res.text()).match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
    } catch (e) {
      lastError = e;
      if (attempt < 3) await sleep(attempt * 2000);
    }
  }
  throw lastError;
}

async function load(): Promise<YouTubeVideo[]> {
  let entries: string[];
  try {
    entries = await fetchEntries(CHANNEL_FEED);
  } catch (e) {
    console.warn(`[youtube] Channel feed failed (${e}); building without videos`);
    return [];
  }

  // Channels with no live streams can 404 here, so treat failure as "no lives".
  let liveIds = new Set<string>();
  try {
    liveIds = new Set((await fetchEntries(LIVE_FEED)).map((e) => tag(e, 'yt:videoId')));
  } catch (e) {
    console.warn(`[youtube] Live-streams feed failed (${e}); not filtering lives`);
  }

  return entries
    .map((entry) => {
      const id = tag(entry, 'yt:videoId');
      return {
        id,
        title: tag(entry, 'title'),
        description: tag(entry, 'media:description'),
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        publishedAt: new Date(tag(entry, 'published')).toLocaleDateString('en-GB', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
    })
    .filter((v) => v.id && !liveIds.has(v.id));
}

let cache: Promise<YouTubeVideo[]> | undefined;

export async function getLatestVideos(max = 3): Promise<YouTubeVideo[]> {
  cache ??= load();
  return (await cache).slice(0, max);
}
