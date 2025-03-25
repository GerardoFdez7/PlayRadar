/*! For license information please see MainGame-stories.9c546676.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkplayradar=self.webpackChunkplayradar||[]).push([[4678],{"./app/assets/placeholder.png":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});const __WEBPACK_DEFAULT_EXPORT__={src:"static/media/placeholder.6e9ebb4d.png",height:670,width:1280,blurDataURL:"static/media/placeholder.6e9ebb4d.png"}},"./app/components/ui/Badge.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{E:()=>Badge});var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),class_variance_authority__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),__webpack_require__("./node_modules/class-variance-authority/dist/index.mjs")),_lib_utils__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./app/lib/utils.ts");const badgeVariants=(0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__.F)("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",{variants:{variant:{default:"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",secondary:"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",outline:"text-foreground"}},defaultVariants:{variant:"default"}});function Badge({className,variant,...props}){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div",{className:(0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)(badgeVariants({variant}),className),...props})}Badge.__docgenInfo={description:"",methods:[],displayName:"Badge",composes:["VariantProps"]}},"./app/components/ui/Carousel.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{A:()=>ui_Carousel});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),embla_carousel_react_esm=__webpack_require__("./node_modules/embla-carousel-react/esm/embla-carousel-react.esm.js"),placeholder=__webpack_require__("./app/assets/placeholder.png"),next_image=__webpack_require__("./node_modules/@storybook/nextjs/dist/images/next-image.mjs");const Thumb=({selected,onClick,imageSrc,altText})=>(0,jsx_runtime.jsx)("div",{className:"flex-[0_0_23%] min-w-0 cursor-pointer rounded-lg overflow-hidden "+(selected?"border-1 border-primary border-opacity-75 border":""),onClick,children:(0,jsx_runtime.jsxs)("div",{className:"relative aspect-video",children:[(0,jsx_runtime.jsx)(next_image.A,{src:imageSrc,alt:altText,fill:!0}),(0,jsx_runtime.jsx)("div",{className:"absolute hover:opacity-0 inset-0 bg-black/50 transition-opacity duration-300 "+(selected?"opacity-0":"opacity-100")})]})}),ui_Thumb=Thumb;Thumb.__docgenInfo={description:"",methods:[],displayName:"Thumb",props:{selected:{required:!0,tsType:{name:"boolean"},description:""},index:{required:!0,tsType:{name:"number"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},imageSrc:{required:!0,tsType:{name:"string"},description:""},altText:{required:!0,tsType:{name:"string"},description:""}}};const Carousel=props=>{const{items,options}=props,orderedItems=[...items].sort(((a,b)=>"video"===a.type&&"video"!==b.type?-1:"video"===b.type&&"video"!==a.type?1:0)),[selectedIndex,setSelectedIndex]=(0,react.useState)(0),[emblaMainRef,emblaMainApi]=(0,embla_carousel_react_esm.A)(options),[emblaThumbsRef,emblaThumbsApi]=(0,embla_carousel_react_esm.A)({containScroll:"keepSnaps",dragFree:!0}),onThumbClick=(0,react.useCallback)((index=>{emblaMainApi&&emblaThumbsApi&&emblaMainApi.scrollTo(index)}),[emblaMainApi,emblaThumbsApi]),onSelect=(0,react.useCallback)((()=>{emblaMainApi&&emblaThumbsApi&&(setSelectedIndex(emblaMainApi.selectedScrollSnap()),emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap()))}),[emblaMainApi,emblaThumbsApi,setSelectedIndex]);return(0,react.useEffect)((()=>{emblaMainApi&&(onSelect(),emblaMainApi.on("select",onSelect).on("reInit",onSelect))}),[emblaMainApi,onSelect]),(0,jsx_runtime.jsxs)("div",{className:"embla sm:m-8",children:[(0,jsx_runtime.jsx)("div",{className:"overflow-hidden rounded-lg",ref:emblaMainRef,children:(0,jsx_runtime.jsx)("div",{className:"flex gap-4",children:orderedItems.map((item=>(0,jsx_runtime.jsx)("div",{className:"flex-[0_0_100%] min-w-0",children:(0,jsx_runtime.jsx)("div",{className:"relative mb-6 w-full aspect-video",children:"image"===item.type?(0,jsx_runtime.jsx)(next_image.A,{src:item.src||placeholder.A,alt:item.alt,fill:!0,className:"object-cover transition-opacity rounded-lg",sizes:"(max-width: 1280px) 100vw, 1280px"}):(0,jsx_runtime.jsx)("video",{className:"object-cover transition-opacity w-full h-full rounded-lg",controls:!0,src:item.src,"aria-label":item.alt,poster:item.preview,preload:"metadata",autoPlay:!0,muted:!0})})},item.id)))})}),(0,jsx_runtime.jsx)("div",{className:"px-6 lg:px-10 ",children:(0,jsx_runtime.jsx)("div",{className:"overflow-hidden rounded-xl",ref:emblaThumbsRef,children:(0,jsx_runtime.jsx)("div",{className:"flex gap-3 lg:gap-6",children:orderedItems.map(((item,index)=>(0,jsx_runtime.jsx)(ui_Thumb,{onClick:()=>onThumbClick(index),selected:index===selectedIndex,index,imageSrc:item.preview||item.src,altText:item.alt},item.id)))})})})]})},ui_Carousel=Carousel;Carousel.__docgenInfo={description:"",methods:[],displayName:"Carousel",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:'{\r\n  id: string;\r\n  type: "image" | "video";\r\n  src: string;\r\n  alt: string;\r\n  preview?: string;\r\n}',signature:{properties:[{key:"id",value:{name:"string",required:!0}},{key:"type",value:{name:"union",raw:'"image" | "video"',elements:[{name:"literal",value:'"image"'},{name:"literal",value:'"video"'}],required:!0}},{key:"src",value:{name:"string",required:!0}},{key:"alt",value:{name:"string",required:!0}},{key:"preview",value:{name:"string",required:!1}}]}}],raw:'Array<{\r\n  id: string;\r\n  type: "image" | "video";\r\n  src: string;\r\n  alt: string;\r\n  preview?: string;\r\n}>'},description:""},options:{required:!1,tsType:{name:"EmblaOptionsType"},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}}},"./stories/layout/MainGame.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>MainGame_stories});var jsx_runtime=__webpack_require__("./node_modules/next/dist/compiled/react/jsx-runtime.js"),Badge=__webpack_require__("./app/components/ui/Badge.tsx"),GameActions=__webpack_require__("./app/components/features/GameActions.tsx"),Requirements=__webpack_require__("./app/components/ui/Requirements.tsx"),Carousel=__webpack_require__("./app/components/ui/Carousel.tsx"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const SkeletonThemeContext=react.createContext({});function styleOptionsToCssProperties({baseColor,highlightColor,width,height,borderRadius,circle,direction,duration,enableAnimation=true,customHighlightBackground}){const style={};return"rtl"===direction&&(style["--animation-direction"]="reverse"),"number"==typeof duration&&(style["--animation-duration"]=`${duration}s`),enableAnimation||(style["--pseudo-element-display"]="none"),"string"!=typeof width&&"number"!=typeof width||(style.width=width),"string"!=typeof height&&"number"!=typeof height||(style.height=height),"string"!=typeof borderRadius&&"number"!=typeof borderRadius||(style.borderRadius=borderRadius),circle&&(style.borderRadius="50%"),void 0!==baseColor&&(style["--base-color"]=baseColor),void 0!==highlightColor&&(style["--highlight-color"]=highlightColor),"string"==typeof customHighlightBackground&&(style["--custom-highlight-background"]=customHighlightBackground),style}function Skeleton({count=1,wrapper:Wrapper,className:customClassName,containerClassName,containerTestId,circle=!1,style:styleProp,...originalPropsStyleOptions}){var _a,_b,_c;const contextStyleOptions=react.useContext(SkeletonThemeContext),propsStyleOptions={...originalPropsStyleOptions};for(const[key,value]of Object.entries(originalPropsStyleOptions))void 0===value&&delete propsStyleOptions[key];const styleOptions={...contextStyleOptions,...propsStyleOptions,circle},style={...styleProp,...styleOptionsToCssProperties(styleOptions)};let className="react-loading-skeleton";customClassName&&(className+=` ${customClassName}`);const inline=null!==(_a=styleOptions.inline)&&void 0!==_a&&_a,elements=[],countCeil=Math.ceil(count);for(let i=0;i<countCeil;i++){let thisStyle=style;if(countCeil>count&&i===countCeil-1){const width=null!==(_b=thisStyle.width)&&void 0!==_b?_b:"100%",fractionalPart=count%1,fractionalWidth="number"==typeof width?width*fractionalPart:`calc(${width} * ${fractionalPart})`;thisStyle={...thisStyle,width:fractionalWidth}}const skeletonSpan=react.createElement("span",{className,style:thisStyle,key:i},"‌");inline?elements.push(skeletonSpan):elements.push(react.createElement(react.Fragment,{key:i},skeletonSpan,react.createElement("br",null)))}return react.createElement("span",{className:containerClassName,"data-testid":containerTestId,"aria-live":"polite","aria-busy":null===(_c=styleOptions.enableAnimation)||void 0===_c||_c},Wrapper?elements.map(((el,i)=>react.createElement(Wrapper,{key:i},el))):elements)}const ExternalLink=(0,__webpack_require__("./node_modules/lucide-react/dist/esm/createLucideIcon.js").A)("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);function MainGame({gameDetails,gameMedia,user,activeTooltip,setActiveTooltip}){var _gameDetails_platforms,_pcPlatform_requirements,_pcPlatform_requirements1,_gameDetails_genres,_gameDetails_developers,_gameDetails_platforms1,_gameDetails_platforms2,_gameDetails_publishers,_gameDetails_esrb_rating,_gameDetails_tags,_gameDetails_stores;const carouselItems=[...((null==gameMedia?void 0:gameMedia.short_screenshots)||[]).map((screenshot=>({id:`screenshot-${screenshot.id}`,type:"image",src:screenshot.image,alt:`${gameDetails.name} screenshot ${screenshot.id}`}))),...((null==gameMedia?void 0:gameMedia.movies)||[]).map((trailer=>({id:`trailer-${trailer.id}`,type:"video",src:trailer.data.max||"",preview:trailer.preview,alt:`${gameDetails.name} trailer ${trailer.id}`})))],formatRequirements=reqString=>reqString?reqString.split("\n").map((line=>{const cleanedLine=line.replace(/^(Recommended|Minimum):\s*/i,""),[key,value]=cleanedLine.split(": ");return{key,value}})):[],pcPlatform=null===(_gameDetails_platforms=gameDetails.platforms)||void 0===_gameDetails_platforms?void 0:_gameDetails_platforms.find((p=>"pc"===p.platform.slug)),minRequirements=formatRequirements(null==pcPlatform||null===(_pcPlatform_requirements=pcPlatform.requirements)||void 0===_pcPlatform_requirements?void 0:_pcPlatform_requirements.minimum),recRequirements=formatRequirements(null==pcPlatform||null===(_pcPlatform_requirements1=pcPlatform.requirements)||void 0===_pcPlatform_requirements1?void 0:_pcPlatform_requirements1.recommended);return(0,jsx_runtime.jsxs)("main",{className:"container px-6 mx-auto",children:[(0,jsx_runtime.jsx)("h1",{className:"mb-6 text-4xl font-bold md:text-5xl",children:gameDetails.name||(0,jsx_runtime.jsx)(Skeleton,{})}),carouselItems.length>0?(0,jsx_runtime.jsx)(Carousel.A,{items:carouselItems}):(0,jsx_runtime.jsx)(Skeleton,{}),(0,jsx_runtime.jsxs)("div",{className:"lg:mx-20 mx-4",children:[(0,jsx_runtime.jsx)(GameActions.k,{gameId:gameDetails.id,user:!!user,activeTooltip,setActiveTooltip,ratingsCount:gameDetails.ratings_count||0,className:"mx-6 my-4"}),(0,jsx_runtime.jsxs)("div",{className:"mb-8",children:[(0,jsx_runtime.jsx)("h2",{className:"mb-4 text-2xl font-semibold",children:"Description"}),(0,jsx_runtime.jsx)("p",{className:"text-gray-700 whitespace-pre-line dark:text-gray-300",children:gameDetails.description_raw})]}),(0,jsx_runtime.jsxs)("div",{className:"grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 relative",children:[(0,jsx_runtime.jsx)("div",{className:"hidden md:block absolute left-1/2 h-full w-px bg-gradient-to-b from-transparent via-gray-800 to-transparent dark:via-gray-200"}),(0,jsx_runtime.jsxs)("div",{className:"md:flex flex-col items-center md:text-center md:mx-10",children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("h3",{className:"mb-2 text-lg font-medium",children:"Genres"}),(0,jsx_runtime.jsx)("div",{className:"md:flex-col items-center",children:(null===(_gameDetails_genres=gameDetails.genres)||void 0===_gameDetails_genres?void 0:_gameDetails_genres.length)?gameDetails.genres.map((genre=>(0,jsx_runtime.jsx)(Badge.E,{className:"m-1",children:genre.name},genre.id))):(0,jsx_runtime.jsx)("p",{className:"text-gray-500",children:"No genres available"})})]}),(0,jsx_runtime.jsxs)("div",{className:"mt-4",children:[(0,jsx_runtime.jsx)("h3",{className:"mb-2 text-lg font-medium",children:"Developer"}),(0,jsx_runtime.jsx)("p",{children:(null===(_gameDetails_developers=gameDetails.developers)||void 0===_gameDetails_developers?void 0:_gameDetails_developers.map((d=>d.name)).join(", "))||(0,jsx_runtime.jsxs)("span",{className:"text-gray-500",children:[" ","Developer information not available"," "]})})]}),(0,jsx_runtime.jsxs)("div",{className:"mt-4",children:[(0,jsx_runtime.jsx)("h3",{className:"mb-2 text-lg font-medium",children:"Release Date"}),(0,jsx_runtime.jsx)("p",{children:gameDetails.released?new Date(gameDetails.released).toLocaleDateString():(0,jsx_runtime.jsx)("span",{className:"text-gray-500",children:"Release date not announced"})})]})]}),(0,jsx_runtime.jsxs)("div",{className:"md:mx-10 flex-col items-center md:text-center",children:[(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("h3",{className:"mb-2 text-lg font-medium",children:"Platforms"}),(0,jsx_runtime.jsx)("div",{className:"md:flex-col items-center",children:(null===(_gameDetails_platforms1=gameDetails.platforms)||void 0===_gameDetails_platforms1?void 0:_gameDetails_platforms1.length)?null===(_gameDetails_platforms2=gameDetails.platforms)||void 0===_gameDetails_platforms2?void 0:_gameDetails_platforms2.map((p=>(0,jsx_runtime.jsx)(Badge.E,{className:"m-1",children:p.platform.name},p.platform.id))):(0,jsx_runtime.jsx)("p",{className:"text-gray-500",children:"Platform information not available"})})]}),(0,jsx_runtime.jsxs)("div",{className:"mt-4",children:[(0,jsx_runtime.jsx)("h3",{className:"mb-2 text-lg font-medium",children:"Publisher"}),(0,jsx_runtime.jsx)("p",{children:(null===(_gameDetails_publishers=gameDetails.publishers)||void 0===_gameDetails_publishers?void 0:_gameDetails_publishers.length)?gameDetails.publishers.map(((p,index)=>(0,jsx_runtime.jsxs)("span",{children:[index>0&&", ",gameDetails.website?(0,jsx_runtime.jsx)("a",{href:`${gameDetails.website}`,target:"_blank",rel:"noopener noreferrer",className:"underline dark:hover:text-gray-600 hover:text-gray-400",children:p.name}):p.name]},p.id))):(0,jsx_runtime.jsx)("span",{className:"text-gray-500",children:"Publisher information not available"})})]}),(0,jsx_runtime.jsxs)("div",{className:"mt-4",children:[(0,jsx_runtime.jsx)("h3",{className:"mb-2 text-lg font-medium",children:"Classification"}),(0,jsx_runtime.jsx)("p",{children:(null===(_gameDetails_esrb_rating=gameDetails.esrb_rating)||void 0===_gameDetails_esrb_rating?void 0:_gameDetails_esrb_rating.name)||(0,jsx_runtime.jsx)("span",{className:"text-gray-500",children:" Not Rated "})})]})]})]}),(0,jsx_runtime.jsxs)("div",{className:"mb-8",children:[(0,jsx_runtime.jsx)("h2",{className:"mb-4 text-2xl font-semibold",children:"Tags"}),(0,jsx_runtime.jsx)("div",{className:"flex flex-wrap gap-2",children:(null===(_gameDetails_tags=gameDetails.tags)||void 0===_gameDetails_tags?void 0:_gameDetails_tags.length)?gameDetails.tags.map((tag=>(0,jsx_runtime.jsx)(Badge.E,{variant:"outline",children:tag.name},tag.id))):(0,jsx_runtime.jsx)("p",{className:"text-gray-500",children:"No tags available"})})]}),(0,jsx_runtime.jsxs)("div",{className:"mb-8",children:[(0,jsx_runtime.jsx)("h2",{className:"mb-4 text-2xl font-semibold",children:"Available at"}),(null===(_gameDetails_stores=gameDetails.stores)||void 0===_gameDetails_stores?void 0:_gameDetails_stores.length)?(0,jsx_runtime.jsx)("div",{className:"grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4",children:gameDetails.stores.map((store=>(0,jsx_runtime.jsxs)("a",{href:`https://${store.store.domain}`,target:"_blank",rel:"noopener noreferrer",className:"flex gap-2 items-center p-3 rounded-lg border transition-colors hover:bg-muted",children:[store.store.name,(0,jsx_runtime.jsx)(ExternalLink,{className:"w-4 h-4"})]},store.id)))}):(0,jsx_runtime.jsx)("p",{className:"text-gray-500",children:"Store information not available"})]}),gameDetails.metacritic?(0,jsx_runtime.jsxs)("div",{className:"mb-8",children:[(0,jsx_runtime.jsx)("h2",{className:"mb-4 text-2xl font-semibold",children:"Ratings & Reviews"}),(0,jsx_runtime.jsxs)("div",{className:"flex gap-4 items-center",children:[(0,jsx_runtime.jsx)("div",{className:"flex items-center justify-center w-16 h-16 rounded-full border-4 "+(gameDetails.metacritic>=75?"border-green-500 text-green-500":gameDetails.metacritic>=50?"border-yellow-500 text-yellow-500":"border-red-500 text-red-500"),children:(0,jsx_runtime.jsx)("span",{className:"text-xl font-bold",children:gameDetails.metacritic})}),(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("p",{className:"font-medium",children:"Metacritic Score"}),gameDetails.metacritic_url&&(0,jsx_runtime.jsxs)("a",{href:gameDetails.metacritic_url,target:"_blank",rel:"noopener noreferrer",className:"flex gap-1 items-center text-blue-500 hover:underline",children:["Read review ",(0,jsx_runtime.jsx)(ExternalLink,{className:"w-3 h-3"})]})]})]})]}):(0,jsx_runtime.jsxs)("div",{className:"mb-8",children:[(0,jsx_runtime.jsx)("h2",{className:"mb-4 text-2xl font-semibold",children:"Ratings & Reviews"}),(0,jsx_runtime.jsx)("p",{className:"text-gray-500",children:"No rating information available"})]}),(0,jsx_runtime.jsx)(Requirements.r,{minRequirements,recRequirements})]})]})}const layout_MainGame=MainGame;MainGame.__docgenInfo={description:"",methods:[],displayName:"MainGame",props:{gameDetails:{required:!0,tsType:{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  name: string;\r\n  slug: string;\r\n  description_raw: string;\r\n  genres: Genre[];\r\n  released: string;\r\n  ratings_count?: number;\r\n  platforms?: Platform[];\r\n  stores?: Store[];\r\n  developers?: Developer[];\r\n  publishers?: Publisher[];\r\n  website?: string;\r\n  esrb_rating?: ESRBRating;\r\n  tags?: Tag[];\r\n  metacritic?: number;\r\n  metacritic_url?: string;\r\n  // The requirements are within each Platform\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"slug",value:{name:"string",required:!0}},{key:"description_raw",value:{name:"string",required:!0}},{key:"genres",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  name: string;\r\n  slug: string;\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"slug",value:{name:"string",required:!0}}]}}],raw:"Genre[]",required:!0}},{key:"released",value:{name:"string",required:!0}},{key:"ratings_count",value:{name:"number",required:!1}},{key:"platforms",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\r\n  platform: {\r\n    id: number;\r\n    name: string;\r\n    slug: string;\r\n  };\r\n  requirements?: Requirement;\r\n}",signature:{properties:[{key:"platform",value:{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  name: string;\r\n  slug: string;\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"slug",value:{name:"string",required:!0}}]},required:!0}},{key:"requirements",value:{name:"signature",type:"object",raw:"{\r\n  minimum?: string;\r\n  recommended?: string;\r\n}",signature:{properties:[{key:"minimum",value:{name:"string",required:!1}},{key:"recommended",value:{name:"string",required:!1}}]},required:!1}}]}}],raw:"Platform[]",required:!1}},{key:"stores",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  store: {\r\n    id: number;\r\n    name: string;\r\n    slug: string;\r\n    domain: string;\r\n  };\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"store",value:{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  name: string;\r\n  slug: string;\r\n  domain: string;\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"slug",value:{name:"string",required:!0}},{key:"domain",value:{name:"string",required:!0}}]},required:!0}}]}}],raw:"Store[]",required:!1}},{key:"developers",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  name: string;\r\n  slug: string;\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"slug",value:{name:"string",required:!0}}]}}],raw:"Developer[]",required:!1}},{key:"publishers",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  name: string;\r\n  slug: string;\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"slug",value:{name:"string",required:!0}}]}}],raw:"Publisher[]",required:!1}},{key:"website",value:{name:"string",required:!1}},{key:"esrb_rating",value:{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  name: string;\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}}]},required:!1}},{key:"tags",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  name: string;\r\n  slug: string;\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"slug",value:{name:"string",required:!0}}]}}],raw:"Tag[]",required:!1}},{key:"metacritic",value:{name:"number",required:!1}},{key:"metacritic_url",value:{name:"string",required:!1}}]}},description:""},gameMedia:{required:!0,tsType:{name:"union",raw:"GameMedia | null",elements:[{name:"signature",type:"object",raw:"{\r\n  movies: Trailer[];\r\n  short_screenshots: ShortScreenshot[];\r\n}",signature:{properties:[{key:"movies",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  name: string;\r\n  preview: string;\r\n  data: {\r\n    max: string;\r\n  };\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"name",value:{name:"string",required:!0}},{key:"preview",value:{name:"string",required:!0}},{key:"data",value:{name:"signature",type:"object",raw:"{\r\n  max: string;\r\n}",signature:{properties:[{key:"max",value:{name:"string",required:!0}}]},required:!0}}]}}],raw:"Trailer[]",required:!0}},{key:"short_screenshots",value:{name:"Array",elements:[{name:"signature",type:"object",raw:"{\r\n  id: number;\r\n  image: string;\r\n}",signature:{properties:[{key:"id",value:{name:"number",required:!0}},{key:"image",value:{name:"string",required:!0}}]}}],raw:"ShortScreenshot[]",required:!0}}]}},{name:"null"}]},description:""},user:{required:!0,tsType:{name:"boolean"},description:""},activeTooltip:{required:!0,tsType:{name:"union",raw:"{ type: string; gameId: number } | null",elements:[{name:"signature",type:"object",raw:"{ type: string; gameId: number }",signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"gameId",value:{name:"number",required:!0}}]}},{name:"null"}]},description:""},setActiveTooltip:{required:!0,tsType:{name:"Dispatch",elements:[{name:"SetStateAction",elements:[{name:"union",raw:"{ type: string; gameId: number } | null",elements:[{name:"signature",type:"object",raw:"{ type: string; gameId: number }",signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"gameId",value:{name:"number",required:!0}}]}},{name:"null"}]}],raw:"SetStateAction<{ type: string; gameId: number } | null>"}],raw:"Dispatch<\r\n  SetStateAction<{ type: string; gameId: number } | null>\r\n>"},description:""}}};const MainGame_stories={title:"Components/Layout/MainGame",component:layout_MainGame,tags:["autodocs"]},Default={args:{gameDetails:{id:1,name:"Cyber Adventure 2077",slug:"cyber-adventure-2077",description_raw:"A futuristic open-world RPG set in a dystopian metropolis...",genres:[{id:1,name:"RPG",slug:"rpg"},{id:2,name:"Action",slug:"action"}],platforms:[{platform:{id:1,name:"PC",slug:"pc"},requirements:{minimum:"OS: Win 10\nCPU: Intel i5",recommended:"OS: Win 11\nCPU: Intel i7"}},{platform:{id:2,name:"PlayStation 5",slug:"ps5"}}],released:"2023-10-01",developers:[{id:1,name:"Cyber Studios",slug:"cyber-studios"}],publishers:[{id:1,name:"Future Games Inc",slug:"future-games-inc"}],tags:[{id:1,name:"cyberpunk",slug:"cyberpunk"},{id:2,name:"futuristic",slug:"futuristic"}],website:"https://example.com",stores:[{id:1,store:{id:1,name:"Steam",slug:"steam",domain:"store.steampowered.com"}}],metacritic:87,metacritic_url:"https://metacritic.com/game/cyber-adventure-2077",esrb_rating:{id:1,name:"Mature 17+"},ratings_count:1500},gameMedia:{short_screenshots:[{id:1,image:"https://placehold.co/600x400"},{id:2,image:"https://placehold.co/600x400"}],movies:[{id:1,name:"Gameplay Trailer",preview:"https://placehold.co/600x400",data:{max:"https://example.com/trailer.mp4"}}]},user:!0,activeTooltip:null,setActiveTooltip:()=>{}},parameters:{layout:"fullscreen",paddings:{values:[{name:"None",value:"0"},{name:"Small",value:"16px"},{name:"Medium",value:"32px",default:!0}]}}},__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:'{\n  args: {\n    gameDetails: mockGameDetails,\n    gameMedia: mockGameMedia,\n    user: true,\n    activeTooltip: null,\n    setActiveTooltip: () => {}\n  },\n  parameters: {\n    layout: "fullscreen",\n    paddings: {\n      values: [{\n        name: "None",\n        value: "0"\n      }, {\n        name: "Small",\n        value: "16px"\n      }, {\n        name: "Medium",\n        value: "32px",\n        default: true\n      }]\n    }\n  }\n}',...Default.parameters?.docs?.source}}}}}]);