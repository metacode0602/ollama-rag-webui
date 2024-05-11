<script lang="ts">
	import { invoices, type Account, type Mail, intents, items } from '../data.js';
	import Nav from './nav.svelte';
	import { cn } from '$lib/utils';
	import { Input } from '$lib/components/ui/input';
	import * as Resizable from '$lib/components/ui/resizable';
	import { Separator } from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { primaryRoutes, secondaryRoutes, thirdRoutes, turnRoutes } from '../config.js';
	import { Progress } from '$lib/components/ui/progress';
	import { onMount } from 'svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { goto } from '$app/navigation';
	//  -----------------------start--------------------------
	import * as Card from '$lib/components/ui/card';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Cloud from 'lucide-svelte/icons/cloud';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import MessageSquare from 'lucide-svelte/icons/message-square';
	import Plus from 'lucide-svelte/icons/plus';
	import Settings from 'lucide-svelte/icons/settings';
	import User from 'lucide-svelte/icons/user';
	import UserPlus from 'lucide-svelte/icons/user-plus';
	import Users from 'lucide-svelte/icons/users';
	import { Ellipsis, Trash2 } from 'lucide-svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import SettingsForm from './settings-form.svelte';
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

	export let accounts: Account[];
	export let mails: Mail[];
	export let defaultLayout = [100, 900];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;

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

	function jumpDataList() {
		goto('/dataset/datatasks');
	}


	// HTML模板部分

