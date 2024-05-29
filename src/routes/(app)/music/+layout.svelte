<script lang="ts">
	import PlusCircled from "svelte-radix/PlusCircled.svelte";
	import { AlbumArtwork, Menu, PodcastEmptyPlaceholder, Sidebar } from "./(components)/index.js";
	import { playlists } from "./(data)/playlists.js";
	import { listenNowAlbums, madeForYouAlbums } from "./(data)/albums.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
</script>

<div class="hidden md:block">
	<div class="border-t">
		<div class="bg-background">
			<div class="grid lg:grid-cols-5">
				<Sidebar {playlists} class="hidden lg:block" />
				
				<slot/>
			</div>
		</div>
	</div>
</div>
