// Fetches the latest uploads from the channel's public RSS feed at build time.
// No API key or quota needed. The feed returns the 15 most recent uploads.

export const YOUTUBE_CHANNEL_ID = 'UCjmFVvSmeVJp_RzzPChusFg'; // RamblingGeekUK

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

let cache: Promise<YouTubeVideo[]> | undefined;

async function fetchFeed(): Promise<YouTubeVideo[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`YouTube feed request failed: ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

  const videos = entries.map((entry) => {
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
  });

  if (videos.length === 0) {
    throw new Error('YouTube feed returned no videos');
  }
  return videos;
}

// Throws on failure so a broken fetch fails the build instead of silently
// deploying a page with stale or missing videos.
export async function getLatestVideos(max = 3): Promise<YouTubeVideo[]> {
  cache ??= fetchFeed();
  return (await cache).slice(0, max);
}
