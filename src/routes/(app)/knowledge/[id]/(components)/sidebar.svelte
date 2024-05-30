<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Separator } from '$lib/components/ui/select';
	import { Progress } from "$lib/components/ui/progress";

	let className: string | null | undefined = undefined;
	export { className as class };
	let knowledgeId: string | null | undefined = $page.params.id;
	let trainingProgress:number = 13;
	let indexingProgress:number = 24;
	
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
				<Button
					variant="secondary"
					class="w-full justify-start"
					href="/knowledge/{knowledgeId}/dataset"
				>
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
						<rect width="7" height="7" x="3" y="3" rx="1" />
						<rect width="7" height="7" x="14" y="3" rx="1" />
						<rect width="7" height="7" x="14" y="14" rx="1" />
						<rect width="7" height="7" x="3" y="14" rx="1" />
					</svg>
					数据集
				</Button>
				<Button
					variant="ghost"
					class="w-full justify-start"
					on:click={() => {
						onBtnClick('testing');
					}}
					href="/knowledge/{knowledgeId}/testing"
				>
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
						<circle cx="12" cy="12" r="10" />
						<polygon points="10 8 16 12 10 16 10 8" />
					</svg>
					搜索测试
				</Button>

				<Button
					variant="ghost"
					on:click={() => {
						onBtnClick('setting');
					}}
					class="w-full justify-start"
					href="/knowledge/{knowledgeId}/setting"
				>
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
						<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
						<path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
						<circle cx="12" cy="12" r="2" />
						<path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
						<path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
					</svg>
					参数配置
				</Button>
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
