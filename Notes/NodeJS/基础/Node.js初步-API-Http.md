<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Node.js初步 - API - Http](#nodejs%E5%88%9D%E6%AD%A5---api---http)
  - [Http 初步](#http-%E5%88%9D%E6%AD%A5)
  - [Http Class](#http-class)
    - [http.Agent](#httpagent)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Node.js初步 - API - Http

### Http 初步

```javascript
var http = require('http')
```

> HTTP message headers are represented by an object like this. Keys are lowercased. Values are not modified.
> 
> http 头部信息通畅是如下所示的对象。Key全部小写，值是不能修改的

```javascript
{ 
  'content-length': '123',
  'content-type': 'text/plain',
  'connection': 'keep-alive',
  'host': 'mysite.com',
  'accept': '*/*' 
}
```

> In order to support the full spectrum of possible HTTP applications, Node.js's HTTP API is very low-level. It deals with stream handling and message parsing only. 
> 
> 为了能全面地支持可能的HTTP应用程序，Node提供的HTTP API都很底层。它处理的只有流处理和消息解析。
> 
> It parses a message into headers and body but it does not parse the actual headers or the body.
> 
> 它把一份消息解析成报文头和报文体，但是它不解析实际的报文头和报文体。
> 
> 接收到的原始头信息以数组形式 [key, value, key2, value2, ...] 保存在 rawHeaders 属性中. 例如, 前面提到的消息对象会有 rawHeaders 列表如下

```javascript
[ 'ConTent-Length', '123456',
  'content-LENGTH', '123',
  'content-type', 'text/plain',
  'CONNECTION', 'keep-alive',
  'Host', 'mysite.com',
  'accepT', '*/*' ]
```

### Http Class

#### http.Agent

> HTTP Agent 是用于把套接字做成资源池，用于HTTP客户端请求
> 
> HTTP Agent 也把客户端的请求默认为使用 `Connection:keep-alive`
> 
> Sockets are removed from the agent's pool when the socket emits either a 'close' event or a special 'agentRemove' event. This means that if you intend to keep one HTTP request open for a long time and don't want it to stay in the pool you can do something along the lines of:

```javascript
http.get(options, (res) => {
  // Do stuff
}).on('socket', (socket) => {
  socket.emit('agentRemove');
});
```
> Alternatively, you could just opt out of pooling entirely using `agent:false` :

```javascript
http.get({
  hostname: 'localhost',
  port: 80,
  path: '/',
  agent: false  // create a new agent just for this one request
}, (res) => {
  // Do stuff with response
})
```
new Agent([options]):

- options
	- `keepAlive` Boolean Keep sockets around in a pool to be used by other requests in the future. `Default = false`
	- `keepAliveMsecs` Integer When using HTTP KeepAlive, how often to send TCP KeepAlive packets over sockets being kept alive. `Default = 1000`. Only relevant if `keepAlive` is set to true.
	- `maxSockets` Number Maximum number of sockets to allow per host. `Default = Infinity`
	- `maxFreeSockets` Number Maximum number of sockets to leave open in a free state. Only relevant if `keepAlive` is set to true. `Default = 256`

To configure any of them, you must create your own http.Agent object.

```javascript
const http = require('http');
var keepAliveAgent = new http.Agent({ keepAlive: true });
options.agent = keepAliveAgent;
http.request(options, onResponseCallback);
```
