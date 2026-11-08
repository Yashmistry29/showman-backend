const redactMessage = (message) => message
  .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[redacted email]')
  .replace(/\b(?:\+?\d[\d\s().-]{7,}\d)\b/g, '[redacted number]')
  .replace(/(mongodb(?:\+srv)?:\/\/)[^\s]+/gi, '$1[redacted]');

const getResponseSummary = (responseBody) => {
  if (!responseBody || typeof responseBody !== 'object') {
    return { type: responseBody === null ? 'null' : typeof responseBody };
  }

  const summary = {};
  if (typeof responseBody.success === 'boolean') {
    summary.success = responseBody.success;
  }
  if (typeof responseBody.message === 'string') {
    summary.message = redactMessage(responseBody.message).slice(0, 300);
  }

  for (const key of ['data', 'customerData']) {
    const value = responseBody[key];
    if (Array.isArray(value)) {
      summary[key] = {
        type: 'array',
        count: value.length,
        fields: [...new Set(value.flatMap(item =>
          item && typeof item === 'object' ? Object.keys(item) : []
        ))]
      };
    } else if (value && typeof value === 'object') {
      summary[key] = { type: 'object', fields: Object.keys(value) };
    } else if (value !== undefined) {
      summary[key] = { type: typeof value };
    }
  }

  return summary;
};

module.exports = (req, res, next) => {
  const startedAt = process.hrtime.bigint();
  const originalSend = res.send;
  let responseBody;

  res.send = function (body) {
    if (typeof body === 'string') {
      try {
        responseBody = JSON.parse(body);
      } catch {
        responseBody = body;
      }
    } else {
      responseBody = body;
    }
    return originalSend.call(this, body);
  };

  res.on('finish', () => {
    const routePath = req.route
      ? `${req.baseUrl}${req.route.path}`
      : req.path;
    const responseSummary = getResponseSummary(responseBody);
    const hasApplicationError = responseBody?.success === false;
    const hasHttpError = res.statusCode >= 400;
    const isError = hasApplicationError || hasHttpError;

    console.log(JSON.stringify({
      type: isError ? 'http_error' : 'http_response',
      timestamp: new Date().toISOString(),
      method: req.method,
      route: routePath,
      statusCode: res.statusCode,
      durationMs: Number(process.hrtime.bigint() - startedAt) / 1e6,
      response: responseSummary,
      ...(isError && {
        error: {
          kind: hasHttpError ? 'http' : 'application',
          message: responseSummary.message || `Request failed with status ${res.statusCode}`
        }
      })
    }));
  });

  next();
};
