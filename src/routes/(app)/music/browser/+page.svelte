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
					class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4"
				>
					<h1 class="text-xl font-semibold">单图识别</h1>
					<Drawer.Root>
						<Drawer.Trigger asChild let:builder>
							<Button builders={[builder]} variant="ghost" size="icon" class="md:hidden">
								<Settings class="size-4" />
								<span class="sr-only">Settings</span>
							</Button>
						</Drawer.Trigger>
						<Drawer.Content class="max-h-[80vh]">
							<Drawer.Header>
								<Drawer.Title>Configuration</Drawer.Title>
								<Drawer.Description>
									Configure the settings for the model and messages.
								</Drawer.Description>
							</Drawer.Header>
							<form class="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
								<fieldset class="grid gap-6 rounded-lg border p-4">
									<legend class="-ml-1 px-1 text-sm font-medium"> Settings </legend>
									<div class="grid gap-3">
										<Label for="model">Model</Label>
										<Select.Root>
											<Select.Trigger id="model" class="items-start [&_[data-description]]:hidden">
												<Select.Value placeholder="Select a model" />
											</Select.Trigger>
											<Select.Content>
												<Select.Item value="genesis" label="Neural Genesis">
													<div class="flex items-start gap-3 text-muted-foreground">
														<Rabbit class="size-5" />
														<div class="grid gap-0.5">
															<p>
																Neural
																<span class="font-medium text-foreground"> Genesis </span>
															</p>
															<p class="text-xs" data-description>
																Our fastest model for general use cases.
															</p>
														</div>
													</div>
												</Select.Item>
												<Select.Item value="explorer" label="Neural Explorer">
													<div class="flex items-start gap-3 text-muted-foreground">
														<Bird class="size-5" />
														<div class="grid gap-0.5">
															<p>
																Neural
																<span class="font-medium text-foreground"> Explorer </span>
															</p>
															<p class="text-xs" data-description>
																Performance and speed for efficiency.
															</p>
														</div>
													</div>
												</Select.Item>
												<Select.Item value="quantum" label="Neural Quantum">
													<div class="flex items-start gap-3 text-muted-foreground">
														<Turtle class="size-5" />
														<div class="grid gap-0.5">
															<p>
																Neural
																<span class="font-medium text-foreground"> Quantum </span>
															</p>
															<p class="text-xs" data-description>
																The most powerful model for complex computations.
															</p>
														</div>
													</div>
												</Select.Item>
											</Select.Content>
										</Select.Root>
									</div>
									<div class="grid gap-3">
										<Label for="temperature">Temperature</Label>
										<Input id="temperature" type="number" placeholder="0.4" />
									</div>
									<div class="grid gap-3">
										<Label for="top-p">Top P</Label>
										<Input id="top-p" type="number" placeholder="0.7" />
									</div>
									<div class="grid gap-3">
										<Label for="top-k">Top K</Label>
										<Input id="top-k" type="number" placeholder="0.0" />
									</div>
								</fieldset>
								<fieldset class="grid gap-6 rounded-lg border p-4">
									<legend class="-ml-1 px-1 text-sm font-medium"> Messages </legend>
									<div class="grid gap-3">
										<Label for="role">Role</Label>
										<Select.Root selected={{ value: 'system', label: 'System' }}>
											<Select.Trigger>
												<Select.Value placeholder="Select a role" />
											</Select.Trigger>
											<Select.Content>
												<Select.Item value="system">System</Select.Item>
												<Select.Item value="user">User</Select.Item>
												<Select.Item value="assistant">Assistant</Select.Item>
											</Select.Content>
										</Select.Root>
									</div>
									<div class="grid gap-3">
										<Label for="content">Content</Label>
										<Textarea id="content" placeholder="You are a..." />
									</div>
								</fieldset>
							</form>
						</Drawer.Content>
					</Drawer.Root>
					<Button variant="outline" size="sm" class="ml-auto gap-1.5 text-sm">
						<Share class="size-3.5" />
						分享
					</Button>
				</header>
				<main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
					<div class="relative hidden flex-col items-start gap-8 md:flex">
						<Card.Root class="overflow-hidden">
							<Card.Header>
								<Card.Title>上传图片</Card.Title>
							</Card.Header>
							<Card.Content>
								<div class="grid gap-2">
									<img
										alt="Product"
										class="aspect-square w-full rounded-md object-cover"
										height="300"
										src="/assets/img/music/placeholder.svg"
										width="300"
									/>
									<div class="grid grid-cols-3 gap-2">
										<button>
											<img
												alt="Product"
												class="aspect-square w-full rounded-md object-cover"
												height="84"
												src="/assets/img/music/placeholder.svg"
												width="84"
											/>
										</button>
										<button>
											<img
												alt="Product"
												class="aspect-square w-full rounded-md object-cover"
												height="84"
												src="/assets/img/music/placeholder.svg"
												width="84"
											/>
										</button>
										<button
											class="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
										>
											<Upload class="h-4 w-4 text-muted-foreground" />
											<span class="sr-only">Upload</span>
										</button>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
						<Accordion.Root class="w-full">
							<Accordion.Item value="item-1">
								<Accordion.Trigger>参数设置</Accordion.Trigger>
								<Accordion.Content>
									<form class="grid w-full items-start gap-6">
										<fieldset class="grid gap-6 rounded-lg border p-4">
											<div class="grid gap-3">
												<Label for="model">Model</Label>
												<Select.Root>
													<Select.Trigger
														id="model"
														class="items-start [&_[data-description]]:hidden"
													>
														<Select.Value placeholder="Select a model" />
													</Select.Trigger>
													<Select.Content>
														<Select.Item value="genesis" label="Neural Genesis">
															<div class="flex items-start gap-3 text-muted-foreground">
																<Rabbit class="size-5" />
																<div class="grid gap-0.5">
																	<p>
																		Neural
																		<span class="font-medium text-foreground"> Genesis </span>
																	</p>
																	<p class="text-xs" data-description>
																		Our fastest model for general use cases.
																	</p>
																</div>
															</div>
														</Select.Item>
														<Select.Item value="explorer" label="Neural Explorer">
															<div class="flex items-start gap-3 text-muted-foreground">
																<Bird class="size-5" />
																<div class="grid gap-0.5">
																	<p>
																		Neural
																		<span class="font-medium text-foreground"> Explorer </span>
																	</p>
																	<p class="text-xs" data-description>
																		Performance and speed for efficiency.
																	</p>
																</div>
															</div>
														</Select.Item>
														<Select.Item value="quantum">
															<div class="flex items-start gap-3 text-muted-foreground">
																<Turtle class="size-5" />
																<div class="grid gap-0.5">
																	<p>
																		Neural
																		<span class="font-medium text-foreground"> Quantum </span>
																	</p>
																	<p class="text-xs" data-description>
																		The most powerful model for complex computations.
																	</p>
																</div>
															</div>
														</Select.Item>
													</Select.Content>
												</Select.Root>
											</div>
											<div class="grid gap-3">
												<Label for="temperature">Temperature</Label>
												<Input id="temperature" type="number" placeholder="0.4" />
											</div>
											<div class="grid grid-cols-2 gap-4">
												<div class="grid gap-3">
													<Label for="top-p">Top P</Label>
													<Input id="top-p" type="number" placeholder="0.7" />
												</div>
												<div class="grid gap-3">
													<Label for="top-k">Top K</Label>
													<Input id="top-k" type="number" placeholder="0.0" />
												</div>
											</div>
										</fieldset>
									</form>
								</Accordion.Content>
							</Accordion.Item>
						</Accordion.Root>
					</div>
					<div
						class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2"
					>
						<Badge variant="outline" class="absolute right-3 top-3">输出</Badge>
						<div class="flex-1" />
						<form
							class=" relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
						>
							<Label for="message" class="sr-only">消息</Label>
							<Textarea
								id="message"
								placeholder="请输入消息..."
								class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
							/>
							<div class="flex items-center p-3 pt-0">
								<Tooltip.Root>
									<Tooltip.Trigger asChild let:builder>
										<Button builders={[builder]} variant="ghost" size="icon">
											<Paperclip class="size-4" />
											<span class="sr-only">上传文件</span>
										</Button>
									</Tooltip.Trigger>
									<Tooltip.Content side="top">上传文件</Tooltip.Content>
								</Tooltip.Root>
								<Tooltip.Root>
									<Tooltip.Trigger asChild>
										<Button variant="ghost" size="icon">
											<Mic class="size-4" />
											<span class="sr-only">语音输入</span>
										</Button>
									</Tooltip.Trigger>
									<Tooltip.Content side="top">语音输入</Tooltip.Content>
								</Tooltip.Root>
								<Button type="submit" size="sm" class="ml-auto gap-1.5">
									发送
									<CornerDownLeft class="size-3.5" />
								</Button>
							</div>
						</form>
					</div>
				</main>
			</div>
		</div>
	</div>
</div>
