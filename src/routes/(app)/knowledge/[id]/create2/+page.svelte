<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import FileText from 'lucide-svelte/icons/file-text';
	import * as Table from '$lib/components/ui/table';
	import { FileIcon, Trash2 } from 'lucide-svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { cn } from '$lib/utils';
	import * as Resizable from '$lib/components/ui/resizable';
	import { Separator } from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Progress } from '$lib/components/ui/progress';
  import * as Popover from "$lib/components/ui/popover/index.js";
	import { Tooltip } from '$lib/components/ui/tooltip/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	let tables = [
		{ name: '111', status: '111', size: '234kb' },
		{ name: '222', status: '222', size: '234kb' },
		{ name: '333', status: '333', size: '234kb' },
		{ name: '444', status: '444', size: '234kb' },
		{ name: '555', status: '555', size: '234kb' },
		{ name: '666', status: '666', size: '234kb' }
	];
	let knowledgeId = $page.params.id;

</script>

<div class="col-span-3 lg:col-span-4 lg:border-l">
	<div class="px-4 py-6 lg:px-8">
		<div class="w-full justify-between mb-4">
			<ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
				<li class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
					<span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
							<span class="me-2">1</span>选择文件
					</span>
				</li>			
				<li class="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
						<span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
								<svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
								</svg>
								数据管理
						</span>
				</li>
	
				<li class="flex md:w-full ">
					<span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
						<span class="me-2">3</span>上传<br>数据
					</span>
				</li>
			</ol>
		</div>


		<Card.Root class="mr-3 h-[540px]">
			<Card.Header>
				<Card.Title>数据处理参数</Card.Title>
			</Card.Header>
			<div class="mb-2 ml-4 w-32">
				<p class="text-sm font-semibold">训练模式</p>
			</div>
			<Card.Content class="flex">
				<RadioGroup.Root value="comfortable" class="mb-6 flex">
					<Card.Root class="mr-2  flex h-10 w-32  items-center justify-between">
						<div class="flex items-center justify-between gap-x-4 p-1">
							<div>
								<p class="text-xs font-semibold">直接分段</p>
							</div>
							<div class="flex items-center space-x-2">
								<RadioGroup.Item value="default" id="option-one" />
							</div>
						</div>
					</Card.Root>
					<Card.Root class="mr-2  flex h-10 w-32  items-center justify-between">
						<div class="flex items-center justify-between gap-x-4 p-1">
							<div>
								<p class="text-xs font-semibold">增强处理实验</p>
							</div>
							<div class="flex items-center space-x-2">
								<RadioGroup.Item value="comfortable" id="option-one" />
							</div>
						</div>
					</Card.Root>

					<Card.Root class="mr-2  flex h-10 w-32  items-center justify-between">
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
					<Card.Root class="mr-4  flex h-14 w-80  items-center justify-between">
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

					<Card.Root class="h-14 flex items-center w-96">
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
												<Button>确定</Button>
											</div>
										</div>
									</Popover.Content>
									</Popover.Root>
							</div>
								</Card.Root>
				</RadioGroup.Root>
			</div>
		</Card.Root>
		<div class="mb-4 flex justify-end" style="margin-top: 20px">
			<Button class="w-32 text-xs" style="margin-left: 20px" href="/knowledge/{knowledgeId}/create3">共3个文件|下一步</Button>
		</div>		
	</div>
</div>
