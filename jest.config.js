module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  // testEnvironment: 'node',  
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  transformIgnorePatterns: ['/node_modules/']
}
