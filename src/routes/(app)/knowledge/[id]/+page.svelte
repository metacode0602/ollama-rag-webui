<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	const id = $page.params.id;
	onMount(() => {
		goto('/knowledge/' + id + '/dataset');
	});
</script>
