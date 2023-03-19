/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: ["**/.*"],
  server: "./server.ts",
  serverBuildPath: "functions/[[path]].js",
  serverConditions: ["worker"],
  serverDependenciesToBundle: "all",
  serverMainFields: ["browser", "module", "main"],
  serverMinify: true,
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  // @todo remove routing flag when v2 routing becomes default
  future: {
    v2_routeConvention: true,
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
};
