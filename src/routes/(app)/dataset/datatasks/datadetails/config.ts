import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";
import * as Icons from "./icons.js";

export type Route = {
	title: string;
	// label: string;
	icon: ComponentType<Icon>;
	variant: "default" | "ghost";
	path:string;
};

export const primaryRoutes: Route[] = [
	{
		title: "数据集",
		icon: Icons.Inbox,
		variant: "default",
		path:"/dataset/datatasks",
	},
	{
		title: "搜索测试",
		icon: Icons.File,
		variant: "ghost",
		path:"/dataset",
	},
	{
		title: "配置",
		icon: Icons.Send,
		variant: "ghost",
		path:"/dataset/datasetting",
	},
	
];

export const secondaryRoutes: Route[] = [
	{
		title: "QA训练排队(空闲)",
		icon: Icons.Users,
		variant: "ghost",
		path:"/dataset/datatasks",
	},	
];

export const thirdRoutes: Route[] = [
	{
		title: "索引排队(空闲)",
		icon: Icons.CircleAlert,
		variant: "ghost",
		path:"/dataset/datatasks",
	},


	
];

export const turnRoutes: Route[] = [
	{
		title: "全部知识库",
		icon: Icons.CircleAlert,
		variant: "ghost",
		path:"/dataset/database",
	},
]

export const datadetailsRoutes: Route[] = [
	{
		title: "数据内容",
		icon: Icons.CircleAlert,
		variant: "default",
		path:"/dataset/datatasks/datadetails",
	},
	// {
	// 	title: "数据索引(0)",
	// 	icon: Icons.CircleAlert,
	// 	variant: "ghost",
	// 	path:"/dataset/datatasks/datadetails",
	// },
	// {
	// 	title: "说明文档",
	// 	icon: Icons.CircleAlert,
	// 	variant: "ghost",
	// 	path:"/dataset/datatasks/datadetails",
	// },
]
