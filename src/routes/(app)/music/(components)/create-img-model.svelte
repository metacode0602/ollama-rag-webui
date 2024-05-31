<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Jumper } from 'svelte-loading-spinners';
	import { navigating } from '$app/stores';

	export let open: boolean = false;

	let url: string = '';

	const submitHandler = async () => {
		const res = await createImgFromUrls(localStorage.token, {
			url: url
		});
	};
</script>

{#if $navigating}
	<Jumper size="60" color="#FF3E00" unit="px" duration="1s" />
{/if}

<Dialog.Root bind:open>
	<Dialog.Content class="sm:max-w-[725px]">
		<form
			class="flex h-full flex-col justify-between space-y-3 text-sm"
			on:submit|preventDefault={() => {
				submitHandler();
			}}
		>
			<Dialog.Header>
				<Dialog.Title>上传图片</Dialog.Title>
				<Dialog.Description>
					请输入要上传的图片URL地址。可以上传多个，用英文分号分割
				</Dialog.Description>
			</Dialog.Header>
			<div class="grid w-full gap-4 py-4">
				<div class="grid grid-cols-6 items-center gap-4">
					<Label for="username" class="text-right">URL地址</Label>
					<Textarea
						placeholder="请输入要上传图片的URL地址"
						bind:value={url}
						class="col-span-5"
						required
					/>
				</div>
			</div>
			<Dialog.Footer>
				<Button type="submit">开始上传</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
