<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';

	import fileSaver from 'file-saver';
	const { saveAs } = fileSaver;

	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { user, chats, settings, showSettings, chatId, tags } from '$lib/stores';
	import { onMount, getContext } from 'svelte';
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import File from "lucide-svelte/icons/file";
  import Home from "lucide-svelte/icons/home";
  import LineChart from "lucide-svelte/icons/line-chart";
  import Package from "lucide-svelte/icons/package";
  import Package2 from "lucide-svelte/icons/package-2";
  import PanelLeft from "lucide-svelte/icons/panel-left";
  import Search from "lucide-svelte/icons/search";
  import Settings from "lucide-svelte/icons/settings";

	const i18n = getContext('i18n');

	import {
		deleteChatById,
		getChatList,
		getChatById,
		getChatListByTagName,
		updateChatById,
		getAllChatTags,
		archiveChatById
	} from '$lib/apis/chats';
	import { toast } from 'svelte-sonner';
	import { fade, slide } from 'svelte/transition';
	import { WEBUI_BASE_URL } from '$lib/constants';
	import Tooltips from '../common/Tooltip.svelte';
	import ChatMenu from './Sidebar/ChatMenu.svelte';
	import ShareChatModal from '../chat/ShareChatModal.svelte';
	import ArchiveBox from '../icons/ArchiveBox.svelte';
	import ArchivedChatsModal from './Sidebar/ArchivedChatsModal.svelte';

	let show = false;
	let navElement;

	let title: string = 'UI';
	let search = '';

	let shareChatId = null;

	let selectedChatId = null;

	let chatDeleteId = null;
	let chatTitleEditId = null;
	let chatTitle = '';

	let showArchivedChatsModal = false;
	let showShareChatModal = false;
	let showDropdown = false;
	let isEditing = false;

	onMount(async () => {
		if (window.innerWidth > 1024) {
			show = true;
		}
		await chats.set(await getChatList(localStorage.token));

		let touchstartX = 0;
		let touchendX = 0;

		function checkDirection() {
			const screenWidth = window.innerWidth;
			const swipeDistance = Math.abs(touchendX - touchstartX);
			if (swipeDistance >= screenWidth / 4) {
				if (touchendX < touchstartX) {
					show = false;
				}
				if (touchendX > touchstartX) {
					show = true;
				}
			}
		}

		const onTouchStart = (e) => {
			touchstartX = e.changedTouches[0].screenX;
		};

		const onTouchEnd = (e) => {
			touchendX = e.changedTouches[0].screenX;
			checkDirection();
		};

		document.addEventListener('touchstart', onTouchStart);
		document.addEventListener('touchend', onTouchEnd);

		return () => {
			document.removeEventListener('touchstart', onTouchStart);
			document.removeEventListener('touchend', onTouchEnd);
		};
	});

	// Helper function to fetch and add chat content to each chat
	const enrichChatsWithContent = async (chatList) => {
		const enrichedChats = await Promise.all(
			chatList.map(async (chat) => {
				const chatDetails = await getChatById(localStorage.token, chat.id).catch((error) => null); // Handle error or non-existent chat gracefully
				if (chatDetails) {
					chat.chat = chatDetails.chat; // Assuming chatDetails.chat contains the chat content
				}
				return chat;
			})
		);

		await chats.set(enrichedChats);
	};

	const loadChat = async (id) => {
		goto(`/c/${id}`);
	};

	const editChatTitle = async (id, _title) => {
		if (_title === '') {
			toast.error('Title cannot be an empty string.');
		} else {
			title = _title;

			await updateChatById(localStorage.token, id, {
				title: _title
			});
			await chats.set(await getChatList(localStorage.token));
		}
	};

	const deleteChat = async (id) => {
		const res = await deleteChatById(localStorage.token, id).catch((error) => {
			toast.error(error);
			chatDeleteId = null;

			return null;
		});

		if (res) {
			if ($chatId === id) {
				goto('/');
			}

			await chats.set(await getChatList(localStorage.token));
		}
	};

	const saveSettings = async (updated) => {
		await settings.set({ ...$settings, ...updated });
		localStorage.setItem('settings', JSON.stringify($settings));
		location.href = '/';
	};

	const archiveChatHandler = async (id) => {
		await archiveChatById(localStorage.token, id);
		await chats.set(await getChatList(localStorage.token));
	};
</script>

<ShareChatModal bind:show={showShareChatModal} chatId={shareChatId} />
<ArchivedChatsModal
	bind:show={showArchivedChatsModal}
	on:change={async () => {
		await chats.set(await getChatList(localStorage.token));
	}}
/>

