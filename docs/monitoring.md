# Week 9 — Monitoring with Azure Application Insights

## Overview

Azure Application Insights was integrated with the Node.js backend to provide application observability through requests, exceptions, dependencies, metrics, and custom events.

## Application Insights Configuration

Application Insights was connected to the backend using the Application Insights SDK.

The following telemetry was verified:

- HTTP requests
- Response times
- Failed requests
- Exceptions
- Dependencies
- Custom events

## Custom Event

A custom `OrderCreated` event was generated whenever an order was successfully created.

Example event:

`OrderCreated`

The event was verified using the Application Insights Logs section.

## KQL Queries

### Order Created Events

```kusto
customEvents
| where name == "OrderCreated"
| order by timestamp desc