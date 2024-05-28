<script lang="ts">
	import { toast } from 'svelte-sonner';
	import fileSaver from 'file-saver';
	const { saveAs } = fileSaver;

	import { onMount, getContext } from 'svelte';
	import { WEBUI_NAME, documents } from '$lib/stores';
	import { createNewDoc, deleteDocByName, getDocs } from '$lib/apis/documents';

	import { SUPPORTED_IMAGE_TYPE, SUPPORTED_IMAGE_EXTENSIONS } from '$lib/constants';
	import { uploadDocToVectorDB, queryImages } from '$lib/apis/llama';
	import { transformFileName } from '$lib/utils';

	import Checkbox from '$lib/components/common/Checkbox.svelte';
  import * as Avatar from "$lib/components/ui/avatar";

	import EditDocModal from '$lib/components/documents/EditDocModal.svelte';
	import AddFilesPlaceholder from '$lib/components/AddFilesPlaceholder.svelte';
	import SettingsModal from '$lib/components/documents/SettingsModal.svelte';
	import AddDocModal from '$lib/components/documents/AddDocModal.svelte';

	const i18n = getContext('i18n');

	let importFiles = '';

	let inputFiles = '';
	let query = '';
	let documentsImportInputElement: HTMLInputElement;
	let tags = [];

	let showSettingsModal = false;
	let showAddDocModal = false;
	let showEditDocModal = false;
	let selectedDoc;
	let selectedTag = '';

	let dragged = false;
	// 定义一个异步函数 deleteDoc，它接受一个文件名作为参数，并尝试删除该文件
	// 它使用 localStorage.token 作为认证信息
	const deleteDoc = async (name) => {
		// 调用 deleteDocByName 函数（假设是另一个异步函数）来删除文件
		await deleteDocByName(localStorage.token, name);
		// 更新本地存储的文档列表
		await documents.set(await getDocs(localStorage.token));
	};

	// 定义一个异步函数 deleteDocs，它接受一个文档数组作为参数，并尝试删除这些文档
	const deleteDocs = async (docs) => {
		// 使用 Promise.all 来并行处理每个文档的删除
		// docs.map 返回一个 Promise 数组，每个 Promise 调用 deleteDocByName 函数
		const res = await Promise.all(
			docs.map(async (doc) => {
				return await deleteDocByName(localStorage.token, doc.name);
			})
		);

		// 所有文档删除后，更新本地存储的文档列表
		await documents.set(await getDocs(localStorage.token));
	};

	// 定义一个异步函数 uploadDoc，它接受一个文件对象作为参数，并尝试上传这个文件
	const uploadDoc = async (file) => {
		// 调用 uploadDocToVectorDB 函数（假设是另一个异步函数）来上传文件，并捕获任何错误
		const res = await uploadDocToVectorDB(localStorage.token, '', file).catch((error) => {
			toast.error(error);
			return null;
		});

		// 如果上传成功，则创建一个新的文档记录
		if (res) {
			toast.success($i18n.t('documents.upload_success'));
			// await createNewDoc(
			// 	localStorage.token,
			// 	res.collection_name,
			// 	res.filename,
			// 	transformFileName(res.filename),
			// 	res.filename
			// ).catch((error) => {
			// 	toast.error(error);
			// 	return null;
			// });
			// 更新本地存储的文档列表
			// await documents.set(await getDocs(localStorage.token));
		}
	};

	const search = async () => {
		// 调用 getDocs 函数（假设是另一个异步函数）来获取文档列表
		const res = await queryImages(localStorage.token, query);
		// 更新本地存储的文档列表
		await documents.set(res);
	};

	// 当有东西被拖动到 dropZone 上时，阻止默认行为，并设置 dragged 为 true
	const onDragOver = (e) => {
		e.preventDefault();
		dragged = true;
	};

	// 当拖动离开 dropZone 时，将 dragged 设置为 false
	const onDragLeave = () => {
		dragged = false;
	};

	// 当有东西被放下在 dropZone 上时，处理文件
	const onDrop = async (e) => {
		e.preventDefault();
		console.log(e);

		// 检查是否有文件被拖动
		if (e.dataTransfer?.files) {
			// 创建一个 FileReader 对象来读取文件内容
			let reader = new FileReader();

			// 当文件读取完成后，将文件对象添加到 files 数组中
			// 注意：这里假设 files 是在函数外部定义的一个响应式变量或状态
			reader.onload = (event) => {
				files = [
					...files,
					{
						type: 'image',
						url: `${event.target.result}` // 这里获取的是文件的 base64 编码
					}
				];
			};
			// 这里缺少了读取文件的代码，通常应该像这样：
			// reader.readAsDataURL(e.dataTransfer.files[0]);

			// 假设e是一个事件对象，通常来自drag-and-drop操作
			// 使用可选链操作符（?.）来安全地访问dataTransfer属性中的files属性

			const inputFiles = e.dataTransfer?.files;

			// 检查是否获取到了文件列表，并且列表长度大于0
			if (inputFiles && inputFiles.length > 0) {
				for (const file of inputFiles) {
					console.log(file, file.name.split('.').at(-1));
					if (
						SUPPORTED_IMAGE_TYPE.includes(file['type']) ||
						SUPPORTED_IMAGE_EXTENSIONS.includes(file.name.split('.').at(-1))
					) {
						uploadDoc(file);
					} else {
						toast.error(
							`Unknown File Type '${file['type']}', but accepting and treating as plain text`
						);
						uploadDoc(file);
					}
				}
			} else {
				toast.error($i18n.t(`File not found.`));
			}
		}

		dragged = false;
	};

	// 在组件挂载时执行以下代码
	onMount(() => {
		// 订阅 documents（假设它是一个响应式存储或类似的东西）的更新
		// 当文档列表更新时，它使用 reduce 方法来收集所有唯一的标签名
		documents.subscribe((docs) => {
			tags = docs.reduce((a, e, i, arr) => {
				// 遍历每个文档，并检查其 content 是否有 tags 属性
				// 如果有，则使用 map 方法提取标签名，并使用 Set 来去重
				// 然后将结果合并到累积器 a 中
				return [...new Set([...a, ...(e?.content?.tags ?? []).map((tag) => tag.name)])];
			}, []);
		});
		// 选择 body 元素作为拖放区域
		const dropZone = document.querySelector('body');

		dropZone?.addEventListener('dragover', onDragOver);
		dropZone?.addEventListener('drop', onDrop);
		dropZone?.addEventListener('dragleave', onDragLeave);

		return () => {
			dropZone?.removeEventListener('dragover', onDragOver);
			dropZone?.removeEventListener('drop', onDrop);
			dropZone?.removeEventListener('dragleave', onDragLeave);
		};
	});

	let filteredDocs;

	$: filteredDocs = $documents.filter(
		(doc) =>
			(selectedTag === '' ||
				(doc?.content?.tags ?? []).map((tag) => tag.name).includes(selectedTag)) &&
			(query === '' || doc.name.includes(query))
	);
