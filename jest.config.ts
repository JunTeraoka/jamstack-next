module.exports = {
  preset: "jest-puppeteer",
  moduleFileExtensions: ["js", "ts"],
  moduleNameMapper: {
    "tests/(.*)$": "<rootDir>/src/tests/$1",
  },
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["<rootDir>/src/tests/**/*.test.(ts|js)"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/jest-setup.ts"], // jestのsetupファイルとしてjest-setup.tsを追加
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.json",
    },
  },
};

export {};
