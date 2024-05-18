import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

const target_api = "http://localhost:8080"
export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	define: {
		APP_VERSION: JSON.stringify(process.env.npm_package_version)
	},	
	server: {
        host: '0.0.0.0',
	    fs: {
	      // Allow serving files from one level up to the project root
	      allow: ['./static'],
	    },		
		proxy: {
		 '/dev-api': {
		   target: target_api, // 目标后端服务地址
		   changeOrigin: true, // 是否改变请求源
		   rewrite: (path) => path.replace(/^\/dev-api/, ''), // 重写请求路径
		},
		'/c/dev-api': {
			target: target_api, // 目标后端服务地址
			changeOrigin: true, // 是否改变请求源
			rewrite: (path) => {
				return path.replace(/^\/c\/dev-api/, '')
			} // 重写请求路径
		 },			
		'/api': {
			target: target_api, // 目标后端服务地址
			changeOrigin: true, // 是否改变请求源
			rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径
		 },
		 // ...其他代理规则
		},
		// 其他server配置
	},	
});
