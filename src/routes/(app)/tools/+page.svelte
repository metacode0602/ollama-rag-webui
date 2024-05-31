<script lang="ts">
	import Triangle from 'lucide-svelte/icons/triangle';
	import Bot from 'lucide-svelte/icons/bot';
	import SquareTerminal from 'lucide-svelte/icons/square-terminal';
	import CodeXML from 'lucide-svelte/icons/code-xml';
	import Settings2 from 'lucide-svelte/icons/settings-2';
	import LifeBuoy from 'lucide-svelte/icons/life-buoy';
	import Book from 'lucide-svelte/icons/book';
	import SquareUser from 'lucide-svelte/icons/square-user';
	import * as Card from '$lib/components/ui/card/index.js';
	import Upload from 'lucide-svelte/icons/upload';
	import Settings from 'lucide-svelte/icons/settings';
	import Rabbit from 'lucide-svelte/icons/rabbit';
	import Bird from 'lucide-svelte/icons/bird';
	import Turtle from 'lucide-svelte/icons/turtle';
	import Share from 'lucide-svelte/icons/share';
	import Paperclip from 'lucide-svelte/icons/paperclip';
	import Mic from 'lucide-svelte/icons/mic';
	import CornerDownLeft from 'lucide-svelte/icons/corner-down-left';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
</script>

<div class="col-span-3 lg:col-span-4 lg:border-l">
	<div class="h-full px-4">
		<div class="h-screen w-full">
			<div class="flex flex-col">
				<header class="sticky top-0 z-10 flex items-center gap-1 border-b bg-background px-4">
					<div class="flex items-center justify-between py-5">
						<div class="flex items-center gap-4">
							<Avatar.Root>
								<Avatar.Image src="/assets/avatars/01.png" alt="单图识别" />
								<Avatar.Fallback>SD</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<p class="text-lg font-medium leading-none">单图识别</p>
								<p class="text-sm text-muted-foreground">m@example.com</p>
							</div>
						</div>
					</div>
					<Button variant="outline" size="sm" class="ml-auto gap-1.5 text-sm">
						<Share class="size-3.5" />
						配置
					</Button>
				</header>
				<div class="mt-4">
					<span class="font-semibold">包含 4 个工具</span><i>要使用请先授权</i>
				</div>

				<main class="grid grid-cols-3 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
					<div class="relative hidden flex-col items-start gap-8 md:flex">
						<Card.Root class="w-full overflow-hidden">
							<Card.Header>
								<Card.Title>上传图片</Card.Title>
							</Card.Header>
							<Card.Content class="w-full">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4">
										<Avatar.Root>
											<Avatar.Image src="/assets/avatars/01.png" alt="Sofia Davis" />
											<Avatar.Fallback>SD</Avatar.Fallback>
										</Avatar.Root>
										<div>
											<p class="text-lg font-medium leading-none">Sofia Davis</p>
											<p class="text-sm text-muted-foreground">m@example.com</p>
										</div>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="relative hidden flex-col items-start gap-8 md:flex">
						<Card.Root class="w-full overflow-hidden">
							<Card.Header>
								<Card.Title>上传图片</Card.Title>
							</Card.Header>
							<Card.Content class="w-full">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4">
										<Avatar.Root>
											<Avatar.Image src="/assets/avatars/01.png" alt="Sofia Davis" />
											<Avatar.Fallback>SD</Avatar.Fallback>
										</Avatar.Root>
										<div>
											<p class="text-lg font-medium leading-none">Sofia Davis</p>
											<p class="text-sm text-muted-foreground">m@example.com</p>
										</div>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="relative hidden flex-col items-start gap-8 md:flex">
						<Card.Root class="w-full overflow-hidden">
							<Card.Header>
								<Card.Title>上传图片</Card.Title>
							</Card.Header>
							<Card.Content class="w-full">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4">
										<Avatar.Root>
											<Avatar.Image src="/assets/avatars/01.png" alt="Sofia Davis" />
											<Avatar.Fallback>SD</Avatar.Fallback>
										</Avatar.Root>
										<div>
											<p class="text-lg font-medium leading-none">Sofia Davis</p>
											<p class="text-sm text-muted-foreground">m@example.com</p>
										</div>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
					<div class="relative hidden flex-col items-start gap-8 md:flex">
						<Card.Root class="w-full overflow-hidden">
							<Card.Header>
								<Card.Title>上传图片</Card.Title>
							</Card.Header>
							<Card.Content class="w-full">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4">
										<Avatar.Root>
											<Avatar.Image src="/assets/avatars/01.png" alt="Sofia Davis" />
											<Avatar.Fallback>SD</Avatar.Fallback>
										</Avatar.Root>
										<div>
											<p class="text-lg font-medium leading-none">Sofia Davis</p>
											<p class="text-sm text-muted-foreground">m@example.com</p>
										</div>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					</div>
				</main>
			</div>
		</div>
	</div>
</div>
