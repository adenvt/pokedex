/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images         : { domains: ['raw.githubusercontent.com'] },
  i18n           : {
    locales      : ['en-US'],
    defaultLocale: 'en-US'
  }
}
