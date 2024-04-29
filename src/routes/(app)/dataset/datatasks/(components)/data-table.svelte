<script lang="ts">
	import { invoices, type Account, type Mail, intents} from "../data.js";
	import Nav from "./nav.svelte.js";
	import { cn } from "$lib/utils";
	import * as Resizable from "$lib/components/ui/resizable";
	import { Separator } from "$lib/components/ui/select";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as Avatar from "$lib/components/ui/avatar/index.js";
	import { primaryRoutes, secondaryRoutes, thirdRoutes, turnRoutes } from "../config.js"
	import { Progress } from "$lib/components/ui/progress";
	import { onMount } from "svelte";
	import * as Select from "$lib/components/ui/select/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { addPagination, addSortBy } from "svelte-headless-table/plugins";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
	export let accounts: Account[];
	export let mails: Mail[];
	export let defaultLayout = [100, 900];
	export let defaultCollapsed = false;
	export let navCollapsedSize: number;

	export const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit"
    },
    {
      value: "next",
      label: "Next.js"
    },
    {
      value: "astro",
      label: "Astro"
    },
    {
      value: "nuxt",
      label: "Nuxt.js"
    }
  ];



	let isCollapsed = defaultCollapsed;
	// 进度条
	let value = 13;
  onMount(() => {
    const timer = setTimeout(() => (value = 66), 500);
    return () => clearTimeout(timer);
  });

	function onLayoutChange(sizes: number[]) {
		document.cookie = `PaneForge:layout=${JSON.stringify(sizes)}`;
	}

	function onCollapse() {
		isCollapsed = true;
		document.cookie = `PaneForge:collapsed=${true}`;
	}

	function onExpand() {
		isCollapsed = false;
		document.cookie = `PaneForge:collapsed=${false}`;
	}

