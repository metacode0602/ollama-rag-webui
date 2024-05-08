<script lang="ts">
	import { invoices, type Account, type Mail, intents, tables, tabs} from "../data.js";
	import Nav from "./nav.svelte";
	import { cn } from "$lib/utils";
	// import { Input } from "$lib/components/ui/input";
	import * as Resizable from "$lib/components/ui/resizable";
	import { Separator } from "$lib/components/ui/select";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	// import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { primaryRoutes, secondaryRoutes, thirdRoutes, turnRoutes } from "../config.js"
	import { Progress } from "$lib/components/ui/progress";
	import { onMount } from "svelte";
	import * as Select from "$lib/components/ui/select/index.js";
  	import { Label } from "$lib/components/ui/label/index.js";
//  ----------------------------datatable--start------------------------
	import { createTable, Render, Subscribe,createRender, } from "svelte-headless-table";
	import { addPagination, addSortBy,addTableFilter,addHiddenColumns,addSelectedRows, } from "svelte-headless-table/plugins";
  	import { readable } from "svelte/store";
	import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
	import ChevronDown from "lucide-svelte/icons/chevron-down";
	import * as Table from "$lib/components/ui/table";
	import DataTableActions from "./data-table-actions.svelte";
	import { Button,buttonVariants } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import DataTableCheckbox from "./data-table-checkbox.svelte";
	import MessageSquare from "lucide-svelte/icons/message-square";
	import CirclePlus from "lucide-svelte/icons/circle-plus";
	import Cloud from "lucide-svelte/icons/cloud";
  	import CreditCard from "lucide-svelte/icons/credit-card";
  	import Github from "lucide-svelte/icons/github";
  	import Keyboard from "lucide-svelte/icons/keyboard";
  	import LifeBuoy from "lucide-svelte/icons/life-buoy";
  	import Settings from "lucide-svelte/icons/settings";
  	import User from "lucide-svelte/icons/user";
  	import UserPlus from "lucide-svelte/icons/user-plus";
  	import Users from "lucide-svelte/icons/users";
  	import Minus from "lucide-svelte/icons/minus";
  	import Plus from "lucide-svelte/icons/plus";
  	import * as RadioGroup from "$lib/components/ui/radio-group";
  	import * as Dialog from "$lib/components/ui/dialog";
  	import * as Popover from "$lib/components/ui/popover/index.js";
  	import * as Drawer from "$lib/components/ui/drawer/index.js";
	import { FileIcon, Trash2 } from "lucide-svelte";
	import { onDestroy } from 'svelte';
  	import axios from 'axios';
	




type Payment = {
    id: string;
    amount: number;
    status: "已就绪" | "进行中" | "出错了" ;
	updataTime:Date;
    email: string;
	num:number;
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
		  num:1,
		  id: "m5gr84i9",
		  amount: 316,
		  status: "已就绪",
		  email: "手动录入",
		  updataTime
		},
		{
		  num:2,
		  id: "m5gr84i9",
		  amount: 316,
		  status: "已就绪",
		  email: "通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.",
		  updataTime
		},
		{
		  num:3,
		  id: "m5gr84i9",
		  amount: 316,
		  status: "出错了",
		  email: "通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.",
		  updataTime
		},
		{
		  num:4,
		  id: "m5gr84i9",
		  amount: 316,
		  status: "进行中",
		  email: "通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.",
		  updataTime
		},
		{
		  num:5,
		  id: "m5gr84i9",
		  amount: 316,
		  status: "进行中",
		  email: "通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.",
		  updataTime
		},
		{
		  num:6,
		  id: "m5gr84i9",
		  amount: 316,
		  status: "进行中",
		  email: "通过lasmalndex 释放代理和quuerpieline的力量(含代表 Sider.Al包含创造性工具.",
		  updataTime
		},
		// ...
	  ];
  const table = createTable(readable(data), {
    page: addPagination(),
	sort: addSortBy(),
	filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
	hide: addHiddenColumns(),
	select: addSelectedRows(),
  });
//export type Contact = (typeof contacts)[number];

	
  const columns = table.createColumns([

	table.column({
      accessor: "num",
      header: "#",
    }),
	table.column({
      accessor: "email",
      header: "名称",
    }),
    table.column({
      accessor: "amount",
      header: "数据总量",
	  cell: ({ value }) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value);
      return formatted;
    },
	plugins: {
        sort: {
          disable: true,
        },
		filter: {
          exclude: true,
        },
      },
  }),
  table.column({
      accessor: "updataTime",
      header: "最后更新时间",
    }),
  table.column({
      accessor: "status",
      header: "状态",
	  plugins: {
        sort: {
          disable: true,
        },
		filter: {
          exclude: true,
        },
      },
    }),
    table.column({
      accessor: ({ id }) => id,
      header: "",
	  cell: ({ value }) => {
        return createRender(DataTableActions, { id: value });
      },
	  plugins: {
        sort: {
          disable: true,
        },
		filter: {
          exclude: true,
        },
      },
    }),
  ]);

  	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates,flatColumns,rows, } =
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

	const hidableCols = ["num","status", "email", "amount"];
