<script lang="ts">
	import Sidebar from "./(components)/sidebar.svelte";
</script>

<div class="hidden md:block">
	<div class="border-t">
		<div class="bg-background">
			<div class="grid lg:grid-cols-5">
				<Sidebar class="hidden lg:block" />
				<slot/>
			</div>
		</div>
	</div>
</div>
