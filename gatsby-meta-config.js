module.exports = {
  title: `DonghoLab`,
  description: `동호의 개발 블로그`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://blog.dongholab.com`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `gongdongho12/gongdongho12.github.io`, // `zoomkoding/zoomkoding-gatsby-blog`,
    },
  },
  ga: '0', // Google Analytics Tracking ID
  author: {
    name: `강동호`,
    bio: {
      role: `개발자`,
      description: ['좋은 기술을 탐구하는', '심심하면 개발하는', '포지션 제한을 두지 않는'],
      thumbnail: 'thumbnail.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/gongdongho12`,
      resume: `https://resume.dongholab.com/`,
      linkedIn: `https://www.linkedin.com/in/dongholab/`,
      email: `gongdongho12@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2022.12.31 ~',
        activity: '개인 블로그 개발 및 운영',
        // links: {
          // post: '/gatsby-starter-zoomkoding-introduction',
          // github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
          // demo: 'https://www.zoomkoding.com',
        // },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      // {
      //   title: '개발 블로그 테마 개발',
      //   description:
      //     '개발 블로그를 운영하는 기간이 조금씩 늘어나고 점점 많은 생각과 경험이 블로그에 쌓아가면서 제 이야기를 담고 있는 블로그를 직접 만들어보고 싶게 되었습니다. 그동안 여러 개발 블로그를 보면서 좋았던 부분과 불편했던 부분들을 바탕으로 레퍼런스를 참고하여 직접 블로그 테마를 만들게 되었습니다.',
      //   techStack: ['gatsby', 'react'],
      //   thumbnailUrl: 'blog.png',
      //   links: {
      //     post: '/gatsby-starter-zoomkoding-introduction',
      //     github: 'https://github.com/zoomkoding/zoomkoding-gatsby-blog',
      //     demo: 'https://www.zoomkoding.com',
      //   },
      // },
    ],
  },
};
