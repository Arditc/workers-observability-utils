import type { TraceItem } from "@cloudflare/workers-types";
import type { LogLevel } from "./logger.js";
import { MetricsTail, type MetricTailOptions } from "./metricsTail.js";
import { LogsTail, type LogTailOptions } from "./logsTail.js";
export { DatadogMetricSink } from "./sinks/metrics/datadog.js";
export { WorkersAnalyticsEngineSink } from "./sinks/metrics/workersAnalyticsEngine.js";
export { OtelMetricSink } from "./sinks/metrics/otel.js";
export { OtelLogSink } from "./sinks/logs/otel.js";

export interface TailExporterOptions {
  metrics?: MetricTailOptions;
  logs?: LogTailOptions;
  /**
   * Log level for internal operational messages. Applied to metrics and logs
   * tails unless they specify their own logLevel.
   * Default: "warn"
   */
  logLevel?: LogLevel;
}

export class TailExporter {
  #metricsTail?: MetricsTail;
  #logsTail?: LogsTail;
  constructor({ metrics, logs, logLevel }: TailExporterOptions) {
    if (metrics && metrics.sinks.length > 0) {
      this.#metricsTail = new MetricsTail({ logLevel, ...metrics });
    }

    if (logs && logs.sinks.length > 0) {
      this.#logsTail = new LogsTail({ logLevel, ...logs });
    }
  }

  tail(traceItems: TraceItem[], _env: unknown, ctx: ExecutionContext) {
    if (this.#metricsTail) {
      this.#metricsTail.processTraceItems(traceItems, ctx);
    }

    if (this.#logsTail) {
      this.#logsTail.processTraceItems(traceItems, ctx);
    }
  }
}
