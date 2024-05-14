<script lang="ts" context="module">
    import { z } from "zod";
    export const formSchema = z.object({
      marketing_emails: z.boolean().default(false).optional(),
      security_emails: z.boolean().default(true)
    });
    export type FormSchema = typeof formSchema;
</script>
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
	import { datalists, frameworks, invoices, tools } from "../data";
    import { Switch } from "$lib/components/ui/switch";
    import Plus from 'lucide-svelte/icons/plus';
    import { Trash2 } from 'lucide-svelte';
    import { Settings } from 'lucide-svelte';
    import { SquareMenu } from 'lucide-svelte';
    import { Book } from 'lucide-svelte';
    import * as Select from "$lib/components/ui/select/index.js";
    import { Bot } from 'lucide-svelte';
    import { SendHorizontal } from 'lucide-svelte';
    import { LayoutGrid } from 'lucide-svelte';
    import { PenLine } from 'lucide-svelte';
    import { Text } from 'lucide-svelte';
    import { MessageCircleMore } from 'lucide-svelte';
    import { Globe } from 'lucide-svelte';
    import { RefreshCw } from 'lucide-svelte';
    import { ChevronDown } from 'lucide-svelte';
    import { Settings2 } from 'lucide-svelte';
    import * as Popover from "$lib/components/ui/popover/index.js";
    import { Slider } from "$lib/components/ui/slider/index.js";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import * as Dialog from "$lib/components/ui/dialog";
    import { buttonVariants } from "$lib/components/ui/button/index.js";
    import { Repeat2 } from 'lucide-svelte';
    import { Search } from 'lucide-svelte';
</script>
   
