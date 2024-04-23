# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
## create a new project in the current directory
npm create svelte@latest

## create a new project in my-app
npm create svelte@latest my-app

## 增加tailwindcss样式
npx svelte-add@latest tailwindcss

## 增加shadcn-svelte依赖
npx shadcn-svelte@latest init

## 增加一个组件
npx shadcn-svelte@latest add button

```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
## 安装依赖
yarn

## 运行项目
yarn dev

# or start the server and open the app in a new browser tab
yarn dev -- --open
```

## Building

To create a production version of your app:

```bash
yarn build
```

You can preview the production build with `yarn preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
