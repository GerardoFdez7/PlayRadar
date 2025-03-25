"use strict";(self.webpackChunkplayradar=self.webpackChunkplayradar||[]).push([[2141],{"./app/components/ui/Card.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{BT:()=>CardDescription,Wu:()=>CardContent,ZB:()=>CardTitle,Zp:()=>Card,aR:()=>CardHeader,wL:()=>CardFooter});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),_lib_utils__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./app/lib/utils.ts");const Card=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((({className,...props},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{ref,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",className),...props})));Card.displayName="Card";const CardHeader=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((({className,...props},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{ref,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex flex-col space-y-1.5 p-6",className),...props})));CardHeader.displayName="CardHeader";const CardTitle=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((({className,...props},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3",{ref,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("text-2xl font-semibold leading-none tracking-tight",className),...props})));CardTitle.displayName="CardTitle";const CardDescription=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((({className,...props},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{ref,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("text-sm text-muted-foreground",className),...props})));CardDescription.displayName="CardDescription";const CardContent=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((({className,...props},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{ref,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("p-6 pt-0",className),...props})));CardContent.displayName="CardContent";const CardFooter=react__WEBPACK_IMPORTED_MODULE_1__.forwardRef((({className,...props},ref)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{ref,className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("flex items-center p-6 pt-0",className),...props})));CardFooter.displayName="CardFooter",Card.__docgenInfo={description:"",methods:[],displayName:"Card"},CardHeader.__docgenInfo={description:"",methods:[],displayName:"CardHeader"},CardFooter.__docgenInfo={description:"",methods:[],displayName:"CardFooter"},CardTitle.__docgenInfo={description:"",methods:[],displayName:"CardTitle"},CardDescription.__docgenInfo={description:"",methods:[],displayName:"CardDescription"},CardContent.__docgenInfo={description:"",methods:[],displayName:"CardContent"}},"./app/components/ui/Requirements.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{r:()=>Requirements});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),_components_ui_Tabs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./app/components/ui/Tabs.tsx"),_components_ui_Card__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./app/components/ui/Card.tsx");function Requirements({minRequirements,recRequirements}){return 0===minRequirements.length&&0===recRequirements.length?null:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"mb-8",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2",{className:"mb-4 text-2xl font-semibold",children:"System Requirements"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:"sm:hidden",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_Tabs__WEBPACK_IMPORTED_MODULE_1__.tU,{defaultValue:"minimum",className:"w-full",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_Tabs__WEBPACK_IMPORTED_MODULE_1__.j7,{className:"grid grid-cols-2 w-full",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Tabs__WEBPACK_IMPORTED_MODULE_1__.Xi,{value:"minimum",children:"Minimum"}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Tabs__WEBPACK_IMPORTED_MODULE_1__.Xi,{value:"recommended",children:"Recommended"})]}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Tabs__WEBPACK_IMPORTED_MODULE_1__.av,{value:"minimum",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Card__WEBPACK_IMPORTED_MODULE_2__.Zp,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Card__WEBPACK_IMPORTED_MODULE_2__.Wu,{className:"pt-6",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dl",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2",children:minRequirements.map(((req,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dt",{className:"font-medium",children:req.key}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dd",{className:"text-muted-foreground",children:req.value})]},index)))})})})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Tabs__WEBPACK_IMPORTED_MODULE_1__.av,{value:"recommended",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Card__WEBPACK_IMPORTED_MODULE_2__.Zp,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Card__WEBPACK_IMPORTED_MODULE_2__.Wu,{className:"pt-6",children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dl",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2",children:recRequirements.map(((req,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dt",{className:"font-medium",children:req.key}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dd",{className:"text-muted-foreground",children:req.value})]},index)))})})})})]})}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{className:"hidden sm:grid grid-cols-2 gap-6",children:[minRequirements.length>0&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Card__WEBPACK_IMPORTED_MODULE_2__.Zp,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_Card__WEBPACK_IMPORTED_MODULE_2__.Wu,{className:"pt-6",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Minimum Requirements"}),minRequirements.length>0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dl",{className:"grid grid-cols-1 gap-4",children:minRequirements.map(((req,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dt",{className:"font-medium",children:req.key}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dd",{className:"text-muted-foreground",children:req.value})]},index)))}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{className:"text-gray-500",children:"Not specified"})]})})}),recRequirements.length>0&&(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_ui_Card__WEBPACK_IMPORTED_MODULE_2__.Zp,{children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_ui_Card__WEBPACK_IMPORTED_MODULE_2__.Wu,{className:"pt-6",children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3",{className:"text-lg font-semibold mb-2",children:"Recommended Requirements"}),recRequirements.length>0?(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dl",{className:"grid grid-cols-1 gap-4",children:recRequirements.map(((req,index)=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div",{children:[(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dt",{className:"font-medium",children:req.key}),(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("dd",{className:"text-muted-foreground",children:req.value})]},index)))}):(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p",{className:"text-gray-500",children:"Not specified"})]})})})]})]})}Requirements.__docgenInfo={description:"",methods:[],displayName:"Requirements",props:{minRequirements:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ key: string; value: string }",signature:{properties:[{key:"key",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:"Array<{ key: string; value: string }>"},description:""},recRequirements:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:"{ key: string; value: string }",signature:{properties:[{key:"key",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}}]}}],raw:"Array<{ key: string; value: string }>"},description:""}}}},"./app/components/ui/Tabs.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{tU:()=>Tabs_Tabs,av:()=>Tabs_TabsContent,j7:()=>Tabs_TabsList,Xi:()=>Tabs_TabsTrigger});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),dist=__webpack_require__("./node_modules/@radix-ui/primitive/dist/index.mjs"),react_context_dist=__webpack_require__("./node_modules/@radix-ui/react-context/dist/index.mjs"),react_roving_focus_dist=__webpack_require__("./node_modules/@radix-ui/react-roving-focus/dist/index.mjs"),react_presence_dist=__webpack_require__("./node_modules/@radix-ui/react-presence/dist/index.mjs"),react_primitive_dist=__webpack_require__("./node_modules/@radix-ui/react-primitive/dist/index.mjs"),react_direction_dist=__webpack_require__("./node_modules/@radix-ui/react-direction/dist/index.mjs"),react_use_controllable_state_dist=__webpack_require__("./node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs"),react_id_dist=__webpack_require__("./node_modules/@radix-ui/react-id/dist/index.mjs"),[createTabsContext,createTabsScope]=(0,react_context_dist.A)("Tabs",[react_roving_focus_dist.RG]),useRovingFocusGroupScope=(0,react_roving_focus_dist.RG)(),[TabsProvider,useTabsContext]=createTabsContext("Tabs"),Tabs=react.forwardRef(((props,forwardedRef)=>{const{__scopeTabs,value:valueProp,onValueChange,defaultValue,orientation="horizontal",dir,activationMode="automatic",...tabsProps}=props,direction=(0,react_direction_dist.jH)(dir),[value,setValue]=(0,react_use_controllable_state_dist.i)({prop:valueProp,onChange:onValueChange,defaultProp:defaultValue});return(0,jsx_runtime.jsx)(TabsProvider,{scope:__scopeTabs,baseId:(0,react_id_dist.B)(),value,onValueChange:setValue,orientation,dir:direction,activationMode,children:(0,jsx_runtime.jsx)(react_primitive_dist.sG.div,{dir:direction,"data-orientation":orientation,...tabsProps,ref:forwardedRef})})}));Tabs.displayName="Tabs";var TabsList=react.forwardRef(((props,forwardedRef)=>{const{__scopeTabs,loop=!0,...listProps}=props,context=useTabsContext("TabsList",__scopeTabs),rovingFocusGroupScope=useRovingFocusGroupScope(__scopeTabs);return(0,jsx_runtime.jsx)(react_roving_focus_dist.bL,{asChild:!0,...rovingFocusGroupScope,orientation:context.orientation,dir:context.dir,loop,children:(0,jsx_runtime.jsx)(react_primitive_dist.sG.div,{role:"tablist","aria-orientation":context.orientation,...listProps,ref:forwardedRef})})}));TabsList.displayName="TabsList";var TabsTrigger=react.forwardRef(((props,forwardedRef)=>{const{__scopeTabs,value,disabled=!1,...triggerProps}=props,context=useTabsContext("TabsTrigger",__scopeTabs),rovingFocusGroupScope=useRovingFocusGroupScope(__scopeTabs),triggerId=makeTriggerId(context.baseId,value),contentId=makeContentId(context.baseId,value),isSelected=value===context.value;return(0,jsx_runtime.jsx)(react_roving_focus_dist.q7,{asChild:!0,...rovingFocusGroupScope,focusable:!disabled,active:isSelected,children:(0,jsx_runtime.jsx)(react_primitive_dist.sG.button,{type:"button",role:"tab","aria-selected":isSelected,"aria-controls":contentId,"data-state":isSelected?"active":"inactive","data-disabled":disabled?"":void 0,disabled,id:triggerId,...triggerProps,ref:forwardedRef,onMouseDown:(0,dist.m)(props.onMouseDown,(event=>{disabled||0!==event.button||!1!==event.ctrlKey?event.preventDefault():context.onValueChange(value)})),onKeyDown:(0,dist.m)(props.onKeyDown,(event=>{[" ","Enter"].includes(event.key)&&context.onValueChange(value)})),onFocus:(0,dist.m)(props.onFocus,(()=>{const isAutomaticActivation="manual"!==context.activationMode;isSelected||disabled||!isAutomaticActivation||context.onValueChange(value)}))})})}));TabsTrigger.displayName="TabsTrigger";var TabsContent=react.forwardRef(((props,forwardedRef)=>{const{__scopeTabs,value,forceMount,children,...contentProps}=props,context=useTabsContext("TabsContent",__scopeTabs),triggerId=makeTriggerId(context.baseId,value),contentId=makeContentId(context.baseId,value),isSelected=value===context.value,isMountAnimationPreventedRef=react.useRef(isSelected);return react.useEffect((()=>{const rAF=requestAnimationFrame((()=>isMountAnimationPreventedRef.current=!1));return()=>cancelAnimationFrame(rAF)}),[]),(0,jsx_runtime.jsx)(react_presence_dist.C,{present:forceMount||isSelected,children:({present})=>(0,jsx_runtime.jsx)(react_primitive_dist.sG.div,{"data-state":isSelected?"active":"inactive","data-orientation":context.orientation,role:"tabpanel","aria-labelledby":triggerId,hidden:!present,id:contentId,tabIndex:0,...contentProps,ref:forwardedRef,style:{...props.style,animationDuration:isMountAnimationPreventedRef.current?"0s":void 0},children:present&&children})})}));function makeTriggerId(baseId,value){return`${baseId}-trigger-${value}`}function makeContentId(baseId,value){return`${baseId}-content-${value}`}TabsContent.displayName="TabsContent";var Root2=Tabs,List=TabsList,Trigger=TabsTrigger,Content=TabsContent,utils=__webpack_require__("./app/lib/utils.ts");const Tabs_Tabs=Root2,Tabs_TabsList=react.forwardRef((({className,...props},ref)=>(0,jsx_runtime.jsx)(List,{ref,className:(0,utils.cn)("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",className),...props})));Tabs_TabsList.displayName=List.displayName;const Tabs_TabsTrigger=react.forwardRef((({className,...props},ref)=>(0,jsx_runtime.jsx)(Trigger,{ref,className:(0,utils.cn)("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",className),...props})));Tabs_TabsTrigger.displayName=Trigger.displayName;const Tabs_TabsContent=react.forwardRef((({className,...props},ref)=>(0,jsx_runtime.jsx)(Content,{ref,className:(0,utils.cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",className),...props})));Tabs_TabsContent.displayName=Content.displayName,Tabs_TabsList.__docgenInfo={description:"",methods:[]},Tabs_TabsTrigger.__docgenInfo={description:"",methods:[]},Tabs_TabsContent.__docgenInfo={description:"",methods:[]}}}]);