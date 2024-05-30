<script lang="ts">
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';

</script>
<div class="flex items-center justify-center">
	<h2 class="text-base font-bold text-gray-900 dark:text-gray-100">测试结果</h2>
</div>
<ScrollArea  class="h-[520px] px-1">
	<!-- 测试结果card -->
	<div class="p-6">

		<div class="mt-4 grid grid-cols-1 gap-4">
			<Card.Root style="border: none;background: #F0F2F5">
				<Card.Header class="flex justify-between">
					<!-- 语义检索标签 -->
					<div
						class="inline-block max-w-36 rounded-lg border border-neutral-900 bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800"
					>
						<p>#1 | 语义检索0.8675</p>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-xs text-gray-600 dark:text-gray-400">
						#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br />
						#2 eggs, 2 slices of w, 1 banana, 1 cup of coffee<br />
						#2 eggs, 2 slices of whotoast, 1 banana, 1 cup of coffee<br />
						#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee
					</div>
					<CardFooter class="py-3" style="padding-left: 0">
						<!-- 知乎链接 -->
						<a
							href="www.baidu.com"
							class="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
							>知乎-www.baidu.com</a
						>
					</CardFooter>
				</Card.Content>
			</Card.Root>
			<Card.Root style="border: none;background: #F0F2F5">
				<Card.Header class="flex justify-between">
					<!-- 语义检索标签 -->
					<div
						class="inline-block max-w-36 rounded-lg border border-neutral-900 bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800"
					>
						<p>#1 | 语义检索0.8675</p>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-xs text-gray-600 dark:text-gray-400">
						#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br />
						#2 eggs, 2 slices of wheat toast, 1 banana, 1 cup of coffee<br />
						#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br />
						#2 eggs,ast, 1 banana, 1 cup of coffee
					</div>
					<CardFooter class="py-3" style="padding-left: 0">
						<!-- 知乎链接 -->
						<a
							href="www.baidu.com"
							class="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
							>知乎-www.baidu.com</a
						>
					</CardFooter>
				</Card.Content>
			</Card.Root>
			<Card.Root style="border: none;background: #F0F2F5">
				<Card.Header class="flex justify-between">
					<!-- 语义检索标签 -->
					<div
						class="inline-block max-w-36 rounded-lg border border-neutral-900 bg-gray-100 px-3 py-1 text-xs dark:bg-gray-800"
					>
						<p>#1 | 语义检索0.8675</p>
					</div>
				</Card.Header>
				<Card.Content>
					<div class="text-xs text-gray-600 dark:text-gray-400">
						#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br />
						#2 eggs, 2 slices of whole wheat toast, 1 banana, 1 cup of coffee<br />
						#2 eggs, 2 slices of whole wheat toast<br />
						#2 eggs,1 banana, 1 cup of coffee
					</div>
					<CardFooter class="py-3" style="padding-left: 0">
						<!-- 知乎链接 -->
						<a
							href="www.baidu.com"
							class="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
							>知乎-www.baidu.com</a
						>
					</CardFooter>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</ScrollArea>
