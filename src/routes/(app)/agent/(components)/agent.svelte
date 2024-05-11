<script lang="ts">
    import * as Sheet from '$lib/components/ui/sheet';
    import { Button } from '$lib/components/ui/button/index.js';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label/index.js';
    import * as Select from '$lib/components/ui/select/index.js';
    import { Bot } from 'lucide-svelte';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
    import * as Card from '$lib/components/ui/card';
	import { items } from '../data';
    import Plus from 'lucide-svelte/icons/plus';
    import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<div>
    <header class="flex items-center justify-between pt-3 px-4">
    <div class="flex items-center">
        <Bot class="border-2 h-10 w-10 rounded-md" />
        <h3 class="ml-2 font-semibold"> Agent</h3>
    </div>
    <Sheet.Root>
        <Sheet.Trigger>
            <Button size="sm">
                <Plus/>
                新建
            </Button>
        </Sheet.Trigger>
        <Sheet.Content>
            <Sheet.Header>
                <Sheet.Title>创建一个Agent</Sheet.Title>
            </Sheet.Header>
            <!-- 使用权限 -->
            <div class="space-y-1.5 mt-2">
                <!-- 取个名字 -->
                <div class="mb-4">
                    <label class="text-sm font-semibold">取个名字</label>
                    <div class=" flex items-center mt-2">
                      <Bot class="border-2 h-10 w-10 rounded-md" />
                     <Input id="name" placeholder="文件夹名称" class="w-[285px] ml-2" />
                    </div>
                </div>
                <!-- 取个名字 over -->
                <Textarea placeholder="Type your message here." class="h-48"/>

            </div>
            <!-- button -->
            <Sheet.Footer>
                <Sheet.Close asChild let:builder>
                    <Button builders={[builder]} type="submit" class=" mt-6  mx-16 w-64">确认创建</Button>
                </Sheet.Close>
            </Sheet.Footer>
            <!-- button over -->
        </Sheet.Content>
    </Sheet.Root>
</header>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 m-4 bg-slate-50 h-5/6 rounded-md">
    {#each items as item, i (i)}
        <div>
            <Card.Root class="w-74 hover:bg-gray-200 h-52">
                <Card.Header class="flex justify-between">
                    <!-- <div on:click={jumpDataList}> -->
                    <div>
                        <Card.Title>{item.dataname}</Card.Title>
                        <Card.Description style="margin-top: 5px">{item.datatitle}</Card.Description>
                    </div>
                </Card.Header>
                <!-- <div on:click={jumpDataList}> -->
                <div>
                    <Card.Content class="flex justify-between">
                        <p class="text-sm h-full text-ellipsis text-xs overflow-hidden ...">{item.datadescription}</p>
                    </Card.Content>
                    <Card.Footer class="flex justify-end">
                    </Card.Footer>
                </div>
            </Card.Root>
        </div>
    {/each}
</div>
</div>