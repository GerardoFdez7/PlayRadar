"use strict";(self.webpackChunkplayradar=self.webpackChunkplayradar||[]).push([[2006],{"./stories/features/GameActions.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{LoggedIn:()=>LoggedIn,LoggedOut:()=>LoggedOut,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_components_features_GameActions__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./app/components/features/GameActions.tsx"),react__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Features/GameActions",component:_components_features_GameActions__WEBPACK_IMPORTED_MODULE_1__.k},LoggedOut={args:{gameId:123,user:!1,ratingsCount:42},render:args=>{const Wrapper=()=>{const[activeTooltip,setActiveTooltip]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_features_GameActions__WEBPACK_IMPORTED_MODULE_1__.k,{...args,activeTooltip,setActiveTooltip})};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper,{})}},LoggedIn={args:{gameId:123,user:!0,ratingsCount:42},render:args=>{const Wrapper=()=>{const[activeTooltip,setActiveTooltip]=(0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_features_GameActions__WEBPACK_IMPORTED_MODULE_1__.k,{...args,activeTooltip,setActiveTooltip})};return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Wrapper,{})}},__namedExportsOrder=["LoggedOut","LoggedIn"];LoggedOut.parameters={...LoggedOut.parameters,docs:{...LoggedOut.parameters?.docs,source:{originalSource:"{\n  args: {\n    gameId: 123,\n    user: false,\n    ratingsCount: 42\n  },\n  render: args => {\n    const Wrapper = () => {\n      const [activeTooltip, setActiveTooltip] = useState<{\n        type: string;\n        gameId: number;\n      } | null>(null);\n      return <GameActions {...args} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} />;\n    };\n    return <Wrapper />;\n  }\n}",...LoggedOut.parameters?.docs?.source}}},LoggedIn.parameters={...LoggedIn.parameters,docs:{...LoggedIn.parameters?.docs,source:{originalSource:"{\n  args: {\n    gameId: 123,\n    user: true,\n    ratingsCount: 42\n  },\n  render: args => {\n    const Wrapper = () => {\n      const [activeTooltip, setActiveTooltip] = useState<{\n        type: string;\n        gameId: number;\n      } | null>(null);\n      return <GameActions {...args} activeTooltip={activeTooltip} setActiveTooltip={setActiveTooltip} />;\n    };\n    return <Wrapper />;\n  }\n}",...LoggedIn.parameters?.docs?.source}}}}}]);