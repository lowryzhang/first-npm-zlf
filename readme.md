# 发包流程

经典好文： [https://zhuanlan.zhihu.com/p/344951970](https://zhuanlan.zhihu.com/p/344951970)
2022-08-30
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367818507-6afa9f89-184e-4b79-a367-96bb1bde13a7.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=uce43bf45&margin=%5Bobject%20Object%5D&name=image.png&originHeight=498&originWidth=1200&originalType=url&ratio=1&rotation=0&showTitle=false&size=117331&status=done&style=none&taskId=u29bdbaf4-99af-4ef7-bd08-1e936891729&title=)
# 怎么发布 NPM 包（业内的做法）
已关注

[博观](https://www.zhihu.com/people/yidiyu)
Be crazy

将包发布到NPM（node package manager）上很简单，只需要 2 步：

1. 创建包
1. 发布包

但是发布NPM包业内的做法是怎样的？并没有那么简单，需要更多的步骤。我们先用最简单的方式发布和更新NPM包。
## 创建第一个NPM包
这段针对先前没有发布过NPM包的小伙伴，可以随意跳过这段。
发布你的第一个NPM包，需要这些步骤：

1. **你需要一个NPM账号。**如果没有的话，[点此创建](https://link.zhihu.com/?target=https%3A//www.npmjs.com/signup)。

2. **通过命令行登录你的npm账号。**（执行命令行前，你需要Node运行环境和NPM CLI，[点此安装](https://link.zhihu.com/?target=https%3A//nodejs.org/)）
使用 npm login登录
npm login
根据命令行提示，输入用户名、密码、邮件地址：
kai@yangkais-MacBook-Pro ~ % npm login Username: boguan Password:  Email: **(**this IS public**)** 786506@gmail.com Logged in as boguan on https://registry.npmjs.org/.
3. **你需要创建一个包。**像这样创建一个文件夹，之后导航到该文件夹内。
_# Creating a folder named how-to-publish-to-npm_ mkdir how-to-publish-to-npm _# Navigating into the folder_ cd how-to-publish-to-npm
下一步，通过运行 npm init命令开始这个项目
npm init 
通过完成一些问题，最终生成一个 package.json文件， 这个文件包含发布项目所需的必要项。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367818672-8337c8d6-222d-4f37-b96c-3845ca8fdefe.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u8060b022&margin=%5Bobject%20Object%5D&name=image.png&originHeight=420&originWidth=1554&originalType=url&ratio=1&rotation=0&showTitle=false&size=246509&status=done&style=none&taskId=uf54c40a7-391f-4806-97d0-df46ddbdb0c&title=)
package.json
4. 最后一步，**用 npm publish发布该项目**
npm publish
如果一个同名的包已经存在 NPM（因为你的包有着同样的名字），你将发布失败！
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367818899-982dbf90-b3ff-4866-b612-f5944e3943bf.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u4269c349&margin=%5Bobject%20Object%5D&name=image.png&originHeight=994&originWidth=1596&originalType=url&ratio=1&rotation=0&showTitle=false&size=818021&status=done&style=none&taskId=u1f53fff2-d185-4c3b-ba2f-1436f0e3a40&title=)
所以不得不更改你的包名。
修改 package.json中的name字段，在这儿我们改成 publishing-to-npm，之后可通过npm search 命令看是否被占用：
npm search publishing-to-npm
顺带着，把文件夹的名称也改一下，保持一致性：
_# Command to change folder names by moving everything_ mv how-to-publish-to-npm publishing-to-npm
再次执行 npm publish，将会看到一个成功的提示。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367819110-c9ecd713-03db-4d9b-a25c-2e92d65291a8.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u3b625974&margin=%5Bobject%20Object%5D&name=image.png&originHeight=852&originWidth=1584&originalType=url&ratio=1&rotation=0&showTitle=false&size=733407&status=done&style=none&taskId=u766b4dbb-3f91-41e7-8d73-17926bc343c&title=)
## 如果你想出的每个名字都已经被人取了怎么办？
这是一个常常会遇到的问题，因为很多人都在NPM上创建包。有时很难得到你渴望的报名（有点像我怎么能找到一个 .com 域名）。
为了解决这个问题，NPM使你可以发布包到一个 scope（scope 相当于npm包的命名空间，如果以@开头，那它就是一个scope package）下，这样就可以给你的包任意命名了。
发布包到scope下，可以二选一：

