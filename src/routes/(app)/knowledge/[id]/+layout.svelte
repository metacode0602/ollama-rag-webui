<script lang="ts">

	import { page } from '$app/stores';
	import Sidebar from "./(components)/sidebar.svelte";
	import SidebarNav from "./(components)/sidebar-nav.svelte";

	let knowledgeId: string | null | undefined = $page.params.id;

	console.warn("knowledgeId", knowledgeId);
	const sidebarNavItems = [
		{
			title: "知识库",
			href: '/knowledge/' + knowledgeId + '/dataset',
		},
		{
			title: "搜索测试",
			href: '/knowledge/' + knowledgeId + '/search',
		},
		{
			title: "参数配置",
			href: '/knowledge/' + knowledgeId + '/setting',
		}
	];

</script>

<div class="hidden md:block">
	<div class="border-t">
		<div class="bg-background">
			<div class="grid lg:grid-cols-5">
				<SidebarNav class="hidden lg:block" />

				<!-- <Sidebar class="hidden lg:block" /> -->
				<slot/>
			</div>
		</div>
	</div>
</div>
