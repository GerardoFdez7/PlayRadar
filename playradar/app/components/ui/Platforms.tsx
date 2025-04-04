import React from 'react';

const PcIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

const PlaystationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8.985 2.596v17.548l3.915 1.261V6.688c0-.69.304-1.151.794-.991.636.181.76.814.76 1.505v5.876c2.441 1.193 4.362-.002 4.362-3.153 0-3.237-1.126-4.675-4.438-5.827-1.307-.448-3.728-1.186-5.391-1.502zm4.656 16.242 6.296-2.275c.715-.258.826-.625.246-.818-.586-.192-1.637-.139-2.357.123l-4.205 1.499v-2.385l.24-.085s1.201-.42 2.913-.615c1.696-.18 3.785.029 5.437.661 1.848.601 2.041 1.472 1.576 2.072s-1.622 1.036-1.622 1.036l-8.544 3.107v-2.297zM1.808 18.6c-1.9-.545-2.214-1.668-1.352-2.321.801-.585 2.159-1.051 2.159-1.051l5.616-2.013v2.313L4.206 17c-.705.271-.825.632-.239.826.586.195 1.637.15 2.343-.12L8.248 17v2.074c-.121.029-.256.044-.391.073-1.938.331-3.995.196-6.037-.479z" />
  </svg>
);

const Playstation5Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={512}
      cy={512}
      r={512}
      className="fill-[#000000] dark:fill-white"
    />
    <path
      d="M242.37 595.7c-21.06 14-14 40.72 30.89 53.36a302.24 302.24 0 0 0 146 11.23c2.81 0 5.62-1.4 7-1.4v-47.75l-47.74 15.45c-18.25 5.62-36.51 7-54.76 2.81-14-4.21-11.23-12.64 5.62-19.66L426.32 576v-52l-134.8 46.34a181.6 181.6 0 0 0-49.15 25.36m325.77-210.63v136.21c57.57 28.08 102.51 0 102.51-73 0-74.42-26.68-108.12-103.91-134.8-40.72-14-82.85-26.68-125-35.1v405.78l98.29 29.49V372.43c0-15.45 0-26.68 11.23-22.47 15.48 4.22 16.88 19.66 16.88 35.11M750.69 563.4c-40.72-14-84.25-19.66-126.38-15.45-22.47 1.4-43.53 7-63.19 14l-4.21 1.4v54.76l91.27-33.7c18.25-5.62 36.51-7 54.76-2.81 14 4.21 11.23 12.64-5.62 19.66l-140.42 52v53.36L750.69 635c14-5.62 26.68-12.64 37.91-23.87 9.83-14.03 5.62-33.69-37.91-47.73"
      className="fill-white dark:fill-[#000000]"
    />
  </svg>
);

