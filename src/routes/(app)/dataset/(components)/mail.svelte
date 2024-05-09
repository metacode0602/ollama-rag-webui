<script lang="ts">
	import Search from "lucide-svelte/icons/search";
	import { mailStore } from "../store.js";
	import { invoices, type Account, type Mail, intents} from "../data.js";
	import AccountSwitcher from "./account-switcher.svelte";
	import MailDisplay from "./mail-display.svelte";
	import MailList from "./mail-list.svelte";
	import Nav from "./nav.svelte";
	import { cn } from "$lib/utils";
	import { Input } from "$lib/components/ui/input";
	import * as Resizable from "$lib/components/ui/resizable";
	import { Separator } from "$lib/components/ui/select";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import CardFooter from "$lib/components/ui/card/card-footer.svelte";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { primaryRoutes, secondaryRoutes, thirdRoutes, turnRoutes } from "../config.js";
	import { Progress } from "$lib/components/ui/progress";
	import { onMount } from "svelte";
	import { chatId } from "$lib/stores/index.js";

	
	

	export let accounts: Account[];
	export let mails: Mail[];
	export let defaultLayout = [265, 440, 655];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;

	
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
<!-- 当屏幕大小小于md时，此div是隐藏的；当屏幕大小达到或超过md时，此div是显示的 -->  
<div class="hidden md:block"  style="width:100%">
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
			minSize={19.4}
			maxSize={19.4}
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
				<div class="inline-block rounded-lg bg-gray-100 border border-slate-300 px-4 py-1 text-center text-xs text-slate-400 dark:bg-gray-800 w-[160px] mt-3">
					<p>通用知识库</p>
				  </div>
			</div>
			<Separator />
			<!-- 数据集导航栏 -->
			
			<Nav {isCollapsed} routes={primaryRoutes}/>
				
			
				
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
		<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30} >
			<Tabs.Root value="all">
				<div class="flex items-center justify-between px-4 py-2">
					<!-- 下拉框 -->
					<div><AccountSwitcher {isCollapsed} {accounts} /> </div>

					<!-- 按钮 -->
					<Button variant="outline">语言检索</Button>
					<!-- <Tabs.List class="ml-auto">
						<Tabs.Trigger value="all" class="text-zinc-600 dark:text-zinc-200">
							All mail
						</Tabs.Trigger>
						<Tabs.Trigger value="unread" class="text-zinc-600 dark:text-zinc-200">
							Unread
						</Tabs.Trigger>
					</Tabs.List> -->
				</div>
				<Separator />
				<div class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"w>
				<!-- 文本框 -->
					<form>
						<div class="relative">
							<!-- <Search class="absolute left-2 top-3 h-4 w-4 text-muted-foreground" /> -->
							<!-- <Input placeholder="Search" class="pl-8" /> -->
							<Textarea placeholder="多语言支持." style="height: 200px"/>
                            <div style="margin-top: 20px;display: flex;justify-content: flex-end;">
    					        <Button>测试</Button>
                            </div>
						</div>
					</form>
				</div>
				<!-- 表格 -->
				<Table.Root>
					<!-- <Table.Caption>A list of your recent invoices.</Table.Caption> -->
					<Table.Header>
					  <Table.Row>
						<Table.Head class="w-[100px] font-bold text-base text-black">测试历史</Table.Head>
						<!-- <Table.Head>Status</Table.Head>
						<Table.Head>Method</Table.Head>
						<Table.Head class="text-right">Amount</Table.Head> -->
					  </Table.Row>
					</Table.Header>
					<Table.Body>
						{#each invoices as invoice, i (i)}
						<Table.Row>
						  <Table.Cell class="font-medium">{invoice.invoice}</Table.Cell>
						  <Table.Cell>{invoice.paymentStatus}</Table.Cell>
						  <!-- <Table.Cell>{invoice.paymentMethod}</Table.Cell> -->
						  <Table.Cell class="text-right">{invoice.currentDateString}</Table.Cell>
						</Table.Row>
					  {/each}
					</Table.Body>
				  </Table.Root>
				<!-- <Tabs.Content value="all" class="m-0">
					<MailList items={mails} />
				</Tabs.Content>
				<Tabs.Content value="unread" class="m-0">
					<MailList items={mails.filter((item) => !item.read)} />
				</Tabs.Content> -->
			</Tabs.Root>
		
		</Resizable.Pane>
	
		<!-- 这是一个可调整大小的句柄（Handle）组件，它通常用于拖拽以改变其父级元素（Resizable.Pane）的大小。  
			withHandle属性是一个标志，用于确定是否显示该句柄。   -->
		<Resizable.Handle withHandle />
		<!-- 这是一个可调整大小的面板组件。defaultSize属性指定了面板的默认大小，其值来自defaultLayout数组的第三个元素（因为数组索引从0开始） -->
		<Resizable.Pane defaultSize={defaultLayout[2]} class="max-h-screen">
			<!-- 这是一个邮件显示组件。它接收一个mail属性，该属性的值是通过在mails数组中查找id与$mailStore.selected相匹配的项来确定的。  
    如果找到了匹配的项，就将其赋值给mail属性；否则，将null赋值给mail属性。  
    $mailStore.selected可能是一个状态或变量，用于存储当前选中的邮件的id。   -->
			<!-- <MailDisplay mail={mails.find((item) => item.id === $mailStore.selected) || null} /> -->

				<!-- 表格 -->
				<div>
					<Table.Root>
						<!-- <Table.Caption>A list of your recent invoices.</Table.Caption> -->
						<Table.Header>
					<!--  标题样式-->
							<div
					class={cn(
					"flex h-[52px] items-center justify-center",
					isCollapsed ? "h-[52px]" : "px-2"
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
							<Table.Head class="w-[100px] text-sm font-bold text-black text-right">问题优化</Table.Head>
						  </Table.Row>
						</Table.Header>
						<Table.Body>
							{#each intents as intent, i (i)}
							<Table.Row>
							  <Table.Cell class="font-medium">{intent.invoice}</Table.Cell>
							  <Table.Cell>{intent.paymentStatus}</Table.Cell>
							  <Table.Cell>{intent.totalAmount}</Table.Cell>
							  <Table.Cell>{intent.resultStatus}</Table.Cell>
							  <Table.Cell>{intent.questionPlus}</Table.Cell>
							</Table.Row>
						  {/each}
						</Table.Body>
					  </Table.Root>
				</div>
			
				<!-- 测试结果card -->
				<div class="p-6">
					<div class="flex items-center justify-between">
					  <h2 class="text-base font-bold text-gray-900 dark:text-gray-100">测试结果</h2>
					</div>
				<div class="mt-4 grid grid-cols-1 gap-4">
					<Card.Root style="border: none;background: #F0F2F5">
					  <Card.Header class="flex justify-between">
						<!-- 语义检索标签 -->
						<div class="inline-block rounded-lg bg-gray-100 border border-neutral-900 px-3 py-1 text-xs dark:bg-gray-800 max-w-36">
							<p>#1 | 语义检索0.8675</p>
						  </div>
					  </Card.Header>
					  <Card.Content>
						<div class="text-gray-600 dark:text-gray-400 text-xs">
						  #2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br>
						  #2 eggs, 2 slices of w, 1 banana, 1 cup of coffee<br>
						  #2 eggs, 2 slices of whotoast, 1 banana, 1 cup of coffee<br>
						  #2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee
						</div>
						<CardFooter class="py-3" style="padding-left: 0">
                            <!-- 知乎链接 -->
                            <a href="www.baidu.com" class="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">知乎-www.baidu.com</a>
						</CardFooter>
					  </Card.Content>
					</Card.Root>
					<Card.Root style="border: none;background: #F0F2F5">
						<Card.Header class="flex justify-between">
							<!-- 语义检索标签 -->
							<div class="inline-block rounded-lg bg-gray-100 border border-neutral-900 px-3 py-1 text-xs dark:bg-gray-800 max-w-36">
								<p>#1 | 语义检索0.8675</p>
							  </div>
						  </Card.Header>
					  <Card.Content>
						<div class="text-gray-600 dark:text-gray-400 text-xs">
							#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br>
							#2 eggs, 2 slices of wheat toast, 1 banana, 1 cup of coffee<br>
							#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br>
							#2 eggs,ast, 1 banana, 1 cup of coffee
						</div>
						<CardFooter class="py-3" style="padding-left: 0">
							<!-- 知乎链接 -->
							<a href="www.baidu.com" class="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">知乎-www.baidu.com</a>
							</CardFooter>
					  </Card.Content>
					</Card.Root>
					<Card.Root style="border: none;background: #F0F2F5">
						<Card.Header class="flex justify-between">
							<!-- 语义检索标签 -->
							<div class="inline-block rounded-lg bg-gray-100 border border-neutral-900 px-3 py-1 text-xs dark:bg-gray-800 max-w-36">
								<p>#1 | 语义检索0.8675</p>
							  </div>
						  </Card.Header>
					  <Card.Content>
						<div class="text-gray-600 dark:text-gray-400 text-xs">
							#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br>
							#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br>
							#2 eggs, 2 slices of whole wheat toast<br>
							#2 eggs,1 banana, 1 cup of coffee
						</div>
						<CardFooter class="py-3" style="padding-left: 0">
							<!-- 知乎链接 -->
							<a href="www.baidu.com" class="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500">知乎-www.baidu.com</a>
							</CardFooter>
					  </Card.Content>
					</Card.Root>
				  </div>
				</div>
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
</div>