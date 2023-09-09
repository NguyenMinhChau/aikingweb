import routers from './routers';
import {
	Dashboard,
	Home,
	Deposits,
	Withdraw,
	User,
	Content,
	CreateHomeContent,
	UserDetail,
	Login,
	DepositsWithdrawDetail,
	Register,
	ResetPwd,
	FundUSD,
	UsdAgricultureDetail,
	FundAgriculture,
	ForgotPwd,
	CreateIntroduceContent,
	CreateFinanceContent,
	CreateTrainingContent,
	CreateWebContent,
	CreateServiceContent,
	CreateRecuiterContent,
	CreateContactContent,
	CreateForumContent,
	CreateDeveloperContent,
} from '../Layouts';

import { PageNotFound } from '../components';

export const publicRouter = [
	{ path: routers.login, component: Login, layout: null },
	{ path: routers.register, component: Register, layout: null },
	{ path: routers.forgotPwd, component: ForgotPwd, layout: null },
	{ path: routers.resetPwd, component: ResetPwd, layout: null },
	{ path: routers.pageNotFound, component: PageNotFound, layout: null },
];
export const privateRouter = [
	{ path: routers.login, component: Login, layout: null },
	{ path: routers.register, component: Register, layout: null },
	{ path: routers.forgotPwd, component: ForgotPwd, layout: null },
	{ path: routers.resetPwd, component: ResetPwd, layout: null },
	{ path: routers.home, component: Home },
	{ path: routers.dashboard, component: Dashboard },
	{ path: routers.deposits, component: Deposits },
	{
		path: `${routers.deposits}/:idDeposits`,
		component: DepositsWithdrawDetail,
	},
	{ path: routers.withdraw, component: Withdraw },
	{
		path: `${routers.withdraw}/:idWithdraw`,
		component: DepositsWithdrawDetail,
	},
	{ path: routers.contractUsd, component: FundUSD },
	{
		path: `${routers.contractUsd}/:idContractUsd`,
		component: UsdAgricultureDetail,
	},
	{ path: routers.contractAgriculture, component: FundAgriculture },
	{
		path: `${routers.contractAgriculture}/:idContractAgri`,
		component: UsdAgricultureDetail,
	},
	{ path: routers.user, component: User },
	{ path: routers.content, component: Content },
	{
		path: `${routers.content}/${routers.createhomecontent}`,
		component: CreateHomeContent,
	},
	{
		path: `${routers.content}/${routers.updatehomecontent}/:idHomeContent`,
		component: CreateHomeContent,
	},
	{
		path: `${routers.content}/${routers.createintroducecontent}`,
		component: CreateIntroduceContent,
	},
	{
		path: `${routers.content}/${routers.updateintroducecontent}/:idIntroduceContent`,
		component: CreateIntroduceContent,
	},
	{
		path: `${routers.content}/${routers.createfinancecontent}`,
		component: CreateFinanceContent,
	},
	{
		path: `${routers.content}/${routers.updatefinancecontent}/:idFinanceContent`,
		component: CreateFinanceContent,
	},
	{
		path: `${routers.content}/${routers.createtrainingcontent}`,
		component: CreateTrainingContent,
	},
	{
		path: `${routers.content}/${routers.updatetrainingcontent}/:idFinanceContent`,
		component: CreateTrainingContent,
	},
	{
		path: `${routers.content}/${routers.createwebcontent}`,
		component: CreateWebContent,
	},
	{
		path: `${routers.content}/${routers.updatewebcontent}/:idWebContent`,
		component: CreateWebContent,
	},
	{
		path: `${routers.content}/${routers.createsoftwarecontent}`,
		component: CreateServiceContent,
	},
	{
		path: `${routers.content}/${routers.updatesoftwarecontent}/:idServiceContent`,
		component: CreateServiceContent,
	},
	{
		path: `${routers.content}/${routers.createrecuitercontent}`,
		component: CreateRecuiterContent,
	},
	{
		path: `${routers.content}/${routers.updaterecuitercontent}/:idRecuiterContent`,
		component: CreateRecuiterContent,
	},
	{
		path: `${routers.content}/${routers.createforumcontent}`,
		component: CreateForumContent,
	},
	{
		path: `${routers.content}/${routers.updateforumcontent}/:idForumContent`,
		component: CreateForumContent,
	},
	{
		path: `${routers.content}/${routers.createcontactcontent}`,
		component: CreateContactContent,
	},
	{
		path: `${routers.content}/${routers.updatecontactcontent}/:idContactContent`,
		component: CreateContactContent,
	},
	{
		path: `${routers.content}/${routers.createdevelopercontent}`,
		component: CreateDeveloperContent,
	},
	{
		path: `${routers.content}/${routers.updatedevelopercontent}/:idDeveloperContent`,
		component: CreateDeveloperContent,
	},
	{ path: `${routers.user}/:idUser`, component: UserDetail },
	{ path: routers.pageNotFound, component: PageNotFound, layout: null },
];
