/**
 * Workers Observability Utils
 *
 * A collection of utilities for capturing logs and metrics from Cloudflare Workers
 */

export * from "./metrics.js";
export * from "./tail.js";
export * from "./sinks/metrics/datadog.js";
export type { LogLevel } from "./logger.js";

import * as metrics from "./metrics.js";
import { TailExporter } from "./tail.js";
import { DatadogMetricSink } from "./sinks/metrics/datadog.js";
import { OtelMetricSink } from "./sinks/metrics/otel.js";
import { WorkersAnalyticsEngineSink } from "./sinks/metrics/workersAnalyticsEngine.js";
import { OtelLogSink } from "./sinks/logs/otel.js";

export { metrics, TailExporter, DatadogMetricSink, WorkersAnalyticsEngineSink, OtelMetricSink, OtelLogSink };

export default {
  metrics,
  TailExporter,
  DatadogMetricSink,
  WorkersAnalyticsEngineSink,
  OtelMetricSink,
  OtelLogSink
};
