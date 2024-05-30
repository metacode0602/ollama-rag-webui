<script lang="ts">
	import { cubicInOut } from "svelte/easing";
	import { crossfade } from "svelte/transition";
	import { cn } from "$lib/utils";
	import { Button } from "$lib/components/ui/button/index.js";
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Separator } from '$lib/components/ui/select';
	import { Progress } from "$lib/components/ui/progress";

	let knowledgeId: string | null | undefined = $page.params.id;
	let trainingProgress:number = 13;
	let indexingProgress:number = 24;
	
	let className: string | undefined | null = undefined;
	// export let items: { href: string; title: string }[];
	export { className as class };

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut,
	});

	const sidebarNavItems = [
		{
			title: "知识库",
			href: 'dataset',
		},
		{
			title: "搜索测试",
			href: 'testing',
		},
		{
			title: "参数配置",
			href: 'setting',
		}
	];	
</script>

<div class={cn('pb-12', className)}>
	<div class="space-y-4 py-4 ">
		<div class={cn('flex h-[100px] flex-col items-center justify-center px-2')}>
			<!-- 标题 -->
			<div class="flex items-center">
				<Avatar.Root>
					<Avatar.Image src="/" alt="@xxx" />
					<Avatar.Fallback>MK</Avatar.Fallback>
				</Avatar.Root>
				<h1 class="mx-2 text-lg font-bold">MarktingGPT</h1>
			</div>
			<!-- 通用知识库标签 -->
			<div
				class="mt-3 inline-block w-[160px] rounded-lg border border-slate-300 bg-gray-100 px-4 py-1 text-center text-xs text-slate-400 dark:bg-gray-800"
			>
				<p>通用知识库</p>
			</div>
		</div>
		<Separator />

		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">知识库</h2>
			<div class="space-y-1">
				{#each sidebarNavItems as item}
				{@const isActive = $page.url.pathname.includes(item.href)}
				<Button
					href={item.href}
					variant='{isActive ? "default" : "ghost"}'
					class="w-full justify-start"
				>{item.title}
				</Button>
			{/each}
			</div>
		</div>
		<div class="px-3 py-2">
			<h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">当前任务</h2>
			<div class="space-y-1">
				<Button variant="ghost" class="w-full justify-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-2 h-4 w-4"
					>
						<path d="M21 15V6" />
						<path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
						<path d="M12 12H3" />
						<path d="M16 6H3" />
						<path d="M12 18H3" />
					</svg>
					QA训练排队
				</Button>
				<!-- QA训练导航栏 -->
				<Progress value={trainingProgress} max={100} class="w-[80%] mx-5" />

				<Button variant="ghost" class="w-full justify-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="mr-2 h-4 w-4"
					>
						<circle cx="8" cy="18" r="4" />
						<path d="M12 18V2l7 4" />
					</svg>
					索引排队
				</Button>
				<Progress value={indexingProgress}  max={100} class="w-[80%] mx-5 mb-5" />				
			</div>
		</div>
	</div>
</div>
