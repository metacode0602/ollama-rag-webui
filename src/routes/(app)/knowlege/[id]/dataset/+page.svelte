<script lang="ts">
	import { cn } from '$lib/utils';
	// import { Input } from "$lib/components/ui/input";
	import * as Resizable from '$lib/components/ui/resizable';
	import { Separator } from '$lib/components/ui/select';
	// import { Textarea } from '$lib/components/ui/textarea/index.js';
	// import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	// import { primaryRoutes, secondaryRoutes, thirdRoutes, turnRoutes } from '../config.js';
	import { Progress } from '$lib/components/ui/progress';
	import { onMount } from 'svelte';
	// import * as Select from '$lib/components/ui/select/index.js';
	// import { Label } from '$lib/components/ui/label/index.js';
	//  ----------------------------datatable--start------------------------
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
	// import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import * as Table from '$lib/components/ui/table';
	import DataTableActions from './data-table-actions.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { FileIcon, Trash2 } from 'lucide-svelte';
	import FileText from 'lucide-svelte/icons/file-text';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';

	type Payment = {
		id: string;
		amount: number;
		status: '已就绪' | '进行中' | '出错了';
		updataTime: Date;
		name: string;
		num: number;
	};
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
	export let defaultLayout = [100, 900];
	export let defaultCollapsed = false;

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

