import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";
import * as Icons from "./icons.js";

export type Route = {
	title: string;
	// label: string;
	icon: ComponentType<Icon>;
	variant: "default" | "ghost";
};

export const primaryRoutes: Route[] = [
	{
		title: "数据集",
		icon: Icons.Inbox,
		variant: "default",
	},
	{
		title: "搜索测试",
		icon: Icons.File,
		variant: "ghost",
	},
	{
		title: "配置",
		icon: Icons.Send,
		variant: "ghost",
	},
	
];

// export const secondaryRoutes: Route[] = [
// 	{
// 		title: "Social",
// 		label: "972",
// 		icon: Icons.Users,
// 		variant: "ghost",
// 	},
// 	{
// 		title: "Updates",
// 		label: "342",
// 		icon: Icons.CircleAlert,
// 		variant: "ghost",
// 	},
// 	{
// 		title: "Forums",
// 		label: "128",
// 		icon: Icons.MessagesSquare,
// 		variant: "ghost",
// 	},
// 	{
// 		title: "Shopping",
// 		label: "8",
// 		icon: Icons.ShoppingCart,
// 		variant: "ghost",
// 	},
// 	{
// 		title: "Promotions",
// 		label: "21",
// 		icon: Icons.Archive,
// 		variant: "ghost",
// 	},
// ];