//------------------------------datatable-- over-----------------------

	export let accounts: Account[];
	export let mails: Mail[];
	export let defaultLayout = [100, 900];
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
				<div class="inline-block rounded-lg bg-gray-100 border border-slate-300 px-4 py-1 text-center text-xs text-slate-400 dark:bg-gray-800 w-[160px] mt-3">
					<p>通用知识库</p>
				  </div>
			</div>
			<Separator />
			<!-- 数据集导航栏 -->
			<Nav {isCollapsed} routes={primaryRoutes} >
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
		
		<!------------------ datatabel ---------------------------->
		<Resizable.Pane defaultSize={defaultLayout[0]} minSize={30} maxSize={50}>

		<div>
			
			<div class="grid justify-items-end py-2">
				
				<div class="flex mr-4">
					<div class="grid justify-items-start py-2 font-base w-16 mr-[500px]">
						<p>文件(4)</p>
					</div>
				<Input
				  class="w-48 mr-4"
				  placeholder="搜索数据..."
				  type="text"
				  bind:value={$filterValue}
				/>
			
			
<script lang="ts">
	import CirclePlus from "lucide-svelte/icons/circle-plus";
	import Cloud from "lucide-svelte/icons/cloud";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import Github from "lucide-svelte/icons/github";
	import Keyboard from "lucide-svelte/icons/keyboard";
	import LifeBuoy from "lucide-svelte/icons/life-buoy";
	import LogOut from "lucide-svelte/icons/log-out";
	import Mail from "lucide-svelte/icons/mail";
	import MessageSquare from "lucide-svelte/icons/message-square";
	import Plus from "lucide-svelte/icons/plus";
	import Settings from "lucide-svelte/icons/settings";
	import User from "lucide-svelte/icons/user";
	import UserPlus from "lucide-svelte/icons/user-plus";
	import Users from "lucide-svelte/icons/users";	   
	import { Button } from "$lib/components/ui/button/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>
