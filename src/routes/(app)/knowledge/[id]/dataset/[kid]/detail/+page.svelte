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
	import Pencil from 'lucide-svelte/icons/pencil';
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
				<header
					class="sticky top-0 z-10 flex flex-row items-center justify-between gap-1 border-b bg-background px-4"
				>
					<div class="flex items-center justify-between py-5">
						<div class="flex flex-row items-center gap-4">
							<p class="text-lg font-medium leading-none">文件名</p>
							<p class="text-sm text-muted-foreground">共（32）组</p>
						</div>
					</div>
					<div>
						<Button variant="outline" size="sm" class="mx-10 ml-auto gap-1.5 text-sm">
							<CornerDownLeft class="size-3.5" />
							返回
						</Button>
						<Button variant="default" size="sm" class="ml-auto gap-1.5 text-sm">
							<Share class="size-3.5" />
							配置
						</Button>
					</div>
				</header>
				<main class="grid grid-cols-3 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
					<div class="relative hidden flex-col items-start gap-8 md:flex">
						<Card.Root class="w-full overflow-hidden pb-4">
							<Card.Header>
								<Card.Title>1</Card.Title>
							</Card.Header>
							<Card.Content class="w-full">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4 text-sm text-muted-foreground">
										订单就得到了大幅度就拉上飞机阿里斯顿发送到发送到发送
									</div>
								</div>
							</Card.Content>
							<Card.Footer>
								<div class="flex w-full items-center justify-between">
									<div class="flex items-center gap-2">
										<Badge variant="secondary">
											<span>12</span>
										</Badge>
										<Badge variant="secondary">3432342</Badge>
									</div>
									<div class="text-sm">
										<Pencil class="size-3.5" />
									</div>
								</div>
							</Card.Footer>
						</Card.Root>
					</div>
					<div class="relative hidden flex-col items-start gap-8 md:flex">
						<Card.Root class="w-full overflow-hidden pb-4">
							<Card.Header>
								<Card.Title>2</Card.Title>
							</Card.Header>
							<Card.Content class="w-full">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4 text-sm text-muted-foreground">
										订单就得到了大幅度就拉上飞机阿里斯顿发送到发送到发送
									</div>
								</div>
							</Card.Content>
							<Card.Footer>
								<div class="flex w-full items-center justify-between">
									<div class="flex items-center gap-2">
										<Badge variant="secondary">
											<span>12</span>
										</Badge>
										<Badge variant="secondary">3432342</Badge>
									</div>
									<div class="text-sm">
										<Pencil class="size-3.5" />
									</div>
								</div>
							</Card.Footer>
						</Card.Root>
					</div>
					<div class="relative hidden flex-col items-start gap-8 md:flex">
						<Card.Root class="w-full overflow-hidden pb-4">
							<Card.Header>
								<Card.Title>3</Card.Title>
							</Card.Header>
							<Card.Content class="w-full">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4 text-sm text-muted-foreground">
										订单就得到了大幅度就拉上飞机阿里斯顿发送到发送到发送
									</div>
								</div>
							</Card.Content>
							<Card.Footer>
								<div class="flex w-full items-center justify-between">
									<div class="flex items-center gap-2">
										<Badge variant="secondary">
											<span>12</span>
										</Badge>
										<Badge variant="secondary">3432342</Badge>
									</div>
									<div class="text-sm">
										<Pencil class="size-3.5" />
									</div>
								</div>
							</Card.Footer>
						</Card.Root>
					</div>
					<div class="relative hidden flex-col items-start gap-8 md:flex">
						<Card.Root class="w-full overflow-hidden pb-4">
							<Card.Header>
								<Card.Title>4</Card.Title>
							</Card.Header>
							<Card.Content class="w-full">
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-4 text-sm text-muted-foreground">
										订单就得到了大幅度就拉上飞机阿里斯顿发送到发送到发送
									</div>
								</div>
							</Card.Content>
							<Card.Footer>
								<div class="flex w-full items-center justify-between">
									<div class="flex items-center gap-2">
										<Badge variant="secondary">
											<span>12</span>
										</Badge>
										<Badge variant="secondary">3432342</Badge>
									</div>
									<div class="text-sm">
										<Pencil class="size-3.5" />
									</div>
								</div>
							</Card.Footer>
						</Card.Root>
					</div>
				</main>
			</div>
		</div>
	</div>
</div>
