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
		 '/dev-api': {
		   target: 'http://172.30.1.130:8080', // 目标后端服务地址
		   changeOrigin: true, // 是否改变请求源
		   rewrite: (path) => path.replace(/^\/dev-api/, ''), // 重写请求路径
		},	
		'/api': {
			target: 'http://172.30.1.130:8080', // 目标后端服务地址
			changeOrigin: true, // 是否改变请求源
			rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径
		 },
		 // ...其他代理规则
		},
		// 其他server配置
	},	
});
