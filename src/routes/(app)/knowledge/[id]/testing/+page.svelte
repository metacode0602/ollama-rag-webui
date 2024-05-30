<script lang="ts">
	import { invoices, type Account, type Mail, intents, accounts } from '../data.js';
	import AccountSwitcher from './account-switcher.svelte';
	import { cn } from '$lib/utils';
	import * as Resizable from '$lib/components/ui/resizable';
	import { Separator } from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import { onMount } from 'svelte';
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import Result from "./result.svelte";
	// export let accounts: Account[];
	// export let mails: Mail[];
	export let defaultLayout = [265, 440, 655];
	export let defaultCollapsed = false;
	// export let navCollapsedSize: number;

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
		<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="h-full items-stretch">
			<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
				<Tabs.Root value="all">
					<div class="flex items-center justify-between px-4 py-2">
						<!-- 下拉框 -->
						<div><AccountSwitcher {isCollapsed} {accounts} /></div>
						<!-- 按钮 -->
						<Button variant="outline">语言检索</Button>
					</div>
					<Separator />
					<div
						class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
					>
						<!-- 文本框 -->
						<form>
							<div class="relative">
								<!-- <Search class="absolute left-2 top-3 h-4 w-4 text-muted-foreground" /> -->
								<!-- <Input placeholder="Search" class="pl-8" /> -->
								<Textarea placeholder="多语言支持." style="height: 200px" />
								<div style="margin-top: 20px;display: flex;justify-content: flex-end;">
									<Button>测试</Button>
								</div>
							</div>
						</form>
					</div>
					<!-- 表格 -->
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head class="w-[100px] text-base font-bold text-black">测试历史</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each invoices as invoice, i (i)}
								<Table.Row>
									<Table.Cell class="font-medium">{invoice.icon}</Table.Cell>
									<Table.Cell>{invoice.paymentStatus}</Table.Cell>
									<!-- <Table.Cell>{invoice.paymentMethod}</Table.Cell> -->
									<Table.Cell class="text-right">{invoice.currentDateString}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</Tabs.Root>
			</Resizable.Pane>
			<Resizable.Handle withHandle />

			<!-- 这是一个可调整大小的面板组件。defaultSize属性指定了面板的默认大小，其值来自defaultLayout数组的第三个元素（因为数组索引从0开始） -->
			<Resizable.Pane defaultSize={defaultLayout[2]}>
				<!-- 表格 -->
				<Table.Root>
					<Table.Header>
						<!--  标题样式-->
						<div
							class={cn(
								'flex h-[52px] items-center justify-center',
								isCollapsed ? 'h-[52px]' : 'px-2'
							)}
						>
							<!-- 标题 -->
							<h1 class="text-base font-bold">测试参数</h1>
						</div>

						<Table.Row>
							<Table.Head class="w-[100px] text-sm font-bold text-black">搜索模式</Table.Head>
							<Table.Head class="w-[100px] text-sm font-bold text-black">引用上线</Table.Head>
							<Table.Head class="w-[110px] text-sm font-bold text-black">最低相关度</Table.Head>
							<Table.Head class="w-[100px] text-sm font-bold text-black">结果重排</Table.Head>
							<Table.Head class="w-[100px] text-right text-sm font-bold text-black"
								>问题优化</Table.Head
							>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each intents as intent, i (i)}
							<Table.Row>
								<!-- <Table.Cell class="font-medium">{intent.icon}</Table.Cell> -->
								<Table.Cell>{intent.paymentStatus}</Table.Cell>
								<Table.Cell>{intent.totalAmount}</Table.Cell>
								<Table.Cell>{intent.resultStatus}</Table.Cell>
								<Table.Cell>{intent.questionPlus}</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
				<Result />
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</div>
</div>
