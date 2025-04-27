import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Blog',
      links: [
        {
          text: 'All',
          href: getBlogPermalink(),
        },
        // {
        //   text: 'Category Page',
        //   href: getPermalink('raspberry', 'category'),
        // },
        {
          text: 'Raspberry Pi',
          href: getPermalink('raspberry', 'tag'),
        },
        {
          text: 'Archived',
          href: getPermalink('archived', 'tag'),
        },
      ],
    },
    {
      text: 'What I Use',
      href: getPermalink('/whatiuse'),
    },
    {
      text: 'CV',
      href: getPermalink('/cv'),
    },
  ],
  actions: [{ text: 'Contact', href: '../contact', target: '_self' }],
};

export const footerData = {
  links: [
    {
      title: 'Links',
      links: [
        { text: 'Michael Jolley', href: 'https://baldbeardedbuilder.com/' },
        { text: 'Chris Jones', href: 'https://cmjchrisjones.dev/' },
        { text: 'Matthew Peck-Deloughry', href: 'https://deloughry.co.uk/' },
        { text: 'James', href: 'https://phrak.dev/' }
      ],
    },
      {
        title: 'Domains',
        links: [
          { text: 'kryptos.co.uk', href: 'https://kryptos.co.uk' },
          { text: 'kryptossolutions.co.uk', href: 'https://kryptossolutions.co.uk' },
          { text: 'waynetaylor.dev', href: 'https://waynetaylor.dev' },
          { text: 'matrixdisplay.io', href: 'https://matrixdisplay.io' }
        ],
      },
  ],
  // secondaryLinks: [
  //   { text: 'kryptos.co.uk', href: getPermalink('#') },
  //   { text: 'waynetaylor.dev', href: getPermalink('#') },
  //   { text: 'kryptossolutions.dev', href: getPermalink('#') },
    
  // ],
  socialLinks: [
    
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/RamblingGeekUK' },
    { ariaLabel: 'BlueSky', icon: 'tabler:brand-bluesky', href: 'https://bsky.app/profile/ramblinggeek.social' },
    { ariaLabel: 'Twitch', icon: 'tabler:brand-twitch', href: 'https://www.twitch.tv/ramblinggeek' },
    { ariaLabel: 'YouTube', icon: 'tabler:brand-youtube', href: 'https://www.youtube.com/@RamblingGeekUK' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/wayne-t-taylor' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: 'https://www.instagram.com/ramblinggeek' },
    { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/rgeekuk' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  
  footNote: `Have a nice day!`,
};
