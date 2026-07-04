# PHASE 1 — Create Project
npx @react-native-community/cli@latest init AyurvedicSuperApp

--Move into the project:--
cd AyurvedicSuperApp

--Run Android once to verify everything is working:--
npx react-native run-android

--Commit this initial state:--
git init

git add .

git commit -m "Initial React Native project"

# Install Dependencies

1. Production Dependencies
<!-- Run this single command to install your navigation, native dependencies ,state, React query, storage, networking ,forms (zod) ,flashlight , NetInfo,Environment virtualization, and utility libraries: -->

npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-worklets zustand @tanstack/react-query react-native-mmkv axios react-hook-form zod @hookform/resolvers @shopify/flash-list @react-native-community/netinfo react-native-toast-message react-native-svg react-native-vector-icons react-native-get-random-values uuid dayjs react-native-config  react-native-nitro-modules

# Or using yarn
yarn add react-native-nitro-modules

2. Development Dependencies
<!-- Run this command for your tooling, linters, types, and Babel plugins: -->

npm install -D eslint prettier husky lint-staged babel-plugin-module-resolver @types/uuid

# Git Branches for safely using Main branch by working in develop branch
Step 1: Create your develop branch
git checkout -b develop

Step 2: Save your environment setup
git add .
git commit -m "chore: setup environment variables and project structure  update gitignore"

Step 3: Start working on a feature (-  if you want to build the shop section, create a feature branch out of develop:- )
git checkout -b feature/consultation
git checkout -b feature/shop
git checkout -b feature/records