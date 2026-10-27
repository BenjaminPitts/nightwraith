import assert from "node:assert/strict"
import dgram from "node:dgram"
import { test } from "node:test"
import { handler } from "../netlify/functions/sendMetric.mjs"

test("non-POST methods preserve the 405 response without opening a socket", async t => {
  t.mock.method(dgram, "createSocket", () =>
    assert.fail("Unexpected UDP socket")
  )
  const response = await handler({ httpMethod: "GET" })
  assert.equal(response.statusCode, 405)
  assert.deepEqual(JSON.parse(response.body), {
    status: "error",
    message: "Method not allowed",
  })
})

test("missing metric preserves the 400 response without opening a socket", async t => {
  t.mock.method(dgram, "createSocket", () =>
    assert.fail("Unexpected UDP socket")
  )
  for (const body of [undefined, "{}", "null"]) {
    const response = await handler({ httpMethod: "POST", body })
    assert.equal(response.statusCode, 400)
    assert.deepEqual(JSON.parse(response.body), {
      status: "error",
      message: "Metric name missing",
    })
  }
})

test("malformed JSON returns 400 instead of a function failure", async t => {
  t.mock.method(dgram, "createSocket", () =>
    assert.fail("Unexpected UDP socket")
  )
  const response = await handler({ httpMethod: "POST", body: "{" })
  assert.equal(response.statusCode, 400)
  assert.equal(JSON.parse(response.body).message, "Invalid JSON")
})

test("POST and base64 POST preserve the counter protocol with a mocked socket", async t => {
  let closed = 0
  let sent = 0
  t.mock.method(dgram, "createSocket", type => {
    assert.equal(type, "udp4")
    return {
      close() {
        closed++
      },
      send(message, offset, length, port, host, callback) {
        assert(message.toString().endsWith(".nightwraith.bio:1|c\n"))
        assert.equal(offset, 0)
        assert.equal(length, message.length)
        assert.equal(port, 8125)
        assert.equal(host, "statsd.hostedgraphite.com")
        sent++
        callback(null)
      },
    }
  })
  for (const isBase64Encoded of [false, true]) {
    const payload = JSON.stringify({ metricName: "bio" })
    const response = await handler({
      httpMethod: "POST",
      isBase64Encoded,
      body: isBase64Encoded ? Buffer.from(payload).toString("base64") : payload,
    })
    assert.equal(response.statusCode, 200)
    assert.equal(response.headers["Content-Type"], "application/json")
    assert.deepEqual(JSON.parse(response.body), {
      status: "success",
      message: "Metric sent successfully",
    })
  }
  assert.equal(sent, 2)
  assert.equal(closed, 2)
})

test("UDP callback failure preserves 500 and closes the socket", async t => {
  let closed = false
  const error = new Error("mock transport failure")
  const log = t.mock.method(console, "error", () => {})
  t.mock.method(dgram, "createSocket", () => ({
    close() {
      closed = true
    },
    send(_message, _offset, _length, _port, _host, callback) {
      callback(error)
    },
  }))
  const response = await handler({
    httpMethod: "POST",
    body: JSON.stringify({ metricName: "bio" }),
  })
  assert.equal(response.statusCode, 500)
  assert.deepEqual(JSON.parse(response.body), {
    status: "error",
    message: "Failed to send metric",
  })
  assert.equal(closed, true)
  assert.equal(log.mock.callCount(), 1)
})
