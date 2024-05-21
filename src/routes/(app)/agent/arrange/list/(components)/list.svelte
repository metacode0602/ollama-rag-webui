<script lang="ts">
    import { Search } from 'lucide-svelte';
    import { Input } from '$lib/components/ui/input';
    import * as Dialog from "$lib/components/ui/dialog";
    import Plus from 'lucide-svelte/icons/plus';
    import { Label } from '$lib/components/ui/label/index.js';
    import { SquareUser } from 'lucide-svelte';
    import * as Select from "$lib/components/ui/select/index.js";
    import { Bot } from 'lucide-svelte';
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import { Button } from '$lib/components/ui/button/index.js';
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
	import { invoices } from '../data';
    import { Trash2 } from 'lucide-svelte';
    import { Settings } from 'lucide-svelte';
    import { PenLine } from 'lucide-svelte';
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
    let checked = false;
</script>
<div class="w-screen h-screen p-2">
<div class="flex justify-between items-center px-2  h-16">
    <div class="flex item-center my-[20px] relative justify-center">
        <Search class="absolute left-2 bottom-2"/>
        <Input class="pl-[40px] absolute; box-sizing: border-box w-64"placeholder="搜索"/>
    </div>
    <div>
        <Dialog.Root>
            <Dialog.Trigger class={buttonVariants({ variant: "outline"})}>
                <Plus size="15px"/>
                    <p class="font-semibold text-xs">添加导入</p>
            </Dialog.Trigger>
            <Dialog.Content class="sm:max-w-[550px]">
                <Dialog.Header>
                    <Dialog.Title class="font-semibold">添加标注回复</Dialog.Title>
                </Dialog.Header>
                <form class="h-[450px]">
                    <div class="flex flex-col space-y-1.5">
                        <Label for="name" class="font-semibold">提问</Label>
                        <div class="flex justify-between items-center">
                            <SquareUser/>
                            <Input id="name" placeholder="输入问题 "class="w-11/12" />
                        </div>
                      </div>
                      <div class="flex flex-col space-y-1.5 my-4">
                        <Label for="name" class="font-semibold">回复</Label>
                        <div class="flex justify-between items-center">
                            <Bot/>
                            <Input id="name" placeholder="输入问题" class="w-11/12"/>
                        </div>
                      </div>
                  </form>                              
                  <div class="flex justify-between">
                    <div class="flex items-center space-x-2">
                        <Checkbox id="terms" bind:checked aria-labelledby="terms-label" />
                        <Label
                          id="terms-label"
                          for="terms"
                          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          添加下一个标注回复
                        </Label>
                      </div>
                    <Button type="submit">保存</Button>
                </div>
                </Dialog.Content>
              </Dialog.Root>              
                                                  
    </div>
</div>


<div class="w-full h-3/4 ">
    <ScrollArea class="h-full w-full rounded-md ">   
    <Table.Root>
        <Table.Header class="">
          <Table.Row>
            <Table.Head class="w-1/3 font-semibold">提问</Table.Head>
            <Table.Head class="w-1/3 font-semibold">回答</Table.Head>
            <Table.Head class="font-semibold">创建时间</Table.Head>
            <Table.Head class="font-semibold">命中次数</Table.Head>
            <Table.Head class="text-right font-semibold">操作</Table.Head>
          </Table.Row>
        </Table.Header>       
        <Table.Body>
          {#each invoices as invoice, i (i)}
            <Table.Row>
              <Table.Cell class="font-medium "><p class="w-4/5 truncate ...">{invoice.invoice}</p></Table.Cell>
              <Table.Cell class="font-medium"><p class="w-4/5 truncate ...">{invoice.answer}</p></Table.Cell>
              <Table.Cell>{invoice.paymentStatus}</Table.Cell>
              <Table.Cell>{invoice.totalAmount}</Table.Cell>
              <Table.Cell class="text-right">
                <div class="flex justify-end">
                    <PenLine size="18px" class="mr-2"/>
                    <Trash2 size="18px"/>
                </div>
              </Table.Cell>
            </Table.Row>
          {/each}       
        </Table.Body>  
    </Table.Root> 
</ScrollArea>   
</div>

    <div class="flex justify-end pt-2 mr-4">
        <Button href="/agent/arrange" size="lg">返回</Button>
    </div>
</div>