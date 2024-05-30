<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import FileText from 'lucide-svelte/icons/file-text';
	import * as Table from '$lib/components/ui/table';
	import { FileIcon, Trash2 } from 'lucide-svelte';
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

	let tabs = [
		{ name: '111', status: '111', size: "234kb" },
		{ name: '222', status: '222', size: "234kb" },
		{ name: '333', status: '333', size: "234kb" },
		{ name: '444', status: '444', size: "234kb" },
		{ name: '555', status: '555', size: "234kb" },
		{ name: '666', status: '666', size: "234kb" },
	]
	let knowledgeId = $page.params.id;

</script>
<div class="col-span-3 lg:col-span-4 lg:border-l">
	<div class="h-full px-4 py-6 lg:px-8">

	

<ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
	<li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
			<span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
					<span class="me-2">1</span>选择文件
			</span>
	</li>
	<li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
		<span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
				<span class="me-2">2</span>
				数据管理
		</span>
	</li>
	<li class="flex md:w-full items-center text-blue-600">
		<span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
				<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
				</svg>
				上传文件
		</span>
</li>	
</ol>

		<ScrollArea class="h-[540px]">
			<Table.Root class="  mt-4 mr-4">
				<Table.Caption>文件上传列表</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Cell class="text-left">文件名</Table.Cell>
						<Table.Cell class="mb-4 mr-1">文件大小</Table.Cell>
						<Table.Cell class="w-28">上传进度</Table.Cell>
						<Table.Cell class="text-right">操作</Table.Cell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each tabs as tab, i (i)}
						<Table.Row class="">
							<Table.Cell class="text-left">
								{tab.name}
							</Table.Cell>
							<Table.Cell class="mb-4 mr-1  w-28 text-xs font-medium dark:text-gray-200"
								>{tab.size}</Table.Cell
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
		</ScrollArea>


		<div class="flex justify-end" style="margin-top: 20px">
			<Button class="w-32 text-xs mr-4" variant="secondary" href="/knowledge/{knowledgeId}/create2">上一步</Button>
			<Button class="w-32 text-xs ml-4" href="/knowledge/{knowledgeId}">共1个文件|下一步</Button>
		</div>
		<!-- over -->
	</div>
</div>