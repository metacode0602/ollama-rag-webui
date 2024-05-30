<script lang="ts">
	import { items } from './data.js';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button/index.js';

	import { Database } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { goto } from '$app/navigation';
	//  -----------------------start--------------------------
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import MessageSquare from 'lucide-svelte/icons/message-square';
	import Plus from 'lucide-svelte/icons/plus';
	import User from 'lucide-svelte/icons/user';
	import UserPlus from 'lucide-svelte/icons/user-plus';
	import { Ellipsis, Trash2 } from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import type { PageData } from '../$types.js';
	export let data: PageData;

	// 获取当前日期
	const currentDate = new Date();

	// 获取年份
	const year = currentDate.getFullYear();

	// 获取月份（注意：月份是从0开始的，所以需要+1）
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');

	// 获取日期
	const day = String(currentDate.getDate()).padStart(2, '0');

	// 将年月日拼接成字符串
	const currentDateString = `${year}-${month}-${day}`;

	//----------------------over-----------------------------

	// export let accounts: Account[];
	// export let mails: Mail[];
	// export let defaultLayout = [100, 900];
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
</script>

<div class="w-full">
	<header class="flex items-center justify-between px-4 pt-3">
		<div class="flex items-center">
			<Database class="h-10 w-10 rounded-md border-2" />
			<h3 class="ml-2 font-semibold">知识库</h3>
		</div>
		<Sheet.Root>
			<Sheet.Trigger>
				<Button size="sm">新建</Button>
			</Sheet.Trigger>
			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>创建一个知识库</Sheet.Title>
					<Sheet.Description class="font-semibold">知识库类型</Sheet.Description>
				</Sheet.Header>
				<!-- 使用权限 -->
				<div class="mt-2 space-y-1.5">
					<RadioGroup.Root value="comfortable" class="mb-6">
						<Card.Root class="mr-4  flex h-14 w-80  items-center justify-between">
							<div class="flex items-center justify-between gap-x-20 p-3">
								<div>
									<p class="text-xs font-semibold">通用知识库</p>
									<p class="text-xs">可通过导入文件网页链接仅自己可用</p>
								</div>

								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="default" id="option-one" />
								</div>
							</div>
						</Card.Root>

						<Card.Root class="flex h-14 w-80 items-center">
							<div class="flex items-center justify-between gap-x-48 p-3">
								<div>
									<p class="text-xs font-semibold">Web 站点同步</p>
									<p class="text-xs">团队所有可用</p>
								</div>

								<div class="flex items-center space-x-2">
									<RadioGroup.Item value="comfortable" id="option-two" />
								</div>
							</div>
						</Card.Root>
					</RadioGroup.Root>
					<!-- 取个名字 -->
					<div>
						<span class="text-sm font-semibold">取个名字</span>
						<div class="mt-2 flex justify-between pr-3">
							<Database class="h-10 w-10 rounded-md border-2" />
							<Input id="name" placeholder="知识库名称" class="w-[277px]" />
						</div>
					</div>
					<!-- 取个名字 over -->
					<div class="flex items-center space-y-1.5 pr-3">
						<Label for="framework" class="mr-4 w-[100px] text-sm font-bold">索引模型</Label>
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
					<!-- 文件处理模型 -->
					<div class="flex items-center space-y-1.5 pr-3">
						<Label for="framework" class="mr-4 w-[100px] text-sm font-bold">文件处理模型</Label>
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
					<!-- 文件处理模型 over -->
				</div>
				<!-- button -->
				<Sheet.Footer>
					<Sheet.Close asChild let:builder>
						<Button builders={[builder]} type="submit" class=" mx-16  mt-6 w-64">确认创建</Button>
					</Sheet.Close>
				</Sheet.Footer>
				<!-- button over -->
			</Sheet.Content>
		</Sheet.Root>
	</header>
	<div class="m-4 grid h-5/6 grid-cols-1 gap-6 rounded-md sm:grid-cols-2 lg:grid-cols-3">
		{#each items as item, i (i)}
			<a href="/knowledge/{item.id}/dataset" class={cn('items-start rounded-lg border text-left text-sm transition-all hover:bg-accent')}
			>
				<Card.Root class="w-74 h-56 hover:bg-gray-200">
					<Card.Header class="flex justify-between">
						<div>
							<Card.Title>{item.dataname}</Card.Title>
							<Card.Description style="margin-top: 5px">{item.datadescription}</Card.Description>
						</div>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button
									variant="outline"
									builders={[builder]}
									size="icon"
									class="relative h-8 w-8 p-0"
								>
									<span class="sr-only">Open menu</span>
									<Ellipsis class="h-4 w-4" />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class="w-56">
								<DropdownMenu.Separator />
								<DropdownMenu.Group>
									<DropdownMenu.Item>
										<User class="mr-2 h-4 w-4" />
										<span class="text-sm">设为团队可用</span>
										<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
									</DropdownMenu.Item>
									<DropdownMenu.Item>
										<CreditCard class="mr-2 h-4 w-4" />
										<span>重命名</span>
										<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
									</DropdownMenu.Item>
								</DropdownMenu.Group>

								<DropdownMenu.Group>
									<DropdownMenu.Sub>
										<DropdownMenu.SubTrigger>
											<UserPlus class="mr-2 h-4 w-4" />
											<span>移动到分组</span>
										</DropdownMenu.SubTrigger>
										<DropdownMenu.SubContent>
											<DropdownMenu.Item>
												<CirclePlus class="mr-2 h-4 w-4" />
												<span>我的知识库</span>
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<MessageSquare class="mr-2 h-4 w-4" />
												<span>新建分组</span>
											</DropdownMenu.Item>
										</DropdownMenu.SubContent>
										<DropdownMenu.Item>
											<Plus class="mr-2 h-4 w-4" />
											<span>导出</span>
										</DropdownMenu.Item>
										<DropdownMenu.Separator />
										<DropdownMenu.Item>
											<Trash2 class="mr-2 h-4 w-4" />
											<span>删除</span>
										</DropdownMenu.Item>
									</DropdownMenu.Sub>
								</DropdownMenu.Group>
								<DropdownMenu.Separator />
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Card.Header>
					<div>
						<Card.Content class="flex justify-between">
							<p class="text-sm">{item.datatitle}</p>
							<p class="text-xs">{currentDateString}</p>
						</Card.Content>
						<Card.Footer class="flex justify-end">
							<div
								class="mt-3 inline-block w-24 rounded-lg border border-slate-300 bg-gray-100 px-4 py-1 text-center text-xs text-slate-400 dark:bg-gray-800"
							>
								<p>{item.directory}</p>
							</div>
						</Card.Footer>
					</div>
				</Card.Root>
			</a>
		{/each}
	</div>
</div>