<!------------------ datatabel ---------------------------->
<Resizable.Pane defaultSize={defaultLayout[0]} minSize={30} maxSize={50}>
	<div>
		<div class="flex items-center justify-between">
			<div class="mr-4 flex">
				<div class="font-base flex w-16 pl-2">
					<p>文件(4)</p>
				</div>
			</div>

			<div class="flex py-2">
				<Input class="mr-4 w-48" placeholder="搜索数据..." type="text" bind:value={$filterValue} />

				<Drawer.Root>
					<Drawer.Trigger asChild let:builder>
						<Button builders={[builder]} variant="outline">+新建/导入</Button>
					</Drawer.Trigger>
					<Drawer.Content>
						<Drawer.Header class="flex justify-between ">
							<!-- -------------------------------------------------------- -->
							<div
								class="flex h-auto h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900"
							>
								<div class="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
									<div class="mb-6">
										<div class="h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
									</div>
									<form
										action="http://172.30.1.130:8080/datatasks"
										method="POST"
										enctype="multipart/form-data"
										class="dropzone-box"
									>
										<!-- 创建一个表单，用于文件上传 -->
										<div class="dropzone-area">
											<!-- 文件上传区域 -->

											<Input
												type="file"
												id="upload-file "
												class="mb-6 flex h-52 flex-col  items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
											>
												<div class="file-upload-icon">
													<!-- <CirclePlus class="mr-2 h-4 w-4" /> -->
													<p class=" file-info mb-4 text-gray-500 dark:text-gray-400">
														支持分类标签xlsx,html,pptx类型文件最多支持15个，单个文件最大100MB
													</p>
												</div>
											</Input>
										</div>
									</form>
									<Table.Root>
										<Table.Caption>A list of your recent invoices.</Table.Caption>
										<Table.Header>
											<Table.Row></Table.Row>
										</Table.Header>
										<Table.Body>
											{#each tabs as tab, i (i)}
												<Table.Row class="">
													<Table.Cell class="text-left">
														<FileText />
													</Table.Cell>
													<Table.Cell class="mb-4 mr-1  w-28 text-xs font-medium dark:text-gray-200"
														>{tab.name}</Table.Cell
													>
													<Table.Cell class="w-28">{tab.status}</Table.Cell>
													<Table.Cell class="text-right">
														<Button variant="ghost">
															<Trash2 class="mr-2 h-4 w-4" />
														</Button>
													</Table.Cell>
												</Table.Row>
											{/each}
										</Table.Body>
									</Table.Root>

									<!-- ----------------------- -->
									<div class="flex justify-end" style="margin-top: 20px">
										<!-- <Button class="w-32 text-xs">共1个文件|下一步</Button> -->
										<Drawer.Root>
											<Drawer.Trigger asChild let:builder>
												<Button builders={[builder]} type="submit">共1个文件|下一步</Button>
											</Drawer.Trigger>
											<Drawer.Content>
												<Drawer.Header class="flex justify-between ">
													<!-- ---------------------------------------------- -->
													<div
														class="flex h-auto h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900"
													>
														<div
															class="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
														>
															<div class="flex">
																<Card.Root class="mr-3 w-[450px]">
																	<Card.Header>
																		<Card.Title>数据处理参数</Card.Title>
																	</Card.Header>
																	<div class="mb-2 ml-4 w-32">
																		<p class="text-sm font-semibold">训练模式</p>
																	</div>
																	<Card.Content class="flex">
																		<RadioGroup.Root value="comfortable" class="mb-6 flex">
																			<Card.Root
																				class="mr-2  flex h-10 w-32  items-center justify-between"
																			>
																				<div class="flex items-center justify-between gap-x-4 p-1">
																					<div>
																						<p class="text-xs font-semibold">直接分段</p>
																					</div>
																					<div class="flex items-center space-x-2">
																						<RadioGroup.Item value="default" id="option-one" />
																					</div>
																				</div>
																			</Card.Root>
																			<Card.Root
																				class="mr-2  flex h-10 w-32  items-center justify-between"
																			>
																				<div class="flex items-center justify-between gap-x-4 p-1">
																					<div>
																						<p class="text-xs font-semibold">增强处理实验</p>
																					</div>
																					<div class="flex items-center space-x-2">
																						<RadioGroup.Item value="comfortable" id="option-one" />
																					</div>
																				</div>
																			</Card.Root>

																			<Card.Root
																				class="mr-2  flex h-10 w-32  items-center justify-between"
																			>
																				<div class="flex items-center justify-between gap-x-4 p-1">
																					<div>
																						<p class="text-xs font-semibold">问答拆分</p>
																					</div>
																					<div class="flex items-center space-x-2">
																						<RadioGroup.Item value="any" id="option-one" />
																					</div>
																				</div>
																			</Card.Root>
																		</RadioGroup.Root>
																	</Card.Content>
																	<div style="margin-left: 1rem">
																		<div class="mb-2 mr-1 w-32">
																			<p class="text-sm font-semibold">处理方式</p>
																		</div>
																		<RadioGroup.Root value="comfortable" class="mb-6">
																			<Card.Root
																				class="mr-4  flex h-14 w-80  items-center justify-between"
																			>
																				<div class="flex items-center justify-between gap-x-4 p-3">
																					<div class="flex items-center space-x-2">
																						<RadioGroup.Item value="default" id="option-one" />
																					</div>
																					<div>
																						<p class="text-xs font-semibold">自动</p>
																						<p class="text-xs">自动设置分割和预处理规则</p>
																					</div>
																				</div>
																			</Card.Root>

																			<!-- <Card.Root class="h-14 flex items-center w-96">
																						<div class="flex items-center justify-between  gap-x-4 p-3">
																							<div class="flex items-center space-x-2 ">
																								<RadioGroup.Item value="comfortable" id="option-two" />
																							</div>
																						<div>
																						<p class="text-xs font-semibold ">自定义规则</p>
																						<p class="text-xs">自动设置分割和预处理规则</p>
																						</div>

																						<Popover.Root portal={null}>
																							<Popover.Trigger asChild let:builder>
																								<Button builders={[builder]} variant="ghost" class="ml-4">

																								配置提示词</Button>
																							</Popover.Trigger>
																							<Popover.Content class="w-80">
																								<div class="grid gap-4 mb-4">
																								<Label for="email-2 font-medium">自定义分隔符</Label>
																								<Input type="icon" id="icon-2" placeholder="输入自定义分隔符" />

																								</div>
																								<div class="grid gap-2">
																									<div class="grid w-full gap-1.5 mb-2">
																										<Label for="message font-medium">QA拆分引导词</Label>
																										<Textarea placeholder="请输入QA拆分引导词." id="message" />
																									</div>

																									<div class="grid w-full gap-1.5 ">
																										<Label for="message font-medium">自定义提示词</Label>
																										<Textarea placeholder="请输入自定义提示词." id="message" />
																									</div>
																									<div>
																										<Button>
																											确定
																										</Button>
																									</div>



																								</div>

																							</Popover.Content>
																							</Popover.Root>


																					</div>


																						</Card.Root> -->
																		</RadioGroup.Root>
																	</div>
																</Card.Root>

																<!-- <Resizable.Handle /> -->
																<div class="overflow-hidden rounded-lg border" style="width: 100%">
																	<Table.Root>
																		<Table.Header>
																			<Table.Row>
																				<Table.Head class="font-semibold">来源列表</Table.Head>
																			</Table.Row>
																		</Table.Header>
																		<Table.Body>
																			<Table.Row>
																				<Table.Cell class="font-medium">
																					<div class="flex items-center gap-3">
																						<FileIcon class="h-5 w-5 text-gray-500" />
																						<span>文件1.pdf</span>
																					</div>
																				</Table.Cell>
																			</Table.Row>
																			<Table.Row>
																				<Table.Cell class="font-medium">
																					<div class="flex items-center gap-3">
																						<FileIcon class="h-5 w-5 text-gray-500" />
																						<span>文件1.pdf</span>
																					</div>
																				</Table.Cell>
																			</Table.Row>
																			<Table.Row>
																				<Table.Cell class="font-medium">
																					<div class="flex items-center gap-3">
																						<FileIcon class="h-5 w-5 text-gray-500" />
																						<span>文件1.pdf</span>
																					</div>
																				</Table.Cell>
																			</Table.Row>
																		</Table.Body>
																	</Table.Root>
																</div>
															</div>
															<!-- ---------------------------------------------- -->
															<div
																style="display: flex;align-items: center;justify-content: flex-end;margin-top: 20px"
															>
																<Drawer.Close>
																	<Button variant="outline">上一步</Button>
																</Drawer.Close>
																<Drawer.Root>
																	<Drawer.Trigger asChild let:builder>
																		<Button
																			builders={[builder]}
																			class="w-32 text-xs"
																			style="margin-left: 20px">下一步</Button
																		>
																	</Drawer.Trigger>
																	<Drawer.Content>
																		<Drawer.Header class="flex justify-between ">
																			<!-- -------------------------------------------------------- -->
																			<div
																				class="flex h-auto h-screen w-full flex-col items-center justify-center bg-gray-100 dark:bg-gray-900"
																			>
																				<div
																					class="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
																				>
																					<Table.Root>
																						<Table.Header>
																							<Table.Row>
																								<Table.Head class="w-[400px]">来源名</Table.Head>
																								<Table.Head>状态</Table.Head>
																							</Table.Row>
																						</Table.Header>
																						<Table.Body>
																							{#each tables as table, i (i)}
																								<Table.Row>
																									<Table.Cell class="font-medium"
																										>{table.invoice}</Table.Cell
																									>
																									<Table.Cell>{table.paymentStatus}</Table.Cell>
																								</Table.Row>
																							{/each}
																						</Table.Body>
																					</Table.Root>
																					<div
																						class="mb-4 flex justify-end"
																						style="margin-top: 20px"
																					>
																						<Drawer.Close class="mb-2">
																							<Button variant="outline">上一步</Button>
																						</Drawer.Close>
																						<Button class="w-32 text-xs" style="margin-left: 20px"
																							>共3个文件|下一步</Button
																						>
																					</div>
																				</div>
																			</div>
																		</Drawer.Header>
																	</Drawer.Content>
																</Drawer.Root>
															</div>
														</div>
													</div>
												</Drawer.Header>
											</Drawer.Content>
										</Drawer.Root>
										<Drawer.Close class="mb-2" style="margin-left: 20px">
											<Button variant="outline">退出</Button>
										</Drawer.Close>
									</div>
									<!-- over -->
								</div>
							</div>

							<!-- --------------------------------------------------------- -->
						</Drawer.Header>
					</Drawer.Content>
				</Drawer.Root>
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
</Resizable.Pane>
