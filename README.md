# Bingle
### 运行环境
Python3+Django

### 语言编译环境
- C:gcc
- C++:g++
- C#:Mono
- Python:Python3
- JAVA:Java8
- Pascal:Free Pascal

需要预先在服务器上安装各种语言的编译器，并将其路径加入到PATH中。开发测试的时候建议使用Mac电脑，可以一次性便捷安装所有的编译环境。

### 运行程序
```shell
python3 manage.py runserver
```

### 代码结构
- Bingle/Templetes/production 下为界面模板
  - urls.py 分发url请求
  - view.py 处理urls.py分发的请求
  - compiler.py 处理编译和运行代码的主类
- Background 为后台处理数据库、模型相关模块
  - models.py 定义了数据库模型

### 可视化算法
- 来源自 https://github.com/algorithm-visualizer/algorithm-visualizer 
- 对其中的代码跟踪进行了修改，展示的代码和运行的代码进行了分离。