const Playstation4Icon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    className="w-4 h-4"
    viewBox="0 0 50.974 50.974"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M44.098 25.905a.5.5 0 0 0-.153-.039c-.087-.011.497-.627 1.122-1.538 2.103-3.067 2.585-7.254.486-11.255C41.598 5.527 30.158-.413 21.7.739c-.418.057-1.004.274-1.067.768-.865 6.732-.372 13.509-.244 20.261.021 1.105-.202 2.029-.475 2.103a5 5 0 0 0-.487.156C13.244 26.825.48 27.644 0 36.541c.084 11.379 11.5 7.826 19.064 7.435a1 1 0 0 0 .116-.011c.064-.008.21.365.384.812q.158.407.371.784c2.039 3.579 5.829 4.332 9.647 4.811a1 1 0 0 0 .195.004c.107-.007.38-.012.607-.041.152-.02.293-.055.398-.107 6.104-3.059 13.17-6.277 17.762-11.507 5.011-5.702 1.649-10.036-4.446-12.816m-25.176 2.629c-.03 1.105-.951 2.078-2.023 2.344-2.401.596-4.808 1.853-5.904 3.861-1.906 3.496 2.619 3.605 5.667 3.456 1.103-.054 1.971.78 1.94 1.884l-.03 1.089c-.031 1.104-.948 2.082-2.046 2.205-.816.092-1.645.189-2.472.273-1.099.111-2.085.136-2.196.092s-.246-.041-.304.014-.83.141-1.725.121c-.894-.019-1.257-.437-.816-.838.44-.402.493-1.058.208-1.525-.286-.468-1.07-.302-1.84.416-.771.72-2.273 1.017-3.125.312-1.419-1.171-2.302-3.105-2.325-6.214.368-6.818 8.926-8.486 15.185-10.381 1.057-.32 1.878.277 1.847 1.382zm-.512 4.876-.075 1.873c-.044 1.104-.968 2.124-2.072 2.169-1.944.08-3.829-.221-3.613-2.204.19-1.744 2.034-2.869 3.883-3.436 1.056-.323 1.921.494 1.877 1.598m10.238 15.335c-.158-.029-.16-.184-.004-.342.158-.158.285-.134.287.054s-.124.317-.283.288m-.017-23.89c-.168 7.022.146 14.053.266 21.078.02 1.104-.127 2.164-.318 2.365s-.922.251-1.613.046-.703-1.004-.047-1.703.842-1.928.618-2.808-.708-1.177-1.251-.631l-.982.99q-.52.525-1.05 1.049c-.582.576-1.729.426-2.247-.55-.623-1.174-.961-2.645-.973-4.491-.019-3.103.798-6.228 1.19-9.294 1.095-8.556-.585-17.476-.023-26.104.054-.828.011-1.441.057-1.879.109-1.032 1.218-.788 1.039-.604-.179.183-.421 1.139-.507 2.137-.086.997.125 1.559.437 1.251l.565-.558q.645-.715 1.282-1.428c.705-.791 2.079-1.262 3.051-.973.589.176 1.173.367 1.748.562 3.254 1.104 6.242 2.915 8.985 4.955 2.771 2.062 4.701 4.515 5.6 7.854 1.268 4.705-.761 9.676-5.158 11.054-1.055.33-1.938-.54-1.894-1.643.104-2.637.164-5.575-1.082-7.755-.976-1.706-3.83-3.907-5.865-2.24-2.621 2.147-1.757 6.309-1.828 9.32m2.116 14.931c-.022-1.104-.03-2.004-.019-2.009 1.863-.864 9.963-6.072 9.187-.715-.305 2.108-3.153 3.89-4.7 5.003-.884.635-1.799 1.227-2.709 1.823-.924.604-1.674.22-1.695-.886q-.03-1.606-.064-3.216m14.072.728c-3.419 2.993-7.509 5.267-11.601 7.352-.984.501-1.787.805-1.789.688s-.058-.236-.125-.268c-.068-.03-.188.012-.27.094-.057.058-.107-.172-.135-.554-.025-.334-.036-.933.02-1.33.053-.368.145-.626.254-.659a1 1 0 0 0 .295-.129c2.297-1.732 4.805-3.154 7.067-4.94 1.748-1.379 4.067-3.412 3.039-5.858-1.196-2.845-5.886-.703-9.14 1.043-.973.522-1.771.07-1.791-1.034-.075-4.039-.113-8.079-.018-12.119.023-.962-.025-1.928-.014-2.891.033-2.977 3.107-3.374 4.205-.554 1.005 2.584.598 5.709.559 8.427q0 .061.016.11c.019.06-.338.35-.241.732.041.166.219.288.596.302 1.827.067 3.519-.287 5.004-.965 1.005-.457 1.611-.874 1.462-.726-.148.147-.035.177.24.037.275-.142 1.312.09 2.284.615 2.094 1.132 3.983 2.617 4.544 5.059.687 2.988-2.522 5.871-4.461 7.568" />
    <path d="m27.088 28.487-3.194 3.121c-.79.772-1.436 1.442-1.445 1.498s.634-.516 1.437-1.273l3.176-3.007c.803-.76 1.453-1.456 1.455-1.556.001-.101-.64.443-1.429 1.217m.172-16.125c.498-.455.899-.865.9-.916s-.402.319-.9.824-.498.546 0 .092m-.664 22.232c-1.22 1.109-2.387 2.176-3.486 3.182a7 7 0 0 0-.927 1.034c-.454.62-.333 1.601.099 1.333a4 4 0 0 0 .708-.584q1.711-1.718 3.471-3.479.347-.353.695-.71c.383-.393.747-1.025.81-1.417.06-.389-.554-.103-1.37.641m-3.303-21.159c.201-.151.432-.357.677-.607l2.82-2.89c.771-.79 1.406-1.701 1.425-2.034.018-.333-.619.014-1.4.795-.84.839-.273.344-2.827 2.815-.317.307-.61.638-.847.949-.425.561-.249 1.275.152.972m16.768 2.444c-.021-.009-.678.599-1.457 1.357-.78.76-1.402 1.4-1.393 1.43s.656-.572 1.465-1.368c.787-.774 1.407-1.409 1.385-1.419M24.239 19.63l2.538-2.378c.806-.756 1.451-1.655 1.443-2.01-.006-.354-.674-.035-1.47.73a331 331 0 0 0-2.585 2.527c-.786.776-1.414 1.65-1.405 1.952.01.302.672-.066 1.479-.821m2.629.617-2.547 2.365c-.809.752-1.452 1.985-1.441 2.756s.667.788 1.477.037l2.601-2.412c.81-.751 1.446-1.975 1.421-2.733-.024-.76-.701-.765-1.511-.013m13.951-1.572c.753-.669 1.345-1.24 1.319-1.276-.024-.037-.637.505-1.364 1.211s-.71.734.045.065m-3.528.22c.032.089.703-.455 1.503-1.218l.265-.251c.799-.763 1.363-1.417 1.261-1.457-.104-.04-.831.561-1.655 1.366-.792.773-1.405 1.472-1.374 1.56m-25.519 8.776a9.4 9.4 0 0 0-1.417 1.122l-5.743 5.71q-.529.568-1.06 1.131c-.587.624-1.058 1.581-1.011 2.134s.782.381 1.586-.375l1.477-1.388c2.666-2.759 5.329-5.508 7.98-8.218q.354-.363.706-.728c.265-.272.16-.407-.213-.375-.395.035-1.468.44-2.305.987" />
  </svg>
);

const XboxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m24 12c0-.001 0-.001 0-.002 0-3.618-1.606-6.861-4.144-9.054l-.015-.013c-1.91 1.023-3.548 2.261-4.967 3.713l-.004.004c.044.046.087.085.131.132 3.719 4.012 7.106 9.73 6.546 12.471 1.53-1.985 2.452-4.508 2.452-7.246 0-.002 0-.004 0-.006z" />
    <path d="m12.591 3.955c1.68-1.104 3.699-1.833 5.872-2.022l.048-.003c-1.837-1.21-4.09-1.929-6.511-1.929-2.171 0-4.207.579-5.962 1.591l.058-.031c.658.567 2.837.781 5.484 2.4.143.089.316.142.502.142.189 0 .365-.055.513-.149l-.004.002z" />
    <path d="m9.166 6.778c.046-.049.093-.09.138-.138-1.17-1.134-2.446-2.174-3.806-3.1l-.099-.064c-.302-.221-.681-.354-1.091-.354-.146 0-.288.017-.425.049l.013-.002c-2.398 2.198-3.896 5.344-3.896 8.84 0 2.909 1.037 5.576 2.762 7.651l-.016-.02c-1.031-2.547 2.477-8.672 6.419-12.862z" />
    <path d="m12.084 9.198c-3.962 3.503-9.477 8.73-8.632 11.218 2.174 2.213 5.198 3.584 8.542 3.584 3.493 0 6.637-1.496 8.826-3.883l.008-.009c.486-2.618-4.755-7.337-8.744-10.91z" />
  </svg>
);

const XboxOneIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    viewBox="0 0 575.568 575.568"
    xmlSpace="preserve"
    fill="currentColor"
    {...props}
  >
    <path d="M285.994 141.629c9.553-6.861 59.149-38.887 132.088-23.397-36.084-27.772-81.25-44.327-130.307-44.327-48.562 0-93.324 16.212-129.224 43.482 70.374-13.176 118.097 17.534 127.443 24.242m0 101.164c-132.143 102.025-144.09 182.223-145.026 200.441 38.311 36.193 89.952 58.428 146.812 58.428 55.129 0 105.379-20.869 143.305-55.129.173-7.539-1.253-92.681-145.091-203.74" />
    <path d="M339.697 194.334s148.74 144.462 91.848 251.794c43.066-39.125 70.111-95.576 70.111-158.348 0-63.011-27.264-119.652-70.619-158.79-1.463 5.607-85.527 33.404-91.34 65.344m-107.406 0c-5.361-29.492-77.412-55.447-89.578-63.66-42.295 39.076-68.807 94.988-68.807 157.112 0 59.504 24.321 113.313 63.532 152.083-48.135-106.603 94.853-245.535 94.853-245.535" />
    <path d="M287.787 575.568c158.686 0 287.782-129.102 287.782-287.788C575.568 129.095 446.467 0 287.787 0 129.095 0 0 129.102 0 287.787c0 158.686 129.095 287.781 287.787 287.781m0-544.968c141.813 0 257.18 115.374 257.18 257.187s-115.373 257.18-257.18 257.18c-141.806 0-257.193-115.373-257.193-257.18S145.974 30.6 287.787 30.6" />
  </svg>
);

const XboxSeriesXIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M370.594 27.027C334.85 9.097 296.294.002 255.998.002c-39.736 0-77.822 8.855-113.192 26.324a10.24 10.24 0 0 0-5.692 9.705 10.25 10.25 0 0 0 6.652 9.085c38.907 14.498 75.157 33.978 107.739 57.891a10.2 10.2 0 0 0 6.063 1.991c2.131 0 4.257-.66 6.063-1.991 32.102-23.563 67.761-42.823 105.987-57.241a10.24 10.24 0 0 0 6.614-9.055 10.23 10.23 0 0 0-5.638-9.684m-113.026 55.09c-25.919-18.37-53.949-34.098-83.645-46.955 52.828-19.701 113.186-19.471 165.834.64-29.145 12.727-56.69 28.245-82.189 46.315" />
    <path d="M416.609 56.643a10.24 10.24 0 0 0-11.746-.78c-24.893 15.098-63.394 39.801-105.422 71.739a10.23 10.23 0 0 0-4.027 7.494 10.24 10.24 0 0 0 3.022 7.944c14.843 14.678 28.786 30.666 41.442 47.526 58.391 77.862 81.294 138.815 89.478 180.687-29.551-67.426-84.896-136.043-165.134-204.6a10.22 10.22 0 0 0-13.307 0c-80.353 68.657-135.723 137.344-165.244 204.83 8.164-42.223 31.201-103.055 89.593-180.917 12.652-16.859 26.595-32.858 41.437-47.526a10.22 10.22 0 0 0 3.026-7.944 10.22 10.22 0 0 0-4.028-7.494c-42.777-32.497-81.918-57.541-107.226-72.829a10.25 10.25 0 0 0-11.671.74C35.284 104.419 0 177.498 0 256c0 62.404 22.712 122.526 63.949 169.271a10.2 10.2 0 0 0 4.202 2.862 10.2 10.2 0 0 0 2.481 4.432c48.811 51.228 114.642 79.433 185.365 79.433 71.118 0 139.625-29.956 187.951-82.184a10.2 10.2 0 0 0 2.586-5.283 10.2 10.2 0 0 0 4.928-3.202C490.499 375.214 512 316.503 512 256c0-77.802-34.769-150.461-95.391-199.357M62.283 389.962C35.179 350.791 20.491 304.136 20.491 256c0-69.847 30.361-135.022 83.56-179.937 22.832 13.998 54.84 34.739 89.933 60.843a450 450 0 0 0-35.109 41.372c-71.143 94.851-92.014 166.75-96.592 211.684m193.715 101.545c-63.184 0-122.126-24.473-166.605-69.047 20.196-76.121 76.731-154.953 168.176-234.496 90.414 78.642 146.719 156.634 167.495 231.995-44.209 45.534-105.502 71.548-169.066 71.548m100.268-313.239a452 452 0 0 0-35.114-41.362c34.352-25.544 65.7-45.925 88.112-59.722 52.363 44.874 82.244 109.639 82.244 178.816a235.8 235.8 0 0 1-39.121 130.01c-5.362-44.464-26.753-115.242-96.121-207.742" />
  </svg>
);

const NintendoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={512}
      cy={512}
      r={512}
      className="fill-[#000000] dark:fill-white"
    />
    <path
      d="M296.9 307.7h127.3l176.6 285v-285h126.4v408.7H600.9l-177.4-285v285H296.9z"
      className="fill-white dark:fill-[#000000]"
    />
  </svg>
);

const NintendoSwitchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" viewBox="1 3 12 8" fill="currentColor" {...props}>
    <path d="m 8.088,13 1.837,0 C 11.613,13 13,11.613 13,9.925 l 0,-5.85 C 13,2.3875 11.613,1 9.925,1 L 8.05,1 C 8.013,1 7.975,1.037 7.975,1.075 l 0,11.85 C 7.9745,12.963 8.0125,13 8.088,13 Z m 2.287,-6.5995 c 0.6755,0 1.1995,0.5625 1.1995,1.199 0,0.676 -0.5625,1.2 -1.1995,1.2 -0.675,0 -1.2,-0.5245 -1.2,-1.2 C 9.1375,6.925 9.7,6.4005 10.375,6.4005 Z M 6.7,1 4.075,1 C 2.3875,1 1,2.3875 1,4.075 l 0,5.85 C 1,11.613 2.3875,13 4.075,13 L 6.7,13 c 0.037,0 0.075,-0.037 0.075,-0.0745 l 0,-11.8505 C 6.7755,1.037 6.7375,1 6.7,1 Z m -0.862,11.0255 -1.763,0 c -1.163,0 -2.1005,-0.9375 -2.1005,-2.1005 l 0,-5.85 c 0,-1.163 0.9375,-2.1005 2.1005,-2.1005 l 1.725,0 0.038,10.051 z M 2.875,4.5995 c 0,0.6375 0.4875,1.125 1.125,1.125 0.6375,0 1.125,-0.4875 1.125,-1.125 0,-0.6365 -0.4875,-1.125 -1.125,-1.125 -0.6375,0 -1.125,0.4885 -1.125,1.125 z" />
  </svg>
);

const NintendoWiiIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    {...props}
  >
    <path d="M26 2h-8c-1.7 0-3 1.3-3 3v19c0 1.7 1.3 3 3 3h2.7c-.3.6-1 1-1.7 1h-2.8c-3.8-1.7-6.2-5.5-6.2-9.6v-2.9c0-1.9-1.6-3.5-3.5-3.5S3 13.6 3 15.5v2C3 24.4 8.6 30 15.5 30H19c1.9 0 3.4-1.3 3.9-3H26c1.7 0 3-1.3 3-3V5c0-1.7-1.3-3-3-3M5 17.5v-2c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v2.9c0 3.4 1.4 6.6 3.7 8.9C7.8 25.7 5 21.9 5 17.5m17.9 3.9c-.1.1-.1.2-.2.3-.2.2-.4.3-.7.3-.1 0-.3 0-.4-.1s-.2-.1-.3-.2-.2-.2-.2-.3-.1-.3-.1-.4c0-.3.1-.5.3-.7.1-.1.2-.2.3-.2.4-.2.8-.1 1.1.2.2.2.3.4.3.7 0 .1 0 .3-.1.4M22 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m2-7h-1v1c0 .6-.4 1-1 1s-1-.4-1-1v-1h-1c-.6 0-1-.4-1-1s.4-1 1-1h1V7c0-.6.4-1 1-1s1 .4 1 1v1h1c.6 0 1 .4 1 1s-.4 1-1 1" />
  </svg>
);

const NintendoDsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    id="_x32_"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
    {...props}
  >
    <path
      className="st0"
      d="M154.467 298.842h203.066V449.69H154.467zM78.614 416.093h23.226v-30.21h30.21v-23.226h-30.21v-30.21H78.614v30.21h-30.21v23.226h30.21zm345.11-58.31c7.754 0 14.038-6.301 14.038-14.037 0-7.771-6.284-14.037-14.038-14.037-7.753 0-14.04 6.266-14.04 14.037 0 7.736 6.287 14.037 14.04 14.037"
    />
    <circle className="st0" cx={423.724} cy={404.778} r={14.037} />
    <path
      className="st0"
      d="M393.204 388.307c7.744 0 14.037-6.283 14.037-14.037 0-7.753-6.293-14.037-14.037-14.037-7.762 0-14.042 6.284-14.042 14.037.001 7.754 6.28 14.037 14.042 14.037m61.032 0c7.75 0 14.042-6.283 14.042-14.037 0-7.753-6.292-14.037-14.042-14.037-7.758 0-14.037 6.284-14.037 14.037s6.279 14.037 14.037 14.037"
    />
    <path
      className="st0"
      d="M436.388 0H75.612C39.793.009 10.773 29.02 10.764 64.848v382.304c.009 35.829 29.029 64.84 64.848 64.848h360.776c35.82-.009 64.84-29.02 64.848-64.848V64.848C501.227 29.02 472.207.009 436.388 0m46.925 447.152c-.009 12.979-5.242 24.662-13.74 33.177-8.524 8.506-20.198 13.74-33.186 13.74H75.612c-12.987 0-24.661-5.233-33.185-13.74-8.497-8.515-13.73-20.198-13.74-33.177V264.966h454.626zm0-200.109H28.687V64.848c.009-12.978 5.242-24.661 13.74-33.176 8.524-8.507 20.198-13.74 33.185-13.74h360.776c12.988 0 24.662 5.232 33.186 13.74 8.497 8.515 13.73 20.198 13.74 33.176v182.195z"
    />
    <path className="st0" d="M125.32 50.845h261.361v155.328H125.32z" />
  </svg>
);

const MacIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" viewBox="-1 6 24 12" fill="currentColor" {...props}>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
);

const LinuxIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" viewBox="-1 7 22 8" fill="currentColor" {...props}>
    <path d="m8.782 5.505c-.092.005-.17.06-.207.139l-.001.002q-.06.127-.114.127-.067.014-.067-.067 0-.16.254-.201zm1.164.187q-.054.014-.154-.087c-.041-.044-.099-.072-.163-.072-.026 0-.05.004-.073.012h.002q.32-.147.429.026c.009.013.014.028.014.045 0 .035-.022.064-.053.075h-.001zm-4.7 5.719c-.006-.002-.012-.003-.019-.003-.028 0-.052.018-.061.042-.022.046-.042.102-.058.16l-.002.008c-.019.069-.044.129-.076.185l.002-.004c-.042.065-.086.122-.135.175l.001-.001q-.134.147-.014.16.054.014.167-.094c.071-.066.128-.146.166-.236l.002-.004q.014-.04.026-.094c.007-.031.016-.057.027-.083l-.001.003c.009-.017.016-.037.02-.058v-.002c.004-.016.006-.034.006-.053v-.04l-.014-.034zm11.45 4.808q0-.24-.737-.56.054-.201.101-.368c.029-.099.053-.217.066-.338l.001-.01q.02-.181.04-.288c.008-.053.013-.115.013-.177 0-.044-.002-.087-.007-.13v.005q-.014-.194-.014-.261c-.009-.11-.026-.21-.05-.308l.003.013q-.047-.228-.054-.274t-.067-.334-.074-.355c-.129-.526-.346-.987-.638-1.391l.008.012c-.248-.406-.571-.742-.952-.997l-.012-.007c.309.314.565.682.753 1.087l.01.024c.511.775.815 1.726.815 2.748 0 .345-.035.682-.101 1.007l.005-.032c-.061.32-.337.558-.669.56q-.415.054-.515-.248c-.07-.288-.11-.619-.11-.959 0-.057.001-.113.003-.169v.008c0-.009 0-.02 0-.032 0-.497-.056-.98-.163-1.445l.008.043c-.084-.375-.174-.684-.28-.986l.019.062c-.078-.236-.166-.438-.271-.629l.01.019q-.121-.207-.207-.328c-.053-.075-.111-.141-.174-.2l-.001-.001-.095-.094c-.114-.533-.257-.994-.436-1.437l.021.058c-.106-.286-.24-.534-.402-.759l.006.009c-.108-.13-.212-.274-.305-.426l-.009-.016c-.136-.211-.217-.468-.217-.745 0-.183.035-.357.099-.517l-.003.009c.052-.128.083-.277.083-.433 0-.082-.008-.161-.024-.238l.001.008q-.074-.228-.596-.334c-.227-.061-.425-.143-.609-.247l.013.007c-.135-.078-.291-.15-.455-.208l-.02-.006q-.107-.014-.147-.348c-.005-.043-.008-.093-.008-.143 0-.196.042-.381.118-.548l-.003.008c.069-.206.256-.354.479-.362h.001c.03-.005.065-.008.1-.008.267 0 .494.168.582.404l.001.004c.068.132.108.287.108.452 0 .116-.02.228-.056.332l.002-.007q-.147.254-.026.355t.4.006q.174-.054.174-.48v-.498c-.038-.251-.101-.476-.188-.69l.007.02c-.063-.162-.159-.299-.281-.408l-.001-.001c-.09-.08-.194-.147-.307-.198l-.008-.003c-.103-.042-.224-.077-.35-.099l-.011-.002q-1.433.107-1.192 1.794c.002.019.003.04.003.062 0 .049-.006.097-.018.143l.001-.004c-.105-.088-.241-.141-.39-.141-.002 0-.004 0-.006 0-.058-.006-.124-.009-.192-.009-.088 0-.175.006-.26.017l.01-.001q-.167.026-.207-.067c.003-.05.005-.109.005-.168 0-.376-.081-.733-.226-1.054l.007.016c-.098-.251-.326-.43-.6-.455h-.003c-.005 0-.011 0-.017 0-.244 0-.452.151-.537.364l-.001.004c-.122.232-.202.505-.22.794v.006c-.001.02-.001.044-.001.068 0 .151.018.299.051.44l-.003-.013c.036.189.096.357.179.512l-.005-.01q.114.207.207.181c.095-.032.171-.099.213-.185l.001-.002q.054-.121-.094-.107-.094 0-.207-.194c-.075-.129-.121-.283-.127-.447v-.002c-.002-.02-.003-.043-.003-.067 0-.159.046-.307.126-.432l-.002.003c.088-.117.228-.192.384-.192.025 0 .05.002.074.006h-.003c.17.011.31.124.361.279l.001.003c.08.152.127.332.127.522v.01c0 .1-.007.199-.021.295l.001-.011c-.164.104-.302.233-.412.384l-.003.004c-.098.13-.221.235-.362.311l-.006.003q-.261.154-.274.167c-.099.096-.171.219-.206.356l-.001.005c-.006.019-.01.04-.01.062 0 .078.045.145.11.177l.001.001c.128.074.239.16.335.26.076.077.147.16.21.248l.004.006c.063.08.147.14.244.173l.004.001c.141.053.304.085.474.087h.001c.03.001.066.001.101.001.452 0 .887-.074 1.293-.21l-.029.008q.026-.014.308-.094t.462-.141c.154-.054.284-.113.409-.181l-.013.007c.116-.052.211-.132.28-.232l.001-.002q.121-.187.268-.107c.043.025.074.065.087.112v.001c.002.011.004.025.004.038 0 .046-.017.089-.044.122-.055.066-.131.112-.219.127h-.002c-.312.101-.563.199-.807.308l.05-.02q-.489.207-.61.261c-.269.129-.583.236-.911.303l-.027.005c-.137.018-.295.029-.456.029-.214 0-.424-.019-.628-.054l.022.003q-.134-.026-.121.026c.063.099.138.183.226.253l.002.002c.214.185.495.298.802.298.034 0 .067-.001.1-.004h-.004c.176-.013.339-.046.494-.098l-.014.004c.191-.06.35-.124.503-.197l-.023.01q.228-.107.449-.234t.4-.228c.089-.051.197-.105.308-.152l.02-.008c.048-.025.105-.04.166-.04.024 0 .048.002.071.007h-.002c.062.024.106.08.114.146v.001c-.001.022-.006.042-.014.061v-.001c-.013.027-.031.05-.053.067-.024.02-.05.04-.077.058l-.003.002q-.04.026-.114.067t-.121.06-.134.067c-.035.021-.077.041-.121.058l-.006.002c-.344.185-.64.38-.916.599l.012-.01c-.26.207-.551.399-.86.561l-.03.015c-.098.057-.215.091-.34.091-.115 0-.224-.028-.319-.079l.004.002c-.34-.268-.622-.592-.835-.962l-.009-.016q-.294-.415-.334-.294c-.009.034-.014.073-.014.114v.021-.001c-.011.278-.084.537-.205.767l.005-.01q-.201.422-.395.743c-.132.224-.23.485-.28.763l-.002.014c-.015.07-.024.15-.024.232 0 .227.066.439.181.617l-.003-.005q-.308.08-.837 1.206c-.285.546-.507 1.178-.633 1.845l-.007.043q-.026.24-.02.924c.007.064.012.139.012.215 0 .205-.031.403-.089.59l.004-.014q-.107.32-.388.04c-.298-.327-.48-.764-.48-1.244 0-.005 0-.011 0-.016v.001c-.004-.056-.007-.121-.007-.187 0-.199.022-.393.064-.58l-.003.018q.054-.254-.014-.24c-.024.016-.043.039-.053.066v.001c-.131.289-.208.627-.208.982 0 .458.127.886.347 1.252l-.006-.011c.083.152.196.277.331.373l.003.002q.268.214.32.268c.426.424.881.821 1.359 1.187l.033.025q1.125.904 1.246 1.025c.137.128.226.307.234.507v.002c.001.012.001.027.001.042 0 .45-.354.817-.799.838h-.002c.133.231.261.426.4.612l-.012-.016c.157.206.285.445.37.703l.005.017c.061.249.095.534.095.828 0 .041-.001.082-.002.122v-.006q.616-.32.094-1.232c-.042-.082-.089-.152-.142-.216l.002.002q-.087-.107-.127-.16t-.026-.08c.044-.057.103-.101.172-.126l.003-.001c.031-.015.068-.023.107-.023.061 0 .118.021.162.057q.616.696 2.223.48h.006c.96 0 1.814-.454 2.359-1.158l.005-.007q.308-.509.455-.4.16.08.134.696c-.062.46-.17.876-.321 1.27l.013-.038c-.055.114-.087.249-.087.39 0 .039.002.078.007.117v-.005q.04.194.32.207.04-.254.194-1.031c.077-.337.141-.749.178-1.168l.003-.038c.001-.028.001-.061.001-.094 0-.315-.032-.622-.093-.919l.005.029c-.065-.361-.101-.777-.101-1.201 0-.035 0-.069.001-.103v.005c0-.013-.001-.028-.001-.044 0-.341.116-.655.311-.904l-.002.003c.153-.151.363-.245.595-.245.031 0 .062.002.092.005h-.004c0-.004 0-.008 0-.012 0-.312.188-.579.458-.695l.005-.002c.209-.101.454-.161.714-.161.091 0 .18.007.267.021l-.01-.001c.309.026.589.135.822.304l-.005-.003zm-8.41-11.076c.009-.043.015-.093.015-.144 0-.092-.018-.18-.05-.261l.002.005q-.074-.174-.154-.201-.121-.026-.121.094c.01.036.034.064.066.08h.001q.134 0 .094.201-.04.268.107.268c.002 0 .004.001.006.001.019 0 .035-.016.035-.035 0-.002 0-.005-.001-.007zm5.611 2.64c-.012-.062-.043-.115-.087-.154-.049-.035-.108-.058-.172-.067h-.002c-.073-.012-.139-.038-.196-.075l.002.001c-.049-.03-.091-.066-.127-.107l-.001-.001q-.06-.067-.094-.107l-.074-.087c-.016-.02-.033-.038-.053-.053h-.001q-.014-.006-.054.02-.187.214.094.582c.122.193.302.341.515.419l.007.002c.006.001.014.001.021.001.076 0 .141-.044.173-.107l.001-.001c.034-.055.055-.122.055-.194 0-.027-.003-.052-.008-.077v.002zm-2.383-2.852c0-.001 0-.003 0-.004 0-.174-.084-.328-.213-.424l-.001-.001q-.08-.054-.121-.04c-.006-.001-.012-.001-.019-.001-.033 0-.064.01-.089.028-.008.006-.013.016-.013.027s.005.021.013.027c.018.018.041.032.066.04h.001q.187.054.24.415 0 .04.107-.026.028-.029.028-.04zm.72-3.12c-.004-.027-.016-.05-.034-.067-.034-.036-.072-.067-.114-.091l-.002-.001q-.087-.054-.127-.08c-.078-.1-.189-.172-.316-.2l-.004-.001h-.001c-.068 0-.127.041-.153.1v.001c-.013.032-.021.07-.021.109 0 .023.003.046.008.068v-.002c.006.022.009.047.009.072 0 .034-.006.066-.016.097l.001-.002c-.019.054-.046.101-.08.141v-.001c-.03.035-.056.075-.078.117l-.002.004q-.014.034.04.114c.014.013.033.021.054.021s.039-.008.054-.021q.054-.04.147-.121c.057-.05.124-.091.196-.119l.005-.002c.027-.01.058-.015.09-.015.011 0 .022.001.032.002h-.001.006c.069 0 .136-.01.199-.028l-.005.001c.053-.012.096-.047.118-.094v-.001zm7.566 17.959c.159.092.296.2.414.327l.001.001c.083.084.141.194.16.317v.003c.002.02.003.044.003.068 0 .084-.013.164-.038.239l.002-.005c-.044.118-.115.217-.206.294l-.001.001c-.095.088-.198.173-.304.254l-.01.007c-.115.083-.245.166-.382.239l-.018.009q-.248.134-.422.221t-.429.207-.362.174c-.436.23-.81.479-1.158.76l.013-.01c-.374.287-.703.567-1.018.863l.007-.006c-.241.164-.538.262-.858.262-.018 0-.037 0-.055-.001h.003c-.068.007-.147.011-.227.011-.349 0-.681-.076-.98-.211l.015.006c-.157-.077-.289-.183-.394-.312l-.002-.002c-.083-.099-.156-.212-.216-.332l-.005-.01c-.066-.117-.168-.208-.29-.259l-.004-.001c-.181-.08-.392-.127-.614-.127-.005 0-.011 0-.016 0h.001q-.59-.014-1.741-.014-.254 0-.763.02t-.777.034c-.384.004-.749.077-1.086.208l.021-.007c-.276.098-.515.234-.725.404l.005-.004c-.168.147-.36.274-.567.375l-.015.007c-.193.098-.42.156-.661.156-.021 0-.041 0-.062-.001h.003c-.553-.083-1.051-.228-1.518-.429l.04.015c-.537-.212-1.191-.41-1.864-.559l-.091-.017q-.254-.054-.683-.127t-.67-.121-.529-.127c-.17-.043-.32-.109-.454-.198l.006.003c-.098-.065-.175-.153-.226-.257l-.002-.004c-.028-.098-.045-.21-.045-.327 0-.206.051-.4.141-.57l-.003.007c.094-.207.176-.45.235-.703l.005-.027c.001-.019.001-.041.001-.063 0-.168-.02-.331-.057-.487l.003.014q-.067-.32-.134-.569c-.038-.134-.06-.288-.06-.448 0-.014 0-.029.001-.043v.002c0-.006 0-.014 0-.021 0-.133.054-.253.141-.34.197-.119.435-.189.69-.189.026 0 .052.001.077.002h-.004.039c.275 0 .537-.059.773-.165l-.012.005c.221-.122.407-.278.557-.465l.003-.004c.102-.172.163-.379.163-.6 0-.029-.001-.058-.003-.087v.004c.063.136.1.296.1.464 0 .398-.205.747-.516.949l-.004.003c-.244.139-.536.221-.848.221-.093 0-.184-.007-.273-.021l.01.001q-.455-.04-.576.134-.174.201.067.763c.036.096.072.175.113.251l-.005-.011q.08.16.114.24c.025.065.046.142.059.221l.001.007c.011.059.018.127.018.197 0 .034-.002.068-.005.102v-.004c-.034.246-.115.467-.232.664l.004-.008c-.117.18-.187.401-.187.638v.002q.04.228.495.348.268.08 1.132.248t1.333.274q.32.08.991.294t1.105.308c.159.041.342.064.53.064.075 0 .15-.004.223-.011l-.009.001c.336-.027.635-.165.865-.376l-.001.001c.173-.163.287-.386.308-.636v-.004c.001-.025.001-.055.001-.085 0-.249-.037-.489-.107-.716l.005.017c-.07-.267-.157-.499-.264-.718l.01.022q-.134-.261-.268-.489c-.744-1.231-1.491-2.287-2.304-3.287l.041.052q-.91-.991-1.514-.536-.147.121-.201-.201c-.02-.111-.031-.239-.031-.37 0-.049.002-.097.005-.146v.007c.005-.251.054-.49.138-.71l-.005.014c.097-.243.205-.45.329-.645l-.009.015c.106-.16.204-.344.286-.537l.009-.023q.107-.282.355-.964t.395-1.045c.136-.326.27-.595.419-.853l-.019.037c.149-.275.322-.511.524-.721l-.001.001c.657-.75 1.213-1.611 1.635-2.546l.026-.065q-.16-1.5-.214-4.151c-.004-.079-.007-.171-.007-.263 0-.635.12-1.242.339-1.799l-.012.033c.303-.621.797-1.11 1.405-1.398l.018-.008c.37-.18.804-.284 1.263-.284.046 0 .091.001.137.003h-.006c.025 0 .055-.001.085-.001.475 0 .935.066 1.37.19l-.035-.009c.455.117.853.309 1.202.563l-.01-.007c.539.42.958.969 1.216 1.601l.009.026c.252.523.399 1.138.399 1.787 0 .066-.002.132-.005.197v-.009c-.002.076-.004.165-.004.255 0 .932.148 1.83.421 2.672l-.017-.061c.379 1.143.99 2.121 1.781 2.92l-.001-.001c.546.621.995 1.344 1.315 2.133l.018.051c.337.735.614 1.593.788 2.487l.012.073c.048.253.076.544.076.842 0 .102-.003.203-.01.303l.001-.014c-.014.271-.071.524-.166.759l.006-.016q-.121.268-.268.294c-.132.05-.24.139-.313.252l-.002.003q-.181.228-.362.475c-.146.185-.327.336-.533.444l-.009.004c-.215.119-.471.189-.743.189-.026 0-.052-.001-.077-.002h.004c-.153-.007-.297-.031-.435-.07l.013.003c-.119-.034-.221-.097-.301-.181-.062-.064-.121-.131-.177-.202l-.004-.005c-.055-.079-.106-.169-.15-.263l-.005-.011q-.094-.194-.121-.261-.294-.495-.549-.4t-.375.656c-.026.14-.041.3-.041.464 0 .299.049.586.14.854l-.006-.019c.09.402.141.864.141 1.338 0 .451-.046.89-.135 1.315l.007-.042c-.031.12-.048.259-.048.401 0 .352.108.68.292.95l-.004-.006c.203.272.524.445.885.445.032 0 .065-.001.096-.004h-.004c.44-.032.833-.207 1.141-.477l-.002.002c.356-.311.748-.604 1.161-.867l.039-.023c.389-.205.848-.398 1.324-.551l.062-.017c.393-.118.735-.285 1.044-.497l-.013.008q.32-.248.248-.462c-.067-.164-.184-.295-.331-.38l-.004-.002c-.198-.122-.426-.229-.667-.308l-.023-.007c-.305-.109-.544-.34-.661-.633l-.003-.007c-.127-.266-.202-.579-.202-.908 0-.022 0-.044.001-.066v.003c-.002-.021-.003-.045-.003-.07 0-.218.079-.418.211-.572l-.001.001c.006.272.045.532.112.78l-.005-.023c.054.209.12.389.202.561l-.008-.018c.076.146.167.272.275.382.085.093.177.176.276.251l.005.004q.107.074.288.174t.218.125z" />
  </svg>
);

const IosIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    className="w-4 h-4"
    viewBox="0.5 3 13 8"
    fill="currentColor"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M11.714 1H2.286C1.576 1 1 1.576 1 2.286v9.428C1 12.424 1.576 13 2.286 13h9.428c.71 0 1.286-.576 1.286-1.286V2.286C13 1.576 12.424 1 11.714 1m-7.312 9.442a.535.535 0 1 1-.927-.536l.383-.661q.647-.198 1.06.305zm3.72-1.444H3.25a.537.537 0 0 1-.536-.535c0-.295.241-.536.536-.536h1.366l1.752-3.032-.55-.949a.537.537 0 0 1 .196-.73.537.537 0 0 1 .732.195l.238.412.238-.412a.535.535 0 1 1 .927.535l-2.298 3.98h1.663c.541 0 .844.636.608 1.072m2.628 0h-.777l.525.908a.537.537 0 0 1-.195.731.537.537 0 0 1-.732-.195L7.59 7.011c-.447-.777-.128-1.554.19-1.816l1.578 2.732h1.393a.536.536 0 1 1 0 1.071" />
  </svg>
);

const AndroidIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-4 h-4" viewBox="0 0 23 23" fill="currentColor" {...props}>
    <path d="M14.97535,3.01886l.95982-1.73159a.19342.19342,0,0,0-.33833-.18756l-.97045,1.75078a6.54141,6.54141,0,0,0-5.25275,0L8.40316,1.09971a.19342.19342,0,0,0-.33833.18756l.95985,1.7316A5.54614,5.54614,0,0,0,5.93152,7.89522h12.137A5.54615,5.54615,0,0,0,14.97535,3.01886ZM9.19911,5.67446a.5068.5068,0,1,1,.5068-.5068A.50737.50737,0,0,1,9.19911,5.67446Zm5.60178,0a.5068.5068,0,1,1,.5068-.5068A.50737.50737,0,0,1,14.80089,5.67446Zm-8.86946,11.497a1.46713,1.46713,0,0,0,1.46713,1.46713h.9736v3.00095a1.36046,1.36046,0,1,0,2.72091,0V18.63859h1.81386v3.00095a1.36046,1.36046,0,1,0,2.72091,0V18.63859h.97364a1.46713,1.46713,0,0,0,1.46713-1.46713V8.37532H5.93143ZM4.06415,8.14191A1.362,1.362,0,0,0,2.7037,9.50237v5.66846a1.36046,1.36046,0,1,0,2.72091,0V9.50237A1.362,1.362,0,0,0,4.06415,8.14191Zm15.8717,0a1.362,1.362,0,0,0-1.36046,1.36046v5.66846a1.36046,1.36046,0,1,0,2.72091,0V9.50237A1.362,1.362,0,0,0,19.93585,8.14191Z"></path>
  </svg>
);

export {
  PcIcon,
  XboxIcon,
  XboxOneIcon,
  XboxSeriesXIcon,
  PlaystationIcon,
  Playstation4Icon,
  Playstation5Icon,
  NintendoIcon,
  NintendoSwitchIcon,
  NintendoWiiIcon,
  NintendoDsIcon,
  MacIcon,
  LinuxIcon,
  IosIcon,
  AndroidIcon,
};