// -----------------------------------------------------------------------
import {
    Render,
    Subscribe,
    createRender,
    createTable
  } from "svelte-headless-table";
  import {
    addHiddenColumns,
    addPagination,
    addSelectedRows,
    addSortBy,
    addTableFilter
  } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
  
  import Actions from "./data-table/data-table-actions.svelte";
  import DataTableCheckbox from "./data-table/data-table-checkbox.svelte";
  import * as Table from "$lib/components/ui/table/index.js";
  import DataTableActions from "./data-table-actions.svelte";
  import ChevronDown from "lucide-svelte/icons/chevron-down";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  import { Input } from "$lib/components/ui/input/index.js";
 
  type Payment = {
    id: string;
    amount: number;
    status: "Pending" | "Processing" | "Success" | "Failed";
    email: string;
  };
 
  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "Success",
      email: "ken99@yahoo.com"
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "Success",
      email: "Abe45@gmail.com"
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "Processing",
      email: "Monserrat44@gmail.com"
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "Success",
      email: "Silas22@gmail.com"
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "Failed",
      email: "carmella@hotmail.com"
    }
  ];
 
  const table = createTable(readable(data), {
    sort: addSortBy({ disableMultiSort: true }),
    page: addPagination(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) =>
        value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
    select: addSelectedRows(),
    hide: addHiddenColumns()
  });
 
  const columns = table.createColumns([
    table.column({
      accessor: "id",
      header: (_, { pluginStates }) => {
        const { allPageRowsSelected } = pluginStates.select;
        return createRender(DataTableCheckbox, {
          checked: allPageRowsSelected,
        });
      },
      cell: ({ row }, { pluginStates }) => {
        const { getRowState } = pluginStates.select;
        const { isSelected } = getRowState(row);
 
        return createRender(DataTableCheckbox, {
          checked: isSelected,
        });
      },
      plugins: {
        sort: {
          disable: true
        },
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      header: "Status",
      accessor: "status",
      plugins: { sort: { disable: true }, filter: { exclude: true } }
    }),
    table.column({
      header: "Email",
      accessor: "email",
      cell: ({ value }) => value.toLowerCase(),
      plugins: {
        filter: {
          getFilterValue(value) {
            return value.toLowerCase();
          }
        }
      }
    }),
    table.column({
      header: "Amount",
      accessor: "amount",
      cell: ({ value }) => {
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(value);
        return formatted;
      },
      plugins: {
        sort: {
          disable: true
        },
        filter: {
          exclude: true
        }
      }
    }),
    table.column({
      header: "",
      accessor: ({ id }) => id,
      cell: ({ value }) => {
        return createRender(DataTableActions, { id: value });
      },
      plugins: {
        sort: {
          disable: true
        }
      }
    })
  ]);
 
  const {
    headerRows,
    pageRows,
    tableAttrs,
    tableBodyAttrs,
    flatColumns,
    pluginStates,
    rows
  } = table.createViewModel(columns);
 
  const { sortKeys } = pluginStates.sort;
 
  const { hiddenColumnIds } = pluginStates.hide;
  const ids = flatColumns.map((c) => c.id);
  let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
 
  $: $hiddenColumnIds = Object.entries(hideForId)
    .filter(([, hide]) => !hide)
    .map(([id]) => id);
 
  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
 
  const { selectedDataIds } = pluginStates.select;
 
  const hideableCols = ["status", "email", "amount"];
//   ------------------------------------------------------------------------

	
	// HTML模板部分

</script>
<!-- 当屏幕大小小于md时，此div是隐藏的；当屏幕大小达到或超过md时，此div是显示的 -->  
<div class="hidden md:block" style="width:100%">
	<!-- 这是一个可调整大小的面板组，其方向是水平的。  
         当面板组的大小或布局改变时，onLayoutChange函数将被调用。  
         这个面板组占据全部高度，最大高度为800像素，并且子元素在垂直方向上拉伸。 --> 
	<Resizable.PaneGroup
		direction="horizontal"
		{onLayoutChange}
		class="h-full max-h-[800px] items-stretch"
	>
	<!-- 这是一个可调整大小并可折叠的面板。  
           默认大小由defaultLayout数组的第一个元素决定。  
           当面板折叠时，其大小变为navCollapsedSize。  
           面板的最小和最大尺寸分别为15和20（单位未指定，可能是像素或其他单位）。  
           当面板折叠时，onCollapse函数将被调用；当面板展开时，onExpand函数将被调用。 --> 
		<Resizable.Pane
			defaultSize={defaultLayout[0]}
			collapsedSize={navCollapsedSize}
			collapsible
			minSize={12}
			maxSize={12}
			{onCollapse}
			{onExpand}
		>
			<div
				class={cn(
					"flex flex-col h-[100px] items-center justify-center",
					isCollapsed ? "h-[52px]" : "px-2"
				)}
			>
					<!-- 标题 -->
				<div class="flex items-center">
					<Avatar.Root>
					<Avatar.Image src="/" alt="@xxx" />
					<Avatar.Fallback>MK</Avatar.Fallback>
				  </Avatar.Root>
					<h1 class="text-lg font-bold mx-2">MarktingGPT</h1>
				</div>
				<!-- 通用知识库标签 -->
				<div class="inline-block rounded-lg bg-gray-100 border border-slate-300 px-4 py-1 text-center text-xs text-slate-400 dark:bg-gray-800 w-[160px] mt-3">
					<p>通用知识库</p>
				  </div>
			</div>
			<Separator />
			<!-- 数据集导航栏 -->
			<Nav {isCollapsed} routes={primaryRoutes} >
			<!-- {#each primaryRoutes as route}  
    			<div class:collapsed={isCollapsed} on:click={() => handleRouteClick(route)}>  
      			<span>{route.title}</span>  
    			</div>  
  			{/each}   -->
			</Nav>
			<div class="mt-40">
			<!-- QA训练导航栏 -->
			<Nav {isCollapsed} routes={secondaryRoutes} />
			<!-- 进度条 -->
			<Progress {value} max={100} class="w-[80%] mx-5" />
			<!-- 索引排队导航栏 -->
			<Nav {isCollapsed} routes={thirdRoutes} />
			<!-- 进度条 -->
			<Progress {value} max={100} class="w-[80%] mx-5 mb-5" />
			<Separator />
			<!-- 返回知识库导航栏 -->
			<Nav {isCollapsed} routes={turnRoutes} />
		</div>
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		


    <!-- ------------------------------------------------------------------ -->
    
		<Resizable.Pane defaultSize={defaultLayout[0]} minSize={30} maxSize={50}>
      <div>
        <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter emails..."
      type="text"
      bind:value={$filterValue}
    />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild let:builder>
        <Button variant="outline" class="ml-auto" builders={[builder]}>
          Columns <ChevronDown class="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {#each flatColumns as col}
          {#if hidableCols.includes(col.id)}
            <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
              {col.header}
            </DropdownMenu.CheckboxItem>
          {/if}
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
      <div class="rounded-md border">
        <Table.Root {...$tableAttrs}>
          <Table.Header>
            {#each $headerRows as headerRow}
              <Subscribe rowAttrs={headerRow.attrs()}>
                <Table.Row>
                  {#each headerRow.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}
                    let:props>

                    <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                        {#if cell.id === "amount"}
                    <div class="text-right">
                      <Render of={cell.render()} />
                    </div>
                    {:else if cell.id === "email"}
                  <Button variant="ghost" on:click={props.sort.toggle}>
                    <Render of={cell.render()} />
                    <ArrowUpDown class={"ml-2 h-4 w-4"} />
                  </Button>
                  {:else}
                    <Render of={cell.render()} />
                  {/if}
                      </Table.Head>
                    </Subscribe>
                  {/each}
                </Table.Row>
              </Subscribe>
            {/each}
          </Table.Header>
          <Table.Body {...$tableBodyAttrs}>
            {#each $pageRows as row (row.id)}
              <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                <Table.Row
              {...rowAttrs}
              data-state={$selectedDataIds[row.id] && "selected"}
            >
                  {#each row.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs>
                      <Table.Cell {...attrs}>
                        {#if cell.id === "amount"}
                    <div class="text-right font-medium">
                      <Render of={cell.render()} />
                    </div>
                  {:else if cell.id === "status"}
                    <div class="capitalize">
                      <Render of={cell.render()} />
                    </div>
                  {:else}
                    <Render of={cell.render()} />
                  {/if}
                      </Table.Cell>
                    </Subscribe>
                  {/each}
                </Table.Row>
              </Subscribe>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
      <div class="flex items-center justify-end space-x-4 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
          {Object.keys($selectedDataIds).length} of{" "}
          {$rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          on:click={() => ($pageIndex = $pageIndex - 1)}
          disabled={!$hasPreviousPage}>Previous</Button
        >
        <Button
          variant="outline"
          size="sm"
          disabled={!$hasNextPage}
          on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
        >
      </div>
    </div>

			
			
		</Resizable.Pane>

	
	
		
	</Resizable.PaneGroup>
</div>