1. 在package.json中，手动的修改name为 @username/package-name
1. 替代 npm init为npm init --scope=username

如果你的仓库有一个scope，你需要调整发布命令：
 npm publish --access public
这就是发布NPM包，所有需要做的。

---

接下来，我们来看看
## 业内怎么发布NPM包？
参考一个流行的框架，比如 React。如果你仔细研究，你会注意到一些事情：
首先，React有一个[Gith](https://link.zhihu.com/?target=https%3A//github.com/facebook/react)ub仓库；
其次，React被发布在[NPM](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/react)上；
第三，React遵循 Semantic versioning（语义化版本）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367819498-ad3ac5c6-1724-46f3-acf9-7eba109f3fee.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=uf12860b8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=451&originWidth=415&originalType=url&ratio=1&rotation=0&showTitle=false&size=100654&status=done&style=none&taskId=u07b678af-d6d5-4beb-9f96-e354f088f0e&title=)
npm package version
第四，每一次的更新都有一个git tag关联它，这个tag也遵循语义化版本。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367819926-dd1d7b49-6a3f-458a-b689-fc7e2d7dc2e7.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=uf8806f7e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=531&originWidth=306&originalType=url&ratio=1&rotation=0&showTitle=false&size=71480&status=done&style=none&taskId=u44f3b244-54b0-4f4b-b2e0-f55453a29fa&title=)
react tags
第五，[release notes](https://link.zhihu.com/?target=https%3A//github.com/facebook/react/releases) 记录着React的每一次更新。
这意味着发布包涉及很多步骤。至少，你需要：

1. 运行测试用例（如果有的话）
1. 根据Semantic versioning修改package.json更新版本号
1. 根据Semantic versioning创建git tag
1. 发布包到 Github
1. 发布包到 NPM
1. 为每次更新创建 release notes

当我们准备发布包的时候，忘记其中一件事是很常见的。
有一个更简单的方式帮我们完成以上步骤，利用工具 np。
## np
[np](https://link.zhihu.com/?target=https%3A//github.com/sindresorhus/np) (created by [Sindre Sorhus](https://link.zhihu.com/?target=https%3A//github.com/sindresorhus)) 使我们非常简单的发布包，并且不会错过上面列举的步骤。
**安装**
可以运行下面的命令：
npm install np
这种方式可以很好地工作。但我更喜欢全局安装 **np**，使我可以在任何地方运行 np。
 npm install --global np
在使用 np 前，你需要确定：

1. 你的项目是一个 Git 仓库（repository）
1. 需要添加远端仓库（remote）的地址
1. 你必须至少已经push到 remote 至少一次
1. 你也需要确定你的工作目录是干净的

_# Initialize Git_ git init _# Adds a remote repository_ git remote add origin some-url _# Commit changes_ git add . git commit -m "Initial Commit"
如果你的项目不是一个 Git 仓库（repository），你将会得到一个 error：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367820534-b3c66ff8-00a5-4762-a419-ea269bccaebe.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u7a9fbfd6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=372&originWidth=1414&originalType=url&ratio=1&rotation=0&showTitle=false&size=233500&status=done&style=none&taskId=u6d7658b5-110d-4a48-8515-b1bf8517bb5&title=)
np&amp;amp;amp;amp;amp;#39;s error if project is not a Git repository
如果你的项目没有添加远端仓库（remote），你也会得到一个 error（在 Prerequisite check过程）
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367820487-038f6424-4483-44bf-b8de-0bfc962a3f44.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u77a21e12&margin=%5Bobject%20Object%5D&name=image.png&originHeight=276&originWidth=940&originalType=url&ratio=1&rotation=0&showTitle=false&size=142482&status=done&style=none&taskId=uc51b751a-8a11-4119-ae2c-78de854792b&title=)
np&amp;amp;amp;amp;amp;#39;s error if project does not have a remote. This error happens later in the process
如果你的工作目录是不干净的，你也会得到一个 error：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367820899-8cf81ad3-80de-41fa-a8be-2849995e2505.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u224fd599&margin=%5Bobject%20Object%5D&name=image.png&originHeight=522&originWidth=1602&originalType=url&ratio=1&rotation=0&showTitle=false&size=366378&status=done&style=none&taskId=u478bf256-9848-4977-8b0b-c88fddb679d&title=)
np&amp;amp;amp;amp;amp;#39;s error working directory is dirty
如果你先前没有push到远端仓库至少一次，**np** 只是停在那里，什么都不做。
**使用 np**
运行下面的命令：
np
根据提示选择版本号：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367821047-72cd25cb-20c0-4d49-bc77-a23221f067b8.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u5ee719e9&margin=%5Bobject%20Object%5D&name=image.png&originHeight=538&originWidth=1364&originalType=url&ratio=1&rotation=0&showTitle=false&size=239801&status=done&style=none&taskId=u055a93b2-8f30-48fa-9fe5-adf5b0ca45c&title=)
选择一个数字，np 会要求你确认选择。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367820885-a79130f6-af3d-4b53-8686-a4c9ce0d4942.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=udb10e6b3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=108&originWidth=1256&originalType=url&ratio=1&rotation=0&showTitle=false&size=111714&status=done&style=none&taskId=u89bccb24-7fe2-4608-8d11-01a2d6966a0&title=)
之后，np 会帮你完成其余的发布工作。
**运行test报错**
运行 npm test命令作为 np checks的一部分。
如果你安装教程到现在，你有可能得到一个 error，像下面这样：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367821651-e3e11ef3-d041-4210-8a26-6022719a717b.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u74b1515c&margin=%5Bobject%20Object%5D&name=image.png&originHeight=366&originWidth=956&originalType=url&ratio=1&rotation=0&showTitle=false&size=213127&status=done&style=none&taskId=u2376b1d3-66ee-40dc-a5ca-197a6ee3c65&title=)
发生这个错误，是因为执行 npm test命令后的返回结果。你也可以手动执行：
 npm test
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367821949-6736dc3f-27f4-40eb-841a-6dfbd65d0a89.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u95e9b4b8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=374&originWidth=1582&originalType=url&ratio=1&rotation=0&showTitle=false&size=323124&status=done&style=none&taskId=u36241914-2fd3-469b-b890-1d5d1c0f101&title=)
我们需要打开 package.json 文件，修改 test脚本来修复这个 error。
当前它看起来像是这样：
"scripts"**:** {   "test"**:** "echo \"Error: no test specified\" && exit 1" }, 
修改成：
"scripts"**:** {   "test"**:** "echo \"No test specified\"" }, 
这样就可以了，是因为 exit 1 触发了 error。
现在，np 应该就可以完成整个发布过程了。（记得在运行np前执行 git commit提交这些改变） 。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367822202-7622ae80-f07a-48bf-a6ec-4811a56b52e1.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u32cca015&margin=%5Bobject%20Object%5D&name=image.png&originHeight=580&originWidth=1248&originalType=url&ratio=1&rotation=0&showTitle=false&size=377970&status=done&style=none&taskId=ua41cb139-29e6-442c-ac9d-cb1353fbcd9&title=)
在流程的最后。np 会启动浏览器窗口，在这写你的 release notes。
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367822201-652a18a7-ff49-4e51-a2ce-1e6fe5e3fe0e.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u77c0f330&margin=%5Bobject%20Object%5D&name=image.png&originHeight=594&originWidth=1522&originalType=url&ratio=1&rotation=0&showTitle=false&size=177178&status=done&style=none&taskId=u799d7f03-dbe5-4928-a0d6-131962cfa99&title=)
总之，np 使得 npm发包过程变得非常简单！
本片文章翻译自Zell Liew 2019.03.20写的一篇文章， 加上一些自己的理解。喜欢英文的朋友，可以看[原文](https://link.zhihu.com/?target=https%3A//github.com/zellwk/zellwk.com/blob/master/src/posts/2019-03-20-publish-to-npm.md)。
在开发NPM包 [sentry-injection-webpack-plugin](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/sentry-injection-webpack-plugin) 的过程中，还遇到了有关 **npm tag** 的问题，感兴趣的请继续往下看。
该项目是Webpack的plugin，目前，大多项目都是基于Webpack4.x构建的，少部分是基于Webpack5.x，极少的项目用的是Webpack3.x（忽略），为了让开发同学下载到适合的版本，把不同版本的npm包打了不同的tag，如下图：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367822602-af3945fd-2721-4ea9-ae16-c4269e4d554a.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u27a925fe&margin=%5Bobject%20Object%5D&name=image.png&originHeight=154&originWidth=767&originalType=url&ratio=1&rotation=0&showTitle=false&size=30690&status=done&style=none&taskId=u10b673c6-a4f2-4fa3-adae-b72d3f7feaf&title=)
**Webpack5**
npm i --save-dev sentry-injection-webpack-plugin@next yarn add --dev sentry-injection-webpack-plugin@next
**Webpack4**
npm i --save-dev sentry-injection-webpack-plugin@latest yarn add --dev sentry-injection-webpack-plugin@latest
**名词解释：**
version
作为开发者，版本号肯定不陌生，发布到npm后，每一个版本号都对应了其资源文件，而且是不可修改的。
tag
NPM 中也有个tag的概念，一般情况下，我们可以不指定tag，这时默认就会用 latest 这个tag，所有发布或者安装都是最新的正式版。而指定tag之后，我们可以在这个tag上发布一个更新的版本，用户安装的时候如果也指定这个tag，则会安装这个tag对应的版本。
有几个常用的命令：

