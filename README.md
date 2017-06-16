# Werner
一种测试客户端鲁棒性的思路。

## 项目介绍
### 关于名称
项目名称来自于我最崇拜的物理学家Werner Heisenberg（沃纳· 海森堡）。

Werner Heisenberg 沃纳· 海森堡（1901-1976）是历史上最伟大的物理学家之一。主要从事量子力学、量子电动力学、相对论量子场论、核理论、磁学、宇宙线物理、基本粒子理论等方面的研究。在物理学中的主要成就是和别的学者一起创立了量子力学，发现了测不准原理，第一个提出基本粒子中的同位旋概念。

正是由于该项目主要用于测试非预期的服务器返回对客户端的鲁棒性的影响，类似于“测不准”，所以用海森堡的名字作为项目名称。

### 使用场景
我们在测试客户端的功能时，经常碰到一种场景是，客户端接收服务器的返回，然后进行处理。但若客户端开发代码没有对服务器非预期的返回值进行处理，就极有可能导致客户端无法正常使用，甚至崩溃。常见的非预期值场景有：

- 返回格式非约定好的；
- 返回内容不完整，例如字段缺失；
- 返回的内容存在错误的值；
- 返回一些服务器异常，例如404，502等；
- 其他……

因此为了测试客户端的健壮性，我们需要模拟不同的服务器返回内容。

类似的工具有 Fiddler，Fiddler 可以对请求进行拦截、修改、返回。但 Fiddler 对具体的业务使用场景并不是通用的。而且 Fiddler 的使用存在一定的（尽管很小）难度，且 Fiddler 不能跨平台使用。

### 项目初衷
项目最初的建立，是为了解决实际工作中的一个低效场景：通过 Fiddler 进行抓包，修改，返回，甚至加解密，这样的重复操作。项目做到只需要在页面中填写欲返回的值，然后提交即可完成。简化操作，降低使用门槛，且平台无关（受益于 Python 这门跨平台的编程语言）。

### 前提条件
- Python 3.5+
- Django 1.0+
- ~PostgreSQL~（可使用 SQLite3 代替 PostgreSQL，也可以使用其他任何喜欢的数据库）

### 项目实现原理
1. 把接口的完整路径作为 key，将要返回的自定义内容作为 value 存入到数据库中；
2. 客户端通过修改 hosts 或者转发的方式，将请求转移到运行本服务的机器上；
3. 服务检测到请求访问时，通过接口的完整路径作为查询条件，查询到第一步存储的 value，返回给客户端。

### 项目扩展
可根据自己的项目具体要求，进行加密或者解密的代码添加，亦可以对返回的状态码或者 https 方式进行扩展，本项目更多提供一种思路。

### 后期计划
1. https 支持；
