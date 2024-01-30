module.exports = {
    testEnvironment: "jsdom",
    preset: 'ts-jest',
    transform: {
        '^.+\\.css$': '<rootDir>/css-transformer.js',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/fileTransformer.js',
    },
    transformIgnorePatterns: [
        '/node_modules/',
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif)$': '<rootDir>/__mocks__/fileMock.js',
    },
};

