<script lang="ts">
    import * as Resizable from "$lib/components/ui/resizable/index.js";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Sheet from '$lib/components/ui/sheet';
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label/index.js';
    import { MessageSquareText } from 'lucide-svelte';
    import { SquareKanban } from 'lucide-svelte';
    import * as Table from "$lib/components/ui/table/index.js";
	import { datalists, invoices } from "../data";
    import { Switch } from "$lib/components/ui/switch";
    import Plus from 'lucide-svelte/icons/plus';
    import { Trash2 } from 'lucide-svelte';
    import { Settings } from 'lucide-svelte';
    import { SquareMenu } from 'lucide-svelte';
    import { Book } from 'lucide-svelte';
</script>
   
<div class="w-screen h-screen px-2">
    <header class="flex items-center justify-between py-3 px-4 ">
    <div class="flex items-center">
        <h3 class="ml-2 font-semibold"> 编排</h3>
    </div>
    <Sheet.Root>
        <Sheet.Trigger>
            <Button size="sm">
                发布
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
                    <Label class="text-sm font-semibold">取个名字</Label>
                    <div class=" flex items-center mt-2">
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
<div class=" h-5/6 w-full bg-slate-50 p-4">
    <Resizable.PaneGroup direction="horizontal" class=" w-screen rounded-lg  ">
        <Resizable.Pane defaultSize={50}>
            <ScrollArea class="h-full w-full rounded-md border">
                <div class="grid w-full gap-1.5 p-4 bg-white">
                    <div class="flex items-center ">
                        <SquareKanban />
                        <Label for="message"class="font-semibold ml-1">提示词</Label>
                    </div>
                    <Textarea placeholder="Type your message here."class="h-48" />
                </div>
                <!-- ----变量------ -->
                <div class="grid w-full gap-1.5 p-4 bg-white mt-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <MessageSquareText />
                            <Label for="message"class="font-semibold ml-1">变量</Label>
                        </div>
                        <Button size="sm" variant="outline">
                            <Plus size="18px"/>
                            <p class="font-semibold text-xs">添加</p>
                        </Button>
                    </div>
                    <Table.Root>
                        <Table.Header>
                          <Table.Row>
                            <Table.Head class="w-[100px] font-semibold text-gray-950">变量KEY</Table.Head>
                            <Table.Head class="font-semibold text-gray-950">字段名称</Table.Head>
                            <Table.Head class="font-semibold text-gray-950">可选</Table.Head>
                            <Table.Head class="text-right font-semibold text-gray-950">操作</Table.Head>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {#each invoices as invoice, i (i)}
                            <Table.Row>
                              <Table.Cell class="font-medium w-28">{invoice.invoice}</Table.Cell>
                              <Table.Cell>{invoice.paymentStatus}</Table.Cell>
                              <Table.Cell><Switch /></Table.Cell>
                              <Table.Cell class="text-justify">
                                <div class="flex justify-end">
                                    <Settings size="18px" class="mr-2"/>
                                    <Trash2 size="18px"/>
                                </div>
                            </Table.Cell>
                            </Table.Row>
                          {/each}
                        </Table.Body>
                      </Table.Root>
                </div>
                <!----------上下文----------->
                <div class="grid w-full gap-1.5 p-4 bg-white mt-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <SquareMenu />
                            <Label for="message"class="font-semibold ml-1">上下文</Label>
                        </div>
                        <Button size="sm" variant="outline">
                            <Plus size="18px"/>
                            <p class="font-semibold text-xs">添加</p>
                        </Button>
                    </div>
                    <div class="border rounded-lg">
                    <Table.Root>
                        <Table.Body>
                          {#each datalists as datalist, i (i)}
                            <Table.Row>
                              <Table.Cell class="font-medium w-[135px]">
                                <div class="flex justify-between font-medium">
                                    <Book />{datalist.dataName}
                                </div>
                            </Table.Cell>
                              <Table.Cell class="text-right">
                                {datalist.dataAmount}
                            </Table.Cell>
                            </Table.Row>
                          {/each}
                        </Table.Body>
                      </Table.Root>
                    </div>
                </div>

                <!----------工具----------->
                <div class="grid w-full gap-1.5 p-4 bg-white mt-4">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <SquareMenu />
                            <Label for="message"class="font-semibold ml-1">上下文</Label>
                        </div>
                        <Button size="sm" variant="outline">
                            <Plus size="18px"/>
                            <p class="font-semibold text-xs">添加</p>
                        </Button>
                    </div>
                    <div class="border rounded-lg">
                    <Table.Root>
                        <Table.Body>
                          {#each datalists as datalist, i (i)}
                            <Table.Row>
                              <Table.Cell class="font-medium w-[135px]">
                                <div class="flex justify-between font-medium">
                                    <Book />{datalist.dataName}
                                </div>
                            </Table.Cell>
                              <Table.Cell class="text-right">
                                {datalist.dataAmount}
                            </Table.Cell>
                            </Table.Row>
                          {/each}
                        </Table.Body>
                      </Table.Root>
                    </div>
                </div>
                
            </ScrollArea>
        </Resizable.Pane>
       
        <Resizable.Pane defaultSize={50}>
            <div class="flex items-center justify-center p-6">
                <span class="font-semibold">One</span>
              </div>
        </Resizable.Pane>
      </Resizable.PaneGroup>
</div>

</div>