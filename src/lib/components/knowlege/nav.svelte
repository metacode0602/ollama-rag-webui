<script lang="ts">
	import type { Route } from "$lib/components/knowlege/config.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils";
	import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import { page } from '$app/stores';

	export let isCollapsed: boolean = false;
	export let routes: Route[];

// 初始化 activeRoute 为空或者指向某个特定的 route
let activeRoute: Route | null = null;

// 根据当前是否是 activeRoute 动态设置 variant
	const getVariant = (route:Route) => {
			return activeRoute === route ? 'default' : 'ghost';
	}

	//当按钮被点击时调用此函数
	const onBtnClick = (e: Event, current: Route) => {
			activeRoute = current;
			// let currentPathname = $page.url.pathname;
			// console.warn(currentPathname, current.path);
			// // 更新当前路由的 variant
	// // 遍历路由数组
	// routes.forEach((route, index) => {
			//  console.warn("foreach:", route.path, route.variant, current.path)
			//  if (current.path === route.path) {
			//      route.variant = 'default';
			//  } else {
			//      // 如果当前路由的 path 不包含当前的 pathname
			//      route.variant = 'ghost';
			//  }
	// });
	}

</script>



<div data-collapsed={isCollapsed} class="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
	<nav class="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
			{#each routes as route}
					{#if isCollapsed}
							<Tooltip.Root openDelay={0}>
									<Tooltip.Trigger asChild let:builder>
											<Button
													href="{route.path}"
													builders={[builder]}
													variant={route.variant}
													size="icon"
													class={cn(
															"size-9",
															route.variant === "default" &&
																	"dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
													)}
											>
													<svelte:component this={route.icon} class="size-4" aria-hidden="true" />
													<span class="sr-only">{route.title}</span>
											</Button>
									</Tooltip.Trigger>
									<Tooltip.Content side="right" class="flex items-center gap-4">
											{route.title}
											{#if route.label}
													<span class="ml-auto text-muted-foreground">
															{route.label}
													</span>
											{/if}
									</Tooltip.Content>
							</Tooltip.Root>
					{:else}
							<Button
									href="{route.path}"
									variant={getVariant(route)}
									on:click={(e) => {
											onBtnClick(e, route);
									}}
									size="sm"
									class={cn("justify-start", {
											"dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white":
													route.variant === "default",
									})}
							>
									<svelte:component this={route.icon} class="mr-2 size-4" aria-hidden="true" />
									{route.title}
									<!-- {#if route.label}
											<span
													class={cn("ml-auto", {
															"text-background dark:text-white": route.variant === "default",
													})}
											>
													{route.label}
											</span>
									{/if} -->
							</Button>
					{/if}
			{/each}
	</nav>
</div>