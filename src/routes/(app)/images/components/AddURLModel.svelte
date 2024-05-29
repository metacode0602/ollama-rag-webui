<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { onMount, getContext } from 'svelte';

	import { getDocs, updateDocByName } from '$lib/apis/documents';
	import Modal from '$lib/components/common/Modal.svelte';
	import { search_images } from '$lib/stores';
  import { Textarea } from "$lib/components/ui/textarea/index.js";

	const i18n = getContext('i18n');

	export let show = false;
	export let selectedDoc;

	let tags: string[] = [];

	let doc = {
		name: '',
		title: '',
		content: null
	};

	const submitHandler = async () => {
		const res = await updateDocByName(localStorage.token, selectedDoc.name, {
			title: doc.title,
			name: doc.name
		}).catch((error) => {
			toast.error(error);
		});

		if (res) {
			show = false;

			search_images.set(await getDocs(localStorage.token));
		}
	};

	onMount(() => {
		if (selectedDoc) {
			doc = JSON.parse(JSON.stringify(selectedDoc));

			tags = doc?.content?.tags ?? [];
		}
	});
</script>

<Modal size="sm" bind:show>
	<div>
		<div class=" flex justify-between px-5 py-4 dark:text-gray-300">
			<div class=" self-center text-lg font-medium">{$i18n.t('Edit Doc')}</div>
			<button
				class="self-center"
				on:click={() => {
					show = false;
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					class="h-5 w-5"
				>
					<path
						d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
					/>
				</svg>
			</button>
		</div>
		<hr class=" dark:border-gray-800" />

		<div class="flex w-full flex-col px-5 py-4 dark:text-gray-200 md:flex-row md:space-x-4">
			<div class=" flex w-full flex-col sm:flex-row sm:justify-center sm:space-x-6">
				<form
					class="flex w-full flex-col"
					on:submit|preventDefault={() => {
						submitHandler();
					}}
				>
					<div class=" flex flex-col space-y-1.5">
						<div class="flex w-full flex-col">
							<div class=" mb-1 text-xs text-gray-500">{$i18n.t('Name Tag')}</div>

							<div class="flex flex-1">
								<div
									class="flex items-center rounded-l-lg border border-r-0 bg-gray-200 px-3 py-1 font-bold dark:border-gray-600 dark:bg-gray-600"
								>
									#
								</div>
								<input
									class="w-full rounded-r-lg px-4 py-2.5 text-sm outline-none disabled:text-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:disabled:text-gray-500"
									type="text"
									bind:value={doc.name}
									autocomplete="off"
									required
								/>
							</div>
						</div>

						<div class="flex w-full flex-col">
							<div class=" mb-1 text-xs text-gray-500">{$i18n.t('Title')}</div>

							<div class="flex-1">
								<Textarea placeholder="Type your message here." bind:value={doc.title} autocomplete="off" required/>
							</div>
						</div>
					</div>

					<div class="flex justify-end pt-5 text-sm font-medium">
						<button
							class=" rounded bg-emerald-600 px-4 py-2 text-gray-100 transition hover:bg-emerald-700"
							type="submit"
						>
							{$i18n.t('Save')}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</Modal>

<style>
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		/* display: none; <- Crashes Chrome on hover */
		-webkit-appearance: none;
		margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
	}

	.tabs::-webkit-scrollbar {
		display: none; /* for Chrome, Safari and Opera */
	}

	.tabs {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	input[type='number'] {
		-moz-appearance: textfield; /* Firefox */
	}
</style>
