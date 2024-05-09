<script lang="ts">
	import { type Account, type Mail, intents, items} from "../data.js";
	import Nav from "./nav.svelte";
	import { cn } from "$lib/utils";
	import { Input } from "$lib/components/ui/input";
	import * as Resizable from "$lib/components/ui/resizable";
	import { Separator } from "$lib/components/ui/select";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { primaryRoutes, secondaryRoutes, thirdRoutes, turnRoutes } from "../config.js"
	import { Progress } from "$lib/components/ui/progress";
	import { onMount } from "svelte";
	import * as Select from "$lib/components/ui/select/index.js";
  	import { Label } from "$lib/components/ui/label/index.js";
//  -----------------------start--------------------------
import * as Card from "$lib/components/ui/card";
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
import CirclePlus from "lucide-svelte/icons/circle-plus";
  import Cloud from "lucide-svelte/icons/cloud";
  import CreditCard from "lucide-svelte/icons/credit-card";
  import MessageSquare from "lucide-svelte/icons/message-square";
  import Plus from "lucide-svelte/icons/plus";
  import Settings from "lucide-svelte/icons/settings";
  import User from "lucide-svelte/icons/user";
  import UserPlus from "lucide-svelte/icons/user-plus";
  import Users from "lucide-svelte/icons/users";
  import { Ellipsis, Trash2 } from 'lucide-svelte';
  import * as Sheet from "$lib/components/ui/sheet";
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	

//----------------------over-----------------------------

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
		
		<Resizable.Pane defaultSize={defaultLayout[0]} minSize={30} maxSize={50}>
			
			<header class="flex items-center justify-between px-6 py-3 border-b font-medium">
				<h3 class="font-medium w-48">Linux.md(23组)</h3>
				<Input
					class="w-56 ml-[450px]"
					placeholder="搜索数据..."
					type="text"
				/>
				<Button size="lg">
					插入
				</Button>				
			</header>
			<!-- 单挑数据详情 -->
			<div class="grid grid-cols-3 sm:grid-cols-1 lg:grid-cols-3 gap-4 p-4">				
				{#each items as item, i (i)}	
					<div class="w-72">
					<Card.Root>
						<div class="inline-block ml-1 rounded-lg bg-gray-100 border border-slate-300 text-center text-xs text-slate-400 dark:bg-gray-800 w-12 mt-3">
							<p>{item.num}</p>
						</div>				
					<Card.Header class="flex justify-between">						
						<Card.Title class="justify-end text-xs">{item.id}</Card.Title>
					  	<Card.Description>{item.description}</Card.Description>		
					</Card.Header>				
					<Card.Content class="flex justify-between">
					  <p class="text-sm">{item.content}</p>
					</Card.Content>
					<Card.Footer></Card.Footer>
					</Card.Root>
				</div> 
				{/each}				 
			</div>			
			<!-- 单挑数据详情 -over--->
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
</div>
