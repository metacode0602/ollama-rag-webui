<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$lib/utils';
	import * as Card from '$lib/components/ui/card/index.js';
	import { onMount } from 'svelte';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows
	} from 'svelte-headless-table/plugins';
	import { readable } from 'svelte/store';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './data-table-actions.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { FileIcon, Trash2 } from 'lucide-svelte';
	import FileText from 'lucide-svelte/icons/file-text';
	import PlusCircled from 'svelte-radix/PlusCircled.svelte';

	type Payment = {
		id: string;
		amount: number;
		status: '已就绪' | '进行中' | '出错了';
		updataTime: Date;
		name: string;
		num: number;
	};
	let knowledgeId = $page.params.id;

	// 获取当前日期
	const currentDate = new Date();
	// 获取年份
	const year = currentDate.getFullYear();
	// 获取月份（注意：月份是从0开始的，所以需要+1）
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	// 获取日期
	const day = String(currentDate.getDate()).padStart(2, '0');
	// 将年月日拼接成字符串
	const updataTime = `${year}-${month}-${day}`;

	const data: Payment[] = [
		{
			num: 1,
			id: 'm5gr84i9',
			amount: 316,
			status: '已就绪',
			name: '手动录入',
			updataTime
		},
		{
			num: 2,
			id: 'm5gr84i9',
			amount: 316,
			status: '已就绪',
			name: '通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.',
			updataTime
		},
		{
			num: 3,
			id: 'm5gr84i9',
			amount: 316,
			status: '出错了',
			name: '通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.',
			updataTime
		},
		{
			num: 4,
			id: 'm5gr84i9',
			amount: 316,
			status: '进行中',
			name: '通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.',
			updataTime
		},
		{
			num: 5,
			id: 'm5gr84i9',
			amount: 316,
			status: '进行中',
			name: '通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.',
			updataTime
		},
		{
			num: 6,
			id: 'm5gr84i9',
			amount: 316,
			status: '进行中',
			name: '通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.',
			updataTime
		}
		// ...
	];
	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows()
	});
	//export type Contact = (typeof contacts)[number];

	const columns = table.createColumns([
		table.column({
			accessor: 'num',
			header: '#'
		}),
		table.column({
			accessor: 'name',
			header: '名称'
		}),
		table.column({
			accessor: 'amount',
			header: '数据总量',
			cell: ({ value }) => {
				const formatted = new Intl.NumberFormat({
					style: 'currency',
					currency: 'USD'
				}).format(value);
				return formatted;
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'updataTime',
			header: '最后更新时间'
		}),
		table.column({
			accessor: 'status',
			header: '状态',
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
			},
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
		table.createViewModel(columns);

	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { selectedDataIds } = pluginStates.select;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	// 因为webstorm编译器中代码报错无法提交先注释
	// const hidableCols = ['num', 'status', 'email', 'amount'];
	//------------------------------datatable-- over-----------------------

	// 因为webstorm编译器中代码报错无法提交先注释
	// export let accounts: Account[];
	// export let mails: Mail[];
	// export let defaultLayout = [100, 900];
	export let defaultCollapsed = false;
	let isCollapsed = defaultCollapsed;
	// 进度条
	let value = 13;
	onMount(() => {
		const timer = setTimeout(() => (value = 66), 500);
		return () => clearTimeout(timer);
	});
</script>

<div class="col-span-3 lg:col-span-4 lg:border-l">
	<div class="h-full px-4 py-6 lg:px-8">
		<div>
			<div class="flex items-center justify-between">
				<div class="mr-4 flex">
					<div class="font-base flex w-16 pl-2">
						<p>文件(4)</p>
					</div>
				</div>

				<div class="flex py-2">
					<Input
						class="mr-4 w-48"
						placeholder="搜索数据..."
						type="text"
						bind:value={$filterValue}
					/>
					<Button href="/knowledge/{knowledgeId}/create">
						<PlusCircled class="mr-2 h-4 w-4" />
						新建/导入
					</Button>
					<!-------------------------------- Dropdown Menu------------------------------- -->

					<!-- <DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} variant="outline">+新建/导入</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class="w-56">

								<DropdownMenu.Group>
										<DropdownMenu.Item>
											<Users class="mr-2 h-4 w-4" />
											本地文件
										</DropdownMenu.Item>
								<DropdownMenu.Item>
									<Plus class="mr-2 h-4 w-4" />
									<span>网页链接</span>
									<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
								</DropdownMenu.Item>

								<DropdownMenu.Item>
									<Plus class="mr-2 h-4 w-4" />
									<span>自定义文本</span>
									<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
									</DropdownMenu.Item>
								</DropdownMenu.Group>


							</DropdownMenu.Content>
							</DropdownMenu.Root> -->
				</div>
			</div>
			<!--------------=============-- Dropdown Menu over---------------------------- -->

			<div class="rounded-md border">
				<Table.Root {...$tableAttrs}>
					<Table.Header>
						{#each $headerRows as headerRow}
							<Subscribe rowAttrs={headerRow.attrs()}>
								<Table.Row>
									{#each headerRow.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
											<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
												{#if cell.id === 'amount'}
													<div class="w-24 text-center">
														<Render of={cell.render()} />
													</div>
												{:else if cell.id === 'name'}
													<Button variant="ghost" on:click={props.sort.toggle}>
														<Render of={cell.render()} />
														<ArrowUpDown class={'ml-2 h-4 w-4'} />
													</Button>
												{:else if cell.id === 'updateTime'}
													<div class=" w-64 text-xs">
														<Render of={cell.render()} />
													</div>
												{:else}
													<Render of={cell.render()} />
												{/if}
											</Table.Head>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					</Table.Header>
					<Table.Body {...$tableBodyAttrs}>
						{#each $pageRows as row (row.id)}
							<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
								<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
									{#each row.cells as cell (cell.id)}
										<Subscribe attrs={cell.attrs()} let:attrs>
											<Table.Cell {...attrs}>
												<!-- 如果单元格id为"amount"，则渲染一个右对齐且字体加粗的内容 -->
												{#if cell.id === 'amount'}
													<div class="text-center font-medium">
														<Render of={cell.render()} />
													</div>
													<!-- 如果单元格id为"status"，则渲染一个首字母大写的状态内容 -->
												{:else if cell.id === 'status'}
													<div class="w-10 text-xs capitalize">
														<div class="h-6 w-12 rounded-md border-2 text-center">
															<!-- <Card.Root class="w-16 h-6 text-center rounded-md "> -->
															<Render of={cell.render()} />
														</div>
													</div>
												{:else if cell.id === 'updateTime'}
													<div class="w-48 text-xs capitalize">
														<Render of={cell.render()} />
													</div>
												{:else}
													<Render of={cell.render()} />
												{/if}
											</Table.Cell>
										</Subscribe>
									{/each}
								</Table.Row>
							</Subscribe>
						{/each}
					</Table.Body>
				</Table.Root>
			</div>
			<div class="flex items-center justify-end space-x-4 py-4">
				<div class="ml-2 flex-1 text-sm text-muted-foreground">
					{$rows.length} row(s)
				</div>

				<Button
					variant="outline"
					size="sm"
					on:click={() => ($pageIndex = $pageIndex - 1)}
					disabled={!$hasPreviousPage}
					>Previous
				</Button>
				<Button
					class="mr-2"
					variant="outline"
					size="sm"
					disabled={!$hasNextPage}
					on:click={() => ($pageIndex = $pageIndex + 1)}
					>Next
				</Button>
			</div>
		</div>
	</div>
</div>