1. 查看当前的tag和对应的version

npm dist-tag ls
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367823034-d15128a7-a464-4818-8e13-b114aae6c9be.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=ucadf9c8d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=52&originWidth=807&originalType=url&ratio=1&rotation=0&showTitle=false&size=5340&status=done&style=none&taskId=ue5c11367-daa9-4bda-a7a9-6b9f8f98533&title=)
2. 查看发布过的所有版本号
npm view sentry-injection-webpack-plugin versions
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367823355-031c99f0-1339-4566-997c-61521afb5d03.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=uac8d71cd&margin=%5Bobject%20Object%5D&name=image.png&originHeight=291&originWidth=811&originalType=url&ratio=1&rotation=0&showTitle=false&size=227277&status=done&style=none&taskId=u63867930-e98f-46cd-9427-e480e92dfcf&title=)
3. 把4.0.26这个版本打名为 latest的tag
npm dist-tag add sentry-injection-webpack-plugin@4.0.26 latest
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12661467/1662367823332-22af5b6d-91c5-4703-a502-a81150233353.png#clientId=u38389eb3-2c02-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u1dd37a6a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=36&originWidth=901&originalType=url&ratio=1&rotation=0&showTitle=false&size=6359&status=done&style=none&taskId=ued1e64df-d590-4025-a31a-f0a40be5112&title=)
## 如果发现发布的版本有bug怎么办？

1. 快速修复好bug，发布新的版本
1. 撤回上一个版本，修改好之后重新发布

撤回某个版本命令如下：
npm unpublish sentry**-**injection**-**webpack**-**plugin@4.0.26 
撤回整个包（**谨慎操作**）
npm unpublish **<package-**name**>** **-**f 

完！




 
