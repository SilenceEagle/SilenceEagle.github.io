---
title: "基于自监督式信号融合的DAS动态范围提升方法和设备"
authors: "<b>刘泽超</b>;马玲梅;李彩云;朱琛;郑洪坤;彭威;田帅飞."
collection: patents
permalink: /patents/2023-09-19-patents-pofnet
applicationDate: 2023-09-19
issueDate: 2023-12-22
number: CN202311203512.3
excerpt: '本发明涉及一种基于自监督式信号融合的DAS动态范围提升方法和设备'
---
# 摘要

本发明涉及一种基于自监督式信号融合的DAS动态范围提升方法和设备,方法包括：并行获取双路光纤传感数据,即动态范围未受限制但信噪比较低的DAS信号和因动态范围受限而存在相位解卷绕错误的DAS相位信号,输入自设计的自监督式信号融合模型中,求取相位卷绕系数,并取整,根据取整后的相位卷绕系数和第二光纤传感信号,构建解卷绕后的相位估计值并输出。与现有技术相比,本发明可实时有效修正DAS相位信号因动态范围受限而导致的相位解卷绕错误,恢复真实相位,提升动态范围,且不以牺牲信噪比为代价。

# 主权项：

1.一种基于自监督式信号融合的DAS动态范围提升方法,其特征在于,包括以下步骤：对同一点式散射增强光纤分别采用同步输出的第一光脉冲串和第二光脉冲串进行测量,所述第一光脉冲串用于测量光纤中相邻散射点之间光程差,获得第一光纤传感信号；所述第二光脉冲串用于测量光纤中相邻散射点之间光信号的相位变化,获得第二光纤传感信号,所述第二光纤传感信号为经过反三角变换及相位解卷绕算法处理后的相位信号；将所述第一光纤传感信号和第二光纤传感信号并行输入预先构建并训练好的信号融合模型中,求取相位卷绕系数,并取整；根据取整后的相位卷绕系数和第二光纤传感信号,构建解卷绕后的相位估计值并输出；所述信号融合模型为机器学习模型；所述信号融合模型的采用自监督式训练方法进行模型训练；所述模型训练的过程根据解卷绕后的相位估计值和对应的信号真值计算损失函数,所述信号真值为第一光纤传感信号或者第一光纤传感信号及第二光纤传感信号的融合值,从而对信号融合模型的参数值进行迭代优化；所述信号融合模型的损失函数包括解卷绕后的相位估计值与第一光纤传感信号之间的时域损失函数,以及解卷绕后的相位估计值经过短时傅里叶变换后得到的频谱与伪频谱真值之间的频域损失函数。
