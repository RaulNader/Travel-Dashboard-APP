import * as Sentry from "@sentry/react-router";
// NOTE: @sentry/profiling-node requires a prebuilt native binary per Node.js ABI version.
// Node.js v25 (ABI 141) is not yet supported by the shipped binaries, so profiling is
// disabled here. Re-enable once the package ships a binary for your Node version.
// import { nodeProfilingIntegration } from "@sentry/profiling-node";
Sentry.init({
  dsn: "https://0bab596635f8ded10f21cc0c952b8b46@o4511098328317952.ingest.de.sentry.io/4511098344374352",
  dataCollection: {
    // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#dataCollection
    // userInfo: false,
    // httpBodies: [],
  },
  // Enable logs to be sent to Sentry
  enableLogs: true,
  // Profiling integration disabled — no prebuilt binary for Node.js v25 (ABI 141)
  // integrations: [nodeProfilingIntegration()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/guides/react-router/configuration/options/#tracesSampleRate
  tracesSampleRate: 1.0,
  // Profiling disabled — uncomment below once Node.js v25 is supported
  // profileSessionSampleRate: 1.0,
});