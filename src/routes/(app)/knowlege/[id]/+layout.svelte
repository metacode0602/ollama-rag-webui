<script lang="ts">
	import Nav from '$lib/components/knowlege/nav.svelte';
	import * as Icons from "$lib/components/icons/icons.js";
	import { type Route } from '$lib/components/knowlege/config.js';
	import { cn } from '$lib/utils';
	import * as Resizable from '$lib/components/ui/resizable';
	import { Separator } from '$lib/components/ui/select';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import {
		primaryRoutes,
	} from '$lib/components/knowlege/config.js';
	import { Progress } from '$lib/components/ui/progress';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	// export let accounts: Account[];
	// export let mails: Mail[];
	// export let defaultLayout = [200, 440, 655];
	export let defaultCollapsed = false;
	// export let navCollapsedSize: number;


	let turnRoutes: Route[] = [{
		title: "全部知识库",
		icon: Icons.CircleAlert,
		variant: "ghost",
		path:"/knowlege"
	}]

	let secondaryRoutes: Route[] = [{
		title: "QA训练排队(空闲)",
		icon: Icons.Users,
		variant: "ghost",
		path: "/knowlege/" + $page.params.id + "/training"
	}]

	let thirdRoutes: Route[] = [{
		title: "索引排队(空闲)",
		icon: Icons.CircleAlert,
		variant: "ghost",
		path:"/knowlege/" + $page.params.id + "/indexing"	
	}]

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

	$: if ($page.params.id) {
		(async () => {
			await loadKnowlege()
		})();
	}	


	//////////////////////////
	// Web functions
	//////////////////////////

	const loadKnowlege = async () => {
		// await chatId.set($page.params.id);
		let chatId = $page.params.id;
		// await getKnowlegeById(localStorage.token, chatId).catch(async (error) => {
		// 	console.log(error);
		// 	return null;
		// });
	}
	// HTML模板部分
</script>

<!-- 当屏幕大小小于md时，此div是隐藏的；当屏幕大小达到或超过md时，此div是显示的 -->
<div class="hidden md:block" style="width:100%">
	<div style="height: 100%">
		<!-- 这是一个可调整大小的面板组，其方向是水平的。  
         当面板组的大小或布局改变时，onLayoutChange函数将被调用。  
         这个面板组占据全部高度，最大高度为800像素，并且子元素在垂直方向上拉伸。 -->
		<Resizable.PaneGroup direction="horizontal" {onLayoutChange} class="h-full items-stretch">
			<!-- 这是一个可调整大小并可折叠的面板。  
           默认大小由defaultLayout数组的第一个元素决定。  
           当面板折叠时，其大小变为navCollapsedSize。  
           面板的最小和最大尺寸分别为15和20（单位未指定，可能是像素或其他单位）。  
           当面板折叠时，onCollapse函数将被调用；当面板展开时，onExpand函数将被调用。 -->
			<Resizable.Pane
				defaultSize={140}
				collapsible
				minSize={15}
				maxSize={15}
				{onCollapse}
				{onExpand}
				style="position: relative"
			>
				<div
					class={cn(
						'flex h-[100px] flex-col items-center justify-center',
						isCollapsed ? 'h-[52px]' : 'px-2'
					)}
				>
					<!-- 标题 -->
					<div class="flex items-center">
						<Avatar.Root>
							<Avatar.Image src="/" alt="@xxx" />
							<Avatar.Fallback>MK</Avatar.Fallback>
						</Avatar.Root>
						<h1 class="mx-2 text-lg font-bold">MarktingGPT</h1>
					</div>
					<!-- 通用知识库标签 -->
					<div
						class="mt-3 inline-block w-[160px] rounded-lg border border-slate-300 bg-gray-100 px-4 py-1 text-center text-xs text-slate-400 dark:bg-gray-800"
					>
						<p>通用知识库</p>
					</div>
				</div>
				<Separator />
				<!-- 数据集导航栏 -->

				<Nav {isCollapsed} routes={primaryRoutes} />

				<div style="position: absolute; bottom: 0;width: 100%">
					<!-- QA训练导航栏 -->
					<Nav {isCollapsed} routes={secondaryRoutes} />
					<!-- 进度条 -->
					<Progress {value} max={100} class="mx-5 w-[80%]" />
					<!-- 索引排队导航栏 -->
					<Nav {isCollapsed} routes={thirdRoutes} />
					<!-- 进度条 -->
					<Progress {value} max={100} class="mx-5 mb-5 w-[80%]" />
					<Separator />
					<!-- 返回知识库导航栏 -->
					<Nav {isCollapsed} routes={turnRoutes} />
				</div>
			</Resizable.Pane>
			<slot />
		</Resizable.PaneGroup>
	</div>
</div>
