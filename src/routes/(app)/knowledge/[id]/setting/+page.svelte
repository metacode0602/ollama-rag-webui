<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import * as Resizable from '$lib/components/ui/resizable';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { onMount } from 'svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';

	// export let accounts: Account[];
	// export let mails: Mail[];
	export let defaultLayout = [100, 900];
	export let defaultCollapsed = false;
	// export let navCollapsedSize: number;

	export const frameworks = [
		{
			value: 'sveltekit',
			label: 'SvelteKit'
		},
		{
			value: 'next',
			label: 'Next.js'
		},
		{
			value: 'astro',
			label: 'Astro'
		},
		{
			value: 'nuxt',
			label: 'Nuxt.js'
		}
	];

	let isCollapsed = defaultCollapsed;
	// 进度条
	let value = 13;
	onMount(() => {
		const timer = setTimeout(() => (value = 66), 500);
		return () => clearTimeout(timer);
	});

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:collapsed=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}

	// HTML模板部分
</script>

<div class="col-span-3 lg:col-span-4 lg:border-l">
	<div class="h-full px-4 py-6 lg:px-8">
		<Card.Root class="min-w-screen max-h-screen">
			<Card.Header>
				<div class="flex items-center gap-4">
					<label for="dataId" class="w-[110px] text-sm font-bold"> 知识库Id </label>
					<label for="dataId" class="text-xs">3454654656756786</label>
				</div>
			</Card.Header>
			<Card.Content>
				<form>
					<div class="grid w-full items-center gap-4">
						<!-- 知识库头像 -->
						<div class="flex items-center">
							<Label for="name" class="mr-10 w-[80px] font-bold">知识库头像</Label>
							<Avatar.Root>
								<Avatar.Image src="/assets/avatars/company_logo.png" alt="@yhme" />
							</Avatar.Root>
						</div>
						<!-- 索引 -->
						<!-- 知识库名称 -->
						<div class="flex items-center space-y-1.5">
							<Label for="name" class="mr-6 w-[100px] text-sm font-bold">知识库名称</Label>
							<Input id="name" placeholder="Embedding-2" class="w-64" />
						</div>
						<!-- 索引模型 -->
						<div class="flex w-full items-center gap-4">
							<label for="dataId" class="mr-7 w-[80px] text-sm font-bold"> 索引模型 </label>
							<label for="dataId" class="text-xs">MarketingGPT</label>
						</div>
						<!-- 单挑数据上线 -->
						<div class="mr-7 flex items-center gap-4">
							<label for="dataId" class="w-[110px] text-sm font-bold"> 单挑数据上线 </label>
							<label for="dataId" class="text-xs">5000</label>
						</div>
	
						<div class="flex items-center space-y-1.5">
							<Label for="framework" class="mr-6 w-[100px] text-sm font-bold">文件处理模型</Label>
							<Select.Root>
								<Select.Trigger id="framework" class="w-64">
									<Select.Value placeholder="Embedding-2" />
								</Select.Trigger>
								<Select.Content>
									{#each frameworks as framework}
										<Select.Item value={framework.value} label={framework.label}
											>{framework.label}</Select.Item
										>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<!-- 介绍 -->
						<div class="flex items-center space-y-1.5">
							<Label for="name" class="mr-8 w-[50px] text-sm font-bold">介绍</Label>
							<Textarea placeholder="暂无介绍" class="ml-10 h-24 w-96" />
						</div>
	
						<!-- 使用权限 -->
						<div class="flex items-center space-y-1.5">
							<Label for="name" class="mr-10 w-[80px] text-sm font-bold">使用权限</Label>
							<Card.Root class="mr-4 flex h-14  w-48 items-center">
								<div class="p-3">
									<p class="text-xs font-semibold">私有</p>
									<p class="text-xs">仅自己可用</p>
								</div>
							</Card.Root>
	
							<Card.Root class="flex h-14 w-48 items-center">
								<div class="p-3">
									<p class="text-xs font-semibold">团队</p>
									<p class="text-xs">团队所有可用</p>
								</div>
							</Card.Root>
						</div>
					</div>
				</form>
			</Card.Content>
			<Card.Footer class="flex justify-start">
				<Button class="mx-32">更新信息</Button>
			</Card.Footer>
		</Card.Root>		
	</div>
</div>

<style>
</style>
