<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import { goto } from '$app/navigation';
   
    export let id: string;

    function jumpDetailFun(){
      // navigator.clipboard.writeText(id)
      goto('/dataset/datatasks/datadetails');
    }
  </script>
   
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        variant="ghost"
        builders={[builder]}
        size="icon"
        class="relative h-8 w-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <Ellipsis class="h-4 w-4" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
       
        <DropdownMenu.Item on:click={jumpDetailFun}>
          同步数据
        </DropdownMenu.Item>
        <DropdownMenu.Item>重命名</DropdownMenu.Item>
        <DropdownMenu.Item>移动</DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>删除</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>