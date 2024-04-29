<script lang="ts">
	import { accounts, mails } from "./data.js";
	import DataTable from "./(components)/data-table.svelte";
	import UserNav from "./(components)/user-nav.svelte";
	import data from "./(data)/tasks.json";
	
</script>
<div class="container mx-auto py-10">
<DataTable
	{accounts}
	{mails}
	navCollapsedSize={4}
	{data}
/>
</div>
