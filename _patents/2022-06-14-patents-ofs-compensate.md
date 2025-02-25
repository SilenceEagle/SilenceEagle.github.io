---
title: "一种两段式光纤传感水声信号补偿方法和装置"
authors: "彭威;<b>刘泽超</b>;王皓;马玲梅;饶云江."
collection: patents
permalink: /patents/2022-06-14-patents-ofs-compensate
applicationDate: 2022-06-14
issueDate: 2022-08-23
number: "CN202210664331.X"
excerpt: '本发明涉及一种两段式光纤传感水声信号补偿方法和装置'
---
# 摘要

本发明公开了一种两段式光纤传感水声信号补偿方法和装置。该水声信号补偿方法在传感信号频域分解处理的过程中,首先通过遗传算法寻找传感信号变分模态分解的最优惩罚因子和迭代阈值参数,使得信号处理过程中尽可能降低信号损失；其次,将损失信号通过基于多尺度排列熵的补偿算法,回补至各模态分量,使得水声传感信号在频域分解处理的过程中尽可能少的损失有用信息,提升传感信号的信噪比。

# 主权项：

1.一种两段式光纤传感水声信号补偿方法,其特征在于,包括以下步骤：S1、通过基于相位生成载波方法解调散射信号相位变化的Φ-OTDR系统采集传感数据,获得传感信号；S2、初始化变分模态分解模型的参数；所述参数包括惩罚因子和迭代阈值；S3、将传感信号输入到S2中的变分模态分解模型中；通过遗传算法寻找信号损失最少情况下的变分模态分解模型的参数；得到最优参数；具体包括如下子步骤：S31创建一个种群,所述种群中包含有若干个不同参数的变分模态分解模型；设置迭代次数；S32、将传感信号输入到不同参数的变分模态分解模型中,计算每个变分模态分解模型的信号损失量作为该变分模态分解模型的适应度值,以信号的重构误差为适应度值进行进化；S33、根据变分模态分解模型的适应度值,通过轮盘选择的方法,为每个变分模态分解模型分配一个选择概率；S34、选取两组参数不同的变分模态模型作为双亲,通过交叉分享双亲的优异特性,产生优异特性的子代；或选取优异参数的变分模态模型作为父代,通过变异产生一个新的子代；S35、将子代加入到S31的种群中,替换种群中适应度值最低的个体；S36、判断是否达到迭代次数；若达到,则在种群中选择适应度值最佳的个体作为最优参数的变分模态分解模型；若未达到；返回步骤S32；S4、将变分模态分解模型的参数设置为S3中的最优参数,将传感信号输入到最优参数的变分模态分解模型中,获得信号损失最小情况下的若干个模态分量；S5、计算信号损失量；S6、计算模态分量的多尺度排列熵,将模态分量按照时间尺度区间均值化处理,计算排列熵,将排列熵归一化后得到多尺度排列熵的值；S7；基于多阶排列熵的设计信息权重补偿；将信号损失量通过变分模态分解算法进行二次分解,获得损失信号模态分量,将损失信号模态分量按照频段补偿到步骤S4的模态分量中。
