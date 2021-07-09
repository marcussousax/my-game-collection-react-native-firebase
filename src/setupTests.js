/* eslint-disable */
// https://stackoverflow.com/questions/50793885/referenceerror-you-are-trying-to-import-a-file-after-the-jest-environment-has
jest.useFakeTimers()
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')
jest.mock('@react-native-google-signin/google-signin', () => {
})