</script>

<svelte:head>
	<title>{$i18n.t('Images Search')} | {$WEBUI_NAME}</title>
</svelte:head>

{#if dragged}
	<div
		class="pointer-events-none fixed z-50 flex h-full w-full touch-none"
		id="dropzone"
		role="region"
		aria-label="Drag and Drop Container"
	>
		<div class="absolute flex h-full w-full justify-center rounded-xl bg-gray-800/40 backdrop-blur">
			<div class="m-auto flex flex-col justify-center pt-64">
				<div class="max-w-md">
					<AddFilesPlaceholder>
						<div class=" mt-2 w-full text-center text-sm dark:text-gray-200">
							将图片文件拖放到这里进行搜索
						</div>
					</AddFilesPlaceholder>
				</div>
			</div>
		</div>
	</div>
{/if}

{#key selectedDoc}
	<EditDocModal bind:show={showEditDocModal} {selectedDoc} />
{/key}

<AddDocModal bind:show={showAddDocModal} />

<SettingsModal bind:show={showSettingsModal} />

<div class="flex max-h-[100dvh] min-h-screen w-full justify-center dark:text-white">
	<div class=" flex w-full flex-col justify-between overflow-y-auto">
		<div class="mx-auto my-10 w-full max-w-2xl px-3 md:px-0">
			<div class="mb-6">
				<div class="flex items-center justify-between">
					<div class=" self-center text-2xl font-semibold">{$i18n.t('Images Search')}</div>

					<div>
						<button
							class="flex items-center space-x-1 rounded-xl bg-gray-50 px-3 py-1.5 transition hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
							type="button"
							on:click={() => {
								showSettingsModal = !showSettingsModal;
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="h-4 w-4"
							>
								<path
									fill-rule="evenodd"
									d="M6.955 1.45A.5.5 0 0 1 7.452 1h1.096a.5.5 0 0 1 .497.45l.17 1.699c.484.12.94.312 1.356.562l1.321-1.081a.5.5 0 0 1 .67.033l.774.775a.5.5 0 0 1 .034.67l-1.08 1.32c.25.417.44.873.561 1.357l1.699.17a.5.5 0 0 1 .45.497v1.096a.5.5 0 0 1-.45.497l-1.699.17c-.12.484-.312.94-.562 1.356l1.082 1.322a.5.5 0 0 1-.034.67l-.774.774a.5.5 0 0 1-.67.033l-1.322-1.08c-.416.25-.872.44-1.356.561l-.17 1.699a.5.5 0 0 1-.497.45H7.452a.5.5 0 0 1-.497-.45l-.17-1.699a4.973 4.973 0 0 1-1.356-.562L4.108 13.37a.5.5 0 0 1-.67-.033l-.774-.775a.5.5 0 0 1-.034-.67l1.08-1.32a4.971 4.971 0 0 1-.561-1.357l-1.699-.17A.5.5 0 0 1 1 8.548V7.452a.5.5 0 0 1 .45-.497l1.699-.17c.12-.484.312-.94.562-1.356L2.629 4.107a.5.5 0 0 1 .034-.67l.774-.774a.5.5 0 0 1 .67-.033L5.43 3.71a4.97 4.97 0 0 1 1.356-.561l.17-1.699ZM6 8c0 .538.212 1.026.558 1.385l.057.057a2 2 0 0 0 2.828-2.828l-.058-.056A2 2 0 0 0 6 8Z"
									clip-rule="evenodd"
								/>
							</svg>

							<div class=" text-xs">{$i18n.t('Image Search Settings')}</div>
						</button>
					</div>
				</div>
				<div class=" mt-1 text-xs text-gray-500">
					ⓘ {$i18n.t("Use '#' in the prompt input to load and select your documents.")}
				</div>
			</div>

			<div class=" flex w-full space-x-2">
				<div class="flex flex-1">
					<!-- <div class=" ml-1 mr-3 self-center">
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
					</div> -->
					<input
						class=" w-full rounded-r-xl bg-transparent py-1 pr-4 text-sm outline-none"
						bind:value={query}
						placeholder={$i18n.t('Search Images')}
					/>
				</div>
				
				<div class=" flex flex-1 items-center justify-end">
					<button
						class=" flex items-center space-x-1 rounded-xl border border-gray-200 px-2 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-0 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
						on:click={() => {
							search();
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
							d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
							clip-rule="evenodd"
							/>						
						</svg>
					</button>
				</div>

				<div>
					<button
						class=" flex items-center space-x-1 rounded-xl border border-gray-200 px-2 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-0 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
						on:click={() => {
							showAddDocModal = true;
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="h-4 w-4"
						>
							<path
								d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z"
							/>
						</svg>
					</button>
				</div>
			</div>

			<div>
				<div
					class="my-3 rounded-lg border-2 border-dashed py-16 dark:border-gray-600 {dragged &&
						' dark:bg-gray-700'} "
					role="region"
					on:drop={onDrop}
					on:dragover={onDragOver}
					on:dragleave={onDragLeave}
				>
					<div class="  pointer-events-none">
						<div class="flex h-full flex-col items-center justify-center space-y-2 text-center">
							<Avatar.Root>
								<Avatar.Fallback>+</Avatar.Fallback>
							</Avatar.Root>
						</div>
						<div class="z-50 text-center text-2xl font-semibold dark:text-white">						
							{$i18n.t('Add Files')}
						</div>

						<div class=" mt-2 w-full text-center text-sm dark:text-gray-200">
							Drop any files here to add to my documents
						</div>
					</div>
				</div>
			</div>

			<hr class=" my-2.5 dark:border-gray-700" />

			{#if tags.length > 0}
				<div class="flex flex-wrap gap-1 px-2.5 pt-1">
					<div class="my-auto ml-0.5 flex items-center pr-3">
						<Checkbox
							state={filteredDocs.filter((doc) => doc?.selected === 'checked').length ===
							filteredDocs.length
								? 'checked'
								: 'unchecked'}
							indeterminate={filteredDocs.filter((doc) => doc?.selected === 'checked').length > 0 &&
								filteredDocs.filter((doc) => doc?.selected === 'checked').length !==
									filteredDocs.length}
							on:change={(e) => {
								if (e.detail === 'checked') {
									filteredDocs = filteredDocs.map((doc) => ({ ...doc, selected: 'checked' }));
								} else if (e.detail === 'unchecked') {
									filteredDocs = filteredDocs.map((doc) => ({ ...doc, selected: 'unchecked' }));
								}
							}}
						/>
					</div>

					{#if filteredDocs.filter((doc) => doc?.selected === 'checked').length === 0}
						<button
							class="flex h-fit items-center space-x-1 rounded-full bg-gray-50 px-2 py-0.5 transition hover:bg-gray-100 dark:bg-gray-800 dark:text-white"
							on:click={async () => {
								selectedTag = '';
								// await chats.set(await getChatListByTagName(localStorage.token, tag.name));
							}}
						>
							<div class=" line-clamp-1 self-center text-xs font-medium">{$i18n.t('all')}</div>
						</button>

						{#each tags as tag}
							<button
								class="flex h-fit items-center space-x-1 rounded-full bg-gray-50 px-2 py-0.5 transition hover:bg-gray-100 dark:bg-gray-800 dark:text-white"
								on:click={async () => {
									selectedTag = tag;
									// await chats.set(await getChatListByTagName(localStorage.token, tag.name));
								}}
							>
								<div class=" line-clamp-1 self-center text-xs font-medium">
									#{tag}
								</div>
							</button>
						{/each}
					{:else}
						<div class="flex w-full flex-1 items-center justify-between">
							<div class="mr-1 self-center py-0.5 text-xs font-medium">
								{filteredDocs.filter((doc) => doc?.selected === 'checked').length} Selected
							</div>

							<div class="flex gap-1">
								<!-- <button
									class="px-2 py-0.5 space-x-1 flex h-fit items-center rounded-full transition bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:text-white"
									on:click={async () => {
										selectedTag = '';
										// await chats.set(await getChatListByTagName(localStorage.token, tag.name));
									}}
								>
									<div class=" text-xs font-medium self-center line-clamp-1">{$i18n.t('add tags')}</div>
								</button> -->

								<button
									class="flex h-fit items-center space-x-1 rounded-full bg-gray-50 px-2 py-0.5 transition hover:bg-gray-100 dark:bg-gray-800 dark:text-white"
									on:click={async () => {
										deleteDocs(filteredDocs.filter((doc) => doc.selected === 'checked'));
										// await chats.set(await getChatListByTagName(localStorage.token, tag.name));
									}}
								>
									<div class=" line-clamp-1 self-center text-xs font-medium">
										{$i18n.t('delete')}
									</div>
								</button>
							</div>
						</div>
					{/if}
				</div>
			{/if}

			<div class="my-3 mb-5">
				{#each filteredDocs as doc}
					<button
						class=" flex w-full cursor-pointer space-x-4 rounded-xl px-3 py-2 text-left hover:bg-black/5 dark:hover:bg-white/5"
						on:click={() => {
							if (doc?.selected === 'checked') {
								doc.selected = 'unchecked';
							} else {
								doc.selected = 'checked';
							}
						}}
					>
						<div class="my-auto flex items-center">
							<Checkbox state={doc?.selected ?? 'unchecked'} />
						</div>
						<div class=" flex w-full flex-1 cursor-pointer space-x-4">
							<div class=" flex items-center space-x-3">
								<div class="rounded-lg bg-red-400 p-2.5 text-white">
									{#if doc}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											class="h-6 w-6"
										>
											<path
												fill-rule="evenodd"
												d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z"
												clip-rule="evenodd"
											/>
											<path
												d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"
											/>
										</svg>
									{:else}
										<svg
											class=" h-6 w-6 translate-y-[0.5px]"
											fill="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg"
											><style>
												.spinner_qM83 {
													animation: spinner_8HQG 1.05s infinite;
												}
												.spinner_oXPr {
													animation-delay: 0.1s;
												}
												.spinner_ZTLf {
													animation-delay: 0.2s;
												}
												@keyframes spinner_8HQG {
													0%,
													57.14% {
														animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
														transform: translate(0);
													}
													28.57% {
														animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
														transform: translateY(-6px);
													}
													100% {
														transform: translate(0);
													}
												}
											</style><circle class="spinner_qM83" cx="4" cy="12" r="2.5" /><circle
												class="spinner_qM83 spinner_oXPr"
												cx="12"
												cy="12"
												r="2.5"
											/><circle class="spinner_qM83 spinner_ZTLf" cx="20" cy="12" r="2.5" /></svg
										>
									{/if}
								</div>
								<div class=" flex-1 self-center">
									<div class=" line-clamp-1 font-bold">#{doc.name} ({doc.filename})</div>
									<div class=" line-clamp-1 overflow-hidden text-ellipsis text-xs">
										{doc.title}
									</div>
								</div>
							</div>
						</div>
						<div class="flex flex-row space-x-1 self-center">
							<button
								class="z-20 w-fit self-center rounded-xl px-2 py-2 text-sm hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
								type="button"
								on:click={async (e) => {
									e.stopPropagation();
									showEditDocModal = !showEditDocModal;
									selectedDoc = doc;
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
									/>
								</svg>
							</button>

							<!-- <button
						class="self-center w-fit text-sm px-2 py-2 border dark:border-gray-600 rounded-xl"
						type="button"
						on:click={() => {
							console.log('download file');
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							fill="currentColor"
							class="w-4 h-4"
						>
							<path
								d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z"
							/>
							<path
								d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z"
							/>
						</svg>
					</button> -->

							<button
								class="w-fit self-center rounded-xl px-2 py-2 text-sm hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
								type="button"
								on:click={(e) => {
									e.stopPropagation();

									deleteDoc(doc.name);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-4 w-4"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
						</div>
					</button>
				{/each}
			</div>

			<div class=" mb-2 flex w-full justify-end">
				<div class="flex space-x-2">
					<input
						id="documents-import-input"
						bind:this={documentsImportInputElement}
						bind:files={importFiles}
						type="file"
						accept=".json"
						hidden
						on:change={() => {
							console.log(importFiles);

							const reader = new FileReader();
							reader.onload = async (event) => {
								const savedDocs = JSON.parse(event.target.result);
								console.log(savedDocs);

								for (const doc of savedDocs) {
									await createNewDoc(
										localStorage.token,
										doc.collection_name,
										doc.filename,
										doc.name,
										doc.title
									).catch((error) => {
										toast.error(error);
										return null;
									});
								}

								await documents.set(await getDocs(localStorage.token));
							};

							reader.readAsText(importFiles[0]);
						}}
					/>

					<button
						class="flex items-center space-x-1 rounded-xl bg-gray-50 px-3 py-1.5 text-xs transition hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						on:click={() => {
							documentsImportInputElement.click();
						}}
					>
						<div class=" mr-2 self-center font-medium">{$i18n.t('Import Documents Mapping')}</div>

						<div class=" self-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="h-4 w-4"
							>
								<path
									fill-rule="evenodd"
									d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm4 9.5a.75.75 0 0 1-.75-.75V8.06l-.72.72a.75.75 0 0 1-1.06-1.06l2-2a.75.75 0 0 1 1.06 0l2 2a.75.75 0 1 1-1.06 1.06l-.72-.72v2.69a.75.75 0 0 1-.75.75Z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</button>

					<button
						class="flex items-center space-x-1 rounded-xl bg-gray-50 px-3 py-1.5 text-xs transition hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
						on:click={async () => {
							let blob = new Blob([JSON.stringify($documents)], {
								type: 'application/json'
							});
							saveAs(blob, `documents-mapping-export-${Date.now()}.json`);
						}}
					>
						<div class=" mr-2 self-center font-medium">{$i18n.t('Export Documents Mapping')}</div>

						<div class=" self-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								fill="currentColor"
								class="h-4 w-4"
							>
								<path
									fill-rule="evenodd"
									d="M4 2a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6.621a1.5 1.5 0 0 0-.44-1.06L9.94 2.439A1.5 1.5 0 0 0 8.878 2H4Zm4 3.5a.75.75 0 0 1 .75.75v2.69l.72-.72a.75.75 0 1 1 1.06 1.06l-2 2a.75.75 0 0 1-1.06 0l-2-2a.75.75 0 0 1 1.06-1.06l.72.72V6.25A.75.75 0 0 1 8 5.5Z"
									clip-rule="evenodd"
								/>
							</svg>
						</div>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
