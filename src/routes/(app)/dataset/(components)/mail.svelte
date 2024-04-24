<script lang="ts">
	import Search from "lucide-svelte/icons/search";
	import { primaryRoutes, secondaryRoutes } from "../config.js";
	import { mailStore } from "../store.js";
	import type { Account, Mail } from "../data.js";
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

	export let accounts: Account[];
	export let mails: Mail[];
	export let defaultLayout = [265, 440, 655];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;

	let isCollapsed = defaultCollapsed;

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
<div class="hidden md:block">
	<Resizable.PaneGroup
		direction="horizontal"
		{onLayoutChange}
		class="h-full max-h-[800px] items-stretch"
	>
		<Resizable.Pane
			defaultSize={defaultLayout[0]}
			collapsedSize={navCollapsedSize}
			collapsible
			minSize={15}
			maxSize={20}
			{onCollapse}
			{onExpand}
		>
			<div
				class={cn(
					"flex h-[52px] items-center justify-center",
					isCollapsed ? "h-[52px]" : "px-2"
				)}
			>
					<!-- 标题 -->
				<h1 class="text-xl font-bold">MarktingGPT</h1>
				
			</div>
			<Separator />
			<Nav {isCollapsed} routes={primaryRoutes} />
			<Separator />
			<Nav {isCollapsed} routes={secondaryRoutes} />
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={defaultLayout[1]} minSize={30}>
			<Tabs.Root value="all">
				<div class="flex items-center px-4 py-2">
					<!-- 下拉框 -->
					<AccountSwitcher {isCollapsed} {accounts} />
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
				<div
					class="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60"
				>
				<!-- 文本框 -->
					<form>
						<div class="relative">
							<!-- <Search class="absolute left-2 top-3 h-4 w-4 text-muted-foreground" /> -->
							<!-- <Input placeholder="Search" class="pl-8" /> -->
							<Textarea placeholder="多语言支持." />
						</div>
					</form>
				</div>
				<!-- 表格 -->
				<Table.Root>
					<Table.Caption>A list of your recent invoices.</Table.Caption>
					<Table.Header>
					  <Table.Row>
						<Table.Head class="w-[100px]">测试历史</Table.Head>
						<Table.Head>Status</Table.Head>
						<Table.Head>Method</Table.Head>
						<Table.Head class="text-right">Amount</Table.Head>
					  </Table.Row>
					</Table.Header>
					<Table.Body>
					  <Table.Row>
						<Table.Cell class="font-medium">INV001</Table.Cell>
						<Table.Cell>Paid</Table.Cell>
						<Table.Cell>Credit Card</Table.Cell>
						<Table.Cell class="text-right">$250.00</Table.Cell>
					  </Table.Row>
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
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={defaultLayout[2]}>
			<MailDisplay mail={mails.find((item) => item.id === $mailStore.selected) || null} />
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
