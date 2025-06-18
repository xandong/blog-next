import type { Config } from "jest"
import nextJest from "next/jest.js"

import {} from "ts-jest"

const createJestConfig = nextJest({
  dir: "./src"
})

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
  transformIgnorePatterns: [
    "<rootDir>/node_modules/(?!(uncrypto|another-esm-pkg1|pkg2)/)",
    "/node_modules/",
    "^.+\\.module\\.(css|sass|scss)$",
    "node_modules/(?!(uncrypto)/)"
  ],
  moduleNameMapper: {
    "^@/app/(.*)$": "<rootDir>/src/app/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/__mocks__/(.*)$": "<rootDir>/src/__mocks__/$1",

    // libs
    "^uncrypto$": "<rootDir>/src/__mocks__/uncrypto.js",
    "^iron-session$": "<rootDir>/src/__mocks__/iron-session.js"
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts(x)?",
    "!src/**/*.stories.tsx",
    "!src/app/**",
    "!src/types/**",
    "!src/styles/**"
  ],

  modulePaths: ["<rootDir>/src/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }]
  }
}

export default createJestConfig(config)