<div class="w-screen h-screen px-2">
    <header class="flex  justify-between py-3 px-4 ">
    <div class="flex items-center">
        <h3 class="ml-2 font-semibold"> 编排</h3>
    </div>
    <div>
        <Dialog.Root>
            <Dialog.Trigger class={buttonVariants({ variant: "outline"})}
             >
             <Settings size="18px"/>
             Agent设置
             </Dialog.Trigger>
            <Dialog.Content class="sm:max-w-[450px]">
                <Dialog.Header>
                    <Dialog.Title class="font-semibold">Agent设置</Dialog.Title>
                  </Dialog.Header>
                  <div class="border rounded-lg">
                    <Table.Root>
                        <Table.Body>
                            <Table.Row>
                              <Table.Cell class="font-medium w-[200px]">
                                <div class="flex items-center space-x-2 font-medium">
                                    <Book /><p>Agent Modle</p>
                                </div>
                            </Table.Cell>
                              <Table.Cell class="text-right">
                                ReAct
                            </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                      </Table.Root>
                    </div>

                    <div class="border rounded-lg">
                        <Table.Root>
                            <Table.Body>
                                <Table.Row>
                                  <Table.Cell class="font-medium w-[150px]">
                                    <div class="flex items-center space-x-2  font-medium">
                                        <Repeat2 /><p>最大迭代次数</p>
                                    </div>
                                </Table.Cell>
                                  <Table.Cell>
                                    <div class="flex justify-between w-full">
                                        <Slider value={[50]} max={100} step={1} class="max-w-[90%]" />
                                        <p>5</p>
                                      </div>
                                </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                          </Table.Root>
                        </div>

                        <div>
                            <Textarea placeholder="Type your message here." class="h-64"/>
                        </div>
                    
                  <Dialog.Footer>
                    <Button type="submit">保存</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Root>
        
        <Popover.Root portal={null}>
            <Popover.Trigger asChild let:builder>
              <Button builders={[builder]} variant="outline" class="w-44 ">
                <Bot size="18px"/>
                <p>llama3:8b</p>
                <div class="w-12 h-6 border rounded-md mx-1">
                <p>CHAT</p>
                </div>
            <Settings2 size="18px"/>
            </Button>
            </Popover.Trigger>
            <Popover.Content class="w-[550px]">
              <div class="grid gap-4">
                <div class="flex justify-between items-center space-y-2">
                  <h4 class="font-semibold leading-none">模型</h4>
                  <div>
                    <Button size="sm" variant="outline" class="w-44 ">
                        <Bot size="18px"/>
                        <p>llama3:8b</p>
                        <div class="w-12 h-6 border rounded-md mx-2">
                        <p>CHAT</p>
                        </div>
                        <ChevronDown size="18px"/>
                    </Button>
                  </div>
                </div>
                <p class="font-semibold">参数</p>
                <div class="grid gap-2">
                  <div class="flex justify-between items-center gap-4 my-3">
                    <div class="flex items-center space-x-2 w-56">
                        <Label for="airplane-mode">Temperatrue</Label>
                        <Switch id="airplane-mode" />                       
                      </div>
                      <div class="flex justify-between w-full">
                        <Slider value={[50]} max={100} step={1} class="max-w-[80%]" />
                        <Badge>0.5</Badge>
                      </div>                     
                  </div>
                  <div class="flex justify-between items-center gap-4 my-3">
                    <div class="flex items-center space-x-2 w-56">
                        <Label for="airplane-mode">Top P</Label>
                        <Switch id="airplane-mode" />
                      </div>
                      <div class="flex justify-between w-full">
                        <Slider value={[50]} max={100} step={1} class="max-w-[80%]" />
                        <Badge>0.5</Badge>
                        
                      </div>
                  </div>
                  <div class="flex justify-between items-center gap-4 my-3">
                    <div class="flex items-center space-x-2 w-56">
                        <Label for="airplane-mode">Top K</Label>
                        <Switch id="airplane-mode" />                       
                      </div>
                      <div class="flex justify-between w-full">
                        <Slider value={[50]} max={100} step={1} class="max-w-[80%]" />
                        <Badge>3</Badge>
                      </div>
                  </div>
                  <div class="flex justify-between items-center gap-4 my-3">
                    <div class="flex items-center space-x-2 w-56">
                        <Label for="airplane-mode">Num Predict</Label>
                        <Switch id="airplane-mode" />                       
                    </div>
                    <div class="flex justify-between w-full">
                        <Slider value={[50]} max={100} step={1} class="max-w-[80%]" />
                        <Badge>45</Badge>
                    </div>
                  </div>
                  <div class="flex justify-between items-center gap-4 my-3">
                    <div class="flex items-center space-x-2 w-56">
                        <Label for="airplane-mode">Mirostat Eta</Label>
                        <Switch id="airplane-mode" />                       
                    </div>
                    <div class="flex justify-between w-full">
                        <Slider value={[50]} max={100} step={1} class="max-w-[80%]" />
                        <Badge>45</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Content>
          </Popover.Root>
       
    <Sheet.Root>
        <Sheet.Trigger>
            <Button size="sm" style="position:relative;top:-5px">               
                <p class="mx-2">发布</p>
                <ChevronDown size="17px"/>               
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
</div>
</header>
<div class=" h-5/6 w-full bg-white border rounded-lg p-4">
    <Resizable.PaneGroup direction="horizontal" class=" w-screen rounded-lg  ">
        <Resizable.Pane defaultSize={50}>
            <ScrollArea class="h-full w-full rounded-md ">
                <div class="grid w-full gap-1.5 p-4 bg-white">
                    <div class="flex items-center ">
                        <MessageSquareText />
                        <Label for="message"class="font-semibold ml-1">提示词</Label>
                    </div>
                    <Textarea placeholder="Type your message here."class="h-48" />
                </div>
                <!-- ----变量------ -->
                <div class="grid w-full gap-1.5 p-4 bg-white mt-4 border rounded-lg">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <SquareKanban />                           
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
                <div class="grid w-full gap-1.5 p-4 bg-white mt-4 border rounded-lg">
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
                <div class="grid w-full gap-1.5 p-4 bg-white mt-4 border rounded-lg">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <LayoutGrid />
                            <Label for="message"class="font-semibold ml-1">工具</Label>
                        </div>
                        <div>
                        <Label class="mb-2 mr-2 " style="position:relative;top:-5px">
                            2/2启用
                        </Label>
                        <Dialog.Root>
                            <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
                              > <Plus size="18px"/>
                              <p class="font-semibold text-xs">添加</p>
                              </Dialog.Trigger>
                            <Dialog.Content class="w-3/4 h-screen">

                                <Resizable.PaneGroup direction="horizontal" class="w-full rounded-lg ">
                                    <Resizable.Pane defaultSize={50}>
                                      <div class="flex item-center my-[20px] relative justify-center">
                                        <Search class="absolute left-2 bottom-2"/>
                                        <Input class="pl-[40px] absolute; box-sizing: border-box "placeholder="搜索"/>
                                      </div>
                                      <div class="bg-slate-400 w-64 h-12"></div>
                                    </Resizable.Pane>
                                    <Resizable.Handle />
                                    <Resizable.Pane defaultSize={50}>
                                      <Resizable.PaneGroup direction="vertical">
                                        <Resizable.Pane defaultSize={15}>
                                          <div class="flex h-full items-center justify-center p-6">
                                            <span class="font-semibold">Two</span>
                                          </div>
                                        </Resizable.Pane>
                                        <Resizable.Handle />
                                        <Resizable.Pane defaultSize={85}>
                                          <div class="flex h-full items-center justify-center p-6">
                                            <span class="font-semibold">Three</span>
                                          </div>
                                        </Resizable.Pane>
                                      </Resizable.PaneGroup>
                                    </Resizable.Pane>
                                  </Resizable.PaneGroup>
                            </Dialog.Content>
                          </Dialog.Root>

                        <!-- <Button size="sm" variant="outline">
                            <Plus size="18px"/>
                            <p class="font-semibold text-xs">添加</p>
                        </Button> -->
                    </div>
                    </div>
                    <div class="border rounded-lg">
                        <Table.Root>
                            <Table.Body>
                              {#each tools as tool, i (i)}
                                <Table.Row>
                                  <Table.Cell class="font-medium w-[200px]">
                                    <div class="flex font-medium">
                                        <Globe class="mr-4"/>{tool.toolName}
                                    </div>
                                </Table.Cell>
                                <Table.Cell class="text-right">
                                    <Switch />
                                </Table.Cell>
                                </Table.Row>
                              {/each}
                            </Table.Body>
                          </Table.Root>
                    </div>
                </div>
                <!----------对话开场白----------->
                <div class="grid w-full gap-1.5 p-4 bg-white mt-4 border rounded-lg">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <MessageSquareText />
                            <Label for="message"class="font-semibold ml-1">对话开场白</Label>
                        </div>
                        <Button size="sm" variant="outline">
                            <PenLine size="18px"/>
                            <p class="font-semibold text-xs">编辑</p>
                        </Button>
                    </div>
                    <div class="border rounded-lg">
                        <Textarea placeholder="Type your message here."class="h-60" />
                    </div>
                </div>
                <!---------------------->
            <div class="grid w-full gap-1.5 p-4 bg-white mt-4 border rounded-lg">
                <div class="border rounded-lg">
                    <Table.Root>
                        <Table.Body>                        
                            <Table.Row>
                              <Table.Cell class="font-medium w-[160px]">
                                <div class="flex justify-between  font-semibold">
                                    <MessageCircleMore />下一步问题建议
                                </div>
                            </Table.Cell>
                              <Table.Cell class="text-right">
                                <Label class="mb-2 mr-2 text-slate-400">回答结束后系统会给出3个建议</Label>
                                <Switch />
                            </Table.Cell>
                            </Table.Row>                       
                        </Table.Body>
                      </Table.Root>
                    </div>
                </div>

                <!-- ------------------------ -->
                <div class="grid w-full gap-1.5 p-4 bg-white mt-4 border rounded-lg">
                    <div class="border rounded-lg">
                        <Table.Root>
                            <Table.Body>                        
                                <Table.Row>
                                  <Table.Cell class="font-medium w-[160px]">
                                    <div class="flex font-semibold">
                                        <Text class="mr-2"/>引用和归属
                                    </div>
                                </Table.Cell>
                                  <Table.Cell class="text-right">
                                    <Label class="mb-2 mr-2 text-slate-400">回答结束后系统会给出3个建议</Label>
                                    <Switch />
                                </Table.Cell>
                                </Table.Row>                       
                            </Table.Body>
                          </Table.Root>
                        </div>
                    </div>

                    <!-- ------------------------ -->
                <div class="grid w-full gap-1.5 p-4 bg-white mt-4 border rounded-lg">
                    <div class="border rounded-lg ">
                        <Table.Root>
                            <Table.Body>                        
                                <Table.Row>
                                  <Table.Cell class="font-medium w-[160px]">
                                    <div class="flex font-semibold">
                                        <MessageSquareText class=mr-2/>标注回复
                                    </div>
                                </Table.Cell>
                                  <Table.Cell class="text-right">
                                <div class="flex justify-end">
                                    <Button size="default" variant="outline" class="w-24 mr-2">
                                        <Plus size="15px"/>
                                        <p class="font-semibold text-xs">参数设置</p>
                                    </Button>
                                    <Button size="default" variant="outline" class="w-24">
                                        <Plus size="15px"/>
                                        <p class="font-semibold text-xs">标注管理</p>
                                    </Button>
                                </div>
                                </Table.Cell>
                                </Table.Row>                       
                            </Table.Body>
                          </Table.Root>
                        </div>
                    </div>

                
            </ScrollArea>
        </Resizable.Pane>
       
        <Resizable.Pane defaultSize={50}>
            <ScrollArea class="h-full w-full rounded-md ">
            <div class="grid  gap-1.5 p-4 bg-white mx-2 border rounded-lg">
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <SquareMenu />
                        <Label for="message"class="font-semibold ml-1">调试与预览</Label>
                    </div>
                    <Button size="sm" variant="outline" class="mb-2">
                        <RefreshCw size="18px"/>
                        <p class="font-semibold text-xs">重新开始</p>
                    </Button>
                </div>
                <div class="border rounded-lg">
                    <form>
                        <div class="grid  m-5 items-center gap-4">
                        <Label class="font-semibold">用户输入</Label>
                          <div class="flex flex-col space-y-1.5">
                            <Label for="name" class="font-semibold">你的目的地是哪里?</Label>
                            <Input id="name" placeholder="你的目的地是哪里?(可选)" />
                          </div>
                          <div class="flex flex-col space-y-1.5">
                            <Label for="name" class="font-semibold">计划旅行多少天?</Label>
                            <Input id="name" placeholder="计划旅行多少天?(可选)" />
                          </div>
                          <div class="flex flex-col space-y-1.5">
                            <Label for="framework" class="font-semibold">预算大概多少钱?</Label>
                            <Select.Root>
                              <Select.Trigger id="framework">
                                <Select.Value placeholder="2000" />
                              </Select.Trigger>
                              <Select.Content>
                                {#each frameworks as framework}
                                  <Select.Item value={framework.value} label={framework.label}
                                    >{framework.label}</Select.Item
                                  >
                                {/each}
                              </Select.Content>
                            </Select.Root>
                          </div>
                        </div>
                      </form>
                </div>
                <!-- Agent对话 -->
                <div class="flex mt-4">
                    <Bot/>
                    <div class="border ml-3 rounded-lg w-[480px] h-52 p-4">
                        <Label class="">
                            <p class="text-justify ...">欢迎来到个性化服务之旅,由顾问为您护航...</p>
                        </Label>
                    </div>
                </div>
                <div class="flex  w-[500px] mt-2">
                    <Input/>
                    <div class=" flex border-y border-r rounded-r-lg w-12  p-2 "><SendHorizontal/></div>
                </div>               
            </div>
        </ScrollArea>
        </Resizable.Pane>
      </Resizable.PaneGroup>
    </div>
</div>