<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from "$lib/components/ui/label/index.js";
	import { Search, PencilLine, ChevronDown } from 'lucide-svelte';
	import Plus from 'lucide-svelte/icons/plus';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Table from "$lib/components/ui/table/index.js";

	let tabIndex = 0;
	let toolsList = ['维基百科', 'stab lity', '雅虎财经'];
	let sidebarToolsIdx = 0;

	function tabSwitch(idx) {
		tabIndex = idx;
		sidebarToolsIdx = 0;
		toolsList = idx == 0 ? ['维基百科', 'stab lity', '雅虎财经'] : ['搜索引擎搜索', '石景山地区流量太大了，赶紧抓住'];
	}


	function sidebarToolsSwitch(i) {
		sidebarToolsIdx = i;
	}
</script>

<Dialog.Root>

	<div class="constructor">
		<div class="sidebar">
			<Dialog.Trigger  style="width: 75%">
				<Button style="width: 100%">
					<Plus />
					创建自定义工具
				</Button>
			</Dialog.Trigger>

			<div class="tab_list">
				<div class="{`tab_box ${tabIndex == 0 ? 'tab_box_sel':''}`}" on:click={()=>{tabSwitch(0)}}>内置</div>
				<div class="{`tab_box ${tabIndex == 1 ? 'tab_box_sel':''}`}" on:click={()=>{tabSwitch(1)}}>自定义</div>
			</div>
			<div class="search_box">
				<Search style="position: absolute;left: 5px" />
				<Input type="text" placeholder="搜索" class="max-w-xs"
							 style="padding-left: 40px;box-sizing: border-box;background: #eeeeee" />
			</div>
			<div style="margin-top: 20px;border-bottom: 1px solid #e7e9e8"></div>
			<div class="sidebar_tools_list">
				{#each toolsList as item, i (i)}
					<div class="{`sidebar_tools_box ${sidebarToolsIdx == i ? 'sidebar_tools_box_sel':''}`}"
							 on:click={()=>{sidebarToolsSwitch(i)}}>
						<div class="sidebar_tools_box_pic"></div>
						<div class="sidebar_tools_box_name">{item}</div>
					</div>
				{/each}
			</div>

		</div>
		<div class="content">
			<div class="content_box">
				<div class="content_head">
					<div class="content_head_pic"></div>
					<div class="content_head_center">
						<div class="chc_name">
							石景山地区人流量分布 <span class="chc_author">作者：梁洪生</span>
						</div>
						<div class="chc_desc">supply a services</div>
					</div>
					<Dialog.Trigger>
						<Button variant="outline">
							<PencilLine style="margin-right: 5px;width: 18px;" />
							编辑
						</Button>
					</Dialog.Trigger>

				</div>
				<div class="content_tools_count">包含1个工具 <span>要使用请先授权</span></div>
				<div class="content_tools">
					<div class="content_tools_box">
						<Dialog.Root>
							<Dialog.Trigger style="width: 100%;display: flex;align-items: center;padding: 20px;">
								<div class="tools_pic"></div>
								<div class="tools_center">
									<div class="tools_name">Investment Analysis</div>
									<div class="tools_desc">list all batter</div>
								</div>
							</Dialog.Trigger>
							<Dialog.Content style="width: 400px!important;">
								<div class="detail_head">
									<div class="detail_head_pic"></div>
									<div class="detail_head_name">showPlay</div>
								</div>
								<div class="detail_desc_tit">工具描述</div>
								<div class="detail_desc">list all batter</div>

								<div class="detail_desc_tit">参数</div>

								<div class="detail_param_box">
									<div class="detail_param">
										<div>perId</div>
										<div style="color: #babcbd;margin-left: 5px">字符串</div>
										<div style="color: #ff6738;margin-left: 5px">必填</div>
									</div>
									<div class="detail_param_desc">e supply a series of design principles,practical patterns and high quality design resources(Sketch and Axure)</div>
								</div>

							</Dialog.Content>
						</Dialog.Root>
					</div>
				</div>
			</div>
		</div>
	</div>

	<Dialog.Content class="sm:max-w-[650px]">
		<Dialog.Header>
			<Dialog.Title>创建自定义工具</Dialog.Title>
		</Dialog.Header>
		<Label for="name" class="text-right">取个名字</Label>
		<div style="display: flex;align-items: center">
			<div style="padding: 6px;border: 1px solid #f1f2f1;"><div style="width: 33px;height: 33px;background: #000;"></div></div>
			<Input type="text" placeholder="输入工具名称" style="flex: 1;height: 40px;margin-left: 10px" />
		</div>
		<div style="display: flex;align-items: center">
			<span style="font-size: 13px;color: #0d0d0d">shema</span>
			<span style="font-size: 13px;color: #4eaaff;flex: 1;margin-left: 10px">查看open API-swafer规范</span>
			<Button variant="outline">
				<Plus />
				从URL中导入
			</Button>
			<Button variant="outline" style="margin-left: 10px">
				<ChevronDown />
				例子
			</Button>
		</div>
		<div class="tools_detail_font">
			# lama - inc
			# 环境搭建
			# 系统要求
			e supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure)
		</div>
		<Label for="name" class="text-right">可用工具</Label>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[135px]">名称</Table.Head>
					<Table.Head class="w-[135px]">描述</Table.Head>
					<Table.Head>方法</Table.Head>
					<Table.Head class="w-[135px]">路径</Table.Head>
					<Table.Head >操作</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
					<Table.Row>
						<Table.Cell>num-day</Table.Cell>
						<Table.Cell>list all petes</Table.Cell>
						<Table.Cell>get</Table.Cell>
						<Table.Cell>/v1/pets</Table.Cell>
						<Table.Cell><Button variant="outline">测试</Button></Table.Cell>
					</Table.Row>
			</Table.Body>
			<Dialog.Footer>
				<Button type="submit">保存</Button>
			</Dialog.Footer>
		</Table.Root>
	</Dialog.Content>