<!-- ------------------------------------------------------------------------------- -->
				  
	<Drawer.Root>
		<Drawer.Trigger asChild let:builder>
			<Button builders={[builder]} variant="outline">+新建/导入</Button>
		</Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header class="flex justify-between ">
			<!-- -------------------------------------------------------- -->
				<div class="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 w-full h-auto">
				<div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 ">
					<Drawer.Close  class="mb-2"><Button variant="outline">退出</Button></Drawer.Close>
						<div class="mb-6">
							<div class="h-2 bg-gray-300 rounded-full dark:bg-gray-700">
								</div>
								
							  </div>
						<form action="http://172.30.1.130:8080/datatasks" method="POST" enctype="multipart/form-data" class="dropzone-box "> <!-- 创建一个表单，用于文件上传 -->
								<div class="dropzone-area"> <!-- 文件上传区域 -->
									
							<Input  type= "file" id="upload-file "  class="border-2 border-dashed border-gray-300 rounded-lg  mb-6 h-52 flex flex-col items-center justify-center dark:border-gray-600">
							<div class="file-upload-icon">
									<!-- <CirclePlus class="mr-2 h-4 w-4" /> -->
								<p class=" file-info text-gray-500 mb-4 dark:text-gray-400">支持分类标签xlsx,html,pptx类型文件最多支持15个，单个文件最大100MB</p>
							</div>
								
							</Input>	
							
							</div>
						</form>
						<Table.Root>
							<Table.Caption>A list of your recent invoices.</Table.Caption>
							<Table.Header>
							  <Table.Row>
								
							  </Table.Row>
							</Table.Header>
							<Table.Body>
							  {#each tabs as tab, i (i)}
								<Table.Row>
								  <Table.Cell class="font-medium text-xs  mb-4 mr-8 dark:text-gray-200 w-28">{tab.name}</Table.Cell>
								  <Table.Cell>{tab.status}</Table.Cell>
								  <Table.Cell class="text-right"><Button variant="ghost"><Trash2 class="mr-2 h-4 w-4" /></Button></Table.Cell>
								</Table.Row>
							  {/each}
							</Table.Body>
						  </Table.Root>
							  <!-- <div>
								
								<h2 class="text-lg font-bold mb-4 dark:text-gray-200">文件名</h2>
								<div class="divide-y divide-gray-200 dark:divide-gray-600">
								  <div class="py-4 flex items-center justify-between">
									<div class="flex items-center">
										<Settings class="mr-2 h-4 w-4" />
									  <div>
										<p class="font-medium dark:text-gray-200">example.pdf</p>
										<p class="text-sm text-gray-500 dark:text-gray-400">2.5 MB</p>
									  </div>
									</div>
									
									<div class="flex items-center">
										<div class="flex justify-between items-center mr-2">
											<Progress value={33} class="w-32 h-2 "/>
											<p class="text-xs text-gray-500 mt-2 dark:text-gray-400 ml-1">50%</p>
										</div>
									  <p class="text-sm text-green-500 mr-4 dark:text-green-400">Uploaded</p>
									  <Button size="sm" variant="outline">
										<Trash2 class="mr-2 h-4 w-4" />
									  </Button>
									</div>
								  </div>
								  <div class="py-4 flex items-center justify-between">
									<div class="flex items-center">
										<Settings class="mr-2 h-4 w-4" />
									  <div>
										<p class="font-medium dark:text-gray-200">image.jpg</p>
										<p class="text-sm text-gray-500 dark:text-gray-400">1.2 MB</p>
									  </div>
									</div>
									
									<div class="flex items-center">
										<div class="flex justify-between items-center mr-2">
											<Progress value={33} class="w-32 h-2 "/>
											<p class="text-xs text-gray-500 mt-2 dark:text-gray-400 ml-1">50%</p>
										</div>
									  <p class="text-sm text-yellow-500 mr-4 dark:text-yellow-400">Uploading</p>
									  <Button size="sm" variant="outline">
										<Trash2 class="mr-2 h-4 w-4" />
									  </Button>
									</div>
								  </div>
								  <div class="py-4 flex items-center justify-between">
									<div class="flex items-center">
										<Settings class="mr-2 h-4 w-4" />
									  <div>
										<p class="font-medium dark:text-gray-200">document.docx</p>
										<p class="text-sm text-gray-500 dark:text-gray-400">3.8 MB</p>
									  </div>
									</div>
									
									<div class="flex items-center">
										<div class="flex justify-between items-center mr-10">
											<Progress value={33} class="w-32 h-2 "/>
											<p class="text-xs text-gray-500 mt-2 dark:text-gray-400 ml-1">50%</p>
										</div>
									  <p class="text-sm text-red-500 mr-4 dark:text-red-400">Failed</p>
									  <Button size="sm" variant="outline">
										<Trash2 class="mr-2 h-4 w-4" />
									  </Button>
									</div>
								  </div>
								</div>
							  </div> -->
							  <!-- ----------------------- -->
							  <div class="flex justify-end">
								<!-- <Button class="w-32 text-xs">共1个文件|下一步</Button> -->
				<Drawer.Root>
					<Drawer.Trigger  asChild let:builder>
						<Button builders={[builder]} variant="outline" type="submit">共1个文件|下一步</Button>
					</Drawer.Trigger>
						<Drawer.Content>
							<Drawer.Header class="flex justify-between ">
				<!-- ---------------------------------------------- -->
								<div class="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 w-full h-auto">
									<div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 ">
										<Drawer.Close  class="mb-2"><Button variant="outline">上一步</Button></Drawer.Close>
											<div class="flex">
												<Card.Root class="w-[450px] mr-3">
													<Card.Header>
														<Card.Title>数据处理参数</Card.Title>
															</Card.Header>
															<div class="ml-4 w-32 mb-2">
																<p class="text-sm font-semibold">训练模式</p>
															</div>
															 <Card.Content class="flex">
																

		<RadioGroup.Root value="comfortable" class="flex mb-6">
			<Card.Root class="flex  items-center justify-between h-10  mr-2 w-32">																	
				<div class="flex items-center justify-between  gap-x-4 p-1">
					<div>
						<p class="text-xs font-semibold">直接分段</p>
					</div>		
				<div class="flex items-center space-x-2">							
					<RadioGroup.Item value="default" id="option-one" />
				</div>																																	
			</div>								
			</Card.Root>
											
		<Card.Root class="flex  items-center justify-between h-10  mr-2 w-32">																	
			<div class="flex items-center justify-between gap-x-4 p-1">
				<div>
					<p class="text-xs font-semibold">增强处理实验</p>
				</div>		
			<div class="flex items-center space-x-2">							
				<RadioGroup.Item value="comfortable" id="option-one" />
			</div>																																	
		</div>								
		</Card.Root>

		<Card.Root class="flex  items-center justify-between h-10  mr-2 w-32">																	
			<div class="flex items-center justify-between  gap-x-4 p-1">
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
															
	<Card.Footer>
																
																	
																
		<div class="mr-1 w-32 mb-2">
			<p class="text-sm font-semibold">处理方式</p>
		</div>	
		<RadioGroup.Root value="comfortable" class="mb-6">
		<Card.Root class="flex  items-center justify-between h-14  mr-4 w-80">	
																																
			<div class="flex items-center justify-between  gap-x-4 p-3">
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

																
			</Card.Footer>

				<Drawer.Root>
					<Drawer.Trigger asChild let:builder>
						<div class="flex justify-center mb-4 ">
							<Button builders={[builder]}  class="w-32 text-xs">下一步</Button>
						</div>
					</Drawer.Trigger>
						<Drawer.Content>
							<Drawer.Header class="flex justify-between ">
				<!-- -------------------------------------------------------- -->
								<div class="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 w-full h-auto">
									<div class="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800 ">
										<Drawer.Close  class="mb-2"><Button variant="outline">退出</Button></Drawer.Close>
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
												  <Table.Cell class="font-medium">{table.invoice}</Table.Cell>
												  <Table.Cell>{table.paymentStatus}</Table.Cell>
												</Table.Row>
											  {/each}
											</Table.Body>
										  </Table.Root>
										  <div class="flex justify-center mb-4 ">
											<Button class="w-32 text-xs">共3个文件|下一步</Button>
										</div>
									</div>
								</div>
							</Drawer.Header>
						</Drawer.Content>
				</Drawer.Root>
															
			</Card.Root>
													
		<!-- <Resizable.Handle /> -->														
			<div class="border rounded-lg overflow-hidden">
				<Table.Root class="w-52">
					<Table.Header>
					<Table.Row>
						<Table.Head class="font-semibold">来源列表</Table.Head>
																			  
					</Table.Row>
					</Table.Header>
						<Table.Body>
					<Table.Row>
						<Table.Cell class="font-medium">
						<div class="flex items-center gap-3">
							<FileIcon class="w-5 h-5 text-gray-500" />
								<span>文件1.pdf</span>
						</div>
						</Table.Cell>
																			  
					</Table.Row>
					<Table.Row>
																				
			<Table.Cell class="font-medium">
				<div class="flex items-center gap-3">
					<FileIcon class="w-5 h-5 text-gray-500" />
						<span>文件1.pdf</span>
				</div>
			</Table.Cell>
																				
		</Table.Row>
<Table.Row>
																				
		<Table.Cell class="font-medium">
				<div class="flex items-center gap-3">
					<FileIcon class="w-5 h-5 text-gray-500" />
							<span>文件1.pdf</span>
				</div>
		</Table.Cell>
																				
																				
</Table.Row>
																			  
</Table.Body>
					</Table.Root>
				</div>
															
		</div>												
		<!-- ---------------------------------------------- -->
										
									  </Drawer.Header>
									 
									</Drawer.Content>
								  </Drawer.Root>
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
				  <!--------------=============-- Dropdown Menu over---------------------------- -->
			</div>
			<div class="rounded-md border">
				<Table.Root {...$tableAttrs}>
				  <Table.Header>
					{#each $headerRows as headerRow}
					  <Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
						  {#each headerRow.cells as cell (cell.id)}
						  <Subscribe
						  attrs={cell.attrs()}
						  let:attrs
						  props={cell.props()}
						  let:props
						>
						<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
								{#if cell.id === "amount"}
                    			<div class="text-right w-24">
                      			<Render of={cell.render()} />
                    			</div>
							{:else if cell.id === "email"}
                  				<Button variant="ghost" on:click={props.sort.toggle}>
                    			<Render of={cell.render()} />
                    			<ArrowUpDown class={"ml-2 h-4 w-4"} />
                  				</Button>

							{:else if cell.id === "updateTime"}
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
						<Table.Row
              			{...rowAttrs}
              				data-state={$selectedDataIds[row.id] && "selected"}
            			>
						  {#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
							  <Table.Cell {...attrs}>
								<!-- 如果单元格id为"amount"，则渲染一个右对齐且字体加粗的内容 -->
								{#if cell.id === "amount"}
                    <div class="text-right font-medium">
                      <Render of={cell.render()} />
                    </div>
					 <!-- 如果单元格id为"status"，则渲染一个首字母大写的状态内容 --> 
                  {:else if cell.id === "status"}
                    <div class="capitalize w-10 text-xs">
					<div class="border-2 h-6 w-12 rounded-md text-center">
						<!-- <Card.Root class="w-16 h-6 text-center rounded-md "> -->
                      <Render of={cell.render()} />
					</div>
                    </div>
					{:else if cell.id === "updateTime"}
                    <div class="capitalize w-48 text-xs">
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
				<div class="flex-1 text-sm text-muted-foreground">
					{Object.keys($selectedDataIds).length} of{" "}
					{$rows.length} row(s) selected.
				  </div>
				<Button
				  variant="outline"
				  size="sm"
				  on:click={() => ($pageIndex = $pageIndex - 1)}
				  disabled={!$hasPreviousPage}>Previous</Button
				>
				<Button
				  variant="outline"
				  size="sm"
				  disabled={!$hasNextPage}
				  on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
				>
			  </div>
			</div>

			
		
			
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
</div>