
<script lang="ts">
	import { invoices, type Account, type Mail, intents} from "../data.js";
	import Nav from "./nav.svelte";
	import { cn } from "$lib/utils";
	import { Input } from "$lib/components/ui/input";
	import * as Resizable from "$lib/components/ui/resizable";
	import { Separator } from "$lib/components/ui/select";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { primaryRoutes, secondaryRoutes, thirdRoutes, turnRoutes } from "../config.js"
	import { Progress } from "$lib/components/ui/progress";
	import { onMount } from "svelte";
	import * as Select from "$lib/components/ui/select/index.js";
  	import { Label } from "$lib/components/ui/label/index.js";
	  import SuperDebug, {
      type Infer,
      type SuperValidated,
      superForm
    } from "sveltekit-superforms";
 

	export let accounts: Account[];
	export let mails: Mail[];
	export let defaultLayout = [100, 900];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;

	export const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit"
    },
    {
      value: "next",
      label: "Next.js"
    },
    {
      value: "astro",
      label: "Astro"
    },
    {
      value: "nuxt",
      label: "Nuxt.js"
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
<style>

</style>
<!-- 当屏幕大小小于md时，此div是隐藏的；当屏幕大小达到或超过md时，此div是显示的 -->
<div class="hidden md:block" style="width:100%;">
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
		
		<Resizable.Pane defaultSize={defaultLayout[0]} minSize={30} maxSize={50}>
			<!-- form ------------->
			
			<!-- form  end------ -->
			<!-- card -->
			<Card.Root class="min-w-screen min-h-screen">
				<Card.Header>
					<div class="flex items-center gap-4 ">
						<label for="dataId" class="text-sm font-bold w-[110px]">
							知识库Id
						</label>
	
						<label for="dataId" class="text-xs ">3454654656756786</label>
					</div>
				</Card.Header>
				<Card.Content>
				  <form>
					
					<div class="grid w-full items-center gap-4">
						<!-- 知识库头像 -->
						<div class="flex items-center">
							<Label for="name" class="mr-10 font-bold w-[80px]">知识库头像</Label>
							<Avatar.Root>
								<Avatar.Image src="/assets/avatars/company_logo.png" alt="@yhme" />
							  </Avatar.Root>
						</div>
						<!-- 索引 -->
						<!-- 知识库名称 -->
					  <div class="flex items-center space-y-1.5">
						<Label for="name" class="text-sm font-bold mr-6 w-[100px]">知识库名称</Label>
						<Input id="name" placeholder="Embedding-2" class="w-64"/>
					  </div>
					  <!-- 索引模型 -->
					  <div class="w-full flex items-center gap-4 ">
						<label for="dataId" class="text-sm font-bold mr-7 w-[80px]">
							索引模型
						</label>
						<label for="dataId" class="text-xs">MarketingGPT</label>
					</div>
					<!-- 单挑数据上线 -->
					<div class="flex items-center gap-4 mr-7">
						<label for="dataId" class="text-sm font-bold w-[110px]">
							单挑数据上线
						</label>
						<label for="dataId" class="text-xs">5000</label>
					</div>

					  <div class="flex items-center  space-y-1.5 ">
						<Label for="framework" class="text-sm font-bold mr-6 w-[100px]">文件处理模型</Label>
						<Select.Root >
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
						<Label for="name" class="text-sm font-bold mr-8 w-[50px]">介绍</Label>
						<Textarea placeholder="暂无介绍" class="ml-10 w-96 h-24"/>
					  </div>

					   <!-- 使用权限 -->
					   <div class="flex items-center space-y-1.5">
						<Label for="name" class="text-sm font-bold mr-10 w-[80px]">使用权限</Label>
						<Card.Root class="flex items-center h-14  mr-4 w-48">
							<div class="p-3">
							<p class="text-xs font-semibold">私有</p>
							<p class="text-xs">仅自己可用</p>
							</div>
							
						  </Card.Root>

						  <Card.Root class="h-14 flex items-center w-48">
							<div class="p-3">
							<p class="text-xs font-semibold ">团队</p>
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

			  <!----------- card--------over -->
		</Resizable.Pane>


	
		<!-- 这是一个可调整大小的句柄（Handle）组件，它通常用于拖拽以改变其父级元素（Resizable.Pane）的大小。  
			withHandle属性是一个标志，用于确定是否显示该句柄。   -->
		<!-- <Resizable.Handle withHandle /> -->
		<!-- 这是一个可调整大小的面板组件。defaultSize属性指定了面板的默认大小，其值来自defaultLayout数组的第三个元素（因为数组索引从0开始） -->
		<!-- <Resizable.Pane defaultSize={defaultLayout[1]}> -->
			<!-- 这是一个邮件显示组件。它接收一个mail属性，该属性的值是通过在mails数组中查找id与$mailStore.selected相匹配的项来确定的。  
    如果找到了匹配的项，就将其赋值给mail属性；否则，将null赋值给mail属性。  
    $mailStore.selected可能是一个状态或变量，用于存储当前选中的邮件的id。   -->
			<!-- <MailDisplay mail={mails.find((item) => item.id === $mailStore.selected) || null} /> -->

				<!-- 表格 -->
		
			
				<!-- 测试结果card -->
				<!-- <div class="p-6">
					<div class="flex items-center justify-between">
					  <h2 class="text-base font-bold text-gray-900 dark:text-gray-100">测试结果</h2>
					</div>
				<div class="mt-4 grid grid-cols-1 gap-4">
					
					
					
				  </div>
				</div>
		</Resizable.Pane> -->
	</Resizable.PaneGroup>
</div>
</div>