</Dialog.Root>


<style>
    .constructor {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sidebar {
        width: 286px;
        height: 100%;
        text-align: center;
        box-sizing: border-box;
        padding: 30px 0;
    }

    .content {
        flex: 1;
        height: 100%;
        background: #f9f9f9;
        padding: 20px;
        box-sizing: border-box;
    }

    .tab_list {
        margin: 20px auto 0;
        width: 75%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        padding: 5px;
        background: #fafafa;
        border-radius: 5px;
        cursor: pointer;
    }

    .tab_box {
        flex: 1;
        text-align: center;
        color: #909392;
        font-size: 14px;
        padding: 3px 0;
        transition: all .2s;
        box-sizing: border-box;
    }

    .tab_box_sel {
        background: #000000;
        color: #ffffff;
        border-radius: 5px;
        transition: all .2s;
    }

    .search_box {
        display: flex;
        align-items: center;
        position: relative;
        width: 75%;
        margin: 20px auto 0;
    }

    .sidebar_tools_list {
        width: 75%;
        margin: 20px auto 0;
    }

    .sidebar_tools_box {
        width: 100%;
        padding: 5px 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        line-height: 1.1;
        cursor: pointer;
        margin-bottom: 10px;
        border: 1.5px solid transparent;
    }

    .sidebar_tools_box_sel {
        border: 1.5px solid #373737;
        border-radius: 5px;
    }

    .sidebar_tools_box_pic {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        background: #000000;
        margin-right: 10px;
    }

    .sidebar_tools_box_name {
        text-align: left;
        flex: 1;
        color: #000000;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .content_box {
        width: 100%;
        height: 100%;
        background: #ffffff;
        border-radius: 10px;
    }

    .content_head {
        padding: 20px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #edeff3;
    }

    .content_head_pic {
        width: 49px;
        height: 49px;
        border-radius: 8px;
        background: #000000;
    }

    .content_head_center {
        margin: 0 20px;
        flex: 1;
    }

    .chc_name {
        color: #000000;
        font-size: 18px;
    }

    .chc_author {
        color: #9ca09e;
        font-size: 14px;
    }

    .chc_desc {
        margin-top: 5px;
        color: #9ca09e;
        font-size: 14px;
    }

    .content_tools_count {
        margin-top: 20px;
        color: #b2b4b5;
        font-size: 14px;
        padding-left: 20px;
    }

    .content_tools {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px;
    }

    .content_tools_box {
        width: 32%;
        margin-right: 2%;
        background: #f0f2f5;
        border-radius: 10px;
        margin-bottom: 20px;
				cursor: pointer;
    }

    .content_tools_box:nth-child(3n) {
        margin-right: 0;
    }

    .tools_pic {
        width: 49px;
        height: 49px;
        border-radius: 5px;
        margin-right: 10px;
        background: #000000;
    }

    .tools_center {
        flex: 1;
        text-align: left;
    }

    .tools_name {
        color: #000000;
        font-size: 16px;
        font-weight: 500;
    }

    .tools_desc {
        margin-top: 5px;
        color: #acaeb0;
        font-size: 14px;
    }
    .detail_head{
				display: flex;
				align-items: center;
		}
    .detail_head_pic{
				width: 60px;
				height: 60px;
				background: #000000;
				border-radius: 5px;
		}
    .detail_head_name{
				margin-left: 10px;
				color: #040404;
				font-size: 18px;
		}
    .detail_desc_tit{
        color: #040404;
        font-size: 18px;
				/*margin-top: 10px;*/
		}
    .detail_desc{
				color: #b2b3b5;
				font-size: 14px;
		}

    .detail_param_box{
				/*margin-bottom: 10px;*/
		}
    .detail_param{
				display: flex;
				align-items: center;
				color: #151515;
				font-size: 14px;
		}
    .detail_param_desc{
				margin-top: 10px;
				color: #b2b3b5;
				font-size: 14px;
		}
		.tools_detail_font{
				padding: 20px;
				background: #f0f2f5;
		}
</style>