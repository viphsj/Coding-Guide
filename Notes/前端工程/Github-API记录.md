## Github API 记录

- [`OAuth`](https://developer.github.com/v3/oauth/)登录

- 通过 token 获取用户信息

`https://api.github.com/user?access_token=xxxxx`

- 获取用户仓库列表

`https://api.github.com/users/ecmadao/repos?page=xxxx`

- 获取单个仓库信息

`https://api.github.com/repos/ecmadao/Coding-Guide/`

- 获取单个仓库的所有贡献者及贡献数

`https://api.github.com/repos/ecmadao/Coding-Guide/contributors`

- 以单个仓库为主体，获取其受到的所有贡献，以及以周为单位的时间内的贡献数目

`https://api.github.com/repos/ecmadao/Coding-Guide/stats/contributors`

- 获取单个仓库`README`信息

`https://api.github.com/repos/ecmadao/Coding-Guide/readme`