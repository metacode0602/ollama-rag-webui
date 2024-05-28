<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';

	import fileSaver from 'file-saver';
	const { saveAs } = fileSaver;

	import { goto, invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { user, chats, settings, showSettings, chatId, tags } from '$lib/stores';
	import { onMount, getContext } from 'svelte';

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
	import Tooltip from '../common/Tooltip.svelte';
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

<div
	bind:this={navElement}
	class="max-h-3/4 h-screen min-h-screen {show
		? 'w-[260px] lg:relative'
		: 'w-[0px] -translate-x-[260px]'} fixed left-0 top-0 z-50 bg-gray-50 text-sm text-gray-900 transition dark:bg-gray-950 dark:text-gray-200
        "
>
	<!-- 最左侧导航栏 -->
	<div
		class="my-auto flex h-screen max-h-[100dvh] w-[220px] flex-col justify-between py-2.5 {show
			? ''
			: 'invisible'}"
	>
		<!-- 导航栏内部的按钮或链接容器 -->
		<div class="flex justify-center space-x-2 px-2">
			<!-- 一个链接，点击时触发一系列动作 -->
			<a
				id="sidebar-new-chat-button"
				class="flex flex-grow justify-between rounded-xl px-4 py-2 transition hover:bg-gray-200 dark:hover:bg-gray-900"
				href="/"
				on:click={async () => {
					selectedChatId = null;

					await goto('/');
					const newChatButton = document.getElementById('new-chat-button');
					setTimeout(() => {
						newChatButton?.click();
					}, 0);
				}}
			>
				<!-- 按钮的左侧部分，包含一个图标和文本 -->
				<div class="flex self-center">
					<!-- 图标 -->
					<div class="mr-1.5 self-center">
						<img
							src="/favicon.png"
							class=" size-6 -translate-x-1.5 rounded-full"
							alt="logo"
						/>
					</div>

					<!-- 文本 -->
					<div class=" self-center text-sm font-medium">{$i18n.t('New Chat')}</div>
				</div>

				<!-- 按钮的右侧部分，包含一个向右的箭头图标 -->
				<div class="self-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="h-4 w-4"
					>
						<path
							d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z"
						/>
						<path
							d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z"
						/>
					</svg>
				</div>
			</a>
		</div>

		<!-- 判断当前用户的角色是否为管理员 -->
		{#if $user?.role === 'admin'}
			<!-- 一个居中对齐的div，上边距为0.5单位，包含了一个链接 -->
			<div class="mt-0.5 flex justify-center px-2">
				<a
					class="flex flex-grow space-x-3 rounded-xl px-3.5 py-2 transition hover:bg-gray-200 dark:hover:bg-gray-900"
					href="/modelfiles"
					on:click={() => {
						selectedChatId = null;
						chatId.set('');
					}}
				>
					<div class="self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
							/>
						</svg>
					</div>

					<div class="flex self-center">
						<div class=" self-center text-sm font-medium">{$i18n.t('Modelfiles')}</div>
					</div>
				</a>
			</div>

			<div class="flex justify-center px-2">
				<a
					class="flex flex-grow space-x-3 rounded-xl px-3.5 py-2 transition hover:bg-gray-200 dark:hover:bg-gray-900"
					href="/tools"
					on:click={() => {
						selectedChatId = null;
						chatId.set('');
					}}
				>
					<div class="self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
							/>
						</svg>
					</div>

					<div class="flex self-center">
						<div class=" self-center text-sm font-medium">{$i18n.t('tools')}</div>
					</div>
				</a>
			</div>

			<div class="mb-1 flex justify-center px-2">
				<a
					class="flex flex-grow space-x-3 rounded-xl px-3.5 py-2 transition hover:bg-gray-200 dark:hover:bg-gray-900"
					href="/dataset/database"
					on:click={() => {
						selectedChatId = null;
						chatId.set('');
					}}
				>
					<div class="self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
							/>
						</svg>
					</div>

					<div class="flex self-center">
						<div class=" self-center text-sm font-medium">{$i18n.t('Documents')}</div>
					</div>
				</a>
			</div>

			<!--------------- Agent--------------- -->
			<div class="flex justify-center px-2">
				<a
					class="flex flex-grow space-x-3 rounded-xl px-3.5 py-2 transition hover:bg-gray-200 dark:hover:bg-gray-900"
					href="/agent"
					on:click={() => {
						selectedChatId = null;
						chatId.set('');
					}}
				>
					<div class="self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
							/>
						</svg>
					</div>

					<div class="flex self-center">
						<div class=" self-center text-sm font-medium">{$i18n.t('Agent')}</div>
					</div>
				</a>
			</div>

			<!-- Music -->
			<div class="mb-1 flex justify-center px-2">
				<a
					class="flex flex-grow space-x-3 rounded-xl px-3.5 py-2 transition hover:bg-gray-200 dark:hover:bg-gray-900"
					href="/music"
					on:click={() => {
						selectedChatId = null;
						chatId.set('');
					}}
				>
					<div class="self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
							/>
						</svg>
					</div>

					<div class="flex self-center">
						<div class=" self-center text-sm font-medium">{$i18n.t('Music')}</div>
					</div>
				</a>
			</div>
			
			<!-- Images Search -->
			<div class="mb-1 flex justify-center px-2">
				<a
					class="flex flex-grow space-x-3 rounded-xl px-3.5 py-2 transition hover:bg-gray-200 dark:hover:bg-gray-900"
					href="/images"
					on:click={() => {
						selectedChatId = null;
						chatId.set('');
					}}
				>
					<div class="self-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="2"
							stroke="currentColor"
							class="h-4 w-4"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
							/>
						</svg>
					</div>

					<div class="flex self-center">
						<div class=" self-center text-sm font-medium">{$i18n.t('Images Search')}</div>
					</div>
				</a>
			</div>				
		{/if}

		<div class="relative flex flex-1 flex-col overflow-y-auto">
			{#if !($settings.saveChatHistory ?? true)}
				<div class="absolute z-40 flex h-full w-full justify-center bg-gray-50/90 dark:bg-black/90">
					<div class=" px-5 py-2 text-left">
						<div class=" font-medium">{$i18n.t('Chat History is off for this browser.')}</div>
						<div class="mt-2 text-xs">
							{$i18n.t(
								"When history is turned off, new chats on this browser won't appear in your history on any of your devices."
							)}
							<span class=" font-semibold"
								>{$i18n.t('This setting does not sync across browsers or devices.')}</span
							>
						</div>

						<div class="mt-3">
							<button
								class="flex w-full items-center justify-center space-x-1.5 rounded-lg bg-gray-200 px-3 py-2.5 text-xs font-medium text-gray-800 transition hover:bg-gray-300"
								type="button"
								on:click={() => {
									saveSettings({
										saveChatHistory: true
									});
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="h-3 w-3"
								>
									<path
										fill-rule="evenodd"
										d="M8 1a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-1.5 0v-6.5A.75.75 0 0 1 8 1ZM4.11 3.05a.75.75 0 0 1 0 1.06 5.5 5.5 0 1 0 7.78 0 .75.75 0 0 1 1.06-1.06 7 7 0 1 1-9.9 0 .75.75 0 0 1 1.06 0Z"
										clip-rule="evenodd"
									/>
								</svg>

								<div>{$i18n.t('Enable Chat History')}</div>
							</button>
						</div>
					</div>
				</div>
			{/if}

			<div class="mb-2 mt-1 flex justify-center space-x-2 px-2">
				<div class="flex w-full" id="chat-search">
					<div class="self-center rounded-l-xl bg-white py-2 pl-3 dark:bg-gray-950">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							class="h-4 w-4"
						>
							<path
								fill-rule="evenodd"
								d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>

					<input
						class="w-full rounded-r-xl py-1.5 pl-2.5 pr-4 text-sm outline-none dark:bg-gray-950 dark:text-gray-300"
						placeholder={$i18n.t('Search')}
						bind:value={search}
						on:focus={() => {
							enrichChatsWithContent($chats);
						}}
					/>
				</div>
			</div>

			{#if $tags.length > 0}
				<div class="mb-2 mt-0.5 flex flex-wrap gap-1 px-2.5">
					<button
						class="rounded-full bg-gray-100 px-2.5 text-xs font-medium transition dark:bg-gray-900 dark:hover:bg-gray-800"
						on:click={async () => {
							await chats.set(await getChatList(localStorage.token));
						}}
					>
						all
					</button>
					{#each $tags as tag}
						<button
							class="rounded-full bg-gray-100 px-2.5 text-xs font-medium transition dark:bg-gray-900 dark:hover:bg-gray-800"
							on:click={async () => {
								let chatIds = await getChatListByTagName(localStorage.token, tag.name);
								if (chatIds.length === 0) {
									await tags.set(await getAllChatTags(localStorage.token));
									chatIds = await getChatList(localStorage.token);
								}
								await chats.set(chatIds);
							}}
						>
							{tag.name}
						</button>
					{/each}
				</div>
			{/if}

			<div class="my-2 flex flex-1 flex-col space-y-1 overflow-y-auto pl-2">
				{#each $chats.filter((chat) => {
					if (search === '') {
						return true;
					} else {
						let title = chat.title.toLowerCase();
						const query = search.toLowerCase();

						let contentMatches = false;
						// Access the messages within chat.chat.messages
						if (chat.chat && chat.chat.messages && Array.isArray(chat.chat.messages)) {
							contentMatches = chat.chat.messages.some((message) => {
								// Check if message.content exists and includes the search query
								return message.content && message.content.toLowerCase().includes(query);
							});
						}

						return title.includes(query) || contentMatches;
					}
				}) as chat, i}
					<div class=" group relative w-full pr-2">
						{#if chatTitleEditId === chat.id}
							<div
								class=" flex w-full justify-between rounded-xl px-3 py-2 {chat.id === $chatId ||
								chat.id === chatTitleEditId ||
								chat.id === chatDeleteId
									? 'bg-gray-300 dark:bg-gray-900'
									: chat.id === selectedChatId
										? 'bg-gray-100 dark:bg-gray-950'
										: 'group-hover:bg-gray-100 dark:group-hover:bg-gray-950'}  text-ellipsis whitespace-nowrap"
							>
								<input bind:value={chatTitle} class=" mr-10 w-full bg-transparent outline-none" />
							</div>
						{:else}
							<a
								class=" flex w-full justify-between rounded-xl px-3 py-2 {chat.id === $chatId ||
								chat.id === chatTitleEditId ||
								chat.id === chatDeleteId
									? 'bg-gray-300 dark:bg-gray-900'
									: chat.id === selectedChatId
										? 'bg-gray-100 dark:bg-gray-950'
										: ' group-hover:bg-gray-100 dark:group-hover:bg-gray-950'}  text-ellipsis whitespace-nowrap"
								href="/c/{chat.id}"
								on:click={() => {
									selectedChatId = chat.id;
									if (window.innerWidth < 1024) {
										show = false;
									}
								}}
								draggable="false"
							>
								<div class=" flex w-full flex-1 self-center">
									<div class=" h-[20px] w-full self-center overflow-hidden text-left">
										{chat.title}
									</div>
								</div>
							</a>
						{/if}

						<div
							class="
							
							{chat.id === $chatId || chat.id === chatTitleEditId || chat.id === chatDeleteId
								? 'from-gray-300 dark:from-gray-900'
								: chat.id === selectedChatId
									? 'from-gray-100 dark:from-gray-950'
									: 'invisible from-gray-100 group-hover:visible dark:from-gray-950'}
								absolute right-[10px] top-[10px] bg-gradient-to-l from-80% to-transparent pl-5
								
								  pr-2"
						>
							{#if chatTitleEditId === chat.id}
								<div class="z-10 flex space-x-1.5 self-center">
									<button
										class=" self-center transition dark:hover:text-white"
										on:click={() => {
											editChatTitle(chat.id, chatTitle);
											chatTitleEditId = null;
											chatTitle = '';
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											class="h-4 w-4"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>
									<button
										class=" self-center transition dark:hover:text-white"
										on:click={() => {
											chatTitleEditId = null;
											chatTitle = '';
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											class="h-4 w-4"
										>
											<path
												d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
											/>
										</svg>
									</button>
								</div>
							{:else if chatDeleteId === chat.id}
								<div class="z-10 flex space-x-1.5 self-center">
									<button
										class=" self-center transition dark:hover:text-white"
										on:click={() => {
											deleteChat(chat.id);
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											class="h-4 w-4"
										>
											<path
												fill-rule="evenodd"
												d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
												clip-rule="evenodd"
											/>
										</svg>
									</button>
									<button
										class=" self-center transition dark:hover:text-white"
										on:click={() => {
											chatDeleteId = null;
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											class="h-4 w-4"
										>
											<path
												d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
											/>
										</svg>
									</button>
								</div>
							{:else}
								<div class="z-10 flex space-x-1 self-center">
									<ChatMenu
										chatId={chat.id}
										shareHandler={() => {
											shareChatId = selectedChatId;
											showShareChatModal = true;
										}}
										renameHandler={() => {
											chatTitle = chat.title;
											chatTitleEditId = chat.id;
										}}
										deleteHandler={() => {
											chatDeleteId = chat.id;
										}}
										onClose={() => {
											selectedChatId = null;
										}}
									>
										<button
											aria-label="Chat Menu"
											class=" self-center transition dark:hover:text-white"
											on:click={() => {
												selectedChatId = chat.id;
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 16 16"
												fill="currentColor"
												class="h-4 w-4"
											>
												<path
													d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
												/>
											</svg>
										</button>
									</ChatMenu>

									<Tooltip content="Archive">
										<button
											aria-label="Archive"
											class=" self-center transition dark:hover:text-white"
											on:click={() => {
												archiveChatHandler(chat.id);
											}}
										>
											<ArchiveBox />
										</button>
									</Tooltip>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="px-2.5">
			<!-- <hr class=" border-gray-900 mb-1 w-full" /> -->

			<div class="flex flex-col">
				{#if $user !== undefined}
					<button
						class=" flex w-full rounded-xl px-3.5 py-3 transition hover:bg-gray-200 dark:hover:bg-gray-900"
						on:click={() => {
							showDropdown = !showDropdown;
						}}
					>
						<div class=" mr-3 self-center">
							<img
								src={$user.profile_image_url}
								class=" max-w-[30px] rounded-full object-cover"
								alt="User profile"
							/>
						</div>
						<div class=" self-center font-semibold">{$user.name}</div>
					</button>

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
		</div>
	</div>

	<div
		id="sidebar-handle"
		class="fixed left-0 top-[50dvh] -translate-y-1/2 translate-x-[255px] rotate-0 transition-transform md:translate-x-[260px]"
	>
		<Tooltip
			placement="right"
			content={`${show ? $i18n.t('Close') : $i18n.t('Open')} ${$i18n.t('sidebar')}`}
			touch={false}
		>
			<button
				id="sidebar-toggle-button"
				class=" group"
				on:click={() => {
					show = !show;
				}}
				><span class="" data-state="closed"
					><div
						class="flex h-[72px] w-8 items-center justify-center opacity-50 transition group-hover:opacity-100"
					>
						<div class="flex h-6 w-6 flex-col items-center">
							<div
								class="h-3 w-1 translate-y-[0.15rem] rotate-0 rounded-full bg-[#0f0f0f] dark:bg-white {show
									? 'group-hover:rotate-[15deg]'
									: 'group-hover:rotate-[-15deg]'}"
							/>
							<div
								class="h-3 w-1 translate-y-[-0.15rem] rotate-0 rounded-full bg-[#0f0f0f] dark:bg-white {show
									? 'group-hover:rotate-[-15deg]'
									: 'group-hover:rotate-[15deg]'}"
							/>
						</div>
					</div>
				</span>
			</button>
		</Tooltip>
	</div>
</div>
