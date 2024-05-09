<script lang="ts">
	import { accounts, mails } from "./data.js";
	import Mail from "./(components)/mail.svelte";
	
</script>

<Mail
	{accounts}
	{mails}
	navCollapsedSize={4}
/>