<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
	<nav class="flex flex-col items-center gap-4 px-2 py-4">
		<a
			href="/"
			class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
			on:click={async () => {
				selectedChatId = null;

				await goto('/');
				const newChatButton = document.getElementById('new-chat-button');
				setTimeout(() => {
					newChatButton?.click();
				}, 0);
			}}			
		>
			<Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
			<span class="sr-only">新会话</span>
		</a>
		{#if $user?.role === 'admin'}
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					href="/dashboard"
					class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
					use:builder.action
					{...builder}
				>
					<Home class="h-5 w-5" />
					<span class="sr-only">Dashboard</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Dashboard</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					href="/knowlege"
					class="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
					use:builder.action
					{...builder}
				>
					<File class="h-5 w-5" />
					<span class="sr-only">知识库</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">知识库</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					href="/tools"
					class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
					use:builder.action
					{...builder}
				>
					<Package class="h-5 w-5" />
					<span class="sr-only">工具</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">工具</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					href="/agent"
					class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
					use:builder.action
					{...builder}
				>
					<PanelLeft class="h-5 w-5" />
					<span class="sr-only">Agent</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Agent</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					href="/music"
					class="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
					use:builder.action
					{...builder}
				>
					<Search class="h-5 w-5" />
					<span class="sr-only">图片</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">图片</Tooltip.Content>
		</Tooltip.Root>			
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					href="/statics"
					class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
					use:builder.action
					{...builder}
				>
					<LineChart class="h-5 w-5" />
					<span class="sr-only">统计</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">统计</Tooltip.Content>
		</Tooltip.Root>
		{/if}
	</nav>
	<nav class="mt-auto flex flex-col items-center gap-4 px-2 py-4">
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					on:click={() => {
						showDropdown = !showDropdown;
					}}
					href="##"
					class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
					use:builder.action
					{...builder}
				>
					<Settings class="h-5 w-5" />
					<span class="sr-only">设置</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">设置</Tooltip.Content>
		</Tooltip.Root>
	</nav>
</aside>

<div class="px-2.5">
	{#if $user !== undefined}
		{#if showDropdown}
			<div
				id="dropdownDots"
				class="absolute bottom-[70px] z-40 w-[240px] rounded-lg bg-white shadow dark:bg-gray-900"
				transition:fade|slide={{ duration: 100 }}
			>
				<div class="w-full p-1 py-2">
					{#if $user.role === 'admin'}
						<button
							class="flex w-full rounded-md px-3.5 py-2.5 transition hover:bg-gray-100 dark:hover:bg-gray-800"
							on:click={() => {
								goto('/admin');
								showDropdown = false;
							}}
						>
							<div class=" mr-3 self-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-5 w-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							<div class=" self-center font-medium">{$i18n.t('Admin Panel')}</div>
						</button>

						<button
							class="flex w-full rounded-md px-3.5 py-2.5 transition hover:bg-gray-100 dark:hover:bg-gray-800"
							on:click={() => {
								goto('/playground');
								showDropdown = false;
							}}
						>
							<div class=" mr-3 self-center">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-5 w-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
									/>
								</svg>
							</div>
							<div class=" self-center font-medium">{$i18n.t('Playground')}</div>
						</button>
					{/if}

					<button
						class="flex w-full rounded-md px-3.5 py-2.5 transition hover:bg-gray-100 dark:hover:bg-gray-800"
						on:click={() => {
							showArchivedChatsModal = true;
							showDropdown = false;
						}}
					>
						<div class=" mr-3 self-center">
							<ArchiveBox className="size-5" strokeWidth="1.5" />
						</div>
						<div class=" self-center font-medium">{$i18n.t('Archived Chats')}</div>
					</button>

					<button
						class="flex w-full rounded-md px-3.5 py-2.5 transition hover:bg-gray-100 dark:hover:bg-gray-800"
						on:click={async () => {
							await showSettings.set(true);
							showDropdown = false;
						}}
					>
						<div class=" mr-3 self-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="h-5 w-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
							</svg>
						</div>
						<div class=" self-center font-medium">{$i18n.t('Settings')}</div>
					</button>
				</div>

				<hr class=" m-0 p-0 dark:border-gray-800" />

				<div class="w-full p-1 py-2">
					<button
						class="flex w-full rounded-md px-3.5 py-2.5 transition hover:bg-gray-100 dark:hover:bg-gray-800"
						on:click={() => {
							localStorage.removeItem('token');
							location.href = '/auth';
							showDropdown = false;
						}}
					>
						<div class=" mr-3 self-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								class="h-5 w-5"
							>
								<path
									fill-rule="evenodd"
									d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
									clip-rule="evenodd"
								/>
								<path
									fill-rule="evenodd"
									d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
						<div class=" self-center font-medium">{$i18n.t('Sign Out')}</div>
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>
<!-- <div
	bind:this={navElement}
	class="max-h-3/4 h-screen min-h-screen {show
		? 'w-[120px] lg:relative'
		: 'w-[0px] -translate-x-[260px]'} fixed left-0 top-0 z-50 bg-gray-50 text-sm text-gray-900 transition dark:bg-gray-950 dark:text-gray-200
        "
>



</div> -->