</script>
<!-- 当屏幕大小小于md时，此div是隐藏的；当屏幕大小达到或超过md时，此div是显示的 -->
<div class="hidden md:block" style="width:100%">
	<div style="height: 100%">
		<!-- 这是一个可调整大小的面板组，其方向是水平的。
					 当面板组的大小或布局改变时，onLayoutChange函数将被调用。
					 这个面板组占据全部高度，最大高度为800像素，并且子元素在垂直方向上拉伸。 -->
		<Resizable.PaneGroup
			direction="horizontal"
			{onLayoutChange}
			class="h-full items-stretch"
		>
			<!-- 这是一个可调整大小并可折叠的面板。
							 默认大小由defaultLayout数组的第一个元素决定。
							 当面板折叠时，其大小变为navCollapsedSize。
							 面板的最小和最大尺寸分别为15和20（单位未指定，可能是像素或其他单位）。
							 当面板折叠时，onCollapse函数将被调用；当面板展开时，onExpand函数将被调用。 -->
			<Resizable.Pane
				defaultSize={defaultLayout[0]}
				collapsedSize={navCollapsedSize}
				collapsible
				minSize={12}
				maxSize={12}
				{onCollapse}
				{onExpand}
				style="position: relative"
			>
				<div
					class={cn(
					"flex flex-col h-[100px] items-center justify-center",
					isCollapsed ? "h-[52px]" : "px-2"
				)}
				>
					<!-- 标题 -->
					<div class="flex items-center">
						<Avatar.Root>
							<Avatar.Image src="/" alt="@xxx" />
							<Avatar.Fallback>MK</Avatar.Fallback>
						</Avatar.Root>
						<h1 class="text-lg font-bold mx-2">MarktingGPT</h1>
					</div>
					<!-- 通用知识库标签 -->
					<div
						class="inline-block rounded-lg bg-gray-100 border border-slate-300 px-4 py-1 text-center text-xs text-slate-400 dark:bg-gray-800 w-[160px] mt-3">
						<p>通用知识库</p>
					</div>
				</div>
				<Separator />
				<!-- 数据集导航栏 -->
				<Nav {isCollapsed} routes={primaryRoutes}>
					<!-- {#each primaryRoutes as route}
							<div class:collapsed={isCollapsed} on:click={() => handleRouteClick(route)}>
								<span>{route.title}</span>
							</div>
						{/each}   -->
				</Nav>
				<div style="position: absolute;bottom: 0;width: 100%">
					<!-- QA训练导航栏 -->
					<Nav {isCollapsed} routes={secondaryRoutes} />
					<!-- 进度条 -->
					<Progress {value} max={100} class="w-[80%] mx-5" />
					<!-- 索引排队导航栏 -->
					<Nav {isCollapsed} routes={thirdRoutes} />
					<!-- 进度条 -->
					<Progress {value} max={100} class="w-[80%] mx-5 mb-5" />
					<Separator />
					<!-- 返回知识库导航栏 -->
					<Nav {isCollapsed} routes={turnRoutes} />
				</div>
			</Resizable.Pane>
			<Resizable.Handle withHandle />

			<Resizable.Pane defaultSize={defaultLayout[0]} minSize={30} maxSize={50}>

				<header class="flex items-center justify-between px-6 py-3 border-b font-medium">
					<h3 class="font-medium"> 知识库</h3>
					<Sheet.Root>
						<Sheet.Trigger>
							<Button size="sm">
								新建
							</Button>
						</Sheet.Trigger>
						<Sheet.Content>
							<Sheet.Header>
								<Sheet.Title>创建一个知识库</Sheet.Title>
								<Sheet.Description class="font-semibold">
									知识库类型
								</Sheet.Description>
							</Sheet.Header>
							<!-- 使用权限 -->
							<div class="space-y-1.5 mt-2">
								<RadioGroup.Root value="comfortable" class="mb-6">

									<Card.Root class="flex  items-center justify-between h-14  mr-4 w-80">


										<div class="flex items-center justify-between  gap-x-20 p-3">

											<div>
												<p class="text-xs font-semibold">通用知识库</p>
												<p class="text-xs">可通过导入文件网页链接仅自己可用</p>
											</div>


											<div class="flex items-center space-x-2">
												<RadioGroup.Item value="default" id="option-one" />
											</div>


										</div>


									</Card.Root>

									<Card.Root class="h-14 flex items-center w-80">
										<div class="flex items-center justify-between  gap-x-48 p-3">
											<div>
												<p class="text-xs font-semibold ">Web 站点同步</p>
												<p class="text-xs">团队所有可用</p>
											</div>

											<div class="flex items-center space-x-2 ">
												<RadioGroup.Item value="comfortable" id="option-two" />
											</div>

										</div>

									</Card.Root>
								</RadioGroup.Root>
								<!-- 取个名字 -->
								<div>

									<label class="text-sm font-semibold">取个名字</label>
									<div class="flex justify-between pr-3 mt-2">
										<Cloud class="border-2 h-10 w-10 rounded-md" />

										<Input id="name" placeholder="知识库名称" class="w-[277px]" />

									</div>
								</div>
								<!-- 取个名字 over -->
								<div class="flex items-center  space-y-1.5 pr-3">
									<Label for="framework" class="text-sm font-bold mr-4 w-[100px]">索引模型</Label>
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
								<div class="flex items-center  space-y-1.5 pr-3 ">
									<Label for="framework" class="text-sm font-bold mr-4 w-[100px]">文件处理模型</Label>
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
									<Button builders={[builder]} type="submit" class=" mt-6  mx-16 w-64">确认创建</Button>
								</Sheet.Close>
							</Sheet.Footer>
							<!-- button over -->
						</Sheet.Content>
					</Sheet.Root>

				</header>
				<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
					{#each items as item, i (i)}
						<div>
							<Card.Root class="w-74 hover:bg-gray-50">

								<Card.Header class="flex justify-between">
									<div on:click={jumpDataList}>
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
								<div on:click={jumpDataList}>
									<Card.Content class="flex justify-between">
										<p class="text-sm">{item.datatitle}</p>
										<p class="text-xs">{currentDateString}</p>
									</Card.Content>
									<Card.Footer class="flex justify-end">
										<div
											class="inline-block rounded-lg bg-gray-100 border border-slate-300 px-4 py-1 text-center text-xs text-slate-400 dark:bg-gray-800 w-24 mt-3">
											<p>{item.directory}</p>
										</div>
									</Card.Footer>
								</div>
							</Card.Root>
						</div>
					{/each}
				</div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</div>
</div>
