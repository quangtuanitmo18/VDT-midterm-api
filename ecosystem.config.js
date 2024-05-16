// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: 'VDT-midterm-api',
      script: 'dist/index.js',
      env: {
        NODE_ENV: 'development'
      },
      env_development: {
        NODE_ENV: 'development'
      },
      env_staging: {
        NODE_ENV: 'staging'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
