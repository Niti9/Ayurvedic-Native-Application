// module.exports = {
//   presets: ['module:@react-native/babel-preset'],
//   plugins: ['react-native-worklets/plugin'],
// };

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        //We don't need to write out every single folder like you did in TS—just mapping '@': './src' will automatically cover @/config/, @/components/
        root: ['./'],
        alias: {
          '@': './src',
        },
      },
    ],
    'react-native-worklets/plugin',
  ],
};
