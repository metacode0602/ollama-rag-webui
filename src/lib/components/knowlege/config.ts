import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";
import * as Icons from "$lib/components/icons/icons.js";

export type Route = {
	title: string;
	label: string;
	icon: ComponentType<Icon>;
	variant: "default" | "ghost";
	path:string;
	
};

export const primaryRoutes: Route[] = [
	{
		title: "数据集",
		icon: Icons.Inbox,
		label: "9",
		variant: "ghost",
		path:"/knowlege/12312/dataset"
		
	},
	{
		title: "搜索测试",
		icon: Icons.File,
		label: "21",
		variant: "default",
		path:"/knowlege/12312/testing"
		
	},
	{
		title: "配置",
		label: "91",
		icon: Icons.Send,
		variant: "ghost",
		path:"/knowlege/12312/setting"
		
		
	},
	
];

export const secondaryRoutes: Route[] = [
	{
		title: "QA训练排队(空闲)",
		icon: Icons.Users,
		variant: "ghost",
		path:"/dataset"
	
	},	
];

export const thirdRoutes: Route[] = [
	{
		title: "索引排队(空闲)",
		icon: Icons.CircleAlert,
		variant: "ghost",
		path:"/dataset"
		
	},


	
];

export const turnRoutes: Route[] = [
	{
		title: "全部知识库",
		icon: Icons.CircleAlert,
		variant: "ghost",
		path:"/dataset/database"
	
	},
]

