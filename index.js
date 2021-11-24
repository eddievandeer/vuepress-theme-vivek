module.exports = () => {
  return {
//     head: [
//       [
//         'link',
//         {
//           rel: 'icon',
//           href: '/assets/icon/favicon.ico',
//         },
//       ],
//     ],
    plugins: [
      'vuepress-plugin-container',
      [
        'vuepress-plugin-container',
        {
          type: 'tip',
          defaultTitle: {
            '/': 'TIP',
            '/zh/': '提示',
          },
        },
      ],
      [
        '@vuepress/search',
        {
          searchMaxSuggestions: 10,
        },
      ],
      // '@vuepress/back-to-top',
      require('./plugin/blog-controller'),
      '@vuepress/nprogress',
      '@vuepress/last-updated',
    ],
  };
};
