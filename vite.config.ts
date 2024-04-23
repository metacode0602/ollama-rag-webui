import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	},	
	server: {
		proxy: {
		 '/api': {
		   target: 'http://localhost:8080', // 目标后端服务地址
		   changeOrigin: true, // 是否改变请求源
		   rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径
		},
		 '/manifest.json': {
		   target: 'http://localhost:8080',
		   changeOrigin: true,
		   rewrite: (path) => '/manifest.json'//path.replace(/^\/manifest\.json/, ''),
		},
		 // ...其他代理规则
		},
		// 其他server配置
	},	
});
